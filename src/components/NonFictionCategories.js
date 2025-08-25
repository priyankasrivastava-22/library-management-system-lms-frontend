// File: src/components/NonFictionCategories.js
// This page will show different categories inside Non-Fiction

import React from "react";

export default function NonFictionCategories() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Page Heading */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        Non-Fiction Categories
      </h1>

      {/* Non-fiction category buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={btnStyle}>Biography</button>
        <button style={btnStyle}>Self-Help</button>
        <button style={btnStyle}>History</button>
        <button style={btnStyle}>Science</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#2196F3",
  color: "white",
  cursor: "pointer",
};
