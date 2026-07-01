// models/transaction.model.js

const mongoose = require("mongoose");

const TransactionEntrySchema = new mongoose.Schema({
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
    required: true,
  },
});

module.exports = mongoose.model("TransactionEntry", TransactionEntrySchema);
