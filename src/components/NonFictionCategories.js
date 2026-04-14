import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import API_URL from '../config';
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