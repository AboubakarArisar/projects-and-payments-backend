// models/transaction.model.js

const mongoose = require("mongoose");

const TransactionEntrySchema = new mongoose.Schema({
  // Owning account — every query is scoped to this.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  transactionTitle: {
    type: String,
  },
  transactionAmount: {
    type: Number,
  },
  transactionType: {
    type: String,
    enum: ["IN", "OUT"],
  },
  transactionDescription: {
    type: String,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    // Optional: transactions are recorded at the workspace level and are not
    // tied to a specific member in the current UI.
  },
});

module.exports = mongoose.model("TransactionEntry", TransactionEntrySchema);
