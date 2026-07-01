// services/transaction.services.js

const TransactionEntryModel = require("../models/transaction.model");

const createTransactionEntry = async (title, amount, type, description) => {
  try {
    const transactionEntry = new TransactionEntryModel({
      transactionTitle: title,
      transactionAmount: amount,
      transactionType: type,
      transactionDescription: description,
    });

    await transactionEntry.save();

    return transactionEntry;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating transaction entry");
  }
};

const getAllTransactionEntries = async () => {
  try {
    const transactions = await TransactionEntryModel.find({});
    return transactions;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching transaction entries");
  }
};

module.exports = {
  createTransactionEntry,
  getAllTransactionEntries,
};
