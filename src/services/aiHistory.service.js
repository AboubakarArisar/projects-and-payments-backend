const AiHistoryModel = require("../models/aiHistory.model");

const createEntry = async (entry) => AiHistoryModel.create(entry);

// Most recent first; capped so a tab's history stays scannable.
const getEntries = async (tab) =>
  AiHistoryModel.find(tab ? { tab } : {})
    .sort({ createdAt: -1 })
    .limit(20);

const deleteEntry = async (id) => AiHistoryModel.findByIdAndDelete(id);

const clearEntries = async (tab) =>
  AiHistoryModel.deleteMany(tab ? { tab } : {});

module.exports = { createEntry, getEntries, deleteEntry, clearEntries };
