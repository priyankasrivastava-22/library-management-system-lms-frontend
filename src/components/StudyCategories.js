import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API_URL from '../config';
import Book from "./Book"; 
import dashboardBg from "./image/dashboard-bg.jpg"; 
import "./StudyPage.css"; // Pointing to the main CSS file for consistency

const studyCategories = [
  "mathematics", "physics", "chemistry", "biology", "engineering", "economics", "law"
];

const displayName = (key) =>
  key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function StudyCategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const key = (category || "").toLowerCase();
  
  const [books, setBooks] = useState([]);
  const [issuedCount, setIssuedCount] = useState(0);

  useEffect(() => {
    if (!key) return;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data) => {
        const bookList = data.books || [];
        const filtered = bookList.filter(b => 
          b.section?.toLowerCase() === "study" && 
          b.category?.toLowerCase() === key.replace(/-/g, " ")
        );
        setBooks(filtered);
      });

    if (user.id) {
      fetch(`${API_URL}/transactions/user/${user.id}`)
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
    <div className="study-container" style={{ backgroundImage: `url(${dashboardBg})`, backgroundSize: 'cover' }}>
      <div className="study-layout">
        <aside className="study-left-panel">
          {/* ADDED CLASSNAME HERE */}
          <button className="study-dashboard-button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <h3 className="study-left-title">Study Material</h3>
          <ul className="study-left-categories">
            {studyCategories.map((cat) => (
              <li key={cat}>
                {/* ADDED CLASSNAME HERE */}
                <Link to={`/study/${cat}`} className="study-category-link">
                  {displayName(cat)}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="study-right-content">
          <h2 className="study-category-title">{displayName(key)} Books </h2>
          <div className="study-book-grid">
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