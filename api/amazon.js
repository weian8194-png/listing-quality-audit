const { AmazonReadError, readAmazonListing } = require("../amazon-reader");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    const listing = await readAmazonListing(request.query.asin);
    response.status(200).json(listing);
  } catch (error) {
    const status = error instanceof AmazonReadError ? error.statusCode : 500;
    response.status(status).json({
      message: error.message || "Unexpected server error.",
      url: error.url
    });
  }
};
