/*
ATTRIBUTES:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29

  Website: JWT MongoDB integration steps
  Author: ChatGPT
  URL: https://chatgpt.com/c/68e7a64f-e470-832d-8038-d916ae7595b3
  Accessed on: 2025-10-09
*/

const express = require("express");
const router = express.Router();
const { createPayment, getPayments } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

// Create a new payment
router.post("/", protect, createPayment);

// Get all payments 
router.get("/", protect, getPayments);

module.exports = router;
