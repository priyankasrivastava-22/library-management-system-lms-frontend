// // File: src/components/NonFictionCategories.js
// // This page will show different categories inside Non-Fiction

// import React from "react";

// export default function NonFictionCategories() {
//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       {/* Page Heading */}
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         Non-Fiction Categories
//       </h1>

//       {/* Non-fiction category buttons */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//         <button style={btnStyle}>Biography</button>
//         <button style={btnStyle}>Self-Help</button>
//         <button style={btnStyle}>History</button>
//         <button style={btnStyle}>Science</button>
//       </div>
//     </div>
//   );
// }

// const btnStyle = {
//   padding: "12px 24px",
//   fontSize: "16px",
//   borderRadius: "8px",
//   border: "none",
//   backgroundColor: "#2196F3",
//   color: "white",
//   cursor: "pointer",
// };



// ==========================
// File: src/components/NonFictionCategories.js
// ==========================
// PURPOSE:
// - When a Non-Fiction category is clicked, show 10 books for that category
// - URL: /nonfiction/:category
// - Kept your category names, including "Science Fiction" (even though it's usually fiction)

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dashboardBg from "./image/dashboard-bg.jpg";
import "./NonFictionPage"; // reuse same background + styling
import TopBar from "./TopBar"; // import profile, status, cart buttons
import BackButton from "./BackButton"; // import back button


// // Simple Back button component
// const BackBar = ({ onBack }) => (
//   <div style={{ marginTop: 12 }}>
//     <button onClick={onBack} 
//     style={{ padding: "8px 14px", cursor: "pointer" }}
//     >
//       ⬅ Back
//     </button>
//   </div>
// );

// Reusable card styling
const cardStyle = {
  width: "200px",
  height: "250px",
  background: "rgba(0,0,0,0.6)",
  borderRadius: "15px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#fff",
  transition: "0.3s",
};

export default function NonFictionCategories() {
  const { category } = useParams(); // get category from URL; e.g. "biographies"
  const navigate = useNavigate();   // navigation hook

  // 10 books per Non-Fiction category (sample set)
  const nonFictionBooks = {
    "biographies": [
      { title: "The Diary of a Young Girl", author: "Anne Frank" },
      { title: "Long Walk to Freedom", author: "Nelson Mandela" },
      { title: "Steve Jobs", author: "Walter Isaacson" },
      { title: "Becoming", author: "Michelle Obama" },
      { title: "Einstein: His Life and Universe", author: "Walter Isaacson" },
      { title: "Educated", author: "Tara Westover" },
      { title: "The Glass Castle", author: "Jeannette Walls" },
      { title: "When Breath Becomes Air", author: "Paul Kalanithi" },
      { title: "Open", author: "Andre Agassi" },
      { title: "Into the Wild", author: "Jon Krakauer" },
    ],
    "self help": [
      { title: "Atomic Habits", author: "James Clear" },
      { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey" },
      { title: "How to Win Friends & Influence People", author: "Dale Carnegie" },
      { title: "The Power of Now", author: "Eckhart Tolle" },
      { title: "Mindset", author: "Carol S. Dweck" },
      { title: "Deep Work", author: "Cal Newport" },
      { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
      { title: "Grit", author: "Angela Duckworth" },
      { title: "Think and Grow Rich", author: "Napoleon Hill" },
      { title: "Make Your Bed", author: "Admiral W. H. McRaven" },
    ],
    "history": [
      { title: "Sapiens", author: "Yuval Noah Harari" },
      { title: "Guns, Germs, and Steel", author: "Jared Diamond" },
      { title: "The Silk Roads", author: "Peter Frankopan" },
      { title: "The Wright Brothers", author: "David McCullough" },
      { title: "Team of Rivals", author: "Doris Kearns Goodwin" },
      { title: "The Second World War", author: "Antony Beevor" },
      { title: "Postwar", author: "Tony Judt" },
      { title: "The Warmth of Other Suns", author: "Isabel Wilkerson" },
      { title: "The Crusades", author: "Thomas Asbridge" },
      { title: "Gulag Archipelago (Abridged)", author: "A. Solzhenitsyn" },
    ],
    "science fiction": [
      // keeping your label, but listing popular science / science-adjacent nonfiction:
      { title: "A Brief History of Time", author: "Stephen Hawking" },
      { title: "Cosmos", author: "Carl Sagan" },
      { title: "The Selfish Gene", author: "Richard Dawkins" },
      { title: "The Gene", author: "Siddhartha Mukherjee" },
      { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot" },
      { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson" },
      { title: "Chaos", author: "James Gleick" },
      { title: "The Emperor of All Maladies", author: "S. Mukherjee" },
      { title: "Why We Sleep", author: "Matthew Walker" },
      { title: "The Body", author: "Bill Bryson" },
    ],
    "travel": [
      { title: "Into Thin Air", author: "Jon Krakauer" },
      { title: "On the Road", author: "Jack Kerouac" },
      { title: "Vagabonding", author: "Rolf Potts" },
      { title: "A Walk in the Woods", author: "Bill Bryson" },
      { title: "The Art of Travel", author: "Alain de Botton" },
      { title: "Eat, Pray, Love", author: "Elizabeth Gilbert" },
      { title: "In Patagonia", author: "Bruce Chatwin" },
      { title: "The Great Railway Bazaar", author: "Paul Theroux" },
      { title: "Wild", author: "Cheryl Strayed" },
      { title: "The Geography of Bliss", author: "Eric Weiner" },
    ],
    "cookbooks": [
      { title: "Salt, Fat, Acid, Heat", author: "Samin Nosrat" },
      { title: "The Joy of Cooking", author: "Irma S. Rombauer" },
      { title: "Ottolenghi Simple", author: "Yotam Ottolenghi" },
      { title: "Essentials of Classic Italian Cooking", author: "Marcella Hazan" },
      { title: "Mastering the Art of French Cooking", author: "Julia Child" },
      { title: "Baking: From My Home to Yours", author: "Dorie Greenspan" },
      { title: "Plenty", author: "Yotam Ottolenghi" },
      { title: "The Food Lab", author: "J. Kenji López-Alt" },
      { title: "Jerusalem", author: "Yotam Ottolenghi" },
      { title: "Franklin Barbecue", author: "Aaron Franklin" },
    ],
    "philosophy": [
      { title: "Meditations", author: "Marcus Aurelius" },
      { title: "The Republic", author: "Plato" },
      { title: "Nicomachean Ethics", author: "Aristotle" },
      { title: "Beyond Good and Evil", author: "Friedrich Nietzsche" },
      { title: "Being and Time", author: "Martin Heidegger" },
      { title: "The Stranger", author: "Albert Camus" },
      { title: "Tao Te Ching", author: "Laozi" },
      { title: "Critique of Pure Reason", author: "Immanuel Kant" },
      { title: "The Myth of Sisyphus", author: "Albert Camus" },
      { title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche" },
    ],
  };

  const key = (category || "").toLowerCase();   // normalize URL param
  const list = nonFictionBooks[key] || [];      // get books list

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dashboardBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#fff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "relative",   // needed for TopBar's absolute position
      }}
    >
         {/* ===================== */}
      {/* ✅ TopBar shows Profile, Notifications, Cart */}
      {/* ===================== */}
      <TopBar />

       {/* ===================== */}
      {/* Page Header */}
      {/* ===================== */}
      <h1 style={{ textAlign: "center", textShadow: "2px 2px 8px #000" }}>
        Non-Fiction — {category?.toUpperCase()}
      </h1>

      
      {/* Back button */}
      {/* ===================== */}
      {/* <BackBar onBack={() => navigate(-1)} /> */}

        {/* ===================== */}
      {/* List of books */}
      {/* ===================== */}
      <div style={{ marginTop: 20, maxWidth: 900, marginInline: "auto" }}>
        {list.length === 0 ? (
          <p>No books found for this category.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {list.map((b, i) => (
              <li
                key={i}
                style={{
                  background: "rgba(0,0,0,0.6)",
                  marginBottom: 12,
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                <strong>{b.title}</strong> — {b.author}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Back button */}
            <BackButton />
    </div>
  );
}
