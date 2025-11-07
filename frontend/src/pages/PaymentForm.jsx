/*
ATTRIBUTES:
    Website: JWT MongoDB integration steps
    Author: ChatGPT
    URL: https://chatgpt.com/c/68e7a64f-e470-832d-8038-d916ae7595b3
    Accessed on: 2025-10-09

    Website: Best 4 Swift alternatives for cross-border payments in 2024
    Author: BVNK
    URL: https://bvnk.com/blog/swift-alternatives
    Accessed on: 2025-10-10

*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css"; //style
import "./Animation.css"; // animation for login and register pages
import { isValidEmail, isStrongPassword } from "../utils/validators";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  // animation
  useEffect(() => {
    setActive(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop full page reload
    setError("");

    // Basic validation
    if (!fullName || !idNumber || !accountNumber || !username || !password) {
      setError("All fields are required");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters with letters, numbers, and special characters"
      );
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        fullName,
        idNumber,
        accountNumber,
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // redirect after success
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={`container ${active ? "active" : ""}`}>
      <div className="form-box Register animation">
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>ID Number</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;