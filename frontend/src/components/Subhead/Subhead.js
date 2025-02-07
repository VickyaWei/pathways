import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import "./Subhead.css";

const Subhead = ({ isSidebarOpen }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      path: '/recommenderpage/get-research-experience',
      fullName: 'Get Research Experience',
      shortName: 'Research Experience'
    },
    {
      path: '/recommenderpage/explore-careers',
      fullName: 'Explore Careers',
      shortName: 'Careers'
    },
    {
      path: '/recommenderpage/find-graduate-schools',
      fullName: 'Find Graduate Schools',
      shortName: 'Grad School'
    },
    {
      path: '/recommenderpage/talk-to-an-expert',
      fullName: 'Talk to an Expert',
      shortName: 'Experts'
    },
    {
      path: '/recommenderpage/find-internships',
      fullName: 'Find Internships',
      shortName: 'Internships'
    }
  ];

  return (
    <div className={`subhead-container ${isSidebarOpen ? "md:left-54" : "left-0"}`}>
      {menuItems.map((item, index) => (
        <a 
          key={index}
          href={item.path} 
          className="subhead-option"
        >
          {isMobile ? item.shortName : item.fullName}
        </a>
      ))}
    </div>
  );
};

export default Subhead;
