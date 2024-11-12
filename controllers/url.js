const shortid = require("shortid");
const URL = require("../models/url");

async function handleNewUrlGenerator(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid.generate(); // Generates a unique short ID

  // Create a new URL entry in the database
  const newUrl = await URL.create({
    shortId: shortID, // Ensure field names match your schema in the model
    redirecturl: body.url,
    visitHistory: [],
  });

  return res.json({ id: newUrl.shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleNewUrlGenerator,
  handleGetAnalytics,
};
