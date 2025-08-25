// File: src/components/Login.js
import React, { useState } from "react";
import bgImage from "./image/bg.jpg"; // background image for login
import { useNavigate } from "react-router-dom"; // navigation hook
import "./Login.css";

export default function Login({ onLogin }) {
  // React state variables
  const [showForm, setShowForm] = useState(false); // Show login form or circle
  const [email, setEmail] = useState("");          // Email input
  const [password, setPassword] = useState("");    // Password input
  const [error, setError] = useState("");          // Error message

  const navigate = useNavigate(); // ✅ Create navigate instance here

  // Handle login form submit
  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      // ✅ If both fields are filled, redirect to dashboard
      setError(""); 
      // onLogin(email, password); // Optional: call parent login logic
      navigate("/dashboard"); // go to dashboard
    } else {
      // ❌ Show error if inputs are empty
      setError("Please enter email and password.");
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {!showForm ? (
        // 🔵 Step 1: Show circle first
        <div className="login-circle-container">
          <div
            className="login-circle"
            onClick={() => setShowForm(true)}
          >
            Login
          </div>
        </div>
      ) : (
        // 📝 Step 2: Show form after clicking circle
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Show error message if exists */}
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
