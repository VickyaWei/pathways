import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Search } from "../../components/Search/Search";
import Keywords from "../../components/Keywords/Keywords";
import { Card } from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import "./MentorPal.css";
import { data as mentors } from "../../data"; // Assuming mentors data is imported from data.js
import FooterWithTimer from "../../components/Footer/FooterWithTimer";

const MentorPal = () => {
  const [query, setQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    filterMentors(newQuery, selectedKeywords);
  };

  // Handle keyword change
  const handleKeywordChange = (keywordId) => {
    const newSelectedKeywords = selectedKeywords.includes(keywordId)
      ? selectedKeywords.filter((id) => id !== keywordId)
      : [...selectedKeywords, keywordId];
    setSelectedKeywords(newSelectedKeywords);
    filterMentors(query, newSelectedKeywords);
  };

  // Filter mentors based on query and selected keywords
  const filterMentors = (query, selectedKeywords) => {
    const newFilteredMentors = mentors.filter((mentor) => {
      if (!mentor || !mentor.keywords) return false;

      const matchesName = mentor.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTitle = mentor.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesKeywords =
        selectedKeywords.length === 0 ||
        selectedKeywords.some((keywordId) =>
          mentor.keywords
            .map((keyword) => keyword.toLowerCase())
            .includes(keywordId.toLowerCase())
        );

      return (matchesName || matchesTitle) && matchesKeywords;
    });

    setFilteredMentors(newFilteredMentors);
  };

  useEffect(() => {
    setFilteredMentors(mentors);
  }, [mentors]);

  const mentorData = [
    { title: "Select a mentor", image: "./images/chat.png", number: 1 },
    {
      title: "Interview mentor(s)",
      image: "./images/selective.png",
      number: 2,
    },
    {
      title: "Get personalized resources",
      image: "./images/human-resources.png",
      number: 3,
    },
    {
      title: "Return Users",
      image: "./images/returning-visitor.png",
      number: 4,
    },
  ];

  return (
    <div className="mentorpal">
      <Header />

      <div className="intro-tiles-container">
        {mentorData.map((mentor, index) => (
          <React.Fragment key={mentor.number}>
            <div className="intro-tile">
              <div className="intro-tile-content">
                <h1 className="intro-tile-title">{mentor.title}</h1>
              </div>
              <img
                src={mentor.image}
                alt={mentor.title}
                className="intro-tile-image"
              />
            </div>
            {index < mentorData.length - 1 && <div className="arrow">→</div>}
          </React.Fragment>
        ))}
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <Search query={query} handleSearchChange={handleSearchChange} />
        </div>
        <div className="keywords-search-container">
          <Keywords
            selectedKeywords={selectedKeywords}
            handleCheckboxChange={handleKeywordChange}
          />
        </div>
      </div>

      <div className="mentor-grid">
        <div className="mentor-panels">
          {/* Add any content you want to display in the first column here */}
        </div>
        <div className="mentor-cards">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <Card
                key={mentor._id}
                img={mentor.img}
                title={mentor.name}
                subtitle={mentor.title}
                url={mentor.mentorUrl}
              />
            ))
          ) : (
            <p>No mentors found.</p>
          )}
        </div>
      </div>

      <FooterWithTimer />
    </div>
  );
};

export default MentorPal;
