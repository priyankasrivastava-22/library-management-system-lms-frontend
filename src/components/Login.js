import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from '../config';
import "./Login.css";
import bgImage from "./image/bg.jpg";
import { FaUserCircle } from "react-icons/fa";

export default function Login() {
  const [showForm, setShowForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    try {
      const res = await fetch('${API_URL}/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (err) {
      setError("Server not reachable");
    }
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch('${API_URL}/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // alert("Registered successfully. Please login.");
      setError("Registered successfully. Please login");

      setIsRegister(false);
      setError("");

    } catch (err) {
      setError("Server not reachable");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "90vh",
          padding: "0 50px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* left text */}
        <div style={{ color: "white", fontSize: "48px", marginLeft: "150px" }}>
          Welcome to the Library
        </div>

        {/* right side */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center"}}>

          {!showForm ? (
            <div className="login-circle" onClick={() => setShowForm(true)}>
              <FaUserCircle />
            </div>
          ) : (
            <form
              className="login-form"
              onSubmit={isRegister ? handleRegister : handleLogin}
            >
              <h2>{isRegister ? "Register" : "Login"}</h2>

              {isRegister && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="error-msg">{error}</p>}

              <button type="submit">
                {isRegister ? "Register" : "Login"}
              </button>

              {/* toggle */}
              <p
                style={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
              >
                {isRegister
                  ? "Already have account? Login"
                  : "New user? Register"}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}