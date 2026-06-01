const ASIN_RE = /^[A-Z0-9]{10}$/;
const RAPIDAPI_HOST = "real-time-amazon-data.p.rapidapi.com";

class AmazonReadError extends Error {
  constructor(message, statusCode = 500, url = undefined) {
    super(message);
    this.name = "AmazonReadError";
    this.statusCode = statusCode;
    this.url = url;
  }
}

function normalizeAsin(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return cleanText(match[1]);
  }
  return "";
}

function sectionById(html, id) {
  const marker = new RegExp(`<[^>]+id=["']${id}["'][^>]*>`, "i");
  const start = html.search(marker);
  if (start < 0) return "";

  const next = html.slice(start + 1).search(/<div[^>]+id=["'][^"']+["'][^>]*>/i);
  if (next < 0) return html.slice(start);
  return html.slice(start, start + 1 + next);
}

function extractTitle(html) {
  const title = firstMatch(html, [
    /<span[^>]+id=["']productTitle["'][^>]*>([\s\S]*?)<\/span>/i,
    /<h1[^>]+id=["']title["'][^>]*>([\s\S]*?)<\/h1>/i,
    /<title[^>]*>([\s\S]*?)<\/title>/i
  ]);

  return title
    .replace(/\s*-\s*Amazon\.com.*$/i, "")
    .replace(/^Amazon\.com:\s*/i, "")
    .trim();
}

function extractBrand(html) {
  return firstMatch(html, [
    /<a[^>]+id=["']bylineInfo["'][^>]*>([\s\S]*?)<\/a>/i,
    /<span[^>]+id=["']bylineInfo["'][^>]*>([\s\S]*?)<\/span>/i,
    /<tr[^>]*>\s*<th[^>]*>\s*Brand\s*<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/i
  ]).replace(/^Visit the\s+/i, "").replace(/\s+Store$/i, "");
}

function extractBullets(html) {
  const section = sectionById(html, "feature-bullets") || html;
  const bullets = [];
  const itemRegex = /<span[^>]+class=["'][^"']*a-list-item[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi;

  for (const match of section.matchAll(itemRegex)) {
    const text = cleanText(match[1]);
    if (text && !/make sure this fits/i.test(text) && !bullets.includes(text)) {
      bullets.push(text);
    }
  }

  return bullets.slice(0, 8);
}

function addDetail(details, key, value) {
  const cleanKey = cleanText(key).replace(/[:\uFF1A]+$/, "");
  const cleanValue = cleanText(value);
  if (!cleanKey || !cleanValue || cleanKey.length > 80 || cleanValue.length > 220) return;
  if (/customer reviews|best sellers rank|date first available/i.test(cleanKey)) return;
  details[cleanKey] = cleanValue;
}

function extractDetails(html) {
  const details = {};
  const tableSections = [
    sectionById(html, "productDetails_techSpec_section_1"),
    sectionById(html, "productDetails_detailBullets_sections1"),
    sectionById(html, "productOverview_feature_div")
  ].filter(Boolean);

  for (const section of tableSections) {
    const rowRegex = /<tr[^>]*>\s*<t[hd][^>]*>([\s\S]*?)<\/t[hd]>\s*<t[hd][^>]*>([\s\S]*?)<\/t[hd]>\s*<\/tr>/gi;
    for (const row of section.matchAll(rowRegex)) {
      addDetail(details, row[1], row[2]);
    }
  }

  const bulletsSection = sectionById(html, "detailBullets_feature_div");
  const detailRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  for (const match of bulletsSection.matchAll(detailRegex)) {
    const text = cleanText(match[1]);
    const parts = text.split(/\s*[:\uFF1A]\s*/);
    if (parts.length >= 2) {
      addDetail(details, parts[0], parts.slice(1).join(": "));
    }
  }

  const overviewRegex = /<span[^>]+class=["'][^"']*a-text-bold[^"']*["'][^>]*>([\s\S]*?)<\/span>\s*<\/td>\s*<td[^>]*>\s*<span[^>]*>([\s\S]*?)<\/span>/gi;
  for (const match of html.matchAll(overviewRegex)) {
    addDetail(details, match[1], match[2]);
  }

  return details;
}

function inferCategory(title, bullets, details) {
  const text = [title, ...bullets, Object.entries(details).flat().join(" ")].join(" ").toLowerCase();
  if (/juicer|masticating|cold press|juice extractor/.test(text)) return "juicer";
  if (/ice maker|ice machine|bullet ice|ice production/.test(text)) return "iceMaker";
  if (/blender|smoothie|jar capacity|blend/.test(text)) return "blender";
  if (/air fryer|airfryer|crisper|fry basket/.test(text)) return "airFryer";
  return "general";
}

function isBlocked(html) {
  return /robot check|captcha|enter the characters you see below|sorry, we just need to make sure you're not a robot/i.test(html);
}

function unwrapRapidApiPayload(payload) {
  if (!payload || typeof payload !== "object") return {};
  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.data) && payload.data[0]) return payload.data[0];
  return payload;
}

function firstText(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function mergeDetails(...objects) {
  const details = {};

  for (const object of objects) {
    if (!object || typeof object !== "object" || Array.isArray(object)) continue;
    for (const [key, value] of Object.entries(object)) {
      if (value === null || value === undefined || value === "") continue;
      const cleanKey = cleanText(key).replace(/[:\uFF1A]+$/, "");
      const cleanValue = Array.isArray(value) ? value.join(", ") : cleanText(String(value));
      if (cleanKey && cleanValue && cleanKey.length <= 80 && cleanValue.length <= 240) {
        details[cleanKey] = cleanValue;
      }
    }
  }

  return details;
}

function normalizeRapidApiListing(inputAsin, rawPayload) {
  const data = unwrapRapidApiPayload(rawPayload);
  const asin = normalizeAsin(firstText(data.asin, inputAsin));
  const title = firstText(data.product_title, data.title, data.name);
  const bullets = Array.isArray(data.about_product)
    ? data.about_product.map((item) => cleanText(String(item))).filter(Boolean)
    : [];
  const details = mergeDetails(data.product_details, data.product_information, {
    Brand: firstText(data.product_brand, data.brand),
    Price: firstText(data.product_price, data.price),
    Rating: firstText(data.product_star_rating, data.rating && String(data.rating)),
    "Ratings Count": data.product_num_ratings ? String(data.product_num_ratings) : "",
    Availability: firstText(data.product_availability, data.availability),
    "Sales Volume": firstText(data.sales_volume),
    "Best Seller": data.is_best_seller === true ? "Yes" : "",
    "Amazon Choice": data.is_amazon_choice === true ? "Yes" : "",
    Prime: data.is_prime === true ? "Yes" : ""
  });
  const brand = firstText(data.product_brand, data.brand, details.Brand, details.Manufacturer, data.product_byline);
  const photos = Array.isArray(data.product_photos)
    ? data.product_photos
    : [data.product_photo].filter(Boolean);
  const categoryPath = Array.isArray(data.category_path)
    ? data.category_path.map((item) => item?.name).filter(Boolean)
    : [];

  return {
    asin,
    url: firstText(data.product_url, `https://www.amazon.com/dp/${asin}`),
    title,
    brand: brand.replace(/^Visit the\s+/i, "").replace(/\s+Store$/i, ""),
    bullets,
    details,
    categoryHint: inferCategory(title, bullets, details),
    mediaNote: [
      photos.length ? `RapidAPI 已返回 ${photos.length} 张产品图链接，可用于检查主图、副图和信息图覆盖度。` : "",
      categoryPath.length ? `Amazon 类目路径：${categoryPath.join(" > ")}。` : "",
      data.product_description ? `产品描述已读取：${cleanText(data.product_description).slice(0, 240)}。` : "",
      "A+ 图片内嵌文字和视频脚本仍建议人工复核。"
    ].filter(Boolean).join("\n"),
    warning: "数据来自 RapidAPI Real-Time Amazon Data；A+ 图片文字和视频脚本仍需人工复核。",
    source: "rapidapi",
    rawSummary: {
      price: firstText(data.product_price),
      rating: firstText(data.product_star_rating),
      ratings: data.product_num_ratings || null,
      photoCount: photos.length,
      categoryPath
    }
  };
}

async function fetchRapidApiProductDetails(asin) {
  const rapidApiKey = process.env.RAPIDAPI_KEY || process.env.RAPIDAPI_AMAZON_KEY;

  if (!rapidApiKey) {
    throw new AmazonReadError("RapidAPI key is not configured. Set RAPIDAPI_KEY in environment variables.", 500);
  }

  const url = new URL(`https://${RAPIDAPI_HOST}/product-details`);
  url.searchParams.set("asin", asin);
  url.searchParams.set("country", process.env.AMAZON_COUNTRY || "US");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": RAPIDAPI_HOST
      }
    });
    const text = await response.text();
    let payload;

    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      throw new AmazonReadError("RapidAPI returned a non-JSON response.", 502, url.toString());
    }

    if (!response.ok) {
      const message = payload.message || payload.error || `RapidAPI returned HTTP ${response.status}.`;
      throw new AmazonReadError(message, response.status === 401 || response.status === 403 ? 502 : response.status, url.toString());
    }

    return normalizeRapidApiListing(asin, payload);
  } catch (error) {
    if (error instanceof AmazonReadError) throw error;
    const message = error.name === "AbortError" ? "RapidAPI request timed out." : `Could not connect to RapidAPI: ${error.message}`;
    throw new AmazonReadError(message, 502, url.toString());
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchAmazonPage(asin) {
  const url = `https://www.amazon.com/dp/${asin}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 ListingQualityAudit/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });
    const html = await response.text();
    return { status: response.status, url, html };
  } finally {
    clearTimeout(timeout);
  }
}

async function readAmazonListing(inputAsin) {
  const asin = normalizeAsin(inputAsin);

  if (!ASIN_RE.test(asin)) {
    throw new AmazonReadError("ASIN must be 10 letters or digits.", 400);
  }

  if (process.env.RAPIDAPI_KEY || process.env.RAPIDAPI_AMAZON_KEY) {
    const listing = await fetchRapidApiProductDetails(asin);

    if (!listing.title && !listing.bullets.length && !Object.keys(listing.details).length) {
      throw new AmazonReadError("RapidAPI returned data, but no title, bullets, or details were parsed.", 502, listing.url);
    }

    return listing;
  }

  let result;
  try {
    result = await fetchAmazonPage(asin);
  } catch (error) {
    const message = error.name === "AbortError" ? "Amazon request timed out." : `Could not connect to Amazon: ${error.message}`;
    throw new AmazonReadError(message, 502);
  }

  if (result.status >= 400) {
    throw new AmazonReadError(`Amazon returned HTTP ${result.status}.`, 502, result.url);
  }

  if (isBlocked(result.html)) {
    throw new AmazonReadError("Amazon returned CAPTCHA or robot check. Use manual paste or an official Amazon API.", 502, result.url);
  }

  const title = extractTitle(result.html);
  const bullets = extractBullets(result.html);
  const details = extractDetails(result.html);
  const brand = extractBrand(result.html);

  if (!title && !bullets.length && !Object.keys(details).length) {
    throw new AmazonReadError("Amazon page returned, but no title, bullets, or details were parsed.", 502, result.url);
  }

  return {
    asin,
    url: result.url,
    title,
    brand,
    bullets,
    details,
    categoryHint: inferCategory(title, bullets, details),
    mediaNote: "Amazon title, bullets, and details were imported. A+ image copy and videos usually still need manual review.",
    warning: "A+ image copy and video scripts still need manual supplement."
  };
}

module.exports = {
  AmazonReadError,
  readAmazonListing
};
