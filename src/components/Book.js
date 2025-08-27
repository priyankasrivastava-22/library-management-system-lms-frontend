// // // File: src/components/Book.js
// // // ===========================
// // // Reusable Book card component.
// // // - Shows book title in a compact card
// // // - Click the header to toggle a dropdown that reveals details (author, publisher, stock, review)
// // // - Designed to be placed inside a grid where each book occupies one column

// // import React, { useState } from "react";
// // import "./Book.css"; // styles for .book-card, .book-details

// // function Book({ book }) {
// //   // Controls whether the book's details are visible
// //   const [open, setOpen] = useState(false);

// //   // Defensive: if book is missing fields, show placeholders
// //   const title = book.title || "Untitled";
// //   const author = book.author || "Unknown author";
// //   const publisher = book.publisher || "Unknown publisher";
// //   const stock = book.stock || "N/A";
// //   const review = book.review || "No review available.";

// //   return (
// //     <div className="book-card" onClick={() => setOpen((s) => !s)}>
// //       {/* Header row: title + expand arrow */}
// //       <div className="book-header">
// //         <div className="book-title">{title}</div>
// //         <div className="dropdown-arrow">{open ? "▲" : "▼"}</div>
// //       </div>

// //       {/* When open, show details of the book (dropdown style).
// //           Note: because the card expands, the grid row height changes automatically. */}
// //       {open && (
// //         <div className="book-details">
// //           <p><strong>Author:</strong> {author}</p>
// //           <p><strong>Publisher:</strong> {publisher}</p>
// //           <p><strong>Stock:</strong> {stock}</p>
// //           <p><strong>Review:</strong> {review}</p>
// //           <div className="plus-button">
// //             +
// //             <span className="tooltip">Add to Cart</span>
// //           </div>
          
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Book;


// // File: src/components/Book.js
// import React, { useState } from "react";
// import "./Book.css";

// const Book = ({ book, onAddToCart }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);

//   return (
//     <div className="book-card">
//       {/* Header (click to toggle dropdown) */}
//       <div
//         className="book-header"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <h4>{book.title}</h4>
//       </div>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="book-details">
//           <p><strong>Author:</strong> {book.author}</p>
//           <p><strong>Publisher:</strong> {book.publisher}</p>
//           <p><strong>Stock:</strong> {book.stock}</p>
//           <p><strong>Review:</strong> {book.review}</p>

//           {/* Plus button */}
//           <div
//             className="plus-button-container"
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           >
//             <button
//               className="plus-button"
//               onClick={(e) => {
//                 e.stopPropagation(); // prevent dropdown toggle
//                 onAddToCart(book);
//               }}
//             >
//               +
//             </button>
//             {showTooltip && (
//               <span className="tooltip">Add to Cart</span>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Book;


// File: src/components/Book.js
import React, { useState } from "react";
import "./Book.css";

const Book = ({ book, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);   // Track dropdown open state
  const [showTooltip, setShowTooltip] = useState(false); // Track tooltip hover

  return (
    <div className="book-card">
      {/* Header: Title + Dropdown icon */}
      <div className="book-header">
        {/* Book title - click does nothing */}
        <h4 className="book-title">{book.title}</h4>

        {/* Dropdown icon - click toggles details */}
        <span
          className="dropdown-arrow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "▲" : "▼"} {/* simple arrow up/down */}
        </span>
      </div>

      {/* Dropdown details */}
      {isOpen && (
        <div className="book-details">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Stock:</strong> {book.stock}</p>
          <p><strong>Review:</strong> {book.review}</p>

          {/* Add to Cart button inside dropdown */}
          <div
            className="plus-button-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              className="plus-button"
              onClick={(e) => {
                e.stopPropagation(); // prevent dropdown toggle
                onAddToCart(book);
              }}
            >
              +
            </button>
            {showTooltip && <span className="tooltip">Add to Cart</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
