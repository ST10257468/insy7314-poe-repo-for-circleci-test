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

const Payment = require("../models/Payment");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { amount, currency, provider, recipientAccount, recipientSWIFT } = req.body;
    const payment = await Payment.create({
      customer: req.user.id,
      amount,
      currency,
      provider,
      recipientAccount,
      recipientSWIFT,
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all payments (for staff)
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("customer", "fullName accountNumber");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
