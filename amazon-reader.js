const ASIN_RE = /^[A-Z0-9]{10}$/;

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
