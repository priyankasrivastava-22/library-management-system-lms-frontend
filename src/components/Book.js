// File: src/components/Book.js
import React, { useState } from "react";
import API_URL from './config';
import "./Book.css";

const Book = ({ book, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);   // Track dropdown open state
  const [showTooltip, setShowTooltip] = useState(false); // Track tooltip hover

  if (!book) {
    return null; 
  }

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
