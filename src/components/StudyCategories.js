// File: src/components/StudyCategories.js
// ==================================================
// PAGE: Books for a selected Study category (e.g., /study/math)
//
// Layout:
//  - Left panel: Section switch + clickable study categories
//  - Right content: Category title + shelves of books
//  - Books arranged in grid: 12 slots per row (3 rows x 4 columns = shelf)
//  - Each Book expands inline with dropdown details (overview, review, etc.)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import TopBar from "./TopBar";
import Book from "./Book"; // Book card with dropdown details
import dashboardBg from "./image/dashboard-bg.jpg";
import "./StudyPage.css"; // reuse styling for categories

/* ---------------- Dummy Study Books Data ----------------
   Each category has 10 books (dummy), grid shows 12 slots.
   Fields: title, author, publisher, stock, overview, review
----------------------------------------------------------- */
const rawStudyBooks = {
  mathematics: [
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
  physics: [
    {
      title: "Concepts of Physics Part 1",
      author: "H.C. Verma",
      publisher: "Bharati Bhawan",
      stock: "In Stock",
      overview: "Covers mechanics, waves, and optics.",
      review: "Best for Class 11 students.",
      className: "Class 11",
    },
    {
      title: "Concepts of Physics Part 2",
      author: "H.C. Verma",
      publisher: "Bharati Bhawan",
      stock: "In Stock",
      overview: "Covers thermodynamics, electricity, and magnetism.",
      review: "Essential for Class 12.",
      className: "Class 12",
    },
    {
      title: "Fundamentals of Physics",
      author: "Halliday, Resnick & Walker",
      publisher: "Wiley",
      stock: "In Stock",
      overview: "International standard text for physics.",
      review: "Good for JEE/NEET prep.",
      className: "Undergraduate",
    },
    {
      title: "Understanding Physics Mechanics",
      author: "D.C. Pandey",
      publisher: "Arihant",
      stock: "In Stock",
      overview: "Focus on mechanics for JEE.",
      review: "Crisp and exam oriented.",
      className: "Class 11",
    },
    {
      title: "Problems in General Physics",
      author: "I.E. Irodov",
      publisher: "Mir Publishers",
      stock: "Low Stock",
      overview: "Challenging problems for advanced learners.",
      review: "Best for Olympiad level.",
      className: "Advanced",
    },
    {
      title: "Physics for Class 11",
      author: "NCERT",
      publisher: "NCERT",
      stock: "In Stock",
      overview: "Official board textbook.",
      review: "Simple and clear.",
      className: "Class 11",
    },
    {
      title: "Physics for Class 12",
      author: "NCERT",
      publisher: "NCERT",
      stock: "In Stock",
      overview: "Official board textbook.",
      review: "Core for exams.",
      className: "Class 12",
    },
    {
      title: "Problems in Physics",
      author: "S.S. Krotov",
      publisher: "Mir Publishers",
      stock: "Out of Stock",
      overview: "Problems requiring deep thinking.",
      review: "Excellent for self study.",
      className: "Advanced",
    },
    {
      title: "Objective Physics Vol 1",
      author: "D.C. Pandey",
      publisher: "Arihant",
      stock: "In Stock",
      overview: "Objective style Q&A.",
      review: "Perfect for NEET.",
      className: "Class 11",
    },
    {
      title: "Objective Physics Vol 2",
      author: "D.C. Pandey",
      publisher: "Arihant",
      stock: "In Stock",
      overview: "Objective style Q&A for Class 12.",
      review: "Good for practice.",
      className: "Class 12",
    },
  ],

  chemistry: [
    {
      title: "Organic Chemistry",
      author: "Morrison & Boyd",
      publisher: "Pearson",
      stock: "In Stock",
      overview: "Detailed organic chemistry concepts.",
      review: "Best for undergrads.",
      className: "Undergraduate",
    },
    {
      title: "Concise Inorganic Chemistry",
      author: "J.D. Lee",
      publisher: "Oxford",
      stock: "In Stock",
      overview: "Covers inorganic chemistry systematically.",
      review: "Must-have reference.",
      className: "Class 12",
    },
    {
      title: "Physical Chemistry",
      author: "O.P. Tandon",
      publisher: "GRB",
      stock: "In Stock",
      overview: "Covers physical chemistry in depth.",
      review: "Good for entrance exams.",
      className: "Class 11",
    },
    {
      title: "NCERT Chemistry Class 11",
      author: "NCERT",
      publisher: "NCERT",
      stock: "In Stock",
      overview: "Board prescribed textbook.",
      review: "Very reliable.",
      className: "Class 11",
    },
    {
      title: "NCERT Chemistry Class 12",
      author: "NCERT",
      publisher: "NCERT",
      stock: "In Stock",
      overview: "Board prescribed textbook.",
      review: "Must study for exams.",
      className: "Class 12",
    },
    {
      title: "Problems in Physical Chemistry",
      author: "Narendra Awasthi",
      publisher: "Balaji",
      stock: "In Stock",
      overview: "Practice problems in physical chemistry.",
      review: "Highly useful.",
      className: "Advanced",
    },
    {
      title: "Elementary Problems in Organic Chemistry",
      author: "M.S. Chouhan",
      publisher: "Balaji",
      stock: "In Stock",
      overview: "Objective questions for JEE.",
      review: "Covers basics well.",
      className: "Class 12",
    },
    {
      title: "Advanced Problems in Organic Chemistry",
      author: "Himanshu Pandey",
      publisher: "GRB",
      stock: "Out of Stock",
      overview: "Tough problems for entrance tests.",
      review: "Best for serious learners.",
      className: "Advanced",
    },
    {
      title: "Organic Chemistry",
      author: "Paula Y. Bruice",
      publisher: "Pearson",
      stock: "In Stock",
      overview: "Comprehensive coverage of organic chemistry.",
      review: "International standard.",
      className: "Undergraduate",
    },
    {
      title: "Modern ABC Chemistry",
      author: "S.P. Jauhar",
      publisher: "Modern",
      stock: "In Stock",
      overview: "Popular reference for board exams.",
      review: "Good for Class 12.",
      className: "Class 12",
    },
  ],

  biology: [
    {
      title: "Biology for Class 11",
      author: "NCERT",
      publisher: "NCERT",
      stock: "In Stock",
      overview: "Board prescribed textbook.",
      review: "Essential base.",
      className: "Class 11",
    },
    {
      title: "Biology for Class 12",
      author: "NCERT",
      publisher: "NCERT",
      stock: "In Stock",
      overview: "Covers Class 12 syllabus.",
      review: "Highly useful.",
      className: "Class 12",
    },
    {
      title: "Objective Biology",
      author: "Dinesh",
      publisher: "Dinesh Publications",
      stock: "In Stock",
      overview: "Multiple choice questions.",
      review: "Great for NEET.",
      className: "Class 11",
    },
    {
      title: "Trueman's Biology Vol 1",
      author: "Trueman",
      publisher: "Trueman Publishers",
      stock: "In Stock",
      overview: "Detailed biology reference.",
      review: "Great for JEE/NEET.",
      className: "Class 11",
    },
    {
      title: "Trueman's Biology Vol 2",
      author: "Trueman",
      publisher: "Trueman Publishers",
      stock: "In Stock",
      overview: "Covers Class 12 biology.",
      review: "Highly recommended.",
      className: "Class 12",
    },
    {
      title: "Objective Biology",
      author: "Pradeep",
      publisher: "Pradeep Publications",
      stock: "In Stock",
      overview: "MCQ style question bank.",
      review: "Covers all topics.",
      className: "Class 12",
    },
    {
      title: "Elementary Biology",
      author: "K.N. Bhatia",
      publisher: "S. Chand",
      stock: "Out of Stock",
      overview: "Simplified concepts.",
      review: "Good for beginners.",
      className: "Class 11",
    },
    {
      title: "Molecular Biology of the Cell",
      author: "Bruce Alberts",
      publisher: "Garland Science",
      stock: "In Stock",
      overview: "Reference book on molecular biology.",
      review: "Global standard.",
      className: "Undergraduate",
    },
    {
      title: "Genetics: From Genes to Genomes",
      author: "Hartwell et al.",
      publisher: "McGraw Hill",
      stock: "In Stock",
      overview: "Modern genetics coverage.",
      review: "Excellent detail.",
      className: "Undergraduate",
    },
    {
      title: "Human Anatomy & Physiology",
      author: "Elaine N. Marieb",
      publisher: "Pearson",
      stock: "In Stock",
      overview: "Covers anatomy and physiology.",
      review: "Good for med students.",
      className: "Undergraduate",
    },
  ],

  //  computerScience: [
  //   {
  //     title: "Introduction to Algorithms",
  //     author: "Cormen, Leiserson, Rivest, Stein",
  //     publisher: "MIT Press",
  //     stock: "In Stock",
  //     overview: "CLRS standard algorithms book.",
  //     review: "Must-have reference.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Computer Networks",
  //     author: "Andrew S. Tanenbaum",
  //     publisher: "Pearson",
  //     stock: "In Stock",
  //     overview: "Networking fundamentals.",
  //     review: "Best networking reference.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Operating System Concepts",
  //     author: "Silberschatz, Galvin, Gagne",
  //     publisher: "Wiley",
  //     stock: "In Stock",
  //     overview: "Covers OS principles.",
  //     review: "Global standard.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Artificial Intelligence: A Modern Approach",
  //     author: "Russell & Norvig",
  //     publisher: "Pearson",
  //     stock: "In Stock",
  //     overview: "AI theory and practice.",
  //     review: "Comprehensive reference.",
  //     className: "Postgraduate",
  //   },
  //   {
  //     title: "Database System Concepts",
  //     author: "Silberschatz, Korth",
  //     publisher: "McGraw Hill",
  //     stock: "In Stock",
  //     overview: "Covers DBMS concepts.",
  //     review: "Good reference.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Programming in C",
  //     author: "Dennis Ritchie",
  //     publisher: "Prentice Hall",
  //     stock: "In Stock",
  //     overview: "Classic C programming book.",
  //     review: "Great for beginners.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Java: The Complete Reference",
  //     author: "Herbert Schildt",
  //     publisher: "McGraw Hill",
  //     stock: "In Stock",
  //     overview: "Java programming guide.",
  //     review: "Very detailed.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Python Crash Course",
  //     author: "Eric Matthes",
  //     publisher: "No Starch Press",
  //     stock: "In Stock",
  //     overview: "Learn Python fast.",
  //     review: "Practical examples.",
  //     className: "Beginners",
  //   },
  //   {
  //     title: "Clean Code",
  //     author: "Robert C. Martin",
  //     publisher: "Prentice Hall",
  //     stock: "In Stock",
  //     overview: "Best practices in coding.",
  //     review: "Great for developers.",
  //     className: "Undergraduate",
  //   },
  //   {
  //     title: "Compilers: Principles, Techniques & Tools",
  //     author: "Aho, Lam, Sethi, Ullman",
  //     publisher: "Pearson",
  //     stock: "In Stock",
  //     overview: "Dragon book for compilers.",
  //     review: "Standard reference.",
  //     className: "Postgraduate",
  //   },
  // ],

  engineering: [
    {
      title: "Engineering Mechanics",
      author: "Timoshenko & Young",
      publisher: "McGraw Hill",
      stock: "In Stock",
      overview: "Foundation in mechanics.",
      review: "Great book.",
      className: "Undergraduate",
    },
    {
      title: "Strength of Materials",
      author: "R.K. Bansal",
      publisher: "Laxmi Publications",
      stock: "In Stock",
      overview: "Covers strength of materials.",
      review: "Widely used.",
      className: "Undergraduate",
    },
    {
      title: "Thermodynamics",
      author: "P.K. Nag",
      publisher: "Tata McGraw Hill",
      stock: "In Stock",
      overview: "Explains thermodynamics concepts.",
      review: "Standard reference.",
      className: "Undergraduate",
    },
    {
      title: "Fluid Mechanics",
      author: "R.K. Bansal",
      publisher: "Laxmi Publications",
      stock: "In Stock",
      overview: "Hydraulics & fluid mechanics.",
      review: "Useful for exams.",
      className: "Undergraduate",
    },
    {
      title: "Machine Design",
      author: "R.S. Khurmi",
      publisher: "S. Chand",
      stock: "In Stock",
      overview: "Covers machine design basics.",
      review: "Good for B.Tech.",
      className: "Undergraduate",
    },
    {
      title: "Electrical Engineering Fundamentals",
      author: "D.P. Kothari",
      publisher: "McGraw Hill",
      stock: "In Stock",
      overview: "Basics of electrical engineering.",
      review: "Very useful.",
      className: "Undergraduate",
    },
    {
      title: "Civil Engineering Materials",
      author: "Sham Tickoo",
      publisher: "Pearson",
      stock: "Out of Stock",
      overview: "Civil construction materials.",
      review: "Reference guide.",
      className: "Undergraduate",
    },
    {
      title: "Signals and Systems",
      author: "Alan V. Oppenheim",
      publisher: "Prentice Hall",
      stock: "In Stock",
      overview: "Fundamentals of signals.",
      review: "Excellent clarity.",
      className: "Undergraduate",
    },
    {
      title: "Control Systems Engineering",
      author: "Nagrath & Gopal",
      publisher: "New Age International",
      stock: "In Stock",
      overview: "Feedback & control.",
      review: "Well explained.",
      className: "Undergraduate",
    },
    {
      title: "Introduction to Flight",
      author: "John D. Anderson",
      publisher: "McGraw Hill",
      stock: "In Stock",
      overview: "Aerospace fundamentals.",
      review: "Very interesting.",
      className: "Undergraduate",
    },
  ],

  law: [
    {
      title: "Constitution of India",
      author: "P.M. Bakshi",
      publisher: "Universal Law Publishing",
      stock: "In Stock",
      overview: "Explains Indian Constitution.",
      review: "Fundamental reference.",
      className: "Law Undergraduate",
    },
    {
      title: "Introduction to Jurisprudence",
      author: "Salmond",
      publisher: "Sweet & Maxwell",
      stock: "In Stock",
      overview: "Philosophy of law.",
      review: "Classic text.",
      className: "Law Undergraduate",
    },
    {
      title: "Principles of Mercantile Law",
      author: "Avtar Singh",
      publisher: "Eastern Book Company",
      stock: "In Stock",
      overview: "Covers business law.",
      review: "Widely used.",
      className: "Law Undergraduate",
    },
    {
      title: "Constitutional Law of India",
      author: "J.N. Pandey",
      publisher: "Central Law Agency",
      stock: "In Stock",
      overview: "Detailed coverage of Indian constitutional law.",
      review: "Highly recommended.",
      className: "Law Undergraduate",
    },
    {
      title: "International Law",
      author: "S.K. Kapoor",
      publisher: "Central Law Publications",
      stock: "In Stock",
      overview: "Explains international legal principles.",
      review: "Good coverage.",
      className: "Law Postgraduate",
    },
    {
      title: "Criminal Law",
      author: "K.D. Gaur",
      publisher: "LexisNexis",
      stock: "In Stock",
      overview: "Detailed Indian penal code.",
      review: "Standard reference.",
      className: "Law Undergraduate",
    },
    {
      title: "Law of Evidence",
      author: "Batuk Lal",
      publisher: "Central Law Agency",
      stock: "In Stock",
      overview: "Details law of evidence in India.",
      review: "Important book.",
      className: "Law Undergraduate",
    },
    {
      title: "Environmental Law",
      author: "S.C. Shastri",
      publisher: "Eastern Book Company",
      stock: "Out of Stock",
      overview: "Focuses on environmental issues.",
      review: "Well written.",
      className: "Law Postgraduate",
    },
    {
      title: "Family Law in India",
      author: "Paras Diwan",
      publisher: "Allahabad Law Agency",
      stock: "In Stock",
      overview: "Marriage, divorce, inheritance laws.",
      review: "Good detail.",
      className: "Law Undergraduate",
    },
    {
      title: "Labour and Industrial Law",
      author: "P.L. Malik",
      publisher: "Eastern Book Company",
      stock: "In Stock",
      overview: "Industrial & labour law.",
      review: "Important for practice.",
      className: "Law Postgraduate",
    },
  ],
};

/* Categories list (matches StudyPage.js routes) */
const categoriesList = [
  "mathematics",
  "economics",
  "physics",
  "chemistry",
  "biology",
  // "computerScience",
  "engineering",
  "law",
];

/* Utility: format keys → display names */
const displayName = (k) =>
  k ? k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function StudyCategories() {
  const { category } = useParams(); // get /study/:category
  const navigate = useNavigate();
  const location = useLocation(); // used for history management

  const key = (category || "").toLowerCase(); // e.g. "math"
  const books = rawStudyBooks[key] || []; // books for that category

  // eslint-disable-next-line no-unused-vars
   const [cart, setCart] = useState([]); // Track added-to-cart books
   
  /* ---------------- Add to Cart Handler ---------------- */
  const handleAddToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    console.log("Added to cart:", book.title);
  };
    // Clear history when returning to dashboard
    useEffect(() => {
      if (location.state?.fromDashboard) {
        window.history.replaceState({}, document.title);
      }
    }, [location]);

  return (
    <div
      className="study-container"
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
      <div className="study-overlay" />

      {/* Layout split: Left panel vs Right content */}
      <div className="study-categories-container">
        <div className="study-layout">
          {/* ---------------- LEFT PANEL ---------------- */}
          <aside className="study-left-panel">
            {/* Dashboard link */}
            <div className="study-dashboard-link">
              <button
              className="study-dashboard-button"
               onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              </div>

            {/* Categories list */}
                       <h3 className="study-left-title" style={{ marginTop: 8 }}>
                         Study Categories
                       </h3>
                       <ul className="study-left-categories">
                         {categoriesList.map((cat) => (
                           <li key={cat}>
                             <Link
                               to={`/study/${cat}`}
                               className="study-category-link"
                             >
                               {displayName(cat)}
                             </Link>
                           </li>
                         ))}
                       </ul>
                       </aside>

          {/* {/* ---------------- RIGHT CONTENT ---------------- */}
          <section className="study-right-content">
            {/* Category heading */}
            <h2
              className={`study-category-title ${
                key === "chemistry" ? "fantasy-heading" : ""
              }`}
            >
              {key ? `${displayName(key)} Books` : "Select a category"}
            </h2>

            {/* If no category selected */}
            {!key ? (
              <p>Please choose a category from the left.</p>
            ) : (
              <div className="study-shelves">
                {/* Book grid: 9 slots per shelf (3 per row) */}
                <div className="study-book-grid">
                  {books.map((b, idx) => (
                    <div className="book-card-wrapper" key={idx}>
                      {/* Pass handleAddToCart to Book */}
                      <Book book={b} onAddToCart={handleAddToCart} />
                    </div>
                  ))}

                  {/* Empty slots to fill complete grid */}
                  {Array.from({ length: (9 - (books.length % 9)) % 9 }).map(
                    (_, idx) => (
                      <div
                        key={`empty-${idx}`}
                        className="study-book-slot empty"
                      />
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