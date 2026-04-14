// File: src/components/NonnonfictionPage.js
// ==================================================
// PURPOSE:
// - Display all NonFictionPage.css categories after clicking "NonFiction" on the dashboard
// - Clicking on a category navigates to /nonnonfiction/:category handled by NonnonfictionCategories.js

import React from "react";
import { useNavigate } from "react-router-dom";
import API_URL from './config';
import "./NonFictionPage.css"; // CSS file for styling
import dashboardBg from "./image/dashboard-bg.jpg";

export default function NonFictionPage() {
  const navigate = useNavigate();

  // List of nonfiction categories
  const categories = [
   "Biography",
    "History",
    "Science",
    "Self-Help",
    "True Crime",
    "Travel",
    "Philosophy",
  ];

  return (
    <div
      className="nonfiction-container"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Page heading */}
      <h2 className="nonfiction-page-title">Non Fiction</h2>

      {/* Grid of categories */}
      <div className="nonfiction-category-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="nonfiction-category-card"
            onClick={() =>
              navigate(`/nonfiction/${cat.toLowerCase().replace(/\s+/g, "-")}`)
            } // convert spaces → hyphens
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
