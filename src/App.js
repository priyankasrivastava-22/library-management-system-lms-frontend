// File: src/App.js
// Main router file to navigate between pages

import React from "react";
// Import useLocation to track which page the user is currently viewing
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import API_URL from '../config';

// Import components
import TopBar from "./components/TopBar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import FictionPage from "./components/FictionPage";
import FictionCategories from "./components/FictionCategories";
import NonFictionPage from "./components/NonFictionPage";
import NonFictionCategories from "./components/NonFictionCategories";
import StudyPage from "./components/StudyPage";
import StudyCategories from "./components/StudyCategories";
import Book from "./components/Book";

import "./App.css";

/**
 * NavigationHandler Component
 * This checks the current URL path.**/

const NavigationHandler = () => {
  const location = useLocation();

  // Logic: Hide TopBar only on the root (Login) path
  if (location.pathname === "/") {
    return null;
  }

  return <TopBar />;
};

function App() {
  return (
    <Router>
      {/* Logic: The NavigationHandler is inside the Router 
          so it can listen to path changes and show/hide the TopBar 
      */}
      <NavigationHandler />

      <Routes>
        {/* Page 1 -> Login Page (TopBar will be hidden here) */}
        <Route path="/" element={<Login />} />

        {/* Page 2 -> Dashboard (TopBar will appear here) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Main sections */}
        <Route path="/fiction" element={<FictionPage />} />
        <Route path="/nonfiction" element={<NonFictionPage />} />
        <Route path="/study" element={<StudyPage />} />

        {/* Page 3 -> Sub-category pages */}
        <Route path="/fiction/:category" element={<FictionCategories />} />
        <Route path="/nonfiction/:category" element={<NonFictionCategories />} />
        <Route path="/study/:category" element={<StudyCategories />} />

        {/* Page 4 → Book Page (Dynamic by category) */}
        <Route path="/:section/:category" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;