// services/transaction.services.js

const TransactionEntryModel = require("../models/transaction.model");

const createTransactionEntry = async (user, title, amount, type, description) => {
  try {
    const transactionEntry = new TransactionEntryModel({
      user,
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

const getAllTransactionEntries = async (user) => {
  try {
    const transactions = await TransactionEntryModel.find({ user });
    return transactions;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching transaction entries");
  }
};

const deleteTransactionEntry = async (id, user) => {
  const deleted = await TransactionEntryModel.findOneAndDelete({ _id: id, user });
  if (!deleted) {
    throw new Error("Transaction not found");
  }
  return { message: "Transaction deleted successfully" };
};

module.exports = {
  createTransactionEntry,
  getAllTransactionEntries,
  deleteTransactionEntry,
};
