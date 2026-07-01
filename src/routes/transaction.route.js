const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// POST /transactions
router.post("/transactions", transactionController.createTransaction);

// GET /transactions
router.get("/transactions", transactionController.getAllTransactions);

module.exports = router;
