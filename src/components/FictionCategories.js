// File: src/components/FictionCategories.js
// ==================================================
// PAGE: Books for a selected Fiction category (e.g., /fiction/fantasy)
//
// Layout:
//  - Left panel: Section switch + clickable categories
//  - Right content: Category title + shelves of books
//  - Books arranged in grid: 12 slots per row (3 rows x 4 columns = shelf)
//  - Each Book expands inline with dropdown details (overview, review, etc.)

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import Book from "./Book"; // Book card with dropdown
import dashboardBg from "./image/dashboard-bg.jpg";
import "./FictionPage.css"; // reuse styling

/* ---------------- Dummy Books Data ----------------
   Each category has 10 books, but the grid can hold 12 slots per shelf.
   Fields: title, author, publisher, stock, overview, review
----------------------------------------------------- */
const rawFictionBooks = {
  fantasy: [
    {
      title: "Harry Potter and the Sorcerer’s Stone",
      author: "J.K. Rowling",
      publisher: "Bloomsbury",
      stock: "In Stock",
      overview: "A young boy discovers he is a wizard and attends Hogwarts School.",
      review: "Magical, adventurous, and timeless.",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publisher: "HarperCollins",
      stock: "In Stock",
      overview: "Bilbo Baggins embarks on a journey with dwarves to reclaim treasure.",
      review: "Charming and filled with adventure.",
    },
    {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      publisher: "DAW Books",
      stock: "In Stock",
      overview: "Kvothe recounts his life story from childhood to becoming a legend.",
      review: "Lyrical storytelling, rich world-building.",
    },
    {
      title: "Mistborn: The Final Empire",
      author: "Brandon Sanderson",
      publisher: "Tor Books",
      stock: "Out of Stock",
      overview: "A young thief discovers her powers to overthrow a tyrant.",
      review: "Smart magic system and thrilling plot.",
    },
    {
      title: "A Game of Thrones",
      author: "George R.R. Martin",
      publisher: "Bantam Spectra",
      stock: "In Stock",
      overview: "Noble families vie for the Iron Throne in a brutal struggle.",
      review: "Dark, political, and full of twists.",
    },
    {
      title: "The Way of Kings",
      author: "Brandon Sanderson",
      publisher: "Tor Books",
      stock: "In Stock",
      overview: "Epic tale of knights, magic storms, and war.",
      review: "Deep lore, complex characters.",
    },
    {
      title: "The Last Wish",
      author: "Andrzej Sapkowski",
      publisher: "Gollancz",
      stock: "Out of Stock",
      overview: "Short stories of Geralt the Witcher, monster hunter.",
      review: "Gritty, sharp, and clever.",
    },
    {
      title: "Eragon",
      author: "Christopher Paolini",
      publisher: "Knopf Books",
      stock: "In Stock",
      overview: "A farm boy finds a dragon egg and his life changes forever.",
      review: "Classic coming-of-age fantasy.",
    },
    {
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      publisher: "HarperCollins",
      stock: "In Stock",
      overview: "Four children enter Narnia through a wardrobe.",
      review: "Beautiful allegory, simple yet profound.",
    },
    {
      title: "American Gods",
      author: "Neil Gaiman",
      publisher: "HarperCollins",
      stock: "Out of Stock",
      overview: "Shadow gets caught in a war between old and new gods.",
      review: "Dark, mythological, thought-provoking.",
    },
  ],

  mystery: [
    {
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      publisher: "Norstedts Förlag",
      stock: "In Stock",
      overview: "Journalist and hacker uncover dark secrets of a family.",
      review: "Gripping, dark Scandinavian mystery.",
    },
    {
      title: "Gone Girl",
      author: "Gillian Flynn",
      publisher: "Crown Publishing",
      stock: "In Stock",
      overview: "A wife goes missing; her husband becomes the prime suspect.",
      review: "Twisty, psychological, shocking.",
    },
    {
      title: "Big Little Lies",
      author: "Liane Moriarty",
      publisher: "Penguin",
      stock: "In Stock",
      overview: "Secrets and lies unravel in a small town.",
      review: "Clever, entertaining, and layered.",
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      publisher: "Doubleday",
      stock: "Out of Stock",
      overview: "A professor uncovers religious secrets in a murder case.",
      review: "Fast-paced, full of puzzles.",
    },
    {
      title: "In the Woods",
      author: "Tana French",
      publisher: "Viking Press",
      stock: "In Stock",
      overview: "Detective investigates a murder linked to his childhood trauma.",
      review: "Atmospheric and deeply psychological.",
    },
    {
      title: "And Then There Were None",
      author: "Agatha Christie",
      publisher: "Collins Crime Club",
      stock: "In Stock",
      overview: "Ten strangers are invited to an island… and start dying.",
      review: "Classic whodunit, brilliant suspense.",
    },
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      publisher: "Celadon Books",
      stock: "In Stock",
      overview: "A woman stops speaking after killing her husband.",
      review: "Clever psychological thriller.",
    },
    {
      title: "The Cuckoo’s Calling",
      author: "Robert Galbraith",
      publisher: "Sphere Books",
      stock: "Out of Stock",
      overview: "A detective investigates the death of a supermodel.",
      review: "Modern detective story, strong characters.",
    },
    {
      title: "Sharp Objects",
      author: "Gillian Flynn",
      publisher: "Shaye Areheart Books",
      stock: "In Stock",
      overview: "A reporter returns home to cover a murder case.",
      review: "Dark, unsettling, psychological.",
    },
    {
      title: "The Woman in the Window",
      author: "A.J. Finn",
      publisher: "William Morrow",
      stock: "In Stock",
      overview: "An agoraphobic woman witnesses a crime… or does she?",
      review: "Suspenseful, Hitchcockian.",
    },
  ],

  // TODO: Add romance, science-fiction, thriller, historical, children
  // (same pattern as above, with overview + review)
};

/* Categories list (matches FictionPage.js routes) */
const categoriesList = [
  "fantasy",
  "mystery",
  "romance",
  "science-fiction",
  "thriller",
  "historical",
  "children",
];

/* Utility: turn "science-fiction" → "Science Fiction" */
const displayName = (k) =>
  k ? k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function FictionCategories() {
  const { category } = useParams(); // get /fiction/:category
  const navigate = useNavigate();

  const key = (category || "").toLowerCase(); // e.g. "fantasy"
  const books = rawFictionBooks[key] || [];   // books for that category

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* TopBar icons */}
      <TopBar />
      <div className="fiction-overlay" />

      {/* Layout split: Left panel vs Right content */}
      <div className="fiction-categories-container">
        <div className="fiction-layout">
          {/* ---------------- LEFT PANEL ---------------- */}
          <aside className="left-panel">
            {/* Section switch */}
            <div className="section-switch">
              <button className="active" onClick={() => navigate("/fiction")}>
                Fiction
              </button>
              <button onClick={() => navigate("/nonfiction")}>Non-Fiction</button>
              <button onClick={() => navigate("/study")}>Study</button>
            </div>

            {/* Categories list */}
            <h3 style={{ marginTop: 8 }}>Categories</h3>
            <ul className="left-categories">
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <Link to={`/fiction/${cat}`} className="category-link">
                    {displayName(cat)}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* ---------------- RIGHT CONTENT ---------------- */}
          <section className="right-content">
            <h2>{key ? `${displayName(key)} — Books` : "Select a category"}</h2>

            {!key ? (
              <p>Please choose a category from the left.</p>
            ) : (
              <div className="shelves">
                {/* 12 slots per row (grid of 3 rows × 4 cols) */}
                <div className="book-grid">
                  {books.map((b, i) => (
                    <Book key={i} book={b} />
                  ))}
                  {/* Fill empty slots so grid always shows 12 places */}
                  {Array.from({ length: 12 - (books.length % 12) }).map(
                    (_, idx) => (
                      <div key={`empty-${idx}`} className="book-slot empty" />
                    )
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Global back button */}
        <BackButton />
      </div>
    </div>
  );
}
