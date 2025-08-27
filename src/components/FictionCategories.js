// File: src/components/FictionCategories.js
// ==================================================
// PAGE: Books for a selected Fiction category (e.g., /fiction/fantasy)
// Layout:
//  - Left panel: Section switch + clickable categories
//  - Right content: Category title + shelves of books
//  - Books arranged in grid: 12 slots per row (3 rows x 4 columns = shelf)
//  - Each Book expands inline with dropdown details (overview, review, etc.)

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Book from "./Book"; // Book card component
import dashboardBg from "./image/dashboard-bg.jpg";
import "./FictionPage.css"; // reuse styling

/* ---------------- Dummy Books Data ---------------- */
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
  romance: [
      { title: "Pride and Prejudice", author: "Jane Austen", publisher: "T. Egerton", stock: 8, review: "Classic romance." },
      { title: "Me Before You", author: "Jojo Moyes", publisher: "Michael Joseph", stock: 6, review: "Heartfelt love story." },
      { title: "The Notebook", author: "Nicholas Sparks", publisher: "Warner Books", stock: 10, review: "Emotional and timeless." },
      { title: "It Ends With Us", author: "Colleen Hoover", publisher: "Atria Books", stock: 7, review: "Bestseller romance." },
      { title: "Outlander", author: "Diana Gabaldon", publisher: "Delacorte Press", stock: 5, review: "Romance with time travel." },
      { title: "The Kiss Quotient", author: "Helen Hoang", publisher: "Berkley", stock: 9, review: "Modern love story." },
      { title: "Twilight", author: "Stephenie Meyer", publisher: "Little, Brown", stock: 12, review: "Romance fantasy." },
      { title: "Beautiful Disaster", author: "Jamie McGuire", publisher: "Atria Books", stock: 6, review: "College romance drama." },
      { title: "After", author: "Anna Todd", publisher: "Gallery Books", stock: 8, review: "Popular romance series." },
      { title: "Eleanor & Park", author: "Rainbow Rowell", publisher: "St. Martin’s Press", stock: 7, review: "Sweet YA romance." }
    ],
  thriller: [
      { title: "Gone Girl", author: "Gillian Flynn", publisher: "Crown", stock: 10, review: "Psychological thriller." },
      { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", publisher: "Norstedts", stock: 9, review: "Crime mystery." },
      { title: "The Da Vinci Code", author: "Dan Brown", publisher: "Doubleday", stock: 11, review: "Fast-paced thriller." },
      { title: "Shutter Island", author: "Dennis Lehane", publisher: "William Morrow", stock: 7, review: "Mind-bending story." },
      { title: "The Silent Patient", author: "Alex Michaelides", publisher: "Celadon", stock: 8, review: "Suspenseful novel." },
      { title: "Before I Go to Sleep", author: "S.J. Watson", publisher: "Harper", stock: 6, review: "Unreliable memory thriller." },
      { title: "Behind Closed Doors", author: "B.A. Paris", publisher: "St. Martin’s", stock: 7, review: "Dark domestic thriller." },
      { title: "The Couple Next Door", author: "Shari Lapena", publisher: "Viking", stock: 8, review: "Twisty mystery." },
      { title: "No Exit", author: "Taylor Adams", publisher: "Joffe Books", stock: 6, review: "Locked room thriller." },
      { title: "The Woman in the Window", author: "A.J. Finn", publisher: "William Morrow", stock: 9, review: "Hitchcock-style suspense." }
    ],
  historical: [
      { title: "The Book Thief", author: "Markus Zusak", publisher: "Picador", stock: 10, review: "WWII perspective." },
      { title: "All the Light We Cannot See", author: "Anthony Doerr", publisher: "Scribner", stock: 12, review: "Pulitzer-winning WWII novel." },
      { title: "Wolf Hall", author: "Hilary Mantel", publisher: "Fourth Estate", stock: 8, review: "Tudor England drama." },
      { title: "The Nightingale", author: "Kristin Hannah", publisher: "St. Martin’s", stock: 9, review: "Women in WWII." },
      { title: "A Gentleman in Moscow", author: "Amor Towles", publisher: "Viking", stock: 7, review: "Russian aristocrat’s story." },
      { title: "War and Peace", author: "Leo Tolstoy", publisher: "The Russian Messenger", stock: 6, review: "Epic historical saga." },
      { title: "The Pillars of the Earth", author: "Ken Follett", publisher: "Macmillan", stock: 10, review: "Cathedral building era." },
      { title: "Memoirs of a Geisha", author: "Arthur Golden", publisher: "Knopf", stock: 8, review: "Japan’s hidden world." },
      { title: "The Paris Architect", author: "Charles Belfoure", publisher: "Sourcebooks", stock: 7, review: "WWII occupation era." },
      { title: "The Tattooist of Auschwitz", author: "Heather Morris", publisher: "Zaffre", stock: 9, review: "True Holocaust love story." }
    ],
  children: [
      { title: "Harry Potter and the Sorcerer’s Stone", author: "J.K. Rowling", publisher: "Bloomsbury", stock: 15, review: "Magical adventure." },
      { title: "Charlotte’s Web", author: "E.B. White", publisher: "Harper", stock: 8, review: "Farmyard friendship." },
      { title: "Matilda", author: "Roald Dahl", publisher: "Jonathan Cape", stock: 10, review: "Gifted child’s tale." },
      { title: "The Very Hungry Caterpillar", author: "Eric Carle", publisher: "World Publishing", stock: 12, review: "Classic picture book." },
      { title: "The Cat in the Hat", author: "Dr. Seuss", publisher: "Random House", stock: 9, review: "Fun rhyming classic." },
      { title: "Alice’s Adventures in Wonderland", author: "Lewis Carroll", publisher: "Macmillan", stock: 7, review: "Fantasy children’s story." },
      { title: "Percy Jackson: The Lightning Thief", author: "Rick Riordan", publisher: "Disney-Hyperion", stock: 11, review: "Greek mythology adventure." },
      { title: "The Gruffalo", author: "Julia Donaldson", publisher: "Macmillan", stock: 8, review: "Modern classic." },
      { title: "Winnie-the-Pooh", author: "A.A. Milne", publisher: "Methuen", stock: 6, review: "Timeless bear stories." },
      { title: "Peter Pan", author: "J.M. Barrie", publisher: "Hodder & Stoughton", stock: 7, review: "Neverland fantasy." }
    ],
  cook: [
  {
    title: "Mastering the Art of French Cooking",
    author: "Julia Child",
    publisher: "Knopf",
    year: 1961,
    isbn: "978-0375413407",
    pages: 726,
    description: "A classic French cooking guide covering techniques and recipes for both beginners and professionals."
  },
  {
    title: "Essentials of Classic Italian Cooking",
    author: "Marcella Hazan",
    publisher: "Knopf",
    year: 1992,
    isbn: "978-0394584041",
    pages: 704,
    description: "Definitive Italian cookbook that combines two of Hazan’s earlier works into one comprehensive guide."
  },
  {
    title: "The Joy of Cooking",
    author: "Irma S. Rombauer",
    publisher: "Scribner",
    year: 1997,
    isbn: "978-0743246262",
    pages: 1136,
    description: "A kitchen bible that covers recipes from everyday meals to elaborate dishes."
  },
  {
    title: "Salt, Fat, Acid, Heat",
    author: "Samin Nosrat",
    publisher: "Simon & Schuster",
    year: 2017,
    isbn: "978-1476753836",
    pages: 480,
    description: "A modern guide that teaches cooking fundamentals using four key elements of good food."
  },
  {
    title: "Plenty",
    author: "Yotam Ottolenghi",
    publisher: "Chronicle Books",
    year: 2010,
    isbn: "978-1452101248",
    pages: 288,
    description: "A vibrant collection of vegetarian recipes by the celebrated chef Yotam Ottolenghi."
  },
  {
    title: "The Food Lab",
    author: "J. Kenji López-Alt",
    publisher: "W. W. Norton & Company",
    year: 2015,
    isbn: "978-0393081084",
    pages: 960,
    description: "Explains the science of cooking with hundreds of recipes and experiments."
  },
  {
    title: "Indian-ish",
    author: "Priya Krishna",
    publisher: "Houghton Mifflin Harcourt",
    year: 2019,
    isbn: "978-1328482471",
    pages: 256,
    description: "Indian-American recipes blending traditional Indian food with modern twists."
  },
  {
    title: "Vegetarian Cooking for Everyone",
    author: "Deborah Madison",
    publisher: "Broadway Books",
    year: 1997,
    isbn: "978-0767927475",
    pages: 742,
    description: "Comprehensive vegetarian cookbook with more than 1,400 recipes."
  },
  {
    title: "Jerusalem: A Cookbook",
    author: "Yotam Ottolenghi, Sami Tamimi",
    publisher: "Ten Speed Press",
    year: 2012,
    isbn: "978-1607743941",
    pages: 320,
    description: "Middle Eastern recipes inspired by the diverse culture of Jerusalem."
  },
  {
    title: "The Flavor Bible",
    author: "Karen Page, Andrew Dornenburg",
    publisher: "Little, Brown and Company",
    year: 2008,
    isbn: "978-0316118408",
    pages: 392,
    description: "A reference guide to flavor combinations, designed to inspire creative cooking."
  }
    ],
};

/* Categories list */
const categoriesList = [
  "fantasy",
  "mystery",
  "romance",
  "thriller",
  "historical",
  "children",
  "cook",
];

/* ---------------- Utility to display names nicely ---------------- */
const displayName = (k) =>
  k ? k.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

export default function FictionCategories() {
  const { category } = useParams(); // Current category from URL
  const navigate = useNavigate();
  const location = useLocation();

  const key = (category || "").toLowerCase(); // normalize category
  const books = rawFictionBooks[key] || [];   // get books for current category

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
      className="fiction-container"
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
      <div className="fiction-overlay" /> {/* Transparent overlay for readability */}

      {/* ---------------- Layout: Left panel + Right content ---------------- */}
      <div className="fiction-categories-container">
        <div className="fiction-layout">
          
          {/* ---------------- LEFT PANEL ---------------- */}
          <aside className="fiction-left-panel">
            {/* Dashboard button */}
            <div className="fiction-dashboard-link">
              <button
                className="fiction-dashboard-button"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </div>

            {/* Categories list */}
            <h3 className="fiction-left-title" style={{ marginTop: 8 }}>
              Fiction Categories
            </h3>
            <ul className="fiction-left-categories">
              {categoriesList.map((cat) => (
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

          {/* ---------------- RIGHT CONTENT ---------------- */}
          <section className="fiction-right-content">
            {/* Category heading */}
            <h2
              className={`fiction-category-title ${
                key === "fantasy" ? "fantasy-heading" : ""
              }`}
            >
              {key ? `${displayName(key)} Books` : "Select a category"}
            </h2>

            {/* If no category selected */}
            {!key ? (
              <p>Please choose a category from the left.</p>
            ) : (
              <div className="fiction-shelves">
                {/* Book grid: 9 slots per shelf (3 per row) */}
                <div className="fiction-book-grid">
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
                        className="fiction-book-slot empty"
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