import React, { useState } from "react";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import {
  FaTh,
  FaBookmark,
  FaCogs,
  FaUserTie,
  FaGraduationCap,
  FaBriefcase,
  FaComments,
  FaSearch
} from "react-icons/fa";
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
import Sidebar from "../../components/Sidebar/Sidebar";
import PopupModals from "../../components/PopupModals/PopupModals";

const MainContent = ({ isSidebarOpen }) => {
  const location = useLocation();
  
  // Array of paths where Subhead should appear
  const pathsWithSubhead = [
    '',
    '/get-research-experience',
    '/explore-careers',
    '/find-graduate-schools',
    '/talk-to-an-expert',
    '/find-internships'
  ];

  // Check if current path should show Subhead
  const shouldShowSubhead = pathsWithSubhead.includes(location.pathname.replace('/recommenderpage', ''));

  return (
    <div
      className={`main-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {shouldShowSubhead && <Subhead />}
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

  const menuItems = [
    {
      path: "/recommenderpage/get-research-experience",
      name: "Research Experience",
      icon: <FaSearch />
    },
    {
      path: "/recommenderpage/explore-careers",
      name: "Explore Careers",
      icon: <FaBriefcase />
    },
    {
      path: "/recommenderpage/find-graduate-schools",
      name: "Graduate Schools",
      icon: <FaGraduationCap />
    },
    {
      path: "/recommenderpage/talk-to-an-expert",
      name: "Talk to Expert",
      icon: <FaComments />
    },
    {
      path: "/recommenderpage/find-internships",
      name: "Internships",
      icon: <FaTh />
    },
    {
      path: "/recommenderpage/bookmarks",
      name: "Bookmarks",
      icon: <FaBookmark />
    },
    {
      path: "/recommenderpage/mentors",
      name: "Mentors",
      icon: <FaUserTie />
    },
    {
      path: "/recommenderpage/settings",
      name: "Settings",
      icon: <FaCogs />
    }
  ];

  return (
    <>
      <PopupModals />
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
      >
        <Routes>
          <Route
            path="/"
            element={<MainContent isSidebarOpen={isSidebarOpen} />}
          >
            <Route
              index
              element={<GetResearchExperience isSidebarOpen={isSidebarOpen} />}
            />
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