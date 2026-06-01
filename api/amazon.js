let AmazonReadError;
let readAmazonListing;
let startupError;

try {
  ({ AmazonReadError, readAmazonListing } = require("../amazon-reader"));
} catch (error) {
  startupError = error;
}

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

function getQueryValue(request, key) {
  if (request.query && request.query[key] !== undefined) {
    return Array.isArray(request.query[key]) ? request.query[key][0] : request.query[key];
  }

  const host = request.headers?.host || "localhost";
  const url = new URL(request.url || "", `https://${host}`);
  return url.searchParams.get(key);
}

module.exports = async function handler(request, response) {
  if (startupError) {
    sendJson(response, 500, {
      message: `API startup failed: ${startupError.message}`,
      code: startupError.code || startupError.name
    });
    return;
  }

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    sendJson(response, 405, { message: "Method not allowed." });
    return;
  }

  if (getQueryValue(request, "health") === "1") {
    sendJson(response, 200, {
      ok: true,
      rapidApiConfigured: Boolean(process.env.RAPIDAPI_KEY || process.env.RAPIDAPI_AMAZON_KEY),
      country: process.env.AMAZON_COUNTRY || "US"
    });
    return;
  }

  try {
    const listing = await readAmazonListing(getQueryValue(request, "asin"));
    sendJson(response, 200, listing);
  } catch (error) {
    const status = error instanceof AmazonReadError ? error.statusCode : 500;
    sendJson(response, status, {
      message: error.message || "Unexpected server error.",
      url: error.url
    });
  }
};
