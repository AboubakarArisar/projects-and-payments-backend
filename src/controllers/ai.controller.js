const aiServices = require("../services/ai.service");
const historyServices = require("../services/aiHistory.service");

// Shared error handling — keeps the missing-key path clean across all handlers.
const handle = (res, error, message) => {
  console.error(error);
  if (error.message === "GEMINI_API_KEY is not set") {
    return res.status(503).json({ error: "AI is not configured" });
  }
  res.status(500).json({ error: message });
};

// Feature 1 — Client Requirement Analyzer
const analyzeRequirements = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }
    res.json(await aiServices.analyzeRequirements(text));
  } catch (error) {
    handle(res, error, "Failed to analyze requirements");
  }
};

// Feature 2 — Proposal Generator
const generateProposal = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }
    res.json(await aiServices.generateProposal(text));
  } catch (error) {
    handle(res, error, "Failed to generate proposal");
  }
};

// Feature 3 — Fiverr / Upwork Gig Generator
const generateGig = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }
    res.json(await aiServices.generateGig(text));
  } catch (error) {
    handle(res, error, "Failed to generate gig");
  }
};

// Feature 4 — Professional Client Reply Generator
const generateReply = async (req, res) => {
  try {
    const { scenario, tone, context } = req.body;
    if (!scenario || !tone) {
      return res.status(400).json({ error: "scenario and tone are required" });
    }
    res.json(await aiServices.generateReply({ scenario, tone, context }));
  } catch (error) {
    handle(res, error, "Failed to generate reply");
  }
};

// Feature 5 — Meeting Notes Summarizer
const summarizeNotes = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }
    res.json(await aiServices.summarizeNotes(text));
  } catch (error) {
    handle(res, error, "Failed to summarize notes");
  }
};

/* ── Generation history (per tab) ─────────────────────────────────── */

const saveHistory = async (req, res) => {
  try {
    const { tab, title, input, data } = req.body;
    if (!tab || data === undefined) {
      return res.status(400).json({ error: "tab and data are required" });
    }
    res.status(201).json(await historyServices.createEntry({ tab, title, input, data }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save history" });
  }
};

const getHistory = async (req, res) => {
  try {
    res.json(await historyServices.getEntries(req.query.tab));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load history" });
  }
};

const deleteHistory = async (req, res) => {
  try {
    await historyServices.deleteEntry(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete history entry" });
  }
};

const clearHistory = async (req, res) => {
  try {
    await historyServices.clearEntries(req.query.tab);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to clear history" });
  }
};

module.exports = {
  analyzeRequirements,
  generateProposal,
  generateGig,
  generateReply,
  summarizeNotes,
  saveHistory,
  getHistory,
  deleteHistory,
  clearHistory,
};
