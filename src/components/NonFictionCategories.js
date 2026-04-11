import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Book from "./Book"; 
import dashboardBg from "./image/dashboard-bg.jpg";
import "./NonFictionPage"; // Using the main CSS for consistent UI styling

const nonFictionCategoriesList = [
  "biography", "history", "science", "self-help", "true crime", "philosophy", "travel"
];

const displayName = (key) =>
  key ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function NonFictionCategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const key = (category || "").toLowerCase();
  const normalizedKey = key.replace(/-/g, " ");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issuedCount, setIssuedCount] = useState(0);

  useEffect(() => {
    if (!key) return;
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Fetch books filtered specifically for Non-Fiction
    fetch(`http://localhost:5000/api/books`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(b => 
          b.section?.toLowerCase() === "non-fiction" && 
          b.category?.toLowerCase() === normalizedKey
        );
        setBooks(filtered);
      })
      .catch(err => console.error("Error fetching books:", err))
      .finally(() => setLoading(false));

    if (user.id) {
      fetch(`http://localhost:5000/api/transactions/user/${user.id}`)
        .then(res => res.json())
        .then(data => setIssuedCount(data.length))
        .catch(err => console.error("Error fetching issue count:", err));
    }
  }, [key, normalizedKey]);

  const handleAddToCart = (book) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    if (currentCart.some(item => item.id === book.id)) {
      alert(`"${book.title}" is already in your cart.`);
      return;
    }
    
    if (currentCart.length + issuedCount >= 5) {
      alert("Library Limit: You can only have 5 books total (Cart + Issued).");
      return;
    }

    const updatedCart = [...currentCart, book];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
    alert(`${book.title} added to cart!`);
  };

  return (
    <div className="fiction-container" style={{ backgroundImage: `url(${dashboardBg})` }}>
      <div className="fiction-layout">
        <aside className="fiction-left-panel">
          <button className="fiction-dashboard-button" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          
          <h3 className="fiction-left-title">Non-Fiction</h3>
          
          <ul className="fiction-left-categories">
            {nonFictionCategoriesList.map((cat) => (
              <li key={cat}>
                <Link to={`/non-fiction/${cat}`} className="fiction-category-link">
                  {displayName(cat)}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <section className="fiction-right-content">
          <h2 className="fiction-category-title">
            {key ? `${displayName(key)} Books` : "Select a Category"}
          </h2>
          
          {loading && <p>Searching the Non-Fiction library...</p>}
          
          <div className="fiction-book-grid">
            {books.map((book, index) => (
              <div key={index} className="book-card-wrapper">
                <Book book={book} onAddToCart={handleAddToCart} />
              </div>
            ))}
            
            {/* Maintains the 3-column grid structure */}
            {Array.from({ length: (9 - (books.length % 9)) % 9 }).map((_, i) => (
              <div key={i} className="fiction-book-slot empty" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}