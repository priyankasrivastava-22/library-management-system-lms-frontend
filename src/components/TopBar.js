import React, { useState, useEffect, useRef } from "react";
import "./TopBar.css";

// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faChartBar, faUser } from "@fortawesome/free-solid-svg-icons";

// Dummy data
const dummyUser = {
  name: "Priyanka Srivastava",
  email: "priyanka@example.com",
  phone: "+91-9876543210",
};

const dummyStatus = [
  {
    book: "Harry Potter",
    publisher: "Bloomsbury",
    issueDate: "2025-08-01",
    type: "Fiction",
    returnDate: "2025-08-15",
    finePerDay: 5,
    returnedLate: 2,
  },
];

const dummyCart = [
  {
    book: "Mathematics Basics",
    publisher: "McGraw Hill",
    author: "John Doe",
    type: "Study",
    returnDate: "2025-09-01",
  },

  {
    book: "Physics Fundamentals",
    author: "Jane Smith",
    publisher: "Pearson",
    type: "Study",
    returnDate: "2025-09-03",
  },
];

export default function TopBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartLimit = 6;
  const isCartFull = dummyCart.length >= cartLimit;

  return (
    <div className="topbar">
      {/* CART */}
      <div className="topbar-item" ref={dropdownRef}>
        <button
          className="icon-button"
          title="Cart"
          onClick={() =>
            setOpenDropdown(openDropdown === "cart" ? null : "cart")
          }
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <span className="hover-name">Cart</span>
        {openDropdown === "cart" && (
          <div className="dropdown">
            {dummyCart.map((b, i) => (
              <div key={i} className="cart-item">
              <p className="book-name">{b.book}</p>
              <p className="book-author">{b.author || "Author Name"}</p>
              <p className="book-publisher">{b.publisher}</p>
              <p className="book-category">{b.type}</p>
              <p className="book-return">Return: {b.returnDate}</p>
           </div>
            ))}
            {isCartFull && <p className="cart-warning"> Not more than 6 books per user!</p>}
          </div>
        )}
      </div>

      {/* STATUS */}
      <div className="topbar-item" ref={dropdownRef}>
        <button
          className="icon-button"
          title="Status"
          onClick={() =>
            setOpenDropdown(openDropdown === "status" ? null : "status")
          }
        >
          <FontAwesomeIcon icon={faChartBar} />
        </button>
        <span className="hover-name">Status</span>

  {openDropdown === "status" && (
    <div className="dropdown">
      {dummyStatus.map((b, i) => (
        <div key={i} className="status-item">
          <p className="book-name">{b.book}</p>
          <p className="book-publisher">{b.publisher}</p>
          <p className="book-type">Type: {b.type}</p>
          <p className="issue-date">Issued: {b.issueDate}</p>
          <p className="return-date">Return: {b.returnDate}</p>
          <p className="fine">Fine: {b.fine ? `$${b.fine}` : "$0"}</p>
           </div>
          ))}
          </div>
        )}
      </div>

      {/* PROFILE */}
      <div className="topbar-item profile" ref={dropdownRef}>
        <button
          className="icon-button"
          title="Profile"
          onClick={() =>
            setOpenDropdown(openDropdown === "profile" ? null : "profile")
          }
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        <span className="hover-name">Profile</span>
        {openDropdown === "profile" && (
          <div className="dropdown">
            <p>{dummyUser.name}</p>
            <p>{dummyUser.email}</p>
            <p>{dummyUser.phone}</p>
            <p>Raise a Complaint</p>
            <p>Feedback</p>
            <p>Sign Out</p>
          </div>
        )}
      </div>
    </div>
  );
}
