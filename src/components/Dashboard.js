// File: src/components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ helps navigation
import { FaUserCircle, FaBell, FaShoppingCart } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate(); // hook for navigation

  return (
    <div 
      style={{ 
        backgroundImage: "url('/dashboard-bg.jpg')", // ✅ set your dashboard background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white"
      }}
    >
      {/* ✅ Top Bar with Profile, Notification, and Cart */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <FaUserCircle size={28} style={{ marginRight: "15px", cursor: "pointer" }} />
        <FaBell size={28} style={{ marginRight: "15px", cursor: "pointer" }} />
        <FaShoppingCart size={28} style={{ cursor: "pointer" }} />
      </div>

      {/* ✅ Welcome Message */}
      <h1 style={{ textAlign: "center", fontSize: "40px", fontWeight: "bold", marginTop: "20px" }}>
        📚 Welcome to the Library
      </h1>

      {/* ✅ Category Cards */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", gap: "40px" }}>
        
        {/* Fiction Card */}
        <div 
          onClick={() => navigate("/fiction")} 
          style={{
            width: "200px",
            height: "250px",
            background: "rgba(0,0,0,0.6)",
            borderRadius: "15px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Fiction
        </div>

        {/* Non-Fiction Card */}
        <div 
          onClick={() => navigate("/nonfiction")} 
          style={{
            width: "200px",
            height: "250px",
            background: "rgba(0,0,0,0.6)",
            borderRadius: "15px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Non-Fiction
        </div>

        {/* Study Card */}
        <div 
          onClick={() => navigate("/study")} 
          style={{
            width: "200px",
            height: "250px",
            background: "rgba(0,0,0,0.6)",
            borderRadius: "15px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          Study
        </div>

      </div>
    </div>
  );
}
