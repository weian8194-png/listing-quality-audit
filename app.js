const CATEGORY_RULES = {
  juicer: {
    label: "榨汁机",
    productType: "Cold Press Juicer",
    defaultCapacity: "5.8 Inch Wide Mouth",
    required: [
      ["Power", "功率", "350W"],
      ["Feed Chute Size", "进料口径", "5.8 Inch"],
      ["Noise Level", "噪音等级", "60 dB or lower"],
      ["Material Safety", "材质安全", "BPA Free Food Contact Materials"],
      ["Cleaning Method", "清洁方式", "Detachable Parts Dishwasher Safe"],
      ["Voltage", "电压", "120V"],
      ["Speed Settings", "档位", "Low Speed Masticating"],
      ["Item Dimensions", "产品尺寸", "Length x Width x Height"],
      ["Item Weight", "产品重量", "Net Weight"],
      ["Included Components", "包装清单", "Juice Cup Pulp Cup Cleaning Brush"]
    ],
    usp: "5.8 Inch wide mouth for whole fruits and vegetables",
    scenes: ["whole fruits", "leafy greens", "morning juice", "quiet kitchen"],
    media: [
      "增加 5.8 Inch 口径与常规 3 Inch 口径的对比图，画面中展示整果免切的步骤差异。",
      "增加“拆洗 3 步”图片模块，标注可拆部件、滤网刷和清洗耗时。",
      "增加噪音场景短视频，使用厨房环境声对比突出 60 dB or lower 的安静体验。",
      "A+ 参数表应把 Power、Feed Chute Size、Material Safety、Voltage、Dimensions 与后台字段完全对齐。"
    ]
  },
  iceMaker: {
    label: "制冰机",
    productType: "Countertop Ice Maker",
    defaultCapacity: "26 lbs per 24 Hours",
    required: [
      ["Ice Production", "日产冰量", "26 lbs per 24 Hours"],
      ["Cycle Time", "单轮制冰时间", "6 to 8 Minutes"],
      ["Water Reservoir", "水箱容量", "2.2 L"],
      ["Ice Basket Capacity", "冰篮容量", "1.5 lbs"],
      ["Noise Level", "噪音等级", "45 dB or lower"],
      ["Self Cleaning", "自清洁", "Yes"],
      ["Ice Shape", "冰块形状", "Bullet Ice"],
      ["Material Safety", "材质安全", "Food Grade PP or Stainless Steel"],
      ["Voltage", "电压", "120V"],
      ["Item Dimensions", "产品尺寸", "Length x Width x Height"]
    ],
    usp: "fast 6 to 8 minute ice cycle with self cleaning",
    scenes: ["home bar", "RV", "party drinks", "office pantry"],
    media: [
      "增加“6 to 8 Minutes 出冰”计时视频，展示第一篮冰从加水到落冰的完整过程。",
      "增加 24 小时日产冰量与冰篮容量的参数图，避免用户误解一次性储冰量。",
      "增加水箱、自清洁、排水口的结构图，降低维护疑虑。",
      "A+ 对比表应区分 Ice Production、Cycle Time、Water Reservoir、Ice Basket Capacity。"
    ]
  },
  blender: {
    label: "搅拌机",
    productType: "Countertop Blender",
    defaultCapacity: "64 oz Jar",
    required: [
      ["Power", "功率", "1000W"],
      ["Jar Capacity", "杯体容量", "64 oz"],
      ["Speed Settings", "档位", "Variable Speed"],
      ["Blade Material", "刀片材质", "Stainless Steel"],
      ["Material Safety", "材质安全", "BPA Free"],
      ["Noise Level", "噪音等级", "Measured dB"],
      ["Cleaning Method", "清洁方式", "Self Cleaning or Dishwasher Safe"],
      ["Voltage", "电压", "120V"],
      ["Included Components", "包装清单", "Tamper Lid Jar"],
      ["Item Dimensions", "产品尺寸", "Length x Width x Height"]
    ],
    usp: "high power blending with BPA Free large capacity jar",
    scenes: ["smoothies", "frozen fruit", "soup", "family meal prep"],
    media: [
      "增加冰块、坚果、冷冻水果三种质地的实测视频，证明功率与刀片表现。",
      "增加杯体容量与刻度细节图，减少用户对 oz 与 servings 的换算疑虑。",
      "增加清洁方式图，明确 Self Cleaning 或 Dishwasher Safe 的适用部件。",
      "A+ 参数表应固定 Power、Jar Capacity、Blade Material、Speed Settings 四个核心字段。"
    ]
  },
  airFryer: {
    label: "空气炸锅",
    productType: "Air Fryer",
    defaultCapacity: "6 QT Basket",
    required: [
      ["Capacity", "容量", "6 QT"],
      ["Power", "功率", "1500W"],
      ["Temperature Range", "温控范围", "170F to 400F"],
      ["Cooking Presets", "预设菜单", "8 Presets"],
      ["Material Safety", "材质安全", "PFOA Free Nonstick Basket"],
      ["Cleaning Method", "清洁方式", "Dishwasher Safe Basket"],
      ["Noise Level", "噪音等级", "Measured dB"],
      ["Voltage", "电压", "120V"],
      ["Item Dimensions", "产品尺寸", "Length x Width x Height"],
      ["Included Components", "包装清单", "Basket Crisper Plate Manual"]
    ],
    usp: "large capacity basket with dishwasher safe nonstick parts",
    scenes: ["weeknight dinner", "crispy fries", "family portions", "low oil cooking"],
    media: [
      "增加容量可视化图，用鸡翅、薯条或披萨片展示 6 QT 能装多少。",
      "增加温度范围与预设菜单图，说明不同食材对应的烹饪场景。",
      "增加篮体与烤架的拆洗图，突出 Dishwasher Safe 与涂层安全。",
      "A+ 对比表应对齐 Capacity、Power、Temperature Range、Cleaning Method。"
    ]
  },
  general: {
    label: "厨房电器",
    productType: "Kitchen Appliance",
    defaultCapacity: "Compact Countertop Design",
    required: [
      ["Power", "功率", "Rated Wattage"],
      ["Capacity", "容量", "Measured Capacity"],
      ["Noise Level", "噪音等级", "Measured dB"],
      ["Material Safety", "材质安全", "Food Contact Safe"],
      ["Voltage", "电压", "120V"],
      ["Cleaning Method", "清洁方式", "Detachable or Dishwasher Safe"],
      ["Item Dimensions", "产品尺寸", "Length x Width x Height"],
      ["Item Weight", "产品重量", "Net Weight"],
      ["Included Components", "包装清单", "Main Unit Accessories Manual"],
      ["Warranty", "质保", "Warranty Terms"]
    ],
    usp: "clear specs and food contact safe materials",
    scenes: ["daily kitchen", "small space", "family use", "easy cleanup"],
    media: [
      "增加核心参数图，统一展示容量、功率、尺寸、噪音、材质安全。",
      "增加使用场景图，覆盖台面占用、家庭份量与清洁流程。",
      "增加竞品对比表，把缺失字段转化为可感知的优势。",
      "视频脚本应包含开箱、真实操作、清洁、噪音四个片段。"
    ]
  }
};

const SUPPRESSION_TERMS = [
  { term: "#1", reason: "绝对化排名需要可验证依据" },
  { term: "best", reason: "绝对化表达容易降低可信度" },
  { term: "guaranteed", reason: "保证性承诺需谨慎" },
  { term: "cure", reason: "医疗暗示高风险" },
  { term: "medical grade", reason: "医疗级声明需资质支撑" },
  { term: "FDA approved", reason: "食品接触材质通常不应写成 FDA approved 产品" },
  { term: "100% safe", reason: "绝对安全承诺不可验证" },
  { term: "lifetime warranty", reason: "质保承诺需与后台政策一致" }
];

const UNIT_PATTERNS = [
  { key: "Power", label: "功率", regex: /(\d+(?:\.\d+)?)\s?(?:w|watts?)\b/gi, normalize: (value) => `${trimNumber(value)}W`, compare: true },
  { key: "Noise Level", label: "噪音", regex: /(\d+(?:\.\d+)?)\s?(?:db|dba)\b/gi, normalize: (value) => `${trimNumber(value)} dB`, compare: true },
  { key: "Voltage", label: "电压", regex: /(\d+(?:\.\d+)?)\s?v\b/gi, normalize: (value) => `${trimNumber(value)}V`, compare: true },
  {
    key: "Feed Chute Size",
    label: "进料口径",
    regex: /(\d+(?:\.\d+)?)\s?(?:inch|inches|in|")\s?(?:wide\s)?(?:mouth|feed|chute)\b|(?:mouth|feed|chute).{0,24}?(\d+(?:\.\d+)?)\s?(?:inch|inches|in|")/gi,
    normalize: (value) => `${trimNumber(value)} Inch`,
    compare: true
  },
  { key: "Capacity", label: "容量", regex: /(\d+(?:\.\d+)?)\s?(?:qt|quart|quarts|oz|l|liter|liters|ml|cups?|lbs?|pounds?)\b/gi, normalize: (value, raw) => raw.replace(/\s+/g, " ").trim(), compare: false }
];

const form = document.querySelector("#auditForm");
const asinInput = document.querySelector("#asin");
const categoryInput = document.querySelector("#category");
const brandInput = document.querySelector("#brand");
const titleInput = document.querySelector("#title");
const bulletsInput = document.querySelector("#bullets");
const attributesInput = document.querySelector("#attributes");
const mediaInput = document.querySelector("#mediaCopy");
const amazonLink = document.querySelector("#amazonLink");
const fetchAmazonButton = document.querySelector("#fetchAmazon");
const fetchHint = document.querySelector("#fetchHint");
const asinStatus = document.querySelector("#asinStatus");
const statusStrip = document.querySelector(".status-strip");
const gradeValue = document.querySelector("#gradeValue");
const cdqValue = document.querySelector("#cdqValue");
const scoreMeter = document.querySelector("#scoreMeter");
const reportOutput = document.querySelector("#reportOutput");
const reportTemplate = document.querySelector("#reportTemplate");

let lastReportMarkdown = "";

function isStaticOnlyHost() {
  return window.location.protocol === "file:" || window.location.hostname.endsWith("github.io");
}

function trimNumber(value) {
  const number = Number.parseFloat(value);
  return Number.isInteger(number) ? String(number) : String(number);
}

function sanitizeAsin(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
}

function isValidAsin(value) {
  return /^[A-Z0-9]{10}$/.test(value);
}

function getAmazonUrl(asin) {
  return `https://www.amazon.com/dp/${asin}`;
}

function updateAsinState() {
  const asin = sanitizeAsin(asinInput.value);
  if (asinInput.value !== asin) {
    asinInput.value = asin;
  }

  statusStrip.classList.remove("valid", "invalid");
  amazonLink.classList.add("disabled");
  amazonLink.href = "#";

  if (!asin) {
    asinStatus.textContent = "等待 ASIN";
    return;
  }

  if (!isValidAsin(asin)) {
    statusStrip.classList.add("invalid");
    asinStatus.textContent = "ASIN 需要 10 位字母数字";
    return;
  }

  statusStrip.classList.add("valid");
  amazonLink.classList.remove("disabled");
  amazonLink.href = getAmazonUrl(asin);
  asinStatus.textContent = getAmazonUrl(asin);

  if (isStaticOnlyHost()) {
    fetchHint.textContent = window.location.hostname.endsWith("github.io")
      ? "GitHub Pages 只托管静态网页，可输入 ASIN 并手动粘贴内容；自动读取需连接 Vercel 或 Render 后端。"
      : "自动读取需要通过本地服务或公网后端运行，直接打开 HTML 时请手动粘贴页面内容。";
  }
}

function inferCategoryFromText(text) {
  const normalized = text.toLowerCase();
  if (/juicer|masticating|cold press|juice extractor/.test(normalized)) return "juicer";
  if (/ice maker|ice machine|bullet ice|ice production/.test(normalized)) return "iceMaker";
  if (/blender|smoothie|jar capacity|blend/.test(normalized)) return "blender";
  if (/air fryer|airfryer|crisper|fry basket/.test(normalized)) return "airFryer";
  return "general";
}

function setFetchLoading(isLoading) {
  fetchAmazonButton.disabled = isLoading;
  fetchAmazonButton.innerHTML = isLoading
    ? '<span aria-hidden="true">…</span>读取中'
    : '<span aria-hidden="true">⌕</span>只读取';
}

function localizeFetchError(message) {
  if (/10 letters or digits/i.test(message)) return "ASIN 需要 10 位字母数字";
  if (/RapidAPI key is not configured/i.test(message)) return "RapidAPI 密钥还没有配置到后端环境变量";
  if (/RapidAPI returned a non-JSON response/i.test(message)) return "RapidAPI 返回了非 JSON 响应";
  if (/RapidAPI returned data, but no title/i.test(message)) return "RapidAPI 返回了数据，但没有解析到标题、五点或参数";
  if (/Could not connect to RapidAPI/i.test(message)) return "无法连接 RapidAPI";
  if (/RapidAPI request timed out/i.test(message)) return "RapidAPI 请求超时";
  if (/You are not subscribed|not subscribed/i.test(message)) return "RapidAPI 当前账号可能还没有订阅该 API";
  if (/Invalid API key|invalid api key|unauthorized/i.test(message)) return "RapidAPI 密钥无效或未授权";
  if (/timed out/i.test(message)) return "Amazon 页面请求超时";
  if (/could not connect/i.test(message)) return "无法连接 Amazon 页面";
  if (/returned HTTP/i.test(message)) return "Amazon 返回错误状态，当前网络或站点策略未允许读取";
  if (/CAPTCHA|robot check/i.test(message)) return "Amazon 返回验证码或机器人检查，无法自动读取";
  if (/no title, bullets, or details/i.test(message)) return "页面已返回，但没有解析到标题、五点或参数";
  return message || "自动读取失败";
}

function formatDetails(details) {
  if (!details || typeof details !== "object") return "";
  return Object.entries(details)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key} ${value}`)
    .join("\n");
}

async function fetchAmazonListing(options = {}) {
  const shouldOpenAmazon = options.openAmazon === true;
  const asin = sanitizeAsin(asinInput.value);

  if (!isValidAsin(asin)) {
    updateAsinState();
    showToast("请输入 10 位 ASIN");
    asinInput.focus();
    return;
  }

  if (isStaticOnlyHost()) {
    fetchHint.textContent = window.location.hostname.endsWith("github.io")
      ? "GitHub Pages 没有后端 API，不能直接读取 Amazon。请用 GitHub 连接 Vercel/Render 部署完整版本。"
      : "当前是直接打开 HTML，自动读取不可用。请运行 npm start 后访问本地页面。";
    showToast("当前环境没有读取后端");
    return;
  }

  setFetchLoading(true);
  fetchHint.textContent = "正在读取 Amazon 页面信息。若遇到验证码或限制，请使用官方 API 或手动粘贴。";

  try {
    const response = await fetch(`/api/amazon?asin=${encodeURIComponent(asin)}`);
    const text = await response.text();
    let payload;

    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { message: "读取接口没有返回 JSON，当前部署可能没有启用后端 API" };
    }

    if (!response.ok) {
      throw new Error(payload.message || "读取失败");
    }

    if (payload.title) titleInput.value = payload.title;
    if (payload.brand && !brandInput.value.trim()) brandInput.value = payload.brand;
    if (Array.isArray(payload.bullets) && payload.bullets.length) {
      bulletsInput.value = payload.bullets.join("\n");
    }

    const detailText = formatDetails(payload.details);
    if (detailText) attributesInput.value = detailText;

    const combinedText = [payload.title, payload.bullets?.join(" "), detailText].filter(Boolean).join(" ");
    categoryInput.value = payload.categoryHint || inferCategoryFromText(combinedText);

    if (!mediaInput.value.trim()) {
      mediaInput.value = payload.mediaNote || "Amazon 页面读取通常无法完整覆盖 A+ 图片文案，请继续补充 A+ 模块、图片文字和视频脚本。";
    }

    renderReport(getFormData());

    if (shouldOpenAmazon) {
      window.open(getAmazonUrl(asin), "_blank", "noreferrer");
    }

    const warning = payload.warning ? ` ${payload.warning}` : "";
    fetchHint.textContent = `已读取 ${payload.url}。${warning}`;
    showToast("Amazon 信息已导入");
    return true;
  } catch (error) {
    fetchHint.textContent = `${localizeFetchError(error.message)}。可打开 Amazon 链接后手动粘贴，或接入 Amazon SP-API / PA-API。`;
    showToast("自动读取失败");
    return false;
  } finally {
    setFetchLoading(false);
  }
}

function splitBullets(value) {
  return value
    .split(/\n+/)
    .map((item) => item.replace(/^[\s•\-*]+/, "").trim())
    .filter(Boolean);
}

function collectTextParts(data) {
  return {
    title: data.title,
    bullets: splitBullets(data.bullets).join("\n"),
    attributes: data.attributes,
    media: data.mediaCopy
  };
}

function extractValues(parts) {
  const bucket = {};

  for (const pattern of UNIT_PATTERNS) {
    bucket[pattern.key] = [];

    for (const [source, text] of Object.entries(parts)) {
      if (!text) continue;
      const matches = [...text.matchAll(pattern.regex)];
      for (const match of matches) {
        const rawValue = match[1] || match[2] || match[0];
        const normalized = pattern.normalize(rawValue, match[0]);
        bucket[pattern.key].push({ source, value: normalized });
      }
    }
  }

  return bucket;
}

function findInconsistencies(extracted) {
  const issues = [];

  for (const [key, values] of Object.entries(extracted)) {
    const pattern = UNIT_PATTERNS.find((item) => item.key === key);
    if (pattern && !pattern.compare) continue;
    const unique = [...new Set(values.map((item) => item.value.toLowerCase()))];
    if (unique.length > 1) {
      const display = values.map((item) => `${sourceLabel(item.source)} ${item.value}`).join("；");
      issues.push(`${key} 存在多版本参数：${display}`);
    }
  }

  return issues;
}

function sourceLabel(source) {
  const map = {
    title: "标题",
    bullets: "五点",
    attributes: "后台属性",
    media: "A+或图片"
  };
  return map[source] || source;
}

function fieldHasText(text, field) {
  const haystack = text.toLowerCase();
  const terms = [
    field[0].toLowerCase(),
    field[1].toLowerCase(),
    ...field[0].toLowerCase().split(/\s+/)
  ].filter((term) => /[^\x00-\x7F]/.test(term) ? term.length > 1 : term.length > 2);

  return terms.some((term) => haystack.includes(term));
}

function scanMissingFields(data, rules) {
  const allText = [data.title, data.bullets, data.attributes, data.mediaCopy].join("\n");
  return rules.required.filter((field) => !fieldHasText(allText, field));
}

function scanSuppression(data) {
  const issues = [];
  const title = data.title || "";
  const allText = [data.title, data.bullets, data.attributes, data.mediaCopy].join("\n");
  const titleSpecial = /["'|{}[\]<>~^=+]/.test(title);
  const repeatedWords = findRepeatedKeywords(title);

  if (titleSpecial) {
    issues.push("标题包含引号、竖线或多余符号，建议改为纯文本参数表达。");
  }

  if (/[^\x00-\x7F]/.test(title.replace(/[\u4e00-\u9fff]/g, ""))) {
    issues.push("标题含非常规字符，建议移除图形符号或特殊标点。");
  }

  if (repeatedWords.length) {
    issues.push(`标题关键词重复：${repeatedWords.join("、")}。`);
  }

  for (const item of SUPPRESSION_TERMS) {
    if (allText.toLowerCase().includes(item.term.toLowerCase())) {
      issues.push(`潜在高风险词 ${item.term}：${item.reason}。`);
    }
  }

  return issues;
}

function findRepeatedKeywords(title) {
  const stopWords = new Set(["with", "and", "for", "the", "a", "an", "to", "of", "in", "on", "by"]);
  const counts = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word))
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(counts)
    .filter(([, count]) => count > 2)
    .map(([word]) => word);
}

function scoreListing(data, missingFields, inconsistencies, suppressionIssues) {
  const bullets = splitBullets(data.bullets);
  let score = 18;

  if (isValidAsin(data.asin)) score += 8;
  if (data.title.trim().length >= 80 && data.title.trim().length <= 190) score += 16;
  if (data.title.trim().length > 190) score -= 6;
  if (bullets.length >= 5) score += 16;
  if (bullets[0] && /\d/.test(bullets[0])) score += 8;
  if (data.attributes.trim().length > 30) score += 14;
  if (data.mediaCopy.trim().length > 30) score += 10;
  score += Math.max(0, 16 - missingFields.length * 2);
  score -= inconsistencies.length * 8;
  score -= suppressionIssues.length * 6;

  return Math.max(0, Math.min(100, score));
}

function gradeFromScore(score) {
  if (score >= 90) return "Optimized";
  if (score >= 76) return "Great";
  if (score >= 60) return "Good";
  if (score >= 42) return "Fair";
  return "Poor";
}

function classifyTag(score) {
  if (score >= 76) return "good";
  if (score >= 50) return "warn";
  return "risk";
}

function pickValue(extracted, key, fallback) {
  const found = extracted[key]?.[0]?.value;
  return found || fallback;
}

function cleanTitlePart(value) {
  return value
    .replace(/["'|{}[\]<>~^=+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function generateTitle(data, rules, extracted) {
  const brand = cleanTitlePart(data.brand || "Brand");
  const power = pickValue(extracted, "Power", "");
  const noise = pickValue(extracted, "Noise Level", "");
  const voltage = pickValue(extracted, "Voltage", "");
  const capacity = pickValue(extracted, "Feed Chute Size", pickValue(extracted, "Capacity", rules.defaultCapacity));
  const safety = /bpa/i.test([data.title, data.bullets, data.attributes, data.mediaCopy].join(" ")) ? "BPA Free" : "Food Contact Safe";
  const parts = [
    brand,
    rules.productType,
    capacity,
    power,
    voltage,
    safety,
    rules.usp,
    `for ${rules.scenes.slice(0, 3).join(" and ")}`
  ].filter(Boolean);

  return cleanTitlePart(parts.join(" ")).slice(0, 190);
}

function generateBullets(data, rules, extracted) {
  const power = pickValue(extracted, "Power", "Rated Wattage");
  const noise = pickValue(extracted, "Noise Level", "Measured dB");
  const voltage = pickValue(extracted, "Voltage", "120V");
  const capacity = pickValue(extracted, "Feed Chute Size", pickValue(extracted, "Capacity", rules.defaultCapacity));
  const safety = /bpa/i.test([data.title, data.bullets, data.attributes, data.mediaCopy].join(" ")) ? "BPA Free food contact materials" : "food contact safe materials";

  return [
    `参数清晰可抓取：${rules.productType}，${capacity}，${power}，${voltage}，${noise}，${safety}，确保标题、五点、后台属性、A+ 页面数值一致。`,
    `高频场景转化：围绕 ${rules.scenes[0]} 与 ${rules.scenes[1]} 组织卖点，让用户在第一屏看到真实用途，而不只是功能堆砌。`,
    `差异化 USP：突出 ${rules.usp}，用对比图或实拍步骤证明比常规竞品更省时、更易用。`,
    `低疑虑体验：把清洁方式、材质安全、噪音、尺寸和包装清单前置，覆盖购买前最常见的退单问题。`,
    `内容闭环：主图保持白底合规，副图承接参数、场景、对比、清洁、售后，视频展示开箱、实测和维护过程。`
  ];
}

function buildAttributeRows(missingFields, rules, extracted) {
  return rules.required.map((field) => {
    const value = pickValue(extracted, field[0], field[2]);
    const missing = missingFields.some((item) => item[0] === field[0]);
    return {
      field: `${field[0]} / ${field[1]}`,
      value,
      action: missing ? "后台与前台均需补充或统一" : "保留，并核对与图片文案一致"
    };
  });
}

function diagnoseLqi(data, score) {
  const bullets = splitBullets(data.bullets);
  const issues = [];

  if (!data.title.trim()) {
    issues.push("未导入标题，无法判断关键词层级与参数承接。");
  } else if (data.title.length < 80) {
    issues.push("标题偏短，核心关键词、品类词或关键参数覆盖不足。");
  } else if (data.title.length > 190) {
    issues.push("标题过长，移动端可读性与系统解析效率下降。");
  }

  if (bullets.length < 5) {
    issues.push("五点不足 5 条，LQI 内容完整度与购买疑虑覆盖不够。");
  }

  if (bullets.length && !/\d/.test(bullets[0])) {
    issues.push("第一条五点缺少可抓取参数，建议改为规格密集型表达。");
  }

  if (!data.mediaCopy.trim()) {
    issues.push("未导入 A+ 或图片文案，无法验证多媒体是否承接关键疑虑。");
  }

  if (score < 60) {
    issues.push("当前内容更像基础资料录入，缺少参数、场景、差异化和证明素材的闭环。");
  }

  return issues.length ? issues : ["标题、五点、后台属性与 A+ 素材具备基本闭环，可继续强化对比图和实测视频。"];
}

function buildDiagnosis(score, missingFields, inconsistencies, suppressionIssues, lqiIssues) {
  const cdqRisks = [];

  if (inconsistencies.length) cdqRisks.push(...inconsistencies);
  if (missingFields.length) {
    cdqRisks.push(`高权重属性缺失：${missingFields.map((field) => `${field[0]} ${field[1]}`).join("、")}。`);
  }
  if (suppressionIssues.length) cdqRisks.push(...suppressionIssues);
  if (!cdqRisks.length) cdqRisks.push("未发现明显参数冲突或高风险抑制信号，建议上线前继续核对后台字段。");

  return [
    {
      title: "当前质量等级",
      tag: gradeFromScore(score),
      tagClass: classifyTag(score),
      items: [`综合评分 ${score}/100。`, `内容等级为 ${gradeFromScore(score)}。`]
    },
    {
      title: "CDQ 降权风险提示",
      tag: cdqRisks.length > 1 ? "需处理" : "低风险",
      tagClass: cdqRisks.length > 1 ? "risk" : "good",
      items: cdqRisks
    },
    {
      title: "LQI 转化流失点",
      tag: lqiIssues.length > 2 ? "影响转化" : "可优化",
      tagClass: lqiIssues.length > 2 ? "warn" : "good",
      items: lqiIssues
    }
  ];
}

function renderList(parent, items, ordered = false) {
  parent.replaceChildren();
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    parent.append(li);
  }
}

function renderDiagnostics(parent, diagnostics) {
  parent.replaceChildren();
  for (const diagnostic of diagnostics) {
    const item = document.createElement("div");
    item.className = "diagnostic-item";

    const title = document.createElement("strong");
    title.textContent = diagnostic.title;

    const tag = document.createElement("span");
    tag.className = `tag ${diagnostic.tagClass}`;
    tag.textContent = diagnostic.tag;

    const list = document.createElement("ul");
    renderList(list, diagnostic.items);

    item.append(title, tag, list);
    parent.append(item);
  }
}

function renderAttributeRows(parent, rows) {
  parent.replaceChildren();
  for (const row of rows) {
    const tr = document.createElement("tr");
    for (const value of [row.field, row.value, row.action]) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.append(td);
    }
    parent.append(tr);
  }
}

function formatMarkdown(data, diagnostics, optimizedTitle, optimizedBullets, attributes, mediaRecommendations) {
  const lines = [];
  lines.push(`# Amazon Listing LQI 与 CDQ 审计报告`);
  lines.push("");
  lines.push(`ASIN: ${data.asin || "未填写"}`);
  lines.push(`Amazon 链接: ${data.asin ? getAmazonUrl(data.asin) : "未生成"}`);
  lines.push("");
  lines.push("## 1. 综合诊断报告");
  for (const diagnostic of diagnostics) {
    lines.push(`### ${diagnostic.title}: ${diagnostic.tag}`);
    for (const item of diagnostic.items) {
      lines.push(`- ${item}`);
    }
  }
  lines.push("");
  lines.push("## 2. 核心优化方案");
  lines.push(`CDQ 规范化标题: ${optimizedTitle}`);
  lines.push("");
  lines.push("CDQ & LQI 双效五点:");
  optimizedBullets.forEach((item, index) => lines.push(`${index + 1}. ${item}`));
  lines.push("");
  lines.push("后台属性补全表:");
  attributes.forEach((row) => lines.push(`- ${row.field}: ${row.value}；${row.action}`));
  lines.push("");
  lines.push("## 3. A+ 页面与图片文案建议");
  mediaRecommendations.forEach((item) => lines.push(`- ${item}`));
  return lines.join("\n");
}

function renderReport(data) {
  const rules = CATEGORY_RULES[data.category];
  const parts = collectTextParts(data);
  const extracted = extractValues(parts);
  const missingFields = scanMissingFields(data, rules);
  const inconsistencies = findInconsistencies(extracted);
  const suppressionIssues = scanSuppression(data);
  const score = scoreListing(data, missingFields, inconsistencies, suppressionIssues);
  const lqiIssues = diagnoseLqi(data, score);
  const diagnostics = buildDiagnosis(score, missingFields, inconsistencies, suppressionIssues, lqiIssues);
  const optimizedTitle = generateTitle(data, rules, extracted);
  const optimizedBullets = generateBullets(data, rules, extracted);
  const attributes = buildAttributeRows(missingFields, rules, extracted);
  const mediaRecommendations = [
    ...rules.media,
    "补充一张“标题参数、五点参数、后台属性、A+ 参数”一致性核对表，防止 CDQ 对多版本数值降权。",
    "视频前 5 秒直接展示核心 USP 与实测结果，后段覆盖安装、使用、清洁和售后承诺。"
  ];

  const fragment = reportTemplate.content.cloneNode(true);
  renderDiagnostics(fragment.querySelector('[data-slot="diagnostics"]'), diagnostics);
  fragment.querySelector('[data-slot="optimizedTitle"]').textContent = optimizedTitle;
  renderList(fragment.querySelector('[data-slot="bullets"]'), optimizedBullets, true);
  renderAttributeRows(fragment.querySelector('[data-slot="attributes"]'), attributes);
  renderList(fragment.querySelector('[data-slot="media"]'), mediaRecommendations);

  reportOutput.replaceChildren(fragment);
  gradeValue.textContent = gradeFromScore(score);
  cdqValue.textContent = `${Math.max(0, 100 - missingFields.length * 8 - inconsistencies.length * 12 - suppressionIssues.length * 10)}%`;
  scoreMeter.style.width = `${score}%`;

  lastReportMarkdown = formatMarkdown(data, diagnostics, optimizedTitle, optimizedBullets, attributes, mediaRecommendations);
}

function getFormData() {
  return {
    asin: sanitizeAsin(asinInput.value),
    category: categoryInput.value,
    brand: brandInput.value.trim(),
    title: titleInput.value.trim(),
    bullets: bulletsInput.value.trim(),
    attributes: attributesInput.value.trim(),
    mediaCopy: mediaInput.value.trim()
  };
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  window.setTimeout(() => {
    toast.classList.remove("show");
    window.setTimeout(() => toast.remove(), 180);
  }, 1800);
}

function loadExampleData() {
  asinInput.value = "B0DQKPLXMB";
  categoryInput.value = "juicer";
  brandInput.value = "EUHOMY";
  titleInput.value = "EUHOMY Cold Press Juicer Machine 5.8 Inch Wide Mouth Juicer 350W Slow Masticating Juicer BPA Free Easy Clean for Whole Fruits and Vegetables";
  bulletsInput.value = [
    "350W motor, 5.8 Inch wide feed chute, 120V rated voltage, BPA Free food contact materials, detachable parts for easy cleaning",
    "Whole fruit friendly chute reduces prep time for apples, carrots, celery, leafy greens and daily morning juice",
    "Slow masticating extraction helps improve juice yield while keeping foam and pulp under control",
    "Quiet kitchen operation supports early morning use without disturbing family routines",
    "Includes juice cup, pulp cup and cleaning brush for a complete countertop juicing setup"
  ].join("\n");
  attributesInput.value = [
    "Power 350W",
    "Feed Chute Size 5.8 Inch",
    "Voltage 120V",
    "Noise Level 60 dB",
    "Material Safety BPA Free Food Contact Materials",
    "Cleaning Method Detachable Parts Dishwasher Safe",
    "Included Components Juice Cup Pulp Cup Cleaning Brush"
  ].join("\n");
  mediaInput.value = [
    "A+ shows 5.8 Inch wide mouth comparison, whole fruit juicing, low noise morning kitchen scene and easy clean parts.",
    "Image copy mentions BPA Free material, 350W motor and detachable filter basket."
  ].join("\n");
  updateAsinState();
  renderReport(getFormData());
}

asinInput.addEventListener("input", updateAsinState);
fetchAmazonButton.addEventListener("click", fetchAmazonListing);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = getFormData();

  if (!isValidAsin(data.asin)) {
    updateAsinState();
    showToast("请输入 10 位 ASIN");
    asinInput.focus();
    return;
  }

  if (!isStaticOnlyHost()) {
    fetchAmazonListing({
      openAmazon: document.querySelector("#openAmazon").checked
    });
    return;
  }

  renderReport(data);
  showToast("审计报告已生成");
});

document.querySelector("#loadExample").addEventListener("click", loadExampleData);

document.querySelector("#resetForm").addEventListener("click", () => {
  form.reset();
  reportOutput.innerHTML = `
    <div class="empty-state">
      <div class="empty-mark">LQI</div>
      <p>输入 ASIN 与 Listing 内容后生成审计结果。</p>
    </div>
  `;
  gradeValue.textContent = "待审计";
  cdqValue.textContent = "0%";
  scoreMeter.style.width = "0%";
  lastReportMarkdown = "";
  updateAsinState();
});

document.querySelector("#copyReport").addEventListener("click", async () => {
  if (!lastReportMarkdown) {
    showToast("暂无可复制报告");
    return;
  }

  try {
    await navigator.clipboard.writeText(lastReportMarkdown);
    showToast("报告已复制");
  } catch {
    showToast("浏览器未开放剪贴板权限");
  }
});

document.querySelector("#printReport").addEventListener("click", () => {
  window.print();
});

updateAsinState();

if (new URLSearchParams(window.location.search).get("demo") === "1") {
  loadExampleData();
}
