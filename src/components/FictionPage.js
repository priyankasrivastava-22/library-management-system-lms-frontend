// File: src/components/FictionPage.js
// Shows 7 Fiction categories: clicking one goes to /fiction/:category

import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import "./FictionPage.css";
import dashboardBg from "./image/dashboard-bg.jpg";

// Reusable card styling
const cardStyle = {
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
  color: "#fff",
  transition: "0.3s",
};

export default function FictionPage() {
  const navigate = useNavigate();

  // 7 Fiction categories
  const categories = [
    "Fantasy",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "Historical",
    "Children",
  ];

  return (
    <div
      className="section-page"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Header */}
      <header className="header">
        <h1 className="library-title">📚 Welcome to the Library</h1>
        <div className="icons">
          <span className="icon" title="Profile">👤</span>
          <span className="icon" title="Notifications">🔔</span>
          <span className="icon" title="Cart">🛒</span>
        </div>
      </header>

      {/* Page title */}
      <h2 className="page-title">Fiction Categories</h2>

      {/* Grid of 7 categories */}
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="category-card"
            // Navigate to URL param, replace spaces with hyphens
            onClick={() =>
              navigate(`/fiction/${cat.toLowerCase().replace(/\s/g, "-")}`)
            }
          >
            {cat}
          </div>
        ))}
      </div>
           {/* Back button */}
           < BackButton />
    </div>
  );
}
