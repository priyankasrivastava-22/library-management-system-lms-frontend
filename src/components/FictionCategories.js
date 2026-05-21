import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API_URL from "../config";
import Book from "./Book";
import dashboardBg from "./image/dashboard-bg.jpg";
import "./FictionPage.css";

const fictionCategories = [
  "fantasy",
  "mystery",
  "romance",
  "thriller",
  "historical",
  "children",
  "horror",
  "cook",
];

const displayName = (key) =>
  key
    ? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

export default function FictionCategories() {
  const { category } = useParams();
  const navigate = useNavigate();

  const key = (category || "").toLowerCase().trim();

  const [books, setBooks] = useState([]);
  const [issuedCount, setIssuedCount] = useState(0);

useEffect(() => {
  if (!key) return;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  fetch(`${API_URL}/api/books`)
    .then((res) => res.json())
    .then((data) => {
      console.log("FULL API RESPONSE:", data);

      const allBooks = Array.isArray(data)
        ? data
        : data.books || [];

      console.log("ALL BOOKS:", allBooks);

      const targetCategory = key
        .replace(/-/g, " ")
        .toLowerCase()
        .trim();

      const filtered = allBooks.filter((book) => {

        // CATEGORY SUPPORT
        const rawCategory =
          book.category ||
          book.category_name ||
          book.genre ||
          book?.category?.name ||
          "";

        // SECTION SUPPORT
        const rawSection =
          book.section ||
          book.section_name ||
          book.sectionName ||
          book?.section?.name ||
          "";

        const bookCategory = String(rawCategory)
          .toLowerCase()
          .trim();

        const bookSection = String(rawSection)
          .toLowerCase()
          .trim();

        console.log({
          title: book.title,
          category: bookCategory,
          section: bookSection,
        });

        return (
          bookCategory === targetCategory &&
          (
            bookSection === "fiction" ||
            bookSection === "fiction books"
          )
        );
      });

      console.log("FILTERED BOOKS:", filtered);

      setBooks(filtered);
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
    });

  // issued books count
  if (user.id) {
    fetch(`${API_URL}/api/transactions/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssuedCount(data.length || 0);
      })
      .catch((err) => {
        console.error("Error fetching issued books:", err);
      });
  }
}, [key]);

  const handleAddToCart = (book) => {
    const currentCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    if (currentCart.some((item) => item.id === book.id)) {
      alert("This book is already in your selection.");
      return;
    }

    if (currentCart.length + issuedCount >= 5) {
      alert("Library Rule: Maximum of 5 books allowed per student.");
      return;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify([...currentCart, book])
    );

    window.dispatchEvent(new Event("storage"));

    alert("Book added to your library cart.");
  };

  return (
    <div
      className="fiction-container"
      style={{
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="fiction-layout">

        <aside className="fiction-left-panel">

          <button
            className="fiction-dashboard-button"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <h3 className="fiction-left-title">
            Fiction Categories
          </h3>

          <ul className="fiction-left-categories">
            {fictionCategories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/fiction/${cat}`}
                  className="fiction-category-link"
                >
                  {displayName(cat)}
                </Link>
              </li>
            ))}
          </ul>

        </aside>

        <section className="fiction-right-content">

          <h2 className="fiction-category-title">
            {displayName(key)} Books
          </h2>

          <div className="fiction-book-grid">

            {books.length > 0 ? (
              books.map((book, index) => (
                <div
                  key={book.id || index}
                  className="book-card-wrapper"
                >
                  <Book
                    book={book}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))
            ) : (
              <p style={{ color: "white", fontSize: "18px" }}>
                No books found in this category.
              </p>
            )}

          </div>

        </section>

      </div>
    </div>
  );
}