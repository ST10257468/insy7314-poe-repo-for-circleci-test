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
const {
  createPayment,
  listPayments,
  getPayments,
  getPayment, 
  processPayment,
  deletePayment
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Create a new payment
router.post("/", protect, createPayment);

// List all payments
router.get("/", protect, requireRole(["staff", "auditor", "admin"]), listPayments);

// View one payment
router.get("/:paymentId", protect, requireRole(["staff", "auditor", "admin"]), getPayment);

// Process payment
router.put("/:paymentId/process", protect, requireRole(["staff", "admin"]), processPayment);

// Delete payment
router.delete("/:paymentId", protect, requireRole(["admin"]), deletePayment);

module.exports = router;

