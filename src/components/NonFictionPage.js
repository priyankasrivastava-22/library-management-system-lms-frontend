// src/components/FictionPage.js
import React from "react";
import "./NonFictionPage.css"; // custom styling for Fiction categories
import { Link } from "react-router-dom"; // in case you want links later

const NonFictionPage = () => {
  return (
    <div className="nonfiction-container">
      {/* Header with icons */}
      <header className="header">
        <h1 className="library-title">📚 Welcome to the Library</h1>
        <div className="icons">
          <span className="icon">👤</span> {/* Profile */}
          <span className="icon">🔔</span> {/* Status/Notifications */}
          <span className="icon">🛒</span> {/* Cart */}
        </div>
      </header>

      {/* Categories for Non Fiction */}
      <h2 className="page-title">Non Fiction Categories</h2>
      <div className="categories-grid">
        <div className="category-card">Biographies</div>
        <div className="category-card">Self Help</div>
        <div className="category-card">History</div>
        <div className="category-card">Science Fiction</div>
        <div className="category-card">Travel</div>
        <div className="category-card">Cookbooks</div>
        <div className="category-card">Philosophy</div>
      </div>
    </div>
  );
};

export default NonFictionPage;
