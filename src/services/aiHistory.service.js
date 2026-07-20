const AiHistoryModel = require("../models/aiHistory.model");

const createEntry = async (entry) => AiHistoryModel.create(entry);

// Most recent first; capped so a tab's history stays scannable.
const getEntries = async (user, tab) =>
  AiHistoryModel.find(tab ? { user, tab } : { user })
    .sort({ createdAt: -1 })
    .limit(20);

const deleteEntry = async (id, user) =>
  AiHistoryModel.findOneAndDelete({ _id: id, user });

const clearEntries = async (user, tab) =>
  AiHistoryModel.deleteMany(tab ? { user, tab } : { user });

module.exports = { createEntry, getEntries, deleteEntry, clearEntries };
