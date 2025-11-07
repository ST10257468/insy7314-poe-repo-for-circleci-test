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

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// Create JWT with user ID in payload
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Register new user
exports.register = async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: errors.array() });
  }

  try {
    // Check if user exists by accountNumber or ID
    const existing = await User.findOne({
      $or: [{ accountNumber }, { idNumber }],
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Account or ID already registered" });
    }

    // Create new user
    const user = await User.create({
      fullName,
      idNumber,
      accountNumber,
      password,
    });

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(201).json({ token, message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { accountNumber, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: errors.array() });
  }

  try {
    const user = await User.findOne({ accountNumber });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
