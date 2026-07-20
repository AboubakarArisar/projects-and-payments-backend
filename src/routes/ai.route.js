const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

// Client Requirement Analyzer — paste a client message, get structured analysis
router.post("/ai/analyze-requirements", aiController.analyzeRequirements);

// Proposal Generator
router.post("/ai/proposal", aiController.generateProposal);

// Fiverr / Upwork Gig Generator
router.post("/ai/gig", aiController.generateGig);

// Professional Client Reply Generator
router.post("/ai/reply", aiController.generateReply);

// Meeting Notes Summarizer
router.post("/ai/meeting-notes", aiController.summarizeNotes);

// Generation history (per tab)
router.post("/ai/history", aiController.saveHistory);
router.get("/ai/history", aiController.getHistory);
router.delete("/ai/history/:id", aiController.deleteHistory);
router.delete("/ai/history", aiController.clearHistory);

module.exports = router;
