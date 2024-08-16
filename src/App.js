// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your page components

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Subhead from "./components/Subhead/Subhead";
import Sidebar from "./components/Sidebar/Sidebar"; // Ensure this path is correct
import { RecommenderPage } from "./pages/RecommenderPage/RecommenderPage";
import MentorPal from "./pages/Mentorpal/MentorPal";

import PopPages from "./pages/Poppages/Poppages";
import Keywords from "./components/Keywords/Keywords";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Homepage from "./pages/Homepage/Homepage";
import Set from "./pages/Set/Settings";
import PopupModals from "./components/PopupModals/PopupModals";
import FooterWithTimer from "./components/Footer/FooterWithTimer";

function App() {
  return (
    <div>
      <MentorPal />
    </div>
  );
}

export default App;