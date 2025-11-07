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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { isStrongPassword } from "../utils/validators";
import "./Register.css"; 

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setActive(true), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !idNumber || !accountNumber || !username || !password) {
      setError("All fields are required");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters and include letters, numbers, and special characters");
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
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={`register-container ${active ? "active" : ""}`}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" required />
        </div>
        <div className="form-group">
          <label>ID Number</label>
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="Enter ID number" required />
        </div>
        <div className="form-group">
          <label>Account Number</label>
          <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter account number" required />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

