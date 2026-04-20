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

  // STATES
  const [showComplaintBox, setShowComplaintBox] = useState(false);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [text, setText] = useState("");
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Load Data on Mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || '{"name":"Guest","email":"guest@example.com"}');
    setUser(savedUser);

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    fetch(`${API_URL}/api/transactions/user/${savedUser.id || 1}`)
      .then(res => res.json())
      .then(data => setIssuedBooks(data))
      .catch(err => console.log("Status fetch error:", err));

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

  // HANDLERS
  const handleComplaintSubmit = async () => {
    try {
      await fetch(`${API_URL}/api/complaints/raise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          issue: text
        }),
      });
    } catch (err) {
      console.log("Complaint error:", err);
    }
    setShowComplaintBox(false);
    setText("");
  };

  const handleFeedbackSubmit = async () => {
    try {
      await fetch(`${API_URL}/api/feedback/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          feedback: text
        }),
      });
    } catch (err) {
      console.log("Feedback error:", err);
    }
    setShowFeedbackBox(false);
    setText("");
  };

  const handleEmailUpdate = async () => {
    try {
      await fetch(`${API_URL}/api/users/update-email`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          email: email
        }),
      });

      const updatedUser = { ...user, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

    } catch (err) {
      console.log(err);
    }

    setShowEmailBox(false);
    setEmail("");
  };

  const handlePasswordUpdate = async () => {
    try {
      await fetch(`${API_URL}/api/users/update-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          password: password
        }),
      });
    } catch (err) {
      console.log(err);
    }

    setShowPasswordBox(false);
    setPassword("");
  };

  return (
    <div className="topbar">
      
      {/* --- CART DROPDOWN --- */}
      <div className="topbar-item" ref={openDropdown === "cart" ? dropdownRef : null}>
        <button
          className="icon-button"
          onClick={() => setOpenDropdown(openDropdown === "cart" ? null : "cart")}
        >
          <div className="cart-icon-wrapper">
            <FontAwesomeIcon icon={faShoppingCart} />
            {cart.length > 0 && <span className="badge">{cart.length}</span>}
          </div>
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

            <div className="menu-item" onClick={() => setShowComplaintBox(true)}>Raise a Complaint</div>
            <div className="menu-item" onClick={() => setShowFeedbackBox(true)}>Feedback</div>
            <div className="menu-item" onClick={() => setShowEmailBox(true)}>Change Email</div>
            <div className="menu-item" onClick={() => setShowPasswordBox(true)}>Change Password</div>

            <div 
              className="menu-item signout" 
              onClick={() => { 
                localStorage.clear(); 
                window.location.href = "/login"; 
              }}
            >
              Sign Out
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {showComplaintBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Raise Complaint</h3>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleComplaintSubmit}>Submit</button>
            <button onClick={() => setShowComplaintBox(false)}>Close</button>
          </div>
        </div>
      )}

      {showFeedbackBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Give Feedback</h3>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleFeedbackSubmit}>Submit</button>
            <button onClick={() => setShowFeedbackBox(false)}>Close</button>
          </div>
        </div>
      )}

      {showEmailBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Change Email</h3>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleEmailUpdate}>Update</button>
            <button onClick={() => setShowEmailBox(false)}>Close</button>
          </div>
        </div>
      )}

      {showPasswordBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Change Password</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handlePasswordUpdate}>Update</button>
            <button onClick={() => setShowPasswordBox(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}