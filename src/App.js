import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecommenderPage from "./pages/RecommenderPage/RecommenderPage";
import PopPages from "./pages/Poppages/Poppages";
import MentorPal from "./pages/Mentorpal/MentorPal";
import Transition from "./pages/Transition/Transition";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PopPages />} />
        <Route path="/mentorpal" element={<MentorPal />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/recommenderpage/*" element={<RecommenderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
