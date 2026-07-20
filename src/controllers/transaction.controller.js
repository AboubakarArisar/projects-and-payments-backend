const transactionServices = require("../services/transactions.service");

const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, description } = req.body;
    const newTransaction = await transactionServices.createTransactionEntry(
      req.userId,
      title,
      amount,
      type,
      description
    );
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionServices.getAllTransactionEntries(
      req.userId
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const result = await transactionServices.deleteTransactionEntry(
      req.params.id,
      req.userId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  deleteTransaction,
};
