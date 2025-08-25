// File: src/components/FictionCategories.js
// This page will show different categories inside Fiction

import React from "react";

export default function FictionCategories() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Page Heading */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        Fiction Categories
      </h1>

      {/* Fiction category buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={btnStyle}>Fantasy</button>
        <button style={btnStyle}>Mystery</button>
        <button style={btnStyle}>Romance</button>
        <button style={btnStyle}>Thriller</button>
      </div>
    </div>
  );
}

// Inline button style for simplicity
const btnStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};
