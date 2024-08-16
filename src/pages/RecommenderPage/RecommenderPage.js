import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import GetResearchExperience from "../GetResearchExperience/GetResearchExperience";
import ExploreCareers from "../ExploreCareers/ExploreCareers";
import FindGraduateSchools from "../FindGraduateSchools/FindGraduateSchools";
import TalkToAnExpert from "../TalkToAnExpert/TalkToAnExpert";
import FindInternships from "../FindInternships/FindInternships";
import Bookmarks from "../Bookmarks/Bookmarks";
import Homepage from "../Homepage/Homepage";
import Set from "../Set/Settings";
import "./RecommenderPage.css";
import Subhead from "../../components/Subhead/Subhead";
import Footer from "../../components/Footer/Footer";

const MainContent = () => {
  const location = useLocation();
  
  // Determine if the Subhead should be displayed
  const showSubhead = !['/bookmarks', '/settings'].includes(location.pathname);

  return (
    <div className="main-container">
      <Header />
      {showSubhead && <Subhead />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Set />} />
          <Route path="/get-research-experience" element={<GetResearchExperience />} />
          <Route path="/explore-careers" element={<ExploreCareers />} />
          <Route path="/find-graduate-schools" element={<FindGraduateSchools />} />
          <Route path="/talk-to-an-expert" element={<TalkToAnExpert />} />
          <Route path="/find-internships" element={<FindInternships />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export const RecommenderPage = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <MainContent />
      </Sidebar>
    </BrowserRouter>
  );
};
