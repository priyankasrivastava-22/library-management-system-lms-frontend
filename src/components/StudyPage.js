// File: src/components/StudyPage.js
// ==================================================
// PURPOSE:
// - Display all Study categories after clicking "Study" on the dashboard
// - Clicking on a category navigates to /study/:category handled by StudyCategories.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudyPage.css"; // CSS file for styling
import dashboardBg from "./image/dashboard-bg.jpg";
import API_URL from '../config';
export default function StudyPage() {
  const navigate = useNavigate();

  // List of Study categories
  const categories = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    // "Computer Science",
    "Engineering",
    "Economics",
    "Law"
  ];

  return (
    <div
      className="study-container"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Page heading */}
      <h2 className="study-page-title">Study</h2>

      {/* Grid of categories */}
      <div className="study-category-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="study-category-card"
            onClick={() =>
              navigate(`/study/${cat.toLowerCase().replace(/\s+/g, "-")}`)
            } // convert spaces → hyphens
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
