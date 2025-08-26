// // src/components/FictionPage.js
// import React from "react";
// import "./NonFictionPage.css"; // custom styling for Fiction categories
// import { Link } from "react-router-dom"; // in case you want links later

// const NonFictionPage = () => {
//   return (
//     <div className="nonfiction-container">
//       {/* Header with icons */}
//       <header className="header">
//         <h1 className="library-title">📚 Welcome to the Library</h1>
//         <div className="icons">
//           <span className="icon">👤</span> {/* Profile */}
//           <span className="icon">🔔</span> {/* Status/Notifications */}
//           <span className="icon">🛒</span> {/* Cart */}
//         </div>
//       </header>

//       {/* Categories for Non Fiction */}
//       <h2 className="page-title">Non Fiction Categories</h2>
//       <div className="categories-grid">
//         <div className="category-card">Biographies</div>
//         <div className="category-card">Self Help</div>
//         <div className="category-card">History</div>
//         <div className="category-card">Science Fiction</div>
//         <div className="category-card">Travel</div>
//         <div className="category-card">Cookbooks</div>
//         <div className="category-card">Philosophy</div>
//       </div>
//     </div>
//   );
// };

// export default NonFictionPage;




// ==========================
// File: src/components/NonFictionPage.js
// ==========================
// PURPOSE:
// - After clicking "Non-Fiction" on dashboard, show 7 categories
// - Clicking a category → /nonfiction/:category (NonFictionCategories.js)

import React from "react";
import { useNavigate } from "react-router-dom";
import "./NonFictionPage.css";
import dashboardBg from "./image/dashboard-bg.jpg";
import TopBar from "./TopBar";
import BackButton from "./BackButton";

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

export default function NonFictionPage() {
  const navigate = useNavigate();

  // Using your list (kept "Science Fiction" as requested)
  const categories = [
    "Biographies",
    "Self Help",
    "History",
    "Science Fiction",
    "Travel",
    "Cookbooks",
    "Philosophy",
  ];

  return (
    <div
      className="section-page"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      <header className="header">
        <h1 className="library-title">📚 Welcome to the Library</h1>
        <div className="icons">
          <span className="icon" title="Profile">👤</span>
          <span className="icon" title="Status">🔔</span>
          <span className="icon" title="Cart">🛒</span>
        </div>
      </header>

      <h2 className="page-title">Non-Fiction Categories</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="category-card"
            onClick={() => navigate(`/nonfiction/${cat.toLowerCase()}`)}
          >
            {cat}
          </div>
        ))}
      </div>
      
            {/* Back button */}
            <BackButton />

    </div>
  );
}
