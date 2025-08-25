// File: src/App.js
// Main router file to navigate between pages

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import FictionPage from "./components/FictionPage";
import NonFictionPage from "./components/NonFictionPage";
import StudyPage from "./components/StudyPage";

// Import new category pages
import FictionCategories from "./components/FictionCategories";
import NonFictionCategories from "./components/NonFictionCategories";
import StudyCategories from "./components/StudyCategories";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Main sections */}
        <Route path="/fiction" element={<FictionPage />} />
        <Route path="/nonfiction" element={<NonFictionPage />} />
        <Route path="/study" element={<StudyPage />} />

        {/* Sub-category pages */}
        <Route path="/fiction/categories" element={<FictionCategories />} />
        <Route path="/nonfiction/categories" element={<NonFictionCategories />} />
        <Route path="/study/categories" element={<StudyCategories />} />
      </Routes>
    </Router>
  );
}

export default App;
