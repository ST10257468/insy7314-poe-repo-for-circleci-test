/*
ATTRIBUTES:
  Website: JWT MongoDB integration steps
  Author: ChatGPT
  URL: https://chatgpt.com/c/68e7a64f-e470-832d-8038-d916ae7595b3
  Accessed on: 2025-10-09
*/
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  recipientAccount: { type: String, required: true },
  recipientSWIFT: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
