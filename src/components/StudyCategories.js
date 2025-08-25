// File: src/components/StudyCategories.js
// This page will show different categories inside Study

import React from "react";

export default function StudyCategories() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Page Heading */}
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        Study Categories
      </h1>

      {/* Study category buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={btnStyle}>Mathematics</button>
        <button style={btnStyle}>Computer Science</button>
        <button style={btnStyle}>Social Science</button>
        <button style={btnStyle}>Languages</button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#FF9800",
  color: "white",
  cursor: "pointer",
};
