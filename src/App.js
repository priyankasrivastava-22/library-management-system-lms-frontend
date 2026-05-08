// File: src/App.js

import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
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
import Footer from "./components/Footer";

import "./App.css";

/**
 * NavigationHandler Component
 * Controls TopBar visibility based on route
 */
const NavigationHandler = () => {
  const location = useLocation(); // ✅ FIX: location properly defined

  if (location.pathname === "/") {
    return null;
  }

  return <TopBar />;
};

/**
 * Main App wrapped inside Router
 */
function App() {
  return (
    <Router>

      <div className="app-container">

        <NavigationHandler />

        <div className="main-content">

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/fiction" element={<FictionPage />} />
            <Route path="/nonfiction" element={<NonFictionPage />} />
            <Route path="/study" element={<StudyPage />} />

            <Route path="/fiction/:category" element={<FictionCategories />} />
            <Route path="/nonfiction/:category" element={<NonFictionCategories />} />
            <Route path="/study/:category" element={<StudyCategories />} />

            <Route path="/:section/:category" element={<Book />} />
          </Routes>

        </div>

        <Footer />

      </div>

    </Router>
  );
}

export default App;