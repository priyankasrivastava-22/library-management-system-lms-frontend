// File: src/components/FictionCategories.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Book from "./Book"; 
import dashboardBg from "./image/dashboard-bg.jpg"; 
import "./FictionPage.css";

const categoriesList = [
  "fantasy", "mystery", "romance", "thriller", 
  "historical", "children", "horror", "cook",
];

const displayName = (key) =>
  key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function FictionCategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const key = (category || "").toLowerCase();
  const normalizedKey = key.replace(/-/g, " "); 

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [issuedCount, setIssuedCount] = useState(0); // Track books already borrowed

  // 1. Fetch Books and also check user's current borrowing status
  useEffect(() => {
    if (!key) return;

    setLoading(true);
    setError(null);

    // Get user from localStorage to find their ID
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Fetch books
    fetch(`http://localhost:5000/api/books`)
      .then((res) => res.json())
      .then((data) => {
        const filteredBooks = data.filter(b => 
          b.section?.toLowerCase() === "fiction" && 
          b.category?.toLowerCase() === normalizedKey
        );
        setBooks(filteredBooks);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    // Fetch how many books the user has ALREADY issued from the database
    if (user.id) {
      fetch(`http://localhost:5000/api/transactions/user/${user.id}`)
        .then(res => res.json())
        .then(data => setIssuedCount(data.length))
        .catch(err => console.error("Error fetching issue count:", err));
    }
  }, [key, normalizedKey]);

  /* ---------------- UPDATED: ADD TO CART LOGIC ---------------- */
  const handleAddToCart = (book) => {
    // 1. Get current cart from storage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 2. RULE: Only one of a particular book
    const isDuplicate = currentCart.some(item => item.id === book.id);
    if (isDuplicate) {
      alert(`You already have "${book.title}" in your cart.`);
      return;
    }

    // 3. RULE: Total 5 books limit (Cart + Already Issued)
    if (currentCart.length + issuedCount >= 5) {
      alert("Limit Reached: You can only have a total of 5 books (including issued books).");
      return;
    }

    // 4. Save to localStorage
    const updatedCart = [...currentCart, book];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 5. Trigger a 'storage' event so the TopBar updates immediately
    window.dispatchEvent(new Event("storage"));
    
    alert(`${book.title} added to cart!`);
  };

  useEffect(() => {
    if (location.state?.fromDashboard) {
      window.history.replaceState({}, document.title); 
    }
  }, [location]);

  return (
    <div
      className="fiction-container"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="fiction-overlay" /> 

      <div className="fiction-categories-container">
        <div className="fiction-layout">
          <aside className="fiction-left-panel">
            <button className="fiction-dashboard-button" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
            <h3 className="fiction-left-title">Fiction Categories</h3>
            <ul className="fiction-left-categories">
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <Link to={`/fiction/${cat}`} className="fiction-category-link">
                    {displayName(cat)}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <section className="fiction-right-content">
            <h2 className="fiction-category-title">
              {key ? `${displayName(key)} Books` : "Select a category"}
            </h2>

            {loading && <p>Loading books from library...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && books.length === 0 && key && <p>No books available in this category yet.</p>}

            {!loading && !error && (
              <div className="fiction-book-grid">
                {books.map((book, index) => (
                  <div key={index} className="book-card-wrapper">
                    <Book book={book} onAddToCart={handleAddToCart} />
                  </div>
                ))}
                {Array.from({ length: (9 - (books.length % 9)) % 9 }).map((_, i) => (
                  <div key={i} className="fiction-book-slot empty" />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}