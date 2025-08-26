// // File: src/components/StudyCategories.js
// // This page will show different categories inside Study

// import React from "react";

// export default function StudyCategories() {
//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       {/* Page Heading */}
//       <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
//         Study Categories
//       </h1>

//       {/* Study category buttons */}
//       <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//         <button style={btnStyle}>Mathematics</button>
//         <button style={btnStyle}>Computer Science</button>
//         <button style={btnStyle}>Social Science</button>
//         <button style={btnStyle}>Languages</button>
//       </div>
//     </div>
//   );
// }

// const btnStyle = {
//   padding: "12px 24px",
//   fontSize: "16px",
//   borderRadius: "8px",
//   border: "none",
//   backgroundColor: "#FF9800",
//   color: "white",
//   cursor: "pointer",
// };




// ==========================
// File: src/components/StudyCategories.js
// ==========================
// PURPOSE:
// - When a Study category is clicked, show 10 books for that category
// - URL: /study/:category

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import dashboardBg from "./image/dashboard-bg.jpg";
import "./StudyPage.css"; // reuse same background + styling

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

export default function StudyCategories() {
  const { category } = useParams();   // get category from URL; e.g. "mathematics"
  const navigate = useNavigate();     // navigation hook

  // 10 books per Non-Fiction category (sample set)
  const studyBooks = {
    "mathematics": [
      { title: "Calculus", author: "James Stewart" },
      { title: "Linear Algebra Done Right", author: "Sheldon Axler" },
      { title: "Introduction to Probability", author: "Blitzstein & Hwang" },
      { title: "How Not to Be Wrong", author: "Jordan Ellenberg" },
      { title: "Concrete Mathematics", author: "Graham, Knuth, Patashnik" },
      { title: "Abstract Algebra", author: "Dummit & Foote" },
      { title: "Real Analysis", author: "Bartle & Sherbert" },
      { title: "The Princeton Companion to Mathematics", author: "Timothy Gowers" },
      { title: "A Mathematician’s Apology", author: "G.H. Hardy" },
      { title: "The Art of Problem Solving", author: "Sandor Lehoczky" },
    ],
    "physics": [
      { title: "The Feynman Lectures on Physics", author: "Feynman, Leighton, Sands" },
      { title: "A Brief History of Time", author: "Stephen Hawking" },
      { title: "Six Easy Pieces", author: "Richard P. Feynman" },
      { title: "The Elegant Universe", author: "Brian Greene" },
      { title: "Concepts of Physics", author: "H.C. Verma" },
      { title: "Quantum Mechanics: Concepts and Applications", author: "Nouredine Zettili" },
      { title: "Introduction to Electrodynamics", author: "David J. Griffiths" },
      { title: "Classical Mechanics", author: "Herbert Goldstein" },
      { title: "Relativity: The Special and the General Theory", author: "Albert Einstein" },
      { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson" },
    ],
    "chemistry": [
      { title: "Organic Chemistry", author: "Paula Yurkanis Bruice" },
      { title: "Inorganic Chemistry", author: "Shriver & Atkins" },
      { title: "Physical Chemistry", author: "Atkins & de Paula" },
      { title: "The Disappearing Spoon", author: "Sam Kean" },
      { title: "Napoleon's Buttons", author: "Penny Le Couteur" },
      { title: "Chemistry: The Central Science", author: "Brown, LeMay, Bursten" },
      { title: "Molecular Quantum Mechanics", author: "Atkins & Friedman" },
      { title: "Advanced Organic Chemistry", author: "Carey & Sundberg" },
      { title: "Principles of Instrumental Analysis", author: "Skoog et al." },
      { title: "Elements of Physical Chemistry", author: "Atkins" },
    ],
    "biology": [
      { title: "Campbell Biology", author: "Urry et al." },
      { title: "The Selfish Gene", author: "Richard Dawkins" },
      { title: "The Gene", author: "Siddhartha Mukherjee" },
      { title: "Molecular Biology of the Cell", author: "Alberts et al." },
      { title: "Your Inner Fish", author: "Neil Shubin" },
      { title: "Genome", author: "Matt Ridley" },
      { title: "The Origin of Species", author: "Charles Darwin" },
      { title: "Guns, Germs, and Steel", author: "Jared Diamond" },
      { title: "Why We Sleep", author: "Matthew Walker" },
      { title: "The Body", author: "Bill Bryson" },
    ],
    "computer science": [
      { title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest, Stein" },
      { title: "Clean Code", author: "Robert C. Martin" },
      { title: "Design Patterns", author: "Gamma et al." },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas" },
      { title: "Structure and Interpretation of Computer Programs", author: "Abelson & Sussman" },
      { title: "Operating Systems: Three Easy Pieces", author: "Remzi & Andrea Arpaci-Dusseau" },
      { title: "Computer Networks", author: "Andrew S. Tanenbaum" },
      { title: "Code Complete", author: "Steve McConnell" },
      { title: "You Don’t Know JS", author: "Kyle Simpson" },
      { title: "Grokking Algorithms", author: "Aditya Bhargava" },
    ],
    "law": [
      { title: "Constitution of India", author: "Government of India" },
      { title: "Introduction to the Study of the Law of the Constitution", author: "A.V. Dicey" },
      { title: "Letters to a Law Student", author: "Nicholas J. McBride" },
      { title: "The Rule of Law", author: "Tom Bingham" },
      { title: "Legal Writing in Plain English", author: "Bryan A. Garner" },
      { title: "The Path of the Law", author: "Oliver Wendell Holmes Jr." },
      { title: "Reading Law", author: "Antonin Scalia" },
      { title: "Indian Penal Code (Bare Act)", author: "Govt. of India" },
      { title: "A Matter of Interpretation", author: "Antonin Scalia" },
      { title: "Law and Economics", author: "Robert Cooter, Thomas Ulen" },
    ],
    "medicines": [
      { title: "Harrison's Principles of Internal Medicine", author: "J. Larry Jameson" },
      { title: "Robbins and Cotran Pathologic Basis of Disease", author: "Kumar, Abbas, Aster" },
      { title: "Guyton and Hall Textbook of Medical Physiology", author: "John E. Hall" },
      { title: "Gray’s Anatomy", author: "Susan Standring" },
      { title: "Bates’ Guide to Physical Examination", author: "Lynn Bickley" },
      { title: "Pocket Medicine", author: "Marc S. Sabatine" },
      { title: "Oxford Handbook of Clinical Medicine", author: "Ian B. Wilkinson" },
      { title: "Rapid Review Pathology", author: "Edward F. Goljan" },
      { title: "Robbins Basic Pathology", author: "Kumar, Abbas, Aster" },
      { title: "Clinical Microbiology Made Ridiculously Simple", author: "M. Gladwin" },
    ],
  };

  const key = (category || "").toLowerCase();       // normalize URL param
  const list = studyBooks[key] || [];               // get books list

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
        Study — {category?.toUpperCase()}
      </h1>

      {/* Back button
      <BackBar onBack={() => navigate(-1)} /> */}
      
      {/* List of books */}
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
