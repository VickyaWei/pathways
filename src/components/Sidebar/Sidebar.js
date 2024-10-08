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
          <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>
            Logo
          </h1>
          <div className="bars" style={{ marginLeft: isOpen ? "65px" : "0px" }}>
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
              color: isActive ? "blue" : "black",
            })}
          >
            <div className="icon">{item.icon}</div>
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
