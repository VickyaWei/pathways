import React, { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
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
import PopupModals from "../../components/PopupModals/PopupModals";

const MainContent = ({ isSidebarOpen }) => {
  return (
    <div
      className={`main-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <Subhead />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const RecommenderPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <PopupModals />
      <Sidebar isOpen={isSidebarOpen}>
        <Routes>
          <Route
            path="/"
            element={<MainContent isSidebarOpen={isSidebarOpen} />}
          >
            <Route
              path="homepage"
              element={<ExploreCareers isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="bookmarks"
              element={<Bookmarks isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="settings"
              element={<Set isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="mentors"
              element={<Mentors isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="get-research-experience"
              element={<GetResearchExperience isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="explore-careers"
              element={<ExploreCareers isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="find-graduate-schools"
              element={<FindGraduateSchools isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="talk-to-an-expert"
              element={<TalkToAnExpert isSidebarOpen={isSidebarOpen} />}
            />
            <Route
              path="find-internships"
              element={<FindInternships isSidebarOpen={isSidebarOpen} />}
            />
          </Route>
        </Routes>
      </Sidebar>
      <Footer />
    </>
  );
};

export default RecommenderPage;
