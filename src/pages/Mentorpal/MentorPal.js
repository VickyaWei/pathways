import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header";
import { Search } from "../../components/Search/Search";
import Keywords from "../../components/Keywords/Keywords";
import Card from "../../components/Cards/Card";
import "./MentorPal.css";
import { data as mentors } from "../../data";
import { panels as mentorPanels } from "../../panels";
import FooterWithTimer from "../../components/Footer/FooterWithTimer";
import Footer from "../../components/Footer/Footer";
import PanelCard from "../../components/Cards/PanelCard";

const MentorPal = ({
  showExtras = true,
  isMentorsPage = false,
  isResearchParticipant = true,
  isSidebarOpen,
}) => {
  const [query, setQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);


  const filterMentors = useCallback(
    (query, selectedKeywords) => {
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
    },
  );

  useEffect(() => {
    filterMentors(query, selectedKeywords);
  }, [query, selectedKeywords, filterMentors]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeywordChange = (keywordId) => {
    setSelectedKeywords((prevSelectedKeywords) => {
      const newSelectedKeywords = prevSelectedKeywords.includes(keywordId)
        ? prevSelectedKeywords.filter((id) => id !== keywordId)
        : [...prevSelectedKeywords, keywordId];
      return newSelectedKeywords;
    });
  };


  const mentorData = [
    { title: "Select a mentor", image: "./images/selective.png", number: 1 },
    { title: "Interview mentor(s)", image: "./images/chat.png", number: 2 },
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
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.15)",
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

      <div className="mentor-search-container">
        <div className="mentor-search">
          <Search query={query} handleSearchChange={handleSearchChange} />
        </div>
        <div className="mentor-keywords">
          <Keywords
            selectedKeywords={selectedKeywords}
            handleCheckboxChange={handleKeywordChange}
          />
        </div>
      </div>

      <div className="mentor-grid">
        <div className="mentor-panels">
          {mentorPanels.map((card) => (
            <PanelCard 
                id={card._id}
                title={card.title}
                subtitle={card.subtitle}
                mentors={card.mentors}
                url={card.url}
                isMentorsPage={isMentorsPage}
                isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
        <div className="mentor-cards">
          {filteredMentors.map((mentor) => (
            <Card
              key={mentor._id.$oid}
              id={mentor._id.$oid}
              title={mentor.name}
              subtitle={mentor.title}
              thumbnail={mentor.thumbnail}
              url={mentor.mentorUrl}
              isMentorsPage={isMentorsPage}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
      </div>

      {showExtras && (isResearchParticipant ? <FooterWithTimer /> : <Footer />)}
    </div>
  );
};

export default MentorPal;
