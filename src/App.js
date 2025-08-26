// File: src/App.js
// Main router file to navigate between pages

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import TopBar from "./TopBar";

// Import  pages
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

function App() {
  return (
    <Router>
      {/* <TopBar /> {/* Always visible */}
      {/* <div style={{ paddingTop: "60px" }}> Space for fixed TopBar */} 

      <TopBar /> {/* Always on top */}

      <Routes>
        {/* Page 1 -> Login Page */}
        <Route path="/" element={<Login />} />

        {/* Page 2 -> Dashboard */}
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
      {/* </div> */}
    </Router>
  );
}

export default App;
