// // // // src/components/nonfictionPage.js
// // // import React from "react";
// // // import "./NonnonfictionPage.css"; // custom styling for nonfiction categories
// // // import { Link } from "react-router-dom"; // in case you want links later

// // // const NonnonfictionPage = () => {
// // //   return (
// // //     <div className="nonnonfiction-container">
// // //       {/* Header with icons */}
// // //       <header className="header">
// // //         <h1 className="library-title">📚 Welcome to the Library</h1>
// // //         <div className="icons">
// // //           <span className="icon">👤</span> {/* Profile */}
// // //           <span className="icon">🔔</span> {/* Status/Notifications */}
// // //           <span className="icon">🛒</span> {/* Cart */}
// // //         </div>
// // //       </header>

// // //       {/* Categories for Non nonfiction */}
// // //       <h2 className="page-title">Non nonfiction Categories</h2>
// // //       <div className="categories-grid">
// // //         <div className="category-card">Biographies</div>
// // //         <div className="category-card">Self Help</div>
// // //         <div className="category-card">History</div>
// // //         <div className="category-card">Science nonfiction</div>
// // //         <div className="category-card">Travel</div>
// // //         <div className="category-card">Cookbooks</div>
// // //         <div className="category-card">Philosophy</div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NonnonfictionPage;




// // // ==========================
// // // File: src/components/NonnonfictionPage.js
// // // ==========================
// // // PURPOSE:
// // // - After clicking "Non-nonfiction" on dashboard, show 7 categories
// // // - Clicking a category → /nonnonfiction/:category (NonnonfictionCategories.js)

// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./NonnonfictionPage.css";
// // import dashboardBg from "./image/dashboard-bg.jpg";
// // import TopBar from "./TopBar";
// // import BackButton from "./BackButton";

// // // Reusable card styling
// // const cardStyle = {
// //   width: "200px",
// //   height: "250px",
// //   background: "rgba(0,0,0,0.6)",
// //   borderRadius: "15px",
// //   cursor: "pointer",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   fontSize: "24px",
// //   fontWeight: "bold",
// //   color: "#fff",
// //   transition: "0.3s",
// // };

// // export default function NonnonfictionPage() {
// //   const navigate = useNavigate();

// //   // Using your list (kept "Science nonfiction" as requested)
// //   const categories = [
// //     "Biographies",
// //     "Self Help",
// //     "History",
// //     "Science nonfiction",
// //     "Travel",
// //     "Cookbooks",
// //     "Philosophy",
// //   ];

// //   return (
// //     <div
// //       className="section-page"
// //       style={{ backgroundImage: `url(${dashboardBg})` }}
// //     >
// //       <header className="header">
// //         <h1 className="library-title">📚 Welcome to the Library</h1>
// //         <div className="icons">
// //           <span className="icon" title="Profile">👤</span>
// //           <span className="icon" title="Status">🔔</span>
// //           <span className="icon" title="Cart">🛒</span>
// //         </div>
// //       </header>

// //       <h2 className="page-title">Non-nonfiction Categories</h2>

// //       <div className="category-grid">
// //         {categories.map((cat) => (
// //           <div
// //             key={cat}
// //             className="category-card"
// //             onClick={() => navigate(`/nonnonfiction/${cat.toLowerCase()}`)}
// //           >
// //             {cat}
// //           </div>
// //         ))}
// //       </div>
      
// //             {/* Back button */}
// //             <BackButton />

// //     </div>
// //   );
// // }




// // File: src/components/NonnonfictionPage.js
// // ========================================
// // PURPOSE:
// // - After clicking "Non-nonfiction" on dashboard, show 7 categories
// // - Clicking → /nonnonfiction/:category (NonnonfictionCategories.js)

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import TopBar from "./TopBar";
// import BackButton from "./BackButton";
// import "./NonnonfictionPage.css";
// import dashboardBg from "./image/dashboard-bg.jpg";

// // // Reusable card styling (similar to StudyPage)
// // const cardStyle = {
// //   width: "200px",
// //   height: "250px",
// //   background: "rgba(0,0,0,0.6)",
// //   borderRadius: "15px",
// //   cursor: "pointer",
// //   display: "flex",
// //   justifyContent: "center",
// //   alignItems: "center",
// //   fontSize: "24px",
// //   fontWeight: "bold",
// //   color: "#fff",
// //   transition: "0.3s",
// // };

// export default function NonnonfictionPage() {
//   const navigate = useNavigate();

//   // Non-nonfiction categories
//   const categories = [
//     "Biography",
//     "History",
//     "Science",
//     "Self-Help",
//     "Business",
//     "Travel",
//     "Philosophy",
//   ];

//   return (
//     <div
//       className="nonnonfiction.container"
//       style={{ backgroundImage: `url(${dashboardBg})` }}
//     >
//       {/* TopBar icons */}
//       <TopBar />

//       {/* Page header
//       <header className="header">
//         <h1 className="library-title">📚 Welcome to the Library</h1>
//         <div className="icons">
//           <span className="icon" title="Profile">👤</span>
//           <span className="icon" title="Status">🔔</span>
//           <span className="icon" title="Cart">🛒</span>
//         </div>
//       </header>
//        */}
//       {/* Page title */}
//       <h2 className="page-title">Non-nonfiction</h2>
      
//       {/* Grid of categories */}
//       <div className="category-grid">
//         {categories.map((cat) => (
//           <div
//             key={cat}
//             className="category-card"
//             onClick={() => navigate(`/nonnonfiction/${cat.toLowerCase().replace(/\s+/g, "-")}`)}
//           >
//             {cat}
//           </div>
//         ))}
//       </div>

//       {/* Global Back button */}
//       <BackButton />
//     </div>
//   );
// }




// File: src/components/NonnonfictionPage.js
// ==================================================
// PURPOSE:
// - Display all NonFictionPage.css categories after clicking "NonFiction" on the dashboard
// - Clicking on a category navigates to /nonnonfiction/:category handled by NonnonfictionCategories.js

import React from "react";
import { useNavigate } from "react-router-dom";
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
