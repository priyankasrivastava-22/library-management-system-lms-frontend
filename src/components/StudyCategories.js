// File: src/components/StudyCategories.js
// ==================================================
// PAGE: Books for a selected Study category (e.g., /study/math)
//
// Layout:
//  - Left panel: Section switch + clickable study categories
//  - Right content: Category title + shelves of books
//  - Books arranged in grid: 12 slots per row (3 rows x 4 columns = shelf)
//  - Each Book expands inline with dropdown details (overview, review, etc.)

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import TopBar from "./TopBar";
import Book from "./Book"; // Book card with dropdown details
import dashboardBg from "./image/dashboard-bg.jpg";
import "./StudyPage.css"; // reuse styling for categories

/* ---------------- Dummy Study Books Data ----------------
   Each category has 10 books (dummy), grid shows 12 slots.
   Fields: title, author, publisher, stock, overview, review
----------------------------------------------------------- */
const rawStudyBooks = {
  math: [
    {
      title: "Calculus Made Easy",
      author: "Silvanus Thompson",
      publisher: "Macmillan",
      stock: "In Stock",
      overview: "An introduction to the principles of calculus for beginners.",
      review: "Clear and approachable.",
    },
    {
      title: "Linear Algebra Done Right",
      author: "Sheldon Axler",
      publisher: "Springer",
      stock: "In Stock",
      overview: "Foundations of linear algebra explained conceptually.",
      review: "Well-written, rigorous.",
    },
    {
      title: "Discrete Mathematics",
      author: "Kenneth Rosen",
      publisher: "McGraw Hill",
      stock: "Out of Stock",
      overview: "Covers logic, set theory, combinatorics, and graph theory.",
      review: "Excellent for CS students.",
    },
    {
      title: "Principles of Mathematical Analysis",
      author: "Walter Rudin",
      publisher: "McGraw Hill",
      stock: "In Stock",
      overview: "Classic text on analysis, used worldwide.",
      review: "Challenging but rewarding.",
    },
    {
      title: "Introduction to Probability",
      author: "Joseph K. Blitzstein",
      publisher: "CRC Press",
      stock: "In Stock",
      overview: "Covers probability concepts with examples.",
      review: "Intuitive and problem-focused.",
    },
    {
      title: "Abstract Algebra",
      author: "David Dummit",
      publisher: "Wiley",
      stock: "In Stock",
      overview: "Comprehensive algebra covering groups, rings, and fields.",
      review: "Dense but complete.",
    },
    {
      title: "Number Theory",
      author: "George Andrews",
      publisher: "Dover",
      stock: "Out of Stock",
      overview: "Explains the basics of number theory with proofs.",
      review: "Great for undergrads.",
    },
    {
      title: "Geometry Revisited",
      author: "Coxeter & Greitzer",
      publisher: "Random House",
      stock: "In Stock",
      overview: "Elegant exploration of classical geometry.",
      review: "Beautifully written.",
    },
    {
      title: "Real Mathematical Analysis",
      author: "Charles Chapman Pugh",
      publisher: "Springer",
      stock: "In Stock",
      overview: "A rigorous real analysis text.",
      review: "Very student friendly.",
    },
    {
      title: "Introduction to Topology",
      author: "Bert Mendelson",
      publisher: "Dover",
      stock: "In Stock",
      overview: "Basics of topology for math majors.",
      review: "Short and useful.",
    },
  ],

  science: [
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      publisher: "Bantam",
      stock: "In Stock",
      overview: "Cosmology explained for a general audience.",
      review: "Mind-bending and clear.",
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      publisher: "Oxford",
      stock: "In Stock",
      overview: "Evolution explained through gene-centered view.",
      review: "Fascinating perspective.",
    },
    {
      title: "Astrophysics for People in a Hurry",
      author: "Neil deGrasse Tyson",
      publisher: "Norton",
      stock: "Out of Stock",
      overview: "Quick guide to space, time, and the universe.",
      review: "Engaging and concise.",
    },
    {
      title: "The Gene",
      author: "Siddhartha Mukherjee",
      publisher: "Scribner",
      stock: "In Stock",
      overview: "Story of genes and genetic science.",
      review: "Compelling and detailed.",
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      publisher: "Random House",
      stock: "In Stock",
      overview: "History of the universe told with wonder.",
      review: "Poetic and scientific.",
    },
    {
      title: "Six Easy Pieces",
      author: "Richard Feynman",
      publisher: "Basic Books",
      stock: "In Stock",
      overview: "Introduction to physics lectures.",
      review: "Brilliantly simple.",
    },
    {
      title: "Silent Spring",
      author: "Rachel Carson",
      publisher: "Houghton Mifflin",
      stock: "In Stock",
      overview: "Environmental science classic about pesticides.",
      review: "Changed the world.",
    },
    {
      title: "The Elegant Universe",
      author: "Brian Greene",
      publisher: "Norton",
      stock: "Out of Stock",
      overview: "String theory and modern physics explained.",
      review: "Deep and imaginative.",
    },
    {
      title: "Why We Sleep",
      author: "Matthew Walker",
      publisher: "Scribner",
      stock: "In Stock",
      overview: "Science of sleep and its importance.",
      review: "Eye-opening.",
    },
    {
      title: "The Origin of Species",
      author: "Charles Darwin",
      publisher: "John Murray",
      stock: "In Stock",
      overview: "Foundation of evolutionary biology.",
      review: "Revolutionary work.",
    },
  ],

  // Add 5 more study categories (history, economics, psychology, medicine, technology)
  history: [
    { 
      title: "Guns, Germs, and Steel", 
      author: "Jared Diamond", 
      publisher: "W.W. Norton", 
      stock: "In Stock", 
      overview: "How environment shaped societies.", 
      review: "Groundbreaking." 
    },

    { 
      title: "Sapiens", 
      author: "Yuval Noah Harari", 
      publisher: "Harvill Secker", 
      stock: "In Stock", 
      overview: "A history of humankind.", 
      review: "Thought-provoking." 
    },

    { 
      title: "The Silk Roads", 
      author: "Peter Frankopan",  
      publisher: "Bloomsbury",
      stock: "In Stock", 
      overview: "Global history centered on Asia.", 
      review: "Fresh perspective."
     },

    { 
      title: "Postwar", 
      author: "Tony Judt", 
      publisher: "Penguin", 
      stock: "Out of Stock", 
      overview: "Europe after WWII.", 
      review: "Detailed and vast." 
    },

    { 
      title: "1776", 
      author: "David McCullough", 
      publisher: "Simon & Schuster", 
      stock: "In Stock", 
      overview: "American Revolution events.", 
      review: "Engaging history." 
    },

    { 
      title: "Team of Rivals", 
      author: "Doris Kearns Goodwin", 
      publisher: "Simon & Schuster", 
      stock: "In Stock", 
      overview: "Lincoln and his cabinet.", 
      review: "Inspiring." 
    },

    { 
      title: "The Wright Brothers", 
      author: "David McCullough", 
      publisher: "Simon & Schuster", 
      stock: "In Stock", 
      overview: "Biography of aviation pioneers.", 
      review: "Well told."
    },

    { 
      title: "The Crusades", 
      author: "Thomas Asbridge",
      publisher: "Penguin", 
      stock: "In Stock", 
      overview: "History of the Crusades.", 
      review: "Comprehensive." 
    },

    { 
      title: "The Cold War", 
      author: "John Lewis Gaddis", 
      publisher: "Penguin", 
      stock: "Out of Stock", 
      overview: "Story of the Cold War.", 
      review: "Excellent narrative." 
    },

    { 
      title: "The Roman Empire", 
      author: "Mary Beard", 
      publisher: "Profile Books", 
      stock: "In Stock", 
      overview: "Life in Rome.", 
      review: "Lively and witty." 
    },
  ],

  economics: [
    { title: "Capital in the 21st Century", author: "Thomas Piketty", publisher: "Belknap Press", stock: "In Stock", overview: "Inequality and capital history.", review: "Groundbreaking work." },
    { title: "Freakonomics", author: "Steven Levitt", publisher: "HarperCollins", stock: "In Stock", overview: "Economic thinking applied to real life.", review: "Fun and smart." },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", publisher: "Farrar, Straus and Giroux", stock: "In Stock", overview: "Two systems of thought explained.", review: "Eye-opening." },
    { title: "Nudge", author: "Richard Thaler", publisher: "Penguin", stock: "In Stock", overview: "Behavioral economics and decision making.", review: "Practical insights." },
    { title: "The Wealth of Nations", author: "Adam Smith", publisher: "W. Strahan", stock: "Out of Stock", overview: "Foundations of economics.", review: "Classic and timeless." },
    { title: "Doughnut Economics", author: "Kate Raworth", publisher: "Random House", stock: "In Stock", overview: "New model for sustainable economics.", review: "Innovative." },
    { title: "Misbehaving", author: "Richard Thaler", publisher: "W.W. Norton", stock: "In Stock", overview: "Behavioral economics journey.", review: "Funny and smart." },
    { title: "Globalization and Its Discontents", author: "Joseph Stiglitz", publisher: "W.W. Norton", stock: "In Stock", overview: "Critique of globalization.", review: "Bold arguments." },
    { title: "Poor Economics", author: "Banerjee & Duflo", publisher: "PublicAffairs", stock: "In Stock", overview: "Study of poverty economics.", review: "Data-driven." },
    { title: "The Undercover Economist", author: "Tim Harford", publisher: "Oxford", stock: "In Stock", overview: "Economics in everyday life.", review: "Accessible." },
  ],

  psychology: [
    { title: "Man’s Search for Meaning", author: "Viktor Frankl", publisher: "Beacon Press", stock: "In Stock", overview: "Survival in concentration camps.", review: "Life-changing." },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", publisher: "FSG", stock: "In Stock", overview: "Two systems of thought explained.", review: "Brilliant." },
    { title: "Influence", author: "Robert Cialdini", publisher: "HarperCollins", stock: "In Stock", overview: "Science of persuasion.", review: "Classic and practical." },
    { title: "The Power of Habit", author: "Charles Duhigg", publisher: "Random House", stock: "In Stock", overview: "How habits form and change.", review: "Insightful." },
    { title: "Flow", author: "Mihaly Csikszentmihalyi", publisher: "Harper & Row", stock: "In Stock", overview: "Psychology of optimal experience.", review: "Inspiring." },
    { title: "Drive", author: "Daniel Pink", publisher: "Riverhead", stock: "In Stock", overview: "What motivates people.", review: "Practical and modern." },
    { title: "Grit", author: "Angela Duckworth", publisher: "Scribner", stock: "Out of Stock", overview: "Importance of passion and perseverance.", review: "Motivating." },
    { title: "Emotional Intelligence", author: "Daniel Goleman", publisher: "Bantam", stock: "In Stock", overview: "Role of EQ in success.", review: "Important concept." },
    { title: "Mindset", author: "Carol Dweck", publisher: "Random House", stock: "In Stock", overview: "Fixed vs growth mindset.", review: "Transformative." },
    { title: "Behave", author: "Robert Sapolsky", publisher: "Penguin", stock: "In Stock", overview: "Biology of human behavior.", review: "Deep and comprehensive." },
  ],

  medicine: [
    { title: "The Emperor of All Maladies", author: "Siddhartha Mukherjee", publisher: "Scribner", stock: "In Stock", overview: "Biography of cancer.", review: "Masterful storytelling." },
    { title: "Being Mortal", author: "Atul Gawande", publisher: "Metropolitan Books", stock: "In Stock", overview: "Medicine and end of life.", review: "Touching and real." },
    { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", publisher: "Crown", stock: "Out of Stock", overview: "Story of HeLa cells.", review: "Powerful narrative." },
    { title: "The Man Who Mistook His Wife for a Hat", author: "Oliver Sacks", publisher: "Summit Books", stock: "In Stock", overview: "Neurological case studies.", review: "Fascinating." },
    { title: "Complications", author: "Atul Gawande", publisher: "Picador", stock: "In Stock", overview: "Doctor’s reflections on medicine.", review: "Candid and insightful." },
    { title: "Stiff", author: "Mary Roach", publisher: "W.W. Norton", stock: "In Stock", overview: "History of human cadavers.", review: "Funny yet informative." },
    { title: "Spillover", author: "David Quammen", publisher: "W.W. Norton", stock: "In Stock", overview: "Animal diseases crossing to humans.", review: "Prescient." },
    { title: "Medical Apartheid", author: "Harriet A. Washington", publisher: "Doubleday", stock: "In Stock", overview: "History of medical experimentation on African Americans.", review: "Disturbing but essential." },
    { title: "An American Sickness", author: "Elisabeth Rosenthal", publisher: "Penguin", stock: "Out of Stock", overview: "Healthcare system critique.", review: "Eye-opening." },
    { title: "Gray’s Anatomy", author: "Henry Gray", publisher: "Longman", stock: "In Stock", overview: "Classic anatomy reference.", review: "Authoritative." },
  ],

  technology: [
    { title: "The Innovators", author: "Walter Isaacson", publisher: "Simon & Schuster", stock: "In Stock", overview: "History of computing pioneers.", review: "Fascinating stories." },
    { title: "Hooked", author: "Nir Eyal", publisher: "Portfolio", stock: "In Stock", overview: "Building habit-forming products.", review: "Practical for startups." },
    { title: "The Lean Startup", author: "Eric Ries", publisher: "Crown", stock: "In Stock", overview: "Startup growth principles.", review: "Must-read for entrepreneurs." },
    { title: "Clean Code", author: "Robert C. Martin", publisher: "Prentice Hall", stock: "Out of Stock", overview: "Principles of writing maintainable code.", review: "Classic programming guide." },
    { title: "Design Patterns", author: "Erich Gamma et al.", publisher: "Addison-Wesley", stock: "In Stock", overview: "Reusable software design solutions.", review: "Timeless resource." },
    { title: "Artificial Intelligence", author: "Stuart Russell", publisher: "Pearson", stock: "In Stock", overview: "AI theory and applications.", review: "Comprehensive and rigorous." },
    { title: "The Second Machine Age", author: "Brynjolfsson & McAfee", publisher: "Norton", stock: "In Stock", overview: "Impact of digital technologies.", review: "Insightful and important." },
    { title: "Code", author: "Charles Petzold", publisher: "Microsoft Press", stock: "In Stock", overview: "Story of computer systems.", review: "Brilliantly simple." },
    { title: "Algorithms", author: "Robert Sedgewick", publisher: "Addison-Wesley", stock: "Out of Stock", overview: "Classic algorithms reference.", review: "Well-structured." },
    { title: "The Mythical Man-Month", author: "Frederick Brooks", publisher: "Addison-Wesley", stock: "In Stock", overview: "Software project management.", review: "Still relevant." },
  ],
};

/* Categories list (matches StudyPage.js routes) */
const categoriesList = [
  "math",
  "science",
  "history",
  "economics",
  "psychology",
  "medicine",
  "technology",
];

/* Utility: format keys → display names */
const displayName = (k) =>
  k ? k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function StudyCategories() {
  const { category } = useParams(); // get /study/:category
  const navigate = useNavigate();

  const key = (category || "").toLowerCase(); // e.g. "math"
  const books = rawStudyBooks[key] || []; // books for that category

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
      <TopBar />  */}
      <div className="fiction-overlay" />

      {/* Layout split: Left panel vs Right content */}
      <div className="fiction-categories-container">
        <div className="fiction-layout">
          {/* ---------------- LEFT PANEL ---------------- */}
          <aside className="left-panel">
            {/* Section switch */}
            <div className="section-switch">
              <button onClick={() => navigate("/fiction")}>Fiction</button>
              <button onClick={() => navigate("/nonfiction")}>Non-Fiction</button>
              <button className="active" onClick={() => navigate("/study")}>
                Study
              </button>
            </div>

            {/* Categories list */}
            <h3 style={{ marginTop: 8 }}>Categories</h3>
            <ul className="left-categories">
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <Link to={`/study/${cat}`} className="category-link">
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
      </div>
    </div>
  );
}