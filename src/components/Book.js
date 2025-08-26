// File: src/components/Book.js
// ===========================
// Reusable Book card component.
// - Shows book title in a compact card
// - Click the header to toggle a dropdown that reveals details (author, publisher, stock, review)
// - Designed to be placed inside a grid where each book occupies one column

import React, { useState } from "react";
import "./Book.css"; // styles for .book-card, .book-details

function Book({ book }) {
  // Controls whether the book's details are visible
  const [open, setOpen] = useState(false);

  // Defensive: if book is missing fields, show placeholders
  const title = book.title || "Untitled";
  const author = book.author || "Unknown author";
  const publisher = book.publisher || "Unknown publisher";
  const stock = book.stock || "N/A";
  const review = book.review || "No review available.";

  return (
    <div className="book-card" onClick={() => setOpen((s) => !s)}>
      {/* Header row: title + expand arrow */}
      <div className="book-header">
        <div className="book-title">{title}</div>
        <div className="dropdown-arrow">{open ? "▲" : "▼"}</div>
      </div>

      {/* When open, show details inside the card (dropdown style).
          Note: because the card expands, the grid row height changes automatically. */}
      {open && (
        <div className="book-details">
          <p><strong>Author:</strong> {author}</p>
          <p><strong>Publisher:</strong> {publisher}</p>
          <p><strong>Stock:</strong> {stock}</p>
          <p><strong>Review:</strong> {review}</p>
        </div>
      )}
    </div>
  );
}

export default Book;
