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
import { appendHomePageDataToUrl } from "../../utils/appendHomePageDataToUrl";

const MentorPal = ({
  showExtras = true,
  isMentorsPage = false,
  isResearchParticipant = true,
  isSidebarOpen,
}) => {
  const [query, setQuery] = useState("");
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isIntroCollapsed, setIsIntroCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const filterMentors = useCallback((query, selectedKeywords) => {
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
  });

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

  const toggleIntroCollapse = () => {
    setIsIntroCollapsed(!isIntroCollapsed);
  };

  const handleCardSelect = (url, title, targetMentors = []) => {
    const updatedUrl = appendHomePageDataToUrl(targetMentors, url);
    setSelectedContent({ url: updatedUrl, title });
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

      {showExtras && !selectedContent && (
        <div className="intro-section">
          <div
            className={`intro-tiles-container ${
              isIntroCollapsed ? "collapsed" : ""
            }`}
          >
            {mentorData.map((mentor, index) => (
              <React.Fragment key={mentor.number}>
                <div
                  className="intro-tile"
                  style={{
                    backgroundImage: `linear-gradient(rgba(245, 246, 247, 0.8), rgba(245, 246, 247, 0.8)), url(${mentor.image})`,
                    backgroundSize: "25%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="intro-tile-content">
                    <h1 className="intro-tile-title">{mentor.title}</h1>
                  </div>
                </div>
                {index < mentorData.length - 1 && (
                  <div className="intro-tile-arrow">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div
            className={`collapse-arrow ${isIntroCollapsed ? "collapsed" : ""}`}
            onClick={toggleIntroCollapse}
            aria-label={isIntroCollapsed ? "Expand intro" : "Collapse intro"}
          >
            <span className="arrow-icon"></span>
          </div>
        </div>
      )}

      {!selectedContent && (
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
      )}

      {selectedContent ? (
        <div className="embedded-content">
          <div className="embedded-content-frame">
            <iframe
              src={selectedContent.url}
              title={selectedContent.title}
              className="content-iframe"
            />
          </div>
        </div>
      ) : (
        <div className="mentor-grid">
          <div className="mentor-panels">
            {mentorPanels.map((card) => (
              <PanelCard
                key={card._id}
                id={card._id}
                title={card.title}
                subtitle={card.subtitle}
                mentors={card.mentors}
                url={card.url}
                isMentorsPage={isMentorsPage}
                isSidebarOpen={isSidebarOpen}
                onClick={() => handleCardSelect(card.url, card.title, card.mentors)}
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
                onClick={() => handleCardSelect(mentor.mentorUrl, mentor.name, [mentor._id.$oid])}
              />
            ))}
          </div>
        </div>
      )}

      {showExtras &&
        (isResearchParticipant ? (
          <FooterWithTimer setSelectedContent={setSelectedContent} />
        ) : (
          <Footer />
        ))}
    </div>
  );
};

export default MentorPal;
