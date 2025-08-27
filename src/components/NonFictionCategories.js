// File: src/components/nonfictionCategories.js
// ==================================================
// PAGE: Books for a selected nonfiction category (e.g., /nonfiction/biography)
//
// Layout:
//  - Left panel: Section switch + clickable categories
//  - Right content: Category title + shelves of books
//  - Books arranged in grid: 12 slots per row (3 rows x 4 columns)
//  - Each Book expands inline with dropdown details (overview, review, etc.)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Book from "./Book"; // Book card with dropdown
import dashboardBg from "./image/dashboard-bg.jpg";
import "./NonFictionPage.css"; // reuse styling for consistency

/* ---------------- Dummy nonfiction Books Data ----------------
   Each category has 10 books.
   Fields: title, author, publisher, stock, overview, review
---------------------------------------------------------------- */
const rawnonfictionBooks = {
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
  history: [
    {
      title: "Guns, Germs, and Steel",
      author: "Jared Diamond",
      publisher: "W. W. Norton & Company",
      year: 1997,
      stock: 12,
      review: "A Pulitzer Prize-winning exploration of how geography shaped civilizations."
    },
    {
      title: "The Silk Roads",
      author: "Peter Frankopan",
      publisher: "Vintage",
      year: 2015,
      stock: 8,
      review: "A sweeping narrative of trade routes that connected East and West."
    },
    {
      title: "SPQR: A History of Ancient Rome",
      author: "Mary Beard",
      publisher: "Liveright",
      year: 2015,
      stock: 10,
      review: "A fresh look at the Roman Empire from one of the greatest historians."
    },
    {
      title: "The Wright Brothers",
      author: "David McCullough",
      publisher: "Simon & Schuster",
      year: 2015,
      stock: 6,
      review: "The inspiring story of two brothers who changed aviation forever."
    },
    {
      title: "1776",
      author: "David McCullough",
      publisher: "Simon & Schuster",
      year: 2005,
      stock: 14,
      review: "A vivid account of America's founding year."
    },
    {
      title: "The Splendid and the Vile",
      author: "Erik Larson",
      publisher: "Crown",
      year: 2020,
      stock: 9,
      review: "A gripping account of Winston Churchill during the Blitz."
    },
    {
      title: "Postwar: A History of Europe Since 1945",
      author: "Tony Judt",
      publisher: "Penguin",
      year: 2005,
      stock: 7,
      review: "A landmark book on Europe's transformation after WWII."
    },
    {
      title: "Team of Rivals",
      author: "Doris Kearns Goodwin",
      publisher: "Simon & Schuster",
      year: 2005,
      stock: 5,
      review: "The political genius of Abraham Lincoln."
    },
    {
      title: "The Crusades: The Authoritative History",
      author: "Thomas Asbridge",
      publisher: "Harper Perennial",
      year: 2011,
      stock: 11,
      review: "Definitive account of the holy wars of medieval history."
    },
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      publisher: "Contact Publishing",
      year: 1947,
      stock: 20,
      review: "The enduring testimony of life during the Holocaust."
    }
  ],
  science: [
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      publisher: "Bantam",
      year: 1988,
      stock: 15,
      review: "A classic exploration of the universe by one of the greatest minds."
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      publisher: "Oxford University Press",
      year: 1976,
      stock: 10,
      review: "Introduced the concept of genes as the primary units of evolution."
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      publisher: "Random House",
      year: 1980,
      stock: 12,
      review: "A timeless exploration of the universe and humanity's place in it."
    },
    {
      title: "The Gene: An Intimate History",
      author: "Siddhartha Mukherjee",
      publisher: "Scribner",
      year: 2016,
      stock: 8,
      review: "A sweeping history of the gene and its role in human identity."
    },
    {
      title: "Silent Spring",
      author: "Rachel Carson",
      publisher: "Houghton Mifflin",
      year: 1962,
      stock: 7,
      review: "The book that launched the environmental movement."
    },
    {
      title: "The Immortal Life of Henrietta Lacks",
      author: "Rebecca Skloot",
      publisher: "Crown",
      year: 2010,
      stock: 6,
      review: "The story of HeLa cells and their impact on science."
    },
    {
      title: "The Order of Time",
      author: "Carlo Rovelli",
      publisher: "Riverhead Books",
      year: 2018,
      stock: 9,
      review: "A poetic journey through the nature of time."
    },
    {
      title: "Why We Sleep",
      author: "Matthew Walker",
      publisher: "Scribner",
      year: 2017,
      stock: 13,
      review: "Groundbreaking science on the importance of sleep."
    },
    {
      title: "The Body: A Guide for Occupants",
      author: "Bill Bryson",
      publisher: "Doubleday",
      year: 2019,
      stock: 10,
      review: "A witty and fascinating exploration of the human body."
    },
    {
      title: "Astrophysics for People in a Hurry",
      author: "Neil deGrasse Tyson",
      publisher: "W. W. Norton",
      year: 2017,
      stock: 14,
      review: "A short and fun introduction to astrophysics."
    }
  ],
  philosophy: [
    { title: "Meditations", author: "Marcus Aurelius", publisher: "Penguin Classics", year: 180, stock: 20, review: "A timeless classic of Stoic philosophy." },
    { title: "The Republic", author: "Plato", publisher: "Penguin Classics", year: -380, stock: 12, review: "A foundational work of Western political thought." },
    { title: "Beyond Good and Evil", author: "Friedrich Nietzsche", publisher: "Vintage", year: 1886, stock: 9, review: "A critique of morality and truth." },
    { title: "Critique of Pure Reason", author: "Immanuel Kant", publisher: "Cambridge University Press", year: 1781, stock: 6, review: "One of philosophy’s most difficult but influential works." },
    { title: "Being and Time", author: "Martin Heidegger", publisher: "Harper Perennial", year: 1927, stock: 5, review: "A groundbreaking work in existential philosophy." },
    { title: "The Prince", author: "Niccolò Machiavelli", publisher: "Penguin Classics", year: 1532, stock: 15, review: "A pragmatic guide to power and politics." },
    { title: "On Liberty", author: "John Stuart Mill", publisher: "Penguin Classics", year: 1859, stock: 11, review: "A defense of individual freedom against state control." },
    { title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", publisher: "Modern Library", year: 1883, stock: 8, review: "Nietzsche’s most poetic and influential work." },
    { title: "The Myth of Sisyphus", author: "Albert Camus", publisher: "Vintage", year: 1942, stock: 10, review: "An essay on absurdism and human meaning." },
    { title: "Confessions", author: "St. Augustine", publisher: "Oxford University Press", year: 398, stock: 7, review: "A spiritual autobiography and philosophical reflection." }
  ],
  travel: [
    { title: "Into the Wild", author: "Jon Krakauer", publisher: "Anchor Books", year: 1996, stock: 12, review: "The story of Chris McCandless's journey into Alaska." },
    { title: "In Patagonia", author: "Bruce Chatwin", publisher: "Vintage", year: 1977, stock: 8, review: "A travel classic about Patagonia." },
    { title: "The Great Railway Bazaar", author: "Paul Theroux", publisher: "Penguin", year: 1975, stock: 10, review: "A journey by train through Asia." },
    { title: "Travels with Charley", author: "John Steinbeck", publisher: "Penguin", year: 1962, stock: 7, review: "Steinbeck’s American road trip with his dog Charley." },
    { title: "A Walk in the Woods", author: "Bill Bryson", publisher: "Broadway Books", year: 1998, stock: 11, review: "A humorous account of hiking the Appalachian Trail." },
    { title: "Eat, Pray, Love", author: "Elizabeth Gilbert", publisher: "Riverhead Books", year: 2006, stock: 15, review: "A memoir of travel and self-discovery." },
    { title: "Vagabonding", author: "Rolf Potts", publisher: "Random House", year: 2002, stock: 9, review: "A guide to long-term travel and adventure." },
    { title: "Seven Years in Tibet", author: "Heinrich Harrer", publisher: "Penguin", year: 1952, stock: 6, review: "An Austrian mountaineer’s story in Tibet." },
    { title: "Wild", author: "Cheryl Strayed", publisher: "Vintage", year: 2012, stock: 13, review: "A memoir of hiking the Pacific Crest Trail." },
    { title: "The Geography of Bliss", author: "Eric Weiner", publisher: "Twelve", year: 2008, stock: 10, review: "A humorous search for the happiest places on earth." }
  ],
  truecrime: [
    { title: "In Cold Blood", author: "Truman Capote", publisher: "Random House", year: 1966, stock: 12, review: "A pioneering work of narrative true crime." },
    { title: "Helter Skelter", author: "Vincent Bugliosi", publisher: "W. W. Norton", year: 1974, stock: 9, review: "The story of the Manson murders." },
    { title: "The Stranger Beside Me", author: "Ann Rule", publisher: "W. W. Norton", year: 1980, stock: 8, review: "True story of Ted Bundy by someone who knew him." },
    { title: "I'll Be Gone in the Dark", author: "Michelle McNamara", publisher: "HarperCollins", year: 2018, stock: 11, review: "A hunt for the Golden State Killer." },
    { title: "Mindhunter", author: "John E. Douglas", publisher: "Scribner", year: 1995, stock: 7, review: "The FBI’s original criminal profilers." },
    { title: "Columbine", author: "Dave Cullen", publisher: "Twelve", year: 2009, stock: 6, review: "A detailed account of the Columbine tragedy." },
    { title: "American Predator", author: "Maureen Callahan", publisher: "Viking", year: 2019, stock: 10, review: "The hunt for serial killer Israel Keyes." },
    { title: "The Devil in the White City", author: "Erik Larson", publisher: "Crown", year: 2003, stock: 13, review: "A blend of true crime and history in Chicago." },
    { title: "Lost Girls", author: "Robert Kolker", publisher: "Harper", year: 2013, stock: 9, review: "An unsolved case of murdered women on Long Island." },
    { title: "Green River, Running Red", author: "Ann Rule", publisher: "Pocket Books", year: 2004, stock: 8, review: "The case of the Green River Killer." }
  ],
};

/* Categories list (matches nonfictionPage.js routes) */
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
  const location = useLocation();

  const key = (category || "").toLowerCase();
  const books = rawnonfictionBooks[key] || [];

    const [cart, setCart] = useState([]); // Track added-to-cart books

     /* ---------------- Add to Cart Handler ---------------- */
      const handleAddToCart = (book) => {
        setCart((prevCart) => [...prevCart, book]);
        console.log("Added to cart:", book.title);
      };
    
      /* ---------------- Clear browser history state if coming from dashboard ---------------- */
      useEffect(() => {
        if (location.state?.fromDashboard) {
          window.history.replaceState({}, document.title);
        }
      }, [location]);
  
  return (
    <div
      className="nonfiction-container"
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
      <div className="nonfiction-overlay" />

      {/* ---------------- Layout: Left panel + Right content ---------------- */}
      <div className="nonfiction-categories-container">
        <div className="nonfiction-layout">

          {/* ---------------- LEFT PANEL ---------------- */}
          <aside className="nonfiction-left-panel">
             {/* Dashboard button */}
            <div className="nonfiction-dashboard-link">
              <button 
              className="nonfiction-dashboard-button" 
              onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </div>

            {/* Categories list */}
            <h3 className="nonfiction-left-title" style={{ marginTop: 8 }}>
              Non Fiction Categories
            </h3>
            <ul className="nonfiction-left-categories">
              {categoriesList.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/nonfiction/${cat}`}
                    className="nonfiction-category-link"
                  >
                    {displayName(cat)}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* ---------------- RIGHT CONTENT ---------------- */}
          <section className="nonfiction-right-content">
            {/* Category heading */}
            <h2
              className={`nonfiction-category-title ${
                key === "phylosophy" ? "phylosophy-heading" : ""
              }`}
            >
              {key ? `${displayName(key)} Books` : "Select a category"}
            </h2>

            {/* If no category selected */}
            {!key ? (
              <p>Please choose a category from the left.</p>
            ) : (
              <div className="nonfiction-shelves">
                {/* Book grid: 9 slots per shelf (3 per row) */}
                <div className="nonfiction-book-grid">
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
                        className="nonfiction-book-slot empty"
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