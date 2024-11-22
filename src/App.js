import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecommenderPage from "./pages/RecommenderPage/RecommenderPage";
import MentorPal from "./pages/Mentorpal/MentorPal";
import Transition from "./pages/Transition/Transition";
import { ContentPage } from "./pages/ContentPage/ContentPage";
import PopPages from "./pages/Poppages/Poppages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentPage />} />
        <Route path="/mentorpal" element={<MentorPal />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/recommenderpage/*" element={<RecommenderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
