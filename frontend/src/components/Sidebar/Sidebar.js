import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTh,
  FaBars,
  FaBookmark,
  FaCogs,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    { path: "/recommenderpage", name: "Home", icon: <FaTh /> },
    {
      path: "/recommenderpage/bookmarks",
      name: "Bookmarks",
      icon: <FaBookmark />,
    },
    { path: "/recommenderpage/mentors", name: "Mentors", icon: <FaUserTie /> },
    { path: "/recommenderpage/settings", name: "Settings", icon: <FaCogs /> },
    { path: "/recommenderpage/logout", name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="container">
      <div className={`sidebar ${isOpen ? "" : "closed"}`}>
        <div className="top_section">
          <div
            className="logo"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div className="logo-container">
              <img
                src="/images/Pathways.png"
                alt="Pathways Logo"
                className="pathways-logo"
              />
            </div>
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "45px" : "-4px" }}
          >
            <FaBars
              className="fa-bars-icon"
              onClick={toggle}
              style={{ fontSize: "24px" }}
            />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            style={({ isActive }) => ({
              color: isActive ? "#084b8a" : "#084b8a",
            })}
          >
            <div className="icon-container">
              <div className="icon">{item.icon}</div>
              {!isOpen && <div className="tooltip">{item.name}</div>}
            </div>
            <div
              className="link_text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="main-children">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { isSidebarOpen: isOpen })
        )}
      </main>
    </div>
  );
};

export default Sidebar;