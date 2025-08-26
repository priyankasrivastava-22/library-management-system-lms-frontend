// // File: src/components/BackButton.js
// // ==================================
// // PURPOSE:
// // - Shows a Back button in the bottom-right corner
// // - Handles click and keyboard "Backspace" to navigate back

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BackButton() {
//   const navigate = useNavigate();

//   // Handle Backspace key press
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // ✅ Backspace triggers navigate back
//       if (e.key === "Backspace") {
//         e.preventDefault(); // prevent default browser action
//         navigate(-1);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     // Clean up listener on component unmount
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [navigate]);

//   return (
//     <button
//       onClick={() => navigate(-1)}
//       style={{
//         position: "fixed", // stay at bottom-right
//         bottom: "20px",
//         right: "20px",
//         padding: "12px 20px",
//         borderRadius: "8px",
//         border: "none",
//         backgroundColor: "rgba(0,0,0,0.7)",
//         color: "white",
//         fontWeight: "bold",
//         cursor: "pointer",
//         zIndex: 1000, // on top of everything
//         boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//       }}
//     >
//       ⬅ Back
//     </button>
//   );
// }




// File: src/components/BackButton.js
// ==================================
// PURPOSE:
// - Always show a back button at bottom-right corner
// - Handles mouse click and keyboard Backspace for navigation

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  // Function to go back
  const goBack = () => {
    navigate(-1);
  };

  // Listen for keyboard Backspace
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Backspace") {
        e.preventDefault(); // prevent browser default
        goBack();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <button
      onClick={goBack}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 18px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "#fff",
        fontSize: "16px",
        zIndex: 9999, // always on top
      }}
    >
      ⬅ Back
    </button>
  );
}
