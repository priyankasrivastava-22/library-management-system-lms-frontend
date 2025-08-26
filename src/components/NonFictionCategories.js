// File: src/components/NonFictionCategories.js
// ==================================================
// PAGE: Books for a selected Non-Fiction category (e.g., /nonfiction/biography)
//
// Layout:
//  - Left panel: Section switch + clickable categories
//  - Right content: Category title + shelves of books
//  - Books arranged in grid: 12 slots per row (3 rows x 4 columns)
//  - Each Book expands inline with dropdown details (overview, review, etc.)

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import TopBar from "./components/TopBar";
import Book from "./Book"; // Book card with dropdown
import dashboardBg from "./image/dashboard-bg.jpg";
import "./NonFictionPage"; // reuse styling for consistency

/* ---------------- Dummy Non-Fiction Books Data ----------------
   Each category has 10 books.
   Fields: title, author, publisher, stock, overview, review
---------------------------------------------------------------- */
const rawNonFictionBooks = {
  biography: [
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      publisher: "Contact Publishing",
      stock: "In Stock",
      overview: "Anne Frank’s diary entries while hiding during WWII.",
      review: "Touching and powerful historical document.",
    },
    {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      publisher: "Little, Brown",
      stock: "In Stock",
      overview: "Autobiography of Nelson Mandela’s life and struggle.",
      review: "Inspirational and deeply moving.",
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      publisher: "Simon & Schuster",
      stock: "Out of Stock",
      overview: "Biography of Apple’s co-founder Steve Jobs.",
      review: "Fascinating and brutally honest.",
    },
    {
      title: "Becoming",
      author: "Michelle Obama",
      publisher: "Crown Publishing",
      stock: "In Stock",
      overview: "Memoir of the former First Lady of the USA.",
      review: "Empowering and authentic.",
    },
    {
      title: "Educated",
      author: "Tara Westover",
      publisher: "Random House",
      stock: "In Stock",
      overview: "A woman grows up in a survivalist family and seeks education.",
      review: "Raw and inspiring.",
    },
    {
      title: "The Wright Brothers",
      author: "David McCullough",
      publisher: "Simon & Schuster",
      stock: "In Stock",
      overview: "Story of Wilbur and Orville Wright’s aviation breakthroughs.",
      review: "Detailed and well researched.",
    },
    {
      title: "Churchill: A Life",
      author: "Martin Gilbert",
      publisher: "Heinemann",
      stock: "Out of Stock",
      overview: "Biography of Winston Churchill.",
      review: "Comprehensive and engaging.",
    },
    {
      title: "Leonardo da Vinci",
      author: "Walter Isaacson",
      publisher: "Simon & Schuster",
      stock: "In Stock",
      overview: "Explores the genius of da Vinci.",
      review: "Brilliant and insightful.",
    },
    {
      title: "Into the Wild",
      author: "Jon Krakauer",
      publisher: "Villard",
      stock: "In Stock",
      overview: "Life of Christopher McCandless who ventured into Alaska.",
      review: "Haunting and tragic.",
    },
    {
      title: "Einstein: His Life and Universe",
      author: "Walter Isaacson",
      publisher: "Simon & Schuster",
      stock: "Out of Stock",
      overview: "Biography of Albert Einstein.",
      review: "Thorough and fascinating.",
    },
  ],

  selfhelp: [
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      publisher: "Random House",
      stock: "In Stock",
      overview: "Explores how habits work and how they can be changed.",
      review: "Eye-opening and practical.",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      publisher: "Penguin",
      stock: "In Stock",
      overview: "Small changes that produce remarkable results.",
      review: "Clear, actionable advice.",
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey",
      publisher: "Free Press",
      stock: "Out of Stock",
      overview: "Principles for personal and professional success.",
      review: "Classic, timeless wisdom.",
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      publisher: "The Ralston Society",
      stock: "In Stock",
      overview: "Philosophy of success through positive thinking.",
      review: "Motivational and foundational.",
    },
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      publisher: "Simon & Schuster",
      stock: "In Stock",
      overview: "Guide to better communication and relationships.",
      review: "Practical and still relevant.",
    },
    {
      title: "You Are a Badass",
      author: "Jen Sincero",
      publisher: "Running Press",
      stock: "In Stock",
      overview: "Advice on embracing your inner power.",
      review: "Funny and encouraging.",
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      publisher: "HarperOne",
      stock: "Out of Stock",
      overview: "Counterintuitive approach to living a better life.",
      review: "Blunt yet refreshing.",
    },
    {
      title: "Grit",
      author: "Angela Duckworth",
      publisher: "Scribner",
      stock: "In Stock",
      overview: "The power of passion and perseverance.",
      review: "Research-driven and inspiring.",
    },
    {
      title: "Awaken the Giant Within",
      author: "Tony Robbins",
      publisher: "Free Press",
      stock: "In Stock",
      overview: "Personal mastery and self-improvement.",
      review: "Motivational and empowering.",
    },
    {
      title: "Mindset",
      author: "Carol S. Dweck",
      publisher: "Random House",
      stock: "Out of Stock",
      overview: "The psychology of fixed vs growth mindset.",
      review: "Influential and widely cited.",
    },
  ],

  // TODO: Add history, science, philosophy, travel, truecrime (same pattern)
};

/* Categories list (matches NonFictionPage.js routes) */
const categoriesList = [
  "biography",
  "selfhelp",
  "history",
  "science",
  "philosophy",
  "travel",
  "truecrime",
];

/* Utility: format route keys to Display Names */
const displayName = (k) =>
  k ? k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function NonFictionCategories() {
  const { category } = useParams(); // get /nonfiction/:category
  const navigate = useNavigate();

  const key = (category || "").toLowerCase();
  const books = rawNonFictionBooks[key] || [];

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
      {/* TopBar icons 
      <TopBar /> */}
      <div className="fiction-overlay" />

      {/* Layout split: Left panel vs Right content */}
      <div className="fiction-categories-container">
        <div className="fiction-layout">
          {/* ---------------- LEFT PANEL ---------------- */}
          <aside className="left-panel">
            {/* Section switch */}
            <div className="section-switch">
              <button onClick={() => navigate("/fiction")}>Fiction</button>
              <button className="active" onClick={() => navigate("/nonfiction")}>
                Non-Fiction
              </button>
              <button onClick={() => navigate("/study")}>Study</button>
            </div>

            {/* Categories list */}
            <h3 style={{ marginTop: 8 }}>Categories</h3>
            <ul className="left-categories">
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <Link to={`/nonfiction/${cat}`} className="category-link">
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
                <div className="book-grid">
                  {books.map((b, i) => (
                    <Book key={i} book={b} />
                  ))}
                  {/* Empty slots to complete 12 grid */}
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
      </div>
    </div>
  );
}
