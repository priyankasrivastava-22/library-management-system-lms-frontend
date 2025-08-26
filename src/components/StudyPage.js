// // // src/components/FictionPage.js
// // import React from "react";
// // import "./StudyPage.css"; // custom styling for Fiction categories
// // import { Link } from "react-router-dom"; // in case you want links later

// // const StudyPage = () => {
// //   return (
// //     <div className="study-container">
// //       {/* Header with icons */}
// //       <header className="header">
// //         <h1 className="library-title">📚 Welcome to the Library</h1>
// //         <div className="icons">
// //           <span className="icon">👤</span> {/* Profile */}
// //           <span className="icon">🔔</span> {/* Status/Notifications */}
// //           <span className="icon">🛒</span> {/* Cart */}
// //         </div>
// //       </header>

// //       {/* Categories for Study */}
// //       <h2 className="page-title">Study Categories</h2>
// //       <div className="categories-grid">
// //         <div className="category-card">Mathematics</div>
// //         <div className="category-card">Physics</div>
// //         <div className="category-card">Chemistry</div>
// //         <div className="category-card">Biology</div>
// //         <div className="category-card">Computer Science</div>
// //         <div className="category-card">Law</div>
// //         <div className="category-card">Medicines</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudyPage;




// // ==========================
// // File: src/components/StudyPage.js
// // ==========================
// // PURPOSE:
// // - After clicking "Study" on dashboard, show 7 study categories
// // - Clicking → /study/:category (StudyCategories.js)

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import TopBar from "./TopBar";
// import BackButton from "./BackButton";
// import "./StudyPage.css";
// import dashboardBg from "./image/dashboard-bg.jpg";

// // Reusable card styling
// const cardStyle = {
//   width: "200px",
//   height: "250px",
//   background: "rgba(0,0,0,0.6)",
//   borderRadius: "15px",
//   cursor: "pointer",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   fontSize: "24px",
//   fontWeight: "bold",
//   color: "#fff",
//   transition: "0.3s",
// };

// export default function StudyPage() {
//   const navigate = useNavigate();

//   const categories = [
//     "Mathematics",
//     "Physics",
//     "Chemistry",
//     "Biology",
//     "Computer Science",
//     "Law",
//     "Medicines",
//   ];

//   return (
//     <div
//       className="section-page"
//       style={{ backgroundImage: `url(${dashboardBg})` }}
//     >
//       <header className="header">
//         <h1 className="library-title">📚 Welcome to the Library</h1>
//         <div className="icons">
//           <span className="icon" title="Profile">👤</span>
//           <span className="icon" title="Status">🔔</span>
//           <span className="icon" title="Cart">🛒</span>
//         </div>
//       </header>
      
//       {/* Page title */}
//       <h2 className="page-title">Study Categories</h2>
      
//       {/* Grid of 7 categories */}
//       <div className="category-grid">
//         {categories.map((cat) => (
//           <div
//             key={cat}
//             className="category-card"
//             // Navigate to URL param, replace spaces with hyphens
//             onClick={() => navigate(`/study/${cat.toLowerCase()}`)}
//           >
//             {cat}
//           </div>
//         ))}
//       </div>
//             {/* Back button */}
//             <BackButton />
//     </div>
//   );
// }



// File: src/components/StudyPage.js
// ==================================================
// PURPOSE:
// - Display all Study categories after clicking "Study" on the dashboard
// - Clicking on a category navigates to /study/:category handled by StudyCategories.js

import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import "./StudyPage.css";
import dashboardBg from "./image/dashboard-bg.jpg";

export default function StudyPage() {
  const navigate = useNavigate();

  // List of Study categories
  const categories = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Engineering",
    "Economics",
  ];

  return (
    <div
      className="study-container"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Top bar icons */}
      <TopBar />

      {/* Page header
      <header className="header">
        <h1 className="library-title">📚 Welcome to the Library</h1>
      </header> */}

      {/* Page title */}
      <h2 className="page-title">Study</h2>

      {/* Grid of categories */}
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="category-card"
            onClick={() =>
              navigate(`/study/${cat.toLowerCase().replace(/\s+/g, "-")}`)
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
