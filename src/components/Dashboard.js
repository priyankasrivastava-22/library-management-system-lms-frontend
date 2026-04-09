// File: src/components/Dashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./image/bg.jpg";

export default function Dashboard() {

  const navigate = useNavigate();

  // check if user is logged in
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    // if no user found, redirect to login page
    if (!storedUser) {
      navigate("/");
    }

  }, [navigate]);


  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >

      {/* background overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
        }}
      />

      {/* main content */}
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

        {/* left side text */}
        <div
          style={{
            flex: 1,
            fontSize: "48px",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            fontFamily: "'Georgia', serif",
            paddingLeft: "40px",
          }}
        >
          Welcome to the Library
        </div>

        {/* right side navigation circles */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            paddingLeft: "230px",
          }}
        >

          {/* Fiction */}
          <div
            onClick={() => navigate("/fiction")}
            style={circleStyle}
          >
            Fiction
          </div>

          {/* Non-Fiction */}
          <div
            onClick={() => navigate("/nonfiction")}
            style={circleStyle}
          >
            Non-Fiction
          </div>

          {/* Study */}
          <div
            onClick={() => navigate("/study")}
            style={circleStyle}
          >
            Study
          </div>

        </div>
      </div>
    </div>
  );
}


// reusable style for circles
const circleStyle = {
  width: "170px",
  height: "170px",
  background: "rgba(255,255,255,0.2)",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "22px",
  fontWeight: "bold",
  cursor: "pointer",
  color: "#fff",
  backdropFilter: "blur(4px)",
  transition: "0.3s",
};