import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Keywords.css";

const Keywords = ({ selectedKeywords, handleCheckboxChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const keywordItems = [
    {
      title: "Select Keywords",
      id: "1",
      children: [
        {
          title: "Gender & Sexuality",
          id: "gender",
          children: [
            { title: "Man", id: "man" },
            { title: "Woman", id: "woman" },
            { title: "Trans", id: "trans" },
            { title: "Non-binary", id: "non-binary" },
            { title: "Gender-fluid", id: "gender-fluid" },
            { title: "LGBTQ++", id: "lgbtq" },
          ],
        },
        {
          title: "Age",
          id: "age",
          children: [
            { title: "<20s", id: "<20s" },
            { title: "20s", id: "20s" },
            { title: "30s", id: "30s" },
            { title: "40s", id: "40s" },
            { title: "50s", id: "50s" },
            { title: "60s", id: "60s" },
            { title: "70s", id: "70s" },
            { title: "80s", id: "80s" },
          ],
        },
        {
          title: "Ethnicity",
          id: "ethnicity",
          children: [
            { title: "Asian", id: "asian" },
            { title: "Black/African American", id: "black/african american" },
            { title: "Hispanic/Latino", id: "hispanic/latino" },
            { title: "Native American/Alaskan", id: "native american/alaskan" },
            { title: "Pacific Islander", id: "pacific islander" },
            { title: "White", id: "white" },
          ],
        },
        {
          title: "Education",
          id: "education",
          children: [
            { title: "First Generation", id: "first generation" },
            { title: "Community College", id: "community college" },
            { title: "Graduate School", id: "graduate school" },
            { title: "Bachelors", id: "bachelors" },
            { title: "Masters", id: "masters" },
            { title: "Doctorate", id: "doctorate" },
            { title: "Technical Program", id: "technical program" },
            { title: "Professional Degree", id: "professional degree" },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleClickOutside = (event) => {
      if (!event.target.closest(".keywords-wrapper")) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderSubItems = (children) => {
    return children.map((child) => (
      <label key={child.id} className="checkbox-item">
        <input
          type="checkbox"
          checked={selectedKeywords.includes(child.id)}
          onChange={() => handleCheckboxChange(child.id)}
        />
        <span>{child.title}</span>
      </label>
    ));
  };

  const renderMenuItems = (items) =>
    items.map((item) => (
      <div key={item.id} className="dropdown-item">
        <div
          className="dropdown-trigger"
          onClick={() => (isMobile ? toggleDropdown(item.id) : null)}
        >
          {item.title}
        </div>
        {(isMobile ? openDropdowns[item.id] : true) && (
          <div className="dropdown-content">
            {renderSubItems(item.children)}
          </div>
        )}
      </div>
    ));

  return (
    <div className="keywords-wrapper">
      <div
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
      >
        <span>Select Keywords</span>
        <ChevronDown size={16} />
      </div>
      {isOpen && (
        <div className="dropdown-items">
          {renderMenuItems(keywordItems[0].children)}
        </div>
      )}
    </div>
  );
};
export default Keywords;
