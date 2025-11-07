/*
ATTRIBUTES:
    Website:SecureBlog Activity
    Author: talia0404
    URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
    Accessed on: 2025-09-29

*/

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { registerRules, loginRules } = require("../utils/validator");
const rateLimit = require("express-rate-limit");

//brute-force limiter for login
const loginLimit = rateLimit({ windowMs: 10 * 60 * 1000, max: 20});

router.post("/register", registerRules, register);
router.post("/login", loginRules, login);

module.exports = router;

