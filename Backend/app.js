/*
ATTRIBUTES:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29

  Website: Fix MongoDB error
  Author: ChatGPT
  URL: https://chatgpt.com/share/68e7e4fb-f4c0-8006-a2f7-014e3eba16d9
  Accessed on: 2025-10-08

  Website: JWT MongoDB integration steps
  Author: ChatGPT
  URL: https://chatgpt.com/c/68e7a64f-e470-832d-8038-d916ae7595b3
  Accessed on: 2025-10-09
*/

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Parse JSON including CSP reports
app.use(express.json({ type: ["application/json", "application/csp-report"] }));

// Enable Helmet for security headers
app.use(helmet());

// CORS setup to allow frontend requests
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // new payments routes
const { protect } = require("./middleware/authMiddleware");

app.use("/api/auth", authRoutes);
app.use("/api/payments", protect, paymentRoutes); // protected payments routes

// Example protected test route
app.get("/api/protected", protect, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No user info found in token" });
  }
  res.json({
    message: `Welcome, user ${req.user.id}!`,
    timestamp: new Date(),
  });
});

// Content Security Policy
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "https://apis.google.com"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  imgSrc: ["'self'", "data:"],
  connectSrc: ["'self'", "https://localhost:5000"], // backend API
  frameAncestors: ["'none'"], // prevents clickjacking
  upgradeInsecureRequests: [],
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      ...cspDirectives,
      "report-uri": ["/csp-report"],
    },
    reportOnly: process.env.NODE_ENV !== "production",
  })
);

// CSP violation reporting endpoint
app.post("/csp-report", (req, res) => {
  console.log("CSP violation report:", JSON.stringify(req.body, null, 2));
  res.sendStatus(204);
});

// Root route
app.get("/", (req, res) => {
  res.send("Secure Blog API running");
});

/* Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SecureBlog API running at http://localhost:${PORT}`);
  console.log(
    `CSP mode: ${
      process.env.NODE_ENV !== "production"
        ? "REPORT-ONLY (dev)"
        : "ENFORCED (prod)"
    }`
  );
});*/

module.exports = app;
