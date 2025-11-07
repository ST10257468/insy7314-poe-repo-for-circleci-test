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
*/

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const { validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "1h";

//  Create a single reusable token generator
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
};

// Register new user
exports.register = async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.array(),
    });
  }

  try {
    // Check if user already exists
    const existing = await User.findOne({
      $or: [{ accountNumber }, { idNumber }],
    });
    if (existing) {
      return res.status(400).json({
        message: "Account or ID already registered",
      });
    }

    // Create user
    const user = await User.create({
      fullName,
      idNumber,
      accountNumber,
      password,
    });

    // Generate JWT
    const token = generateToken({ id: user._id, role: "user" });

    res.status(201).json({
      token,
      message: "Registration successful",
    });
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
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.array(),
    });
  }

  try {
    const user = await User.findOne({ accountNumber });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user._id, role: "user" });

    res.json({
      token,
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login employee
exports.loginEmployee = async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    const employee = await Employee.findOne({ employeeId });
    if (!employee || !(await employee.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: employee._id, role: employee.role });

    res.json({
      message: "Login successful",
      token,
      role: employee.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
