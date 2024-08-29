import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Search } from "../../components/Search/Search";
import Keywords from "../../components/Keywords/Keywords";
import Card from "../../components/Card/Card";
import "./MentorPal.css";
import { data as mentors } from "../../data"; 
import FooterWithTimer from "../../components/Footer/FooterWithTimer";

const MentorPal = ({ showExtras = true, isMentorsPage = false  }) => {
  const [query, setQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState(mentors);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    filterMentors(newQuery, selectedKeywords);
  };

  const handleKeywordChange = (keywordId) => {
    const newSelectedKeywords = selectedKeywords.includes(keywordId)
      ? selectedKeywords.filter((id) => id !== keywordId)
      : [...selectedKeywords, keywordId];
    setSelectedKeywords(newSelectedKeywords);
    filterMentors(query, newSelectedKeywords);
  };

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
    { title: "Select a mentor", image: "./images/selective.png", number: 1 },
    {
      title: "Interview mentor(s)",
      image: "./images/chat.png",
      number: 2,
    },
    {
      title: "Get personalized resources",
      image: "./images/human-resources.png",
      number: 3,
    },
    {
      title: "Revisit for updates",
      image: "./images/returning-visitor.png",
      number: 4,
    },
  ];

  return (
    <div className={`mentorpal ${isMentorsPage ? "mentors-page" : ""}`}>
      {showExtras && <Header />}
      {showExtras && (
        <div className="intro-tiles-container">
          {mentorData.map((mentor, index) => (
            <React.Fragment key={mentor.number}>
              <div
                className="intro-tile"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5)), url(${mentor.image})`,
                  backgroundSize: "25%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <div className="intro-tile-content">
                  <h1
                    className="intro-tile-title"
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "bold",
                      color: "#084b8a",
                      textShadow:
                        "2px 2px 4px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {mentor.title}
                  </h1>
                </div>
              </div>
              {index < mentorData.length - 1 && <div className="arrow">→</div>}
            </React.Fragment>
          ))}
        </div>
      )}

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
          {/* Add any content we want to display here */}
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

      {showExtras && <FooterWithTimer />}
    </div>
  );
};

export default MentorPal;
