import React, { useState, useEffect, useRef } from "react";
import "./TopBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API_URL from '../config';
import { faShoppingCart, faChartBar, faUser } from "@fortawesome/free-solid-svg-icons";

export default function TopBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [cart, setCart] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const CART_LIMIT = 5;

  // 1. Load Data on Mount
  useEffect(() => {
    // Load User from localStorage (set this during login)
    const savedUser = JSON.parse(localStorage.getItem("user") || '{"name":"Guest","email":"guest@example.com"}');
    setUser(savedUser);

    // Load Cart
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    // Fetch Issued Books (Status) from Backend
    // Assuming user.id exists. Replace '1' with actual user ID if needed.
    fetch(`${API_URL}/api/transactions/user/${savedUser.id || 1}`)
      .then(res => res.json())
      .then(data => setIssuedBooks(data))
      .catch(err => console.log("Status fetch error:", err));

    // Listen for storage changes (updates cart icon when adding books from other pages)
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 2. Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCartFull = (cart.length + issuedBooks.length) >= CART_LIMIT;

  return (
    <div className="topbar">
      
      {/* --- CART DROPDOWN --- */}
      <div className="topbar-item" ref={openDropdown === "cart" ? dropdownRef : null}>
        <button
          className="icon-button"
          onClick={() => setOpenDropdown(openDropdown === "cart" ? null : "cart")}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {cart.length > 0 && <span className="badge">{cart.length}</span>}
        </button>
        <span className="hover-name">Cart</span>

        {openDropdown === "cart" && (
          <div className="dropdown">
            <h4>My Cart ({cart.length}/{CART_LIMIT})</h4>
            {cart.length === 0 ? <p className="empty-msg">No books added yet.</p> : 
              cart.map((b, i) => (
                <div key={i} className="cart-item">
                  <p className="book-name">{b.title}</p>
                  <p className="book-category">{b.category}</p>
                </div>
              ))
            }
            {isCartFull && <p className="cart-warning">Limit: Max 5 books total!</p>}
            {cart.length > 0 && <button className="checkout-btn">Confirm Borrow</button>}
          </div>
        )}
      </div>

      {/* --- STATUS DROPDOWN --- */}
      <div className="topbar-item" ref={openDropdown === "status" ? dropdownRef : null}>
        <button
          className="icon-button"
          onClick={() => setOpenDropdown(openDropdown === "status" ? null : "status")}
        >
          <FontAwesomeIcon icon={faChartBar} />
        </button>
        <span className="hover-name">Status</span>

        {openDropdown === "status" && (
          <div className="dropdown">
            <h4>Library Status</h4>
            {issuedBooks.length === 0 ? <p className="empty-msg">No books issued.</p> : 
              issuedBooks.map((b, i) => (
                <div key={i} className="status-item">
                  <p className="book-name">{b.book_title}</p>
                  <p className="issue-date">Issued: {new Date(b.issued_at).toLocaleDateString()}</p>
                  <p className="return-date">Return: {new Date(b.return_date).toLocaleDateString()}</p>
                  <p className={`status-tag ${b.status}`}>{b.status}</p>
                </div>
              ))
            }
          </div>
        )}
      </div>

      {/* --- PROFILE DROPDOWN --- */}
      <div className="topbar-item profile" ref={openDropdown === "profile" ? dropdownRef : null}>
        <button
          className="icon-button"
          onClick={() => setOpenDropdown(openDropdown === "profile" ? null : "profile")}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        <span className="hover-name">Profile</span>

        {openDropdown === "profile" && user && (
          <div className="dropdown">
            <div className="profile-info">
              <p className="user-name"><strong>{user.name}</strong></p>
              <p className="user-email">{user.email}</p>
              <p className="user-phone">{user.phone || "No phone added"}</p>
            </div>
            <hr />
            <p className="menu-item">Raise a Complaint</p>
            <p className="menu-item">Feedback</p>
            <p className="menu-item signout" onClick={() => { localStorage.clear(); window.location.reload(); }}>Sign Out</p>
          </div>
        )}
      </div>
    </div>
  );
}