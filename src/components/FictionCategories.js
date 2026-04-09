// // File: src/components/FictionCategories.js
// // ==================================================
// // PURPOSE: This component displays books by fiction category.
// // Data is fetched from backend API (future-ready).

// import React, { useState, useEffect } from "react"; // React hooks
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom"; // Routing helpers
// import Book from "./Book"; // Book card component
// import dashboardBg from "./image/dashboard-bg.jpg"; // Background image
// import "./FictionPage.css"; // Page styles

// /* ---------------- CATEGORY LIST (STATIC) ---------------- */
// // These are fixed UI categories (NOT from DB)
// const categoriesList = [
//   "fantasy",
//   "mystery",
//   "romance",
//   "thriller",
//   "historical",
//   "children",
//   "cook",
// ];

// /* ---------------- HELPER: FORMAT CATEGORY NAME ---------------- */
// // Converts "science-fiction" → "Science Fiction"
// const displayName = (key) =>
//   key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// export default function FictionCategories() {
//   const { category } = useParams(); // Get category from URL
//   const navigate = useNavigate(); // Used for dashboard navigation
//   const location = useLocation(); // Used to clear history state

//   const key = (category || "").toLowerCase(); // Normalize category

//   /* ---------------- STATE ---------------- */
//   const [books, setBooks] = useState([]); // Books fetched from backend
//   const [loading, setLoading] = useState(false); // Loading indicator
//   const [error, setError] = useState(null); // Error handling
//   const [cart, setCart] = useState([]); // Cart state (UI only)

//   /* ---------------- FETCH BOOKS FROM BACKEND ---------------- */
//   useEffect(() => {   
//     if (!key) return; // If no category selected, do nothing

//     setLoading(true); // Start loading
//     setError(null); // Reset error

//     // BACKEND API CALL (future)
//     fetch(`http://localhost:5000/api/books?category=${key}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch books"); // Handle HTTP error
//         return res.json(); // Convert response to JSON
//       })
//       .then((data) => {
//         setBooks(data); // Save books from backend
//       })
//       .catch((err) => {
//         setError(err.message); // Save error message
//       })
//       .finally(() => {
//         setLoading(false); // Stop loading
//       });
//   }, [key]); // Re-run when category changes

//   /* ---------------- ADD TO CART ---------------- */
//   const handleAddToCart = (book) => {
//     setCart((prev) => [...prev, book]); // Add book to cart
//     console.log("Added to cart:", book.title); // Debug log
//   };

//   /* ---------------- CLEAR DASHBOARD STATE ---------------- */
//   useEffect(() => {
//     if (location.state?.fromDashboard) {
//       window.history.replaceState({}, document.title); // Clear state
//     }
//   }, [location]);

//   return (
//     <div
//       className="fiction-container"
//       style={{
//         minHeight: "100vh", // Full height
//         backgroundImage: `url(${dashboardBg})`, // Background image
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         color: "#fff",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div className="fiction-overlay" /> {/* Dark overlay */}

//       <div className="fiction-categories-container">
//         <div className="fiction-layout">

//           {/* ---------------- LEFT PANEL ---------------- */}
//           <aside className="fiction-left-panel">
//             <button
//               className="fiction-dashboard-button"
//               onClick={() => navigate("/dashboard")} // Go back to dashboard
//             >
//               Dashboard
//             </button>

//             <h3 className="fiction-left-title">Fiction Categories</h3>

//             <ul className="fiction-left-categories">
//               {categoriesList.map((cat) => (
//                 <li key={cat}>
//                   <Link to={`/fiction/${cat}`} className="fiction-category-link">
//                     {displayName(cat)}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </aside>

//           {/* ---------------- RIGHT CONTENT ---------------- */}
//           <section className="fiction-right-content">
//             <h2 className="fiction-category-title">
//               {key ? `${displayName(key)} Books` : "Select a category"}
//             </h2>

//             {/* LOADING STATE */}
//             {loading && <p>Loading books...</p>}

//             {/* ERROR STATE */}
//             {error && <p style={{ color: "red" }}>{error}</p>}

//             {/* BOOK GRID */}
//             {!loading && !error && (
//               <div className="fiction-book-grid">
//                 {books.map((book, index) => (
//                   <div key={index} className="book-card-wrapper">
//                     <Book book={book} onAddToCart={handleAddToCart} />
//                   </div>
//                 ))}

//                 {/* Empty slots for grid alignment */}
//                 {Array.from({ length: (9 - (books.length % 9)) % 9 }).map(
//                   (_, i) => (
//                     <div key={i} className="fiction-book-slot empty" />
//                   )
//                 )}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Book from "./Book";

export default function FictionCategories() {
  const { category } = useParams(); // e.g., 'fantasy'
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // I'm fetching books for this specific category from my shared backend
    fetch(`http://localhost:5000/api/books?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load books for students", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="category-view">
      <h2>{category.toUpperCase()} Books</h2>
      {loading ? <p>Loading library...</p> : (
        <div className="book-grid">
          {books.length > 0 ? books.map(b => (
            <Book key={b.id} book={b} />
          )) : <p>No books found in this category yet.</p>}
        </div>
      )}
    </div>
  );
}