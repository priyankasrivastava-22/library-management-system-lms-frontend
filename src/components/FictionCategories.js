// File: src/components/FictionCategories.js
// Displays books for a selected Fiction category (e.g., Fantasy)

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import dashboardBg from "./image/dashboard-bg.jpg";
import "./FictionPage.css"; // reuse same background + styling

// // Simple Back button component
// const BackBar = ({ onBack }) => (
//   <div style={{ marginTop: 12 }}>
//     <button
//       onClick={onBack}
//       style={{ padding: "8px 14px", cursor: "pointer" }}
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

export default function FictionCategories() {
  const { category } = useParams(); // get category from URL; e.g. "fantasy"
  const navigate = useNavigate();   // navigation hook

  // 10 books per Fiction category (sample set)
  const fictionBooks = {
    "fantasy": [
      { title: "Harry Potter and the Sorcerer’s Stone", author: "J.K. Rowling" },
      { title: "The Hobbit", author: "J.R.R. Tolkien" },
      { title: "The Name of the Wind", author: "Patrick Rothfuss" },
      { title: "Mistborn: The Final Empire", author: "Brandon Sanderson" },
      { title: "A Game of Thrones", author: "George R.R. Martin" },
      { title: "The Way of Kings", author: "Brandon Sanderson" },
      { title: "The Last Wish (The Witcher)", author: "A. Sapkowski" },
      { title: "Eragon", author: "Christopher Paolini" },
      { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis" },
      { title: "American Gods", author: "Neil Gaiman" },
    ],
    "mystery": [
      { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson" },
      { title: "Gone Girl", author: "Gillian Flynn" },
      { title: "Big Little Lies", author: "Liane Moriarty" },
      { title: "The Da Vinci Code", author: "Dan Brown" },
      { title: "In the Woods", author: "Tana French" },
      { title: "And Then There Were None", author: "Agatha Christie" },
      { title: "The Silent Patient", author: "Alex Michaelides" },
      { title: "The Cuckoo’s Calling", author: "Robert Galbraith" },
      { title: "Sharp Objects", author: "Gillian Flynn" },
      { title: "The Woman in the Window", author: "A.J. Finn" },
    ],
    "romance": [
      { title: "Pride and Prejudice", author: "Jane Austen" },
      { title: "Me Before You", author: "Jojo Moyes" },
      { title: "The Notebook", author: "Nicholas Sparks" },
      { title: "Outlander", author: "Diana Gabaldon" },
      { title: "The Hating Game", author: "Sally Thorne" },
      { title: "The Time Traveler’s Wife", author: "A. Niffenegger" },
      { title: "It Ends with Us", author: "Colleen Hoover" },
      { title: "The Kiss Quotient", author: "Helen Hoang" },
      { title: "Red, White & Royal Blue", author: "Casey McQuiston" },
      { title: "Beach Read", author: "Emily Henry" },
    ],
    "science fiction": [
      { title: "Dune", author: "Frank Herbert" },
      { title: "Ender’s Game", author: "Orson Scott Card" },
      { title: "Foundation", author: "Isaac Asimov" },
      { title: "Neuromancer", author: "William Gibson" },
      { title: "Snow Crash", author: "Neal Stephenson" },
      { title: "The Martian", author: "Andy Weir" },
      { title: "Hyperion", author: "Dan Simmons" },
      { title: "Old Man’s War", author: "John Scalzi" },
      { title: "Ready Player One", author: "Ernest Cline" },
      { title: "Annihilation", author: "Jeff VanderMeer" },
    ],
    "thriller": [
      { title: "The Girl on the Train", author: "Paula Hawkins" },
      { title: "The Shining", author: "Stephen King" },
      { title: "The Silence of the Lambs", author: "Thomas Harris" },
      { title: "Shutter Island", author: "Dennis Lehane" },
      { title: "The Firm", author: "John Grisham" },
      { title: "Dark Places", author: "Gillian Flynn" },
      { title: "The Couple Next Door", author: "Shari Lapena" },
      { title: "Before I Go to Sleep", author: "S.J. Watson" },
      { title: "The Reversal", author: "Michael Connelly" },
      { title: "The Bourne Identity", author: "Robert Ludlum" },
    ],
    "historical": [
      { title: "The Book Thief", author: "Markus Zusak" },
      { title: "All the Light We Cannot See", author: "Anthony Doerr" },
      { title: "Wolf Hall", author: "Hilary Mantel" },
      { title: "The Pillars of the Earth", author: "Ken Follett" },
      { title: "A Gentleman in Moscow", author: "Amor Towles" },
      { title: "Memoirs of a Geisha", author: "Arthur Golden" },
      { title: "The Nightingale", author: "Kristin Hannah" },
      { title: "War and Peace", author: "Leo Tolstoy" },
      { title: "The Other Boleyn Girl", author: "Philippa Gregory" },
      { title: "Out of Africa", author: "Isak Dinesen" },
    ],
    "children": [
      { title: "Matilda", author: "Roald Dahl" },
      { title: "Charlotte’s Web", author: "E.B. White" },
      { title: "The Cat in the Hat", author: "Dr. Seuss" },
      { title: "The Very Hungry Caterpillar", author: "Eric Carle" },
      { title: "Where the Wild Things Are", author: "Maurice Sendak" },
      { title: "Goodnight Moon", author: "M. W. Brown" },
      { title: "Dog Man", author: "Dav Pilkey" },
      { title: "Diary of a Wimpy Kid", author: "Jeff Kinney" },
      { title: "The Tale of Peter Rabbit", author: "Beatrix Potter" },
      { title: "Wonder", author: "R.J. Palacio" },
    ],
  };

  // Normalize URL param: replace '-' with space for lookup
  const key = (category || "").toLowerCase().replace(/-/g, " ");
  const list = fictionBooks[key] || [];      // get books list


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
      {/* TopBar shows Profile, Notifications, Cart */}
        <TopBar />

      {/* Page Header */}
      <h1 style={{ textAlign: "center", textShadow: "2px 2px 8px #000" }}>
        Fiction — {category?.replace(/-/g, " ").toUpperCase()}
      </h1>
    
      {/* Back Button
      <BackBar onBack={() => navigate(-1)} /> */}

      {/* Books list */}
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
