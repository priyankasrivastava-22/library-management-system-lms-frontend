// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Book from "./Book"; 
// import dashboardBg from "./image/dashboard-bg.jpg";
// import "./NonFictionPage"; // Using the main CSS for consistent UI styling

// const nonNonFictionCategoriesList = [
//   "biography", "history", "science", 
//   "self-help", "true crime", "philosophy", "travel"
// ];

// const displayName = (key) =>
//   key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// export default function NonFictionCategories() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const key = (category || "").toLowerCase();
//   const normalizedKey = key.replace(/-/g, " ");

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [issuedCount, setIssuedCount] = useState(0);

  // 1. Fetch Books and also check user's current borrowing status
//   useEffect(() => {
//     if (!key) return;
//     setLoading(true);

    // Get user from localStorage to find their ID
//     const user = JSON.parse(localStorage.getItem("user") || "{}");

//     // Fetch books filtered specifically for Non-NonFiction
//     fetch(`http://localhost:5000/api/books`)
//       .then((res) => res.json())
//       .then((data) => {
//         const bookList = data.books || [];
//         const filtered = bookList.filter(b => 
//           b.section?.toLowerCase() === "nonnonfiction" && 
//           b.category?.toLowerCase() === normalizedKey
//         );
//         setBooks(filtered);
//       })
//       .catch(err => console.error("Error fetching books:", err))
//       .finally(() => setLoading(false));

//     if (user.id) {
//       fetch(`http://localhost:5000/api/transactions/user/${user.id}`)
//         .then(res => res.json())
//         .then(data => setIssuedCount(data.length))
//         .catch(err => console.error("Error fetching issue count:", err));
//     }
//   }, [key, normalizedKey]);

//   const handleAddToCart = (book) => {
//     const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
//     if (currentCart.some(item => item.id === book.id)) {
//       alert(`"${book.title}" is already in your cart.`);
//       return;
//     }
    
//     if (currentCart.length + issuedCount >= 5) {
//       alert("Library Limit: You can only have 5 books total (Cart + Issued).");
//       return;
//     }

//     const updatedCart = [...currentCart, book];
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("storage"));
//     alert(`${book.title} added to cart!`);
//   };

//   return (
//     <div className="nonfiction-container" style={{ backgroundImage: `url(${dashboardBg})` }}>
//       <div className="nonfiction-layout">
//         <aside className="nonfiction-left-panel">
//           <button className="nonfiction-dashboard-button" onClick={() => navigate("/dashboard")}>
//             Dashboard
//           </button>
          
//           <h3 className="nonfiction-left-title">Non-NonFiction</h3>
          
//           <ul className="nonfiction-left-categories">
//             {nonNonFictionCategoriesList.map((cat) => (
//               <li key={cat}>
//                 <Link to={`/non-nonfiction/${cat}`} className="nonfiction-category-link">
//                   {displayName(cat)}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         <section className="nonfiction-right-content">
//           <h2 className="nonfiction-category-title">
//             {key ? `${displayName(key)} Books` : "Select a Category"}
//           </h2>
          
//           {loading && <p>Searching the Non-NonFiction library...</p>}
          
//           <div className="nonfiction-book-grid">
//             {books.map((book, index) => (
//               <div key={index} className="book-card-wrapper">
//                 <Book book={book} onAddToCart={handleAddToCart} />
//               </div>
//             ))}
            
//             {/* Maintains the 3-column grid structure */}
//             {Array.from({ length: (9 - (books.length % 9)) % 9 }).map((_, i) => (
//               <div key={i} className="nonfiction-book-slot empty" />
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }










// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Book from "./Book"; 
// import dashboardBg from "./image/dashboard-bg.jpg";
// import "./NonFictionPage.css"; // Use the same CSS for consistent UI

// const nonNonFictionCategoriesList = [
//   "biography", "history", "science", "self-help", "true crime", "philosophy", "travel"
// ];

// const displayName = (key) =>
//   key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// export default function NonFictionCategories() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const key = (category || "").toLowerCase();
//   const normalizedKey = key.replace(/-/g, " ");

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [issuedCount, setIssuedCount] = useState(0);

//   useEffect(() => {
//     if (!key) return;
//     setLoading(true);

//     const user = JSON.parse(localStorage.getItem("user") || "{}");

//     // Fetch books from the paginated API
//     fetch(`http://localhost:5000/api/books`)
//       .then((res) => res.json())
//       .then((data) => {
//         // Access data.books because the backend now returns an object
//         const bookList = data.books || [];
        
//         // Match "Non-NonFiction" exactly as stored in your SQL script
//         const filtered = bookList.filter(b => 
//           b.section?.toLowerCase() === "non-nonfiction" && 
//           b.category?.toLowerCase() === normalizedKey
//         );
//         setBooks(filtered);
//       })
//       .catch(err => console.error("Error fetching books:", err))
//       .finally(() => setLoading(false));

//     if (user.id) {
//       fetch(`http://localhost:5000/api/transactions/user/${user.id}`)
//         .then(res => res.json())
//         .then(data => setIssuedCount(data.length))
//         .catch(err => console.error("Error fetching issue count:", err));
//     }
//   }, [key, normalizedKey]);

//   const handleAddToCart = (book) => {
//     const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
//     if (currentCart.some(item => item.id === book.id)) {
//       alert(`"${book.title}" is already in your cart.`);
//       return;
//     }
    
//     if (currentCart.length + issuedCount >= 5) {
//       alert("Library Limit: You can only have 5 books total (Cart + Issued).");
//       return;
//     }

//     const updatedCart = [...currentCart, book];
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     window.dispatchEvent(new Event("storage"));
//     alert(`${book.title} added to cart!`);
//   };

//   return (
//     <div className="nonfiction-container" style={{ backgroundImage: `url(${dashboardBg})`, minHeight: "100vh" }}>
//       {/* Added the overlay to match NonFictionCategories UI */}
//       <div className="nonfiction-overlay" /> 

//       <div className="nonfiction-categories-container">
//         <div className="nonfiction-layout">
//           <aside className="nonfiction-left-panel">
//             <button className="nonfiction-dashboard-button" onClick={() => navigate("/dashboard")}>
//               Dashboard
//             </button>
            
//             <h3 className="nonfiction-left-title">Non-NonFiction</h3>
            
//             <ul className="nonfiction-left-categories">
//               {nonNonFictionCategoriesList.map((cat) => (
//                 <li key={cat}>
//                   <Link to={`/non-nonfiction/${cat}`} className="nonfiction-category-link">
//                     {displayName(cat)}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </aside>

//           <section className="nonfiction-right-content">
//             <h2 className="nonfiction-category-title">
//               {key ? `${displayName(key)} Books` : "Select a Category"}
//             </h2>
            
//             {loading && <p>Searching the Non-NonFiction library...</p>}
//             {!loading && books.length === 0 && key && <p>No books available in this category yet.</p>}
            
//             <div className="nonfiction-book-grid">
//               {books.map((book, index) => (
//                 <div key={index} className="book-card-wrapper">
//                   <Book book={book} onAddToCart={handleAddToCart} />
//                 </div>
//               ))}
              
//               {/* Empty slots to maintain grid alignment */}
//               {Array.from({ length: (9 - (books.length % 9)) % 9 }).map((_, i) => (
//                 <div key={i} className="nonfiction-book-slot empty" />
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }







// // File: src/components/NonFictionCategories.js
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
// import Book from "./Book"; 
// import dashboardBg from "./image/dashboard-bg.jpg"; 
// import "./NonFictionPage.css";

// const categoriesList = [
//    "biography", "history", "science", "self-help", "true crime", "philosophy", "travel"
// ];

// const displayName = (key) =>
//   key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// export default function NonFictionCategories() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const key = (category || "").toLowerCase();
//   const normalizedKey = key.replace(/-/g, " "); 

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(null);
//   const [issuedCount, setIssuedCount] = useState(0); // Track books already borrowed

//   // 1. Fetch Books and also check user's current borrowing status
//   useEffect(() => {
//     if (!key) return;

//     setLoading(true);
//     setError(null);

//     // Get user from localStorage to find their ID
//     const user = JSON.parse(localStorage.getItem("user") || "{}");

//     // Fetch books
//     fetch(`http://localhost:5000/api/books`)
//       .then((res) => res.json())
//       .then((data) => {
//         const bookList = data.books || [];
//         const filteredBooks = bookList.filter(b => 
//           b.section?.toLowerCase() === "nonfiction" && 
//           b.category?.toLowerCase() === normalizedKey
//         );
//         setBooks(filteredBooks);
//       })
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));

//     // Fetch how many books the user has ALREADY issued from the database
//     if (user.id) {
//       fetch(`http://localhost:5000/api/transactions/user/${user.id}`)
//         .then(res => res.json())
//         .then(data => setIssuedCount(data.length))
//         .catch(err => console.error("Error fetching issue count:", err));
//     }
//   }, [key, normalizedKey]);

//   /* ---------------- UPDATED: ADD TO CART LOGIC ---------------- */
//   const handleAddToCart = (book) => {
//     // 1. Get current cart from storage
//     const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

//     // 2. RULE: Only one of a particular book
//     const isDuplicate = currentCart.some(item => item.id === book.id);
//     if (isDuplicate) {
//       alert(`You already have "${book.title}" in your cart.`);
//       return;
//     }

//     // 3. RULE: Total 5 books limit (Cart + Already Issued)
//     if (currentCart.length + issuedCount >= 5) {
//       alert("Limit Reached: You can only have a total of 5 books (including issued books).");
//       return;
//     }

//     // 4. Save to localStorage
//     const updatedCart = [...currentCart, book];
//     localStorage.setItem("cart", JSON.stringify(updatedCart));

//     // 5. Trigger a 'storage' event so the TopBar updates immediately
//     window.dispatchEvent(new Event("storage"));
    
//     alert(`${book.title} added to cart!`);
//   };

//   useEffect(() => {
//     if (location.state?.fromDashboard) {
//       window.history.replaceState({}, document.title); 
//     }
//   }, [location]);

//   return (
//     <div
//       className="nonfiction-container"
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${dashboardBg})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         color: "#fff",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <div className="nonnonfiction-overlay" /> 

//       <div className="nonfiction-categories-container">
//         <div className="nonfiction-layout">
//           <aside className="nonfiction-left-panel">
//             <button className="nonfiction-dashboard-button" onClick={() => navigate("/dashboard")}>
//               Dashboard
//             </button>
//             <h3 className="nonfiction-left-title">NonFiction Categories</h3>
//             <ul className="nonfiction-left-categories">
//               {categoriesList.map((cat) => (
//                 <li key={cat}>
//                   <Link to={`/nonfiction/${cat}`} className="nonfiction-category-link">
//                     {displayName(cat)}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </aside>

//           <section className="nonfiction-right-content">
//             <h2 className="nonfiction-category-title">
//               {key ? `${displayName(key)} Books` : "Select a category"}
//             </h2>

//             {loading && <p>Loading books from library...</p>}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {!loading && !error && books.length === 0 && key && <p>No books available in this category yet.</p>}

//             {!loading && !error && (
//               <div className="nonfiction-book-grid">
//                 {books.map((book, index) => (
//                   <div key={index} className="book-card-wrapper">
//                     <Book book={book} onAddToCart={handleAddToCart} />
//                   </div>
//                 ))}
//                 {Array.from({ length: (9 - (books.length % 9)) % 9 }).map((_, i) => (
//                   <div key={i} className="nonfiction-book-slot empty" />
//                 ))}
//               </div>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Book from "./Book"; 
import dashboardBg from "./image/dashboard-bg.jpg"; 
import "./NonFictionPage.css"; // Pointing to the main CSS file for consistency

const nonfictionCategories = [
    "biography", "history", "science", "self-help", "true crime", "philosophy", "travel"
];

const displayName = (key) =>
  key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function NonFictionCategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const key = (category || "").toLowerCase();
  const normalizedKey = key.replace(/-/g, " "); 
  
  const [books, setBooks] = useState([]);
  const [issuedCount, setIssuedCount] = useState(0);

  useEffect(() => {
    if (!key) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    fetch(`http://localhost:5000/api/books`)
      .then((res) => res.json())
      .then((data) => {
        const bookList = data.books || [];
        const filtered = bookList.filter(b => 
          b.section?.toLowerCase() === "nonfiction" && 
          b.category?.toLowerCase() === key.replace(/-/g, " ")
        );
        setBooks(filtered);
      });

    if (user.id) {
      fetch(`http://localhost:5000/api/transactions/user/${user.id}`)
        .then(res => res.json())
        .then(data => setIssuedCount(data.length));
    }
  }, [key]);

  const handleAddToCart = (book) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (currentCart.some(item => item.id === book.id)) {
      alert("This book is already in your selection.");
      return;
    }
    if (currentCart.length + issuedCount >= 5) {
      alert("Library Rule: Maximum of 5 books allowed per student.");
      return;
    }
    localStorage.setItem("cart", JSON.stringify([...currentCart, book]));
    window.dispatchEvent(new Event("storage"));
    alert("Book added to your library cart.");
  };

  return (
    <div className="nonfiction-container" style={{ backgroundImage: `url(${dashboardBg})`, backgroundSize: 'cover' }}>
      <div className="nonfiction-layout">
        <aside className="nonfiction-left-panel">
          {/* ADDED CLASSNAME HERE */}
          <button className="nonfiction-dashboard-button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <h4 className="nonfiction-left-title">Non Fiction Categories</h4>
          <ul className="nonfiction-left-categories">
            {nonfictionCategories.map((cat) => (
              <li key={cat}>
                {/* ADDED CLASSNAME HERE */}
                <Link to={`/nonfiction/${cat}`} className="nonfiction-category-link">
                  {displayName(cat)}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="nonfiction-right-content">
          <h2 className="nonfiction-category-title">{displayName(key)} Books</h2>
          <div className="nonfiction-book-grid">
            {books.map((book, index) => (
              <div key={index} className="book-card-wrapper">
                <Book book={book} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}