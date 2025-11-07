/*
ATTRIBUTES:
  Website:SecureBlog Activity
  Author: talia0404
  URL: https://github.com/talia0404/INSY7314/tree/main/SecureBlog%20Activity
  Accessed on: 2025-09-29
  
  Website: Learn React – A Handbook for Beginners
  Author: Nathan Sebhastian
  URL: https://www.freecodecamp.org/news/react-for-beginners-handbook/
  Accessed on: 2025-10-01

  Website: Animation code review
  Author: ChatGPT
  URL: https://chatgpt.com/c/68e7f98d-5520-8320-a2c0-b9208ce345aa
  Accessed on: 2025-10-09

  Website: Basic Registration and Login Form Using React Hook Form
  Author: Geeks for Geeks
  URL: https://www.geeksforgeeks.org/reactjs/react-hook-form-create-basic-reactjs-registration-and-login-form/
  Accessed on: 2025-10-09
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { isStrongPassword } from "../utils/validators";
import "./Register.css"; // switched from Auth.css

const Login = () => {
  const [username, setUsername] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !accountNumber || !password) {
      setError("All fields are required");
      return;
    }

    if (!/^\d+$/.test(accountNumber)) {
      setError("Account number must be numeric");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters and include letters, numbers, and special characters"
      );
      return;
    }

    try {
      const res = await API.post("/auth/login", { username, accountNumber, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="register-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
