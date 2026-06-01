const http = require("node:http");
const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const { AmazonReadError, readAmazonListing } = require("./amazon-reader");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8787);

function loadLocalEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fsSync.existsSync(envPath)) return;

  const lines = fsSync.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator < 1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadLocalEnv();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function send(response, status, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

function sendJson(response, status, payload) {
  send(response, status, JSON.stringify(payload), "application/json; charset=utf-8");
}

async function handleAmazon(requestUrl, response) {
  if (requestUrl.searchParams.get("health") === "1") {
    sendJson(response, 200, {
      ok: true,
      rapidApiConfigured: Boolean(process.env.RAPIDAPI_KEY || process.env.RAPIDAPI_AMAZON_KEY),
      country: process.env.AMAZON_COUNTRY || "US"
    });
    return;
  }

  const asin = requestUrl.searchParams.get("asin");

  try {
    const listing = await readAmazonListing(asin);
    sendJson(response, 200, listing);
  } catch (error) {
    const status = error instanceof AmazonReadError ? error.statusCode : 500;
    sendJson(response, status, {
      message: error.message || "Unexpected server error.",
      url: error.url
    });
  }
}

async function serveStatic(requestUrl, response) {
  const pathname = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const target = path.resolve(ROOT, `.${pathname}`);
  const relative = path.relative(ROOT, target);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    send(response, 403, "Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(target);
    send(response, 200, file, MIME_TYPES[path.extname(target)] || "application/octet-stream");
  } catch {
    send(response, 404, "Not found");
  }
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (requestUrl.pathname === "/api/amazon") {
    await handleAmazon(requestUrl, response);
    return;
  }

  await serveStatic(requestUrl, response);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Listing audit site running at http://127.0.0.1:${PORT}`);
});
