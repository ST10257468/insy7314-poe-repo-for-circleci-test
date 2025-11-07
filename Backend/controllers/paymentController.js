/*
ATTRIBUTES:
  Website: SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29

  Website: JWT MongoDB integration steps
  Author: ChatGPT
  URL: https://chatgpt.com/c/68e7a64f-e470-832d-8038-d916ae7595b3
  Accessed on: 2025-10-09

  Website: Employee RBAC Guide
  Author: ChatGPT
  URL: https://chatgpt.com/share/690e2956-8240-8006-8d6e-320e76957905 
  Accessed on: 2025-11-07
*/

const Payment = require("../models/Payment");

// Create a new payment (for customers)
exports.createPayment = async (req, res) => {
  try {
    // Ensure authenticated user is available (req.user injected by middleware)
    if (!req.user || req.user.role !== "user") {
      return res.status(403).json({ message: "Unauthorized: Customer access only" });
    }

    const { amount, currency, provider, recipientAccount, recipientSWIFT } = req.body;

    // Basic validation
    if (!amount || !currency || !provider || !recipientAccount || !recipientSWIFT) {
      return res.status(400).json({ message: "All payment fields are required" });
    }

    // Create payment record
    const payment = await Payment.create({
      customer: req.user.id, // comes from JWT payload
      amount,
      currency,
      provider,
      recipientAccount,
      recipientSWIFT,
      status: "Pending",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (err) {
    console.error("Create Payment Error:", err);
    res.status(500).json({ error: "Server error while creating payment" });
  }
};

// Get all payments (for employees/staff)
exports.getPayments = async (req, res) => {
  try {
    // Only employees or admins can access all payments
    if (!req.user || (req.user.role !== "employee" && req.user.role !== "admin")) {
      return res.status(403).json({ message: "Unauthorized: Staff access only" });
    }

    const payments = await Payment.find()
      .populate("customer", "fullName accountNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: payments.length,
      payments,
    });
  } catch (err) {
    console.error("Get Payments Error:", err);
    res.status(500).json({ error: "Server error while retrieving payments" });
  }
};

// Get payments for a specific customer (optional feature)
exports.getMyPayments = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "user") {
      return res.status(403).json({ message: "Unauthorized: Customer access only" });
    }

    const payments = await Payment.find({ customer: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      count: payments.length,
      payments,
    });
  } catch (err) {
    console.error("Get My Payments Error:", err);
    res.status(500).json({ error: "Server error while retrieving your payments" });
  }
};
