import React from "react";
import {BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import GetResearchExperience from "../GetResearchExperience/GetResearchExperience";
import ExploreCareers from "../ExploreCareers/ExploreCareers";
import FindGraduateSchools from "../FindGraduateSchools/FindGraduateSchools";
import TalkToAnExpert from "../TalkToAnExpert/TalkToAnExpert";
import FindInternships from "../FindInternships/FindInternships";
import Bookmarks from "../Bookmarks/Bookmarks";
import Set from "../Set/Settings";
import Subhead from "../../components/Subhead/Subhead";
import Footer from "../../components/Footer/Footer";
import { Mentors } from "../Mentors/Mentors";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const MainContent = ({ isSidebarOpen }) => {
  const location = useLocation();
  
  const showSubhead = !['/bookmarks', '/settings', '/mentors'].includes(location.pathname);

  return (
    <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {showSubhead && <Subhead />}
      <div className="content">
        <Routes>
          <Route path="/" element={<GetResearchExperience isSidebarOpen={isSidebarOpen} />} />
          <Route path="/bookmarks" element={<Bookmarks isSidebarOpen={isSidebarOpen} />} />
          <Route path="/settings" element={<Set isSidebarOpen={isSidebarOpen} />} />
          <Route path="/mentors" element={<Mentors isSidebarOpen={isSidebarOpen} />} />
          <Route path="/get-research-experience" element={<GetResearchExperience isSidebarOpen={isSidebarOpen} />} />
          <Route path="/explore-careers" element={<ExploreCareers isSidebarOpen={isSidebarOpen} />} />
          <Route path="/find-graduate-schools" element={<FindGraduateSchools isSidebarOpen={isSidebarOpen} />} />
          <Route path="/talk-to-an-expert" element={<TalkToAnExpert isSidebarOpen={isSidebarOpen} />} />
          <Route path="/find-internships" element={<FindInternships isSidebarOpen={isSidebarOpen} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export const RecommenderPage = () => {
  return (
    
    <BrowserRouter>
    <Header />
      <Sidebar>
        <MainContent />
      </Sidebar>
    </BrowserRouter>
  );
};