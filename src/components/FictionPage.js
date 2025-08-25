// src/components/FictionPage.js
import React from "react";
import "./FictionPage.css"; // custom styling for Fiction categories
import { Link } from "react-router-dom"; // in case you want links later

const FictionPage = () => {
  return (
    <div className="fiction-container">
      {/* Header with icons */}
      <header className="header">
        <h1 className="library-title">📚 Welcome to the Library</h1>
        <div className="icons">
          <span className="icon">👤</span> {/* Profile */}
          <span className="icon">🔔</span> {/* Status/Notifications */}
          <span className="icon">🛒</span> {/* Cart */}
        </div>
      </header>

      {/* Categories for Fiction */}
      <h2 className="page-title">Fiction Categories</h2>
      <div className="categories-grid">
        <div className="category-card">Fantasy</div>
        <div className="category-card">Mystery</div>
        <div className="category-card">Romance</div>
        <div className="category-card">Science Fiction</div>
        <div className="category-card">Thriller</div>
        <div className="category-card">Historical</div>
        <div className="category-card">Children</div>
      </div>
    </div>
  );
};

export default FictionPage;
