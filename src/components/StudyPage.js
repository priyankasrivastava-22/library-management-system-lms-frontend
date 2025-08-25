// src/components/FictionPage.js
import React from "react";
import "./StudyPage.css"; // custom styling for Fiction categories
import { Link } from "react-router-dom"; // in case you want links later

const StudyPage = () => {
  return (
    <div className="study-container">
      {/* Header with icons */}
      <header className="header">
        <h1 className="library-title">📚 Welcome to the Library</h1>
        <div className="icons">
          <span className="icon">👤</span> {/* Profile */}
          <span className="icon">🔔</span> {/* Status/Notifications */}
          <span className="icon">🛒</span> {/* Cart */}
        </div>
      </header>

      {/* Categories for Study */}
      <h2 className="page-title">Study Categories</h2>
      <div className="categories-grid">
        <div className="category-card">Mathematics</div>
        <div className="category-card">Physics</div>
        <div className="category-card">Chemistry</div>
        <div className="category-card">Biology</div>
        <div className="category-card">Computer Science</div>
        <div className="category-card">Law</div>
        <div className="category-card">Medicines</div>
      </div>
    </div>
  );
};

export default StudyPage;
