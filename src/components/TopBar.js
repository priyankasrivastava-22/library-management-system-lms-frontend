// File: src/components/TopBar.js
// This component will display the top-right icons (Profile, Notifications, Cart)
// and can be reused across all pages by just importing it.

import React from "react";
import { FaUserCircle, FaBell, FaShoppingCart } from "react-icons/fa";

// `TopBar` accepts optional `style` prop to override default positioning or styles
export default function TopBar({ style }) {
  return (
    <div
      style={{
        position: "absolute",       // fixed at top-right
        top: "20px",                // distance from top
        right: "20px",              // distance from right
        display: "flex",            // show icons in a row
        gap: "20px",                // space between icons
        zIndex: 1000,               // always on top of other elements
        ...style,                   // override with custom styles if passed
      }}
    >
      {/* Profile icon */}
      <FaUserCircle
        size={28}
        style={{ cursor: "pointer" }}
        title="Profile"
        onClick={() => alert("Go to Profile page")}
      />

      {/* Notifications icon */}
      <FaBell
        size={28}
        style={{ cursor: "pointer" }}
        title="Notifications"
        onClick={() => alert("Show Notifications")}
      />

      {/* Cart icon */}
      <FaShoppingCart
        size={28}
        style={{ cursor: "pointer" }}
        title="Cart"
        onClick={() => alert("Go to Cart")}
      />
    </div>
  );
}
