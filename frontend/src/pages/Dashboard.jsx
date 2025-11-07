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

import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Register.css";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await API.get("/protected");
        setMessage(res.data.message);
      } catch (err) {
        setMessage("You must log in first");
      }
    };
    fetchProtected();
  }, []);

  return (
    <div className="register-container">
      <h2>Dashboard</h2>
      <div className="dashboard-tabs">
        <button className="btn-dashboard">Profile</button>
        <button className="btn-dashboard">Settings</button>
        <button className="btn-dashboard">Payments</button>
        <button className="btn-dashboard">History</button>
      </div>
      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
};

export default Dashboard;
