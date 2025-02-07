import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  FaTh,
  FaBookmark,
  FaUserTie,
  FaCogs,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.sidebar-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
      <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
        <div className="top-section">
          {isOpen && (
            <div className="logo">
              <img
                src="/images/Pathways.png"
                alt="Pathways Logo"
                className="pathways-logo"
              />
            </div>
          )}
          <div className="bars" style={{ marginLeft: isOpen ? "45px" : "-4px" }}>
            <FaBars
              className="fa-bars-icon"
              onClick={toggle}
              style={{ fontSize: "24px" }}
            />
          </div>
        </div>

        <nav className="menu-items">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => 
                `menu-item ${isActive ? 'active' : ''}`
              }
            >
              <div className="icon-wrapper">
                {item.icon}
                {isOpen && (
                  <span className="item-text">{item.name}</span>
                )}
              </div>
              {!isOpen && (
                <div className="tooltip">{item.name}</div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <main className="main-content">
        {React.Children.map(children, child =>
          React.cloneElement(child, { isSidebarOpen: isOpen })
        )}
      </main>
    </div>
  );
};

export default Sidebar;