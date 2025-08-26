// File: src/components/FictionPage.js
// ==================================================
// PURPOSE:
// - Display all Fiction categories after clicking "Fiction" on the dashboard
// - Clicking on a category navigates to /fiction/:category handled by FictionCategories.js

import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import "./FictionPage.css"; // CSS file for styling
import dashboardBg from "./image/dashboard-bg.jpg";

export default function FictionPage() {
  const navigate = useNavigate();

  // List of Fiction categories
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
      className="fiction-container"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Top bar icons */}
      <TopBar />

      {/* Page title */}
      <h2 className="page-title">Fiction</h2>

      {/* Grid of categories */}
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="category-card"
            onClick={() =>
              navigate(`/fiction/${cat.toLowerCase().replace(/\s+/g, "-")}`)
            } // convert spaces → hyphens
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Global back button */}
      <BackButton />
    </div>
  );
}
