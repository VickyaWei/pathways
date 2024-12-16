import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header";
import { Search } from "../../components/Search/Search";
import Keywords from "../../components/Keywords/Keywords";
import Card from "../../components/Cards/Card";
import "./MentorPal.css";
import FooterWithTimer from "../../components/Footer/FooterWithTimer";
import Footer from "../../components/Footer/Footer";
import PanelCard from "../../components/Cards/PanelCard";
import { appendHomePageDataToUrl } from "../../utils/appendHomePageDataToUrl";
import { fetchHomePageData } from "../../components/fetchHomePageData";

const MentorPal = ({
  showExtras = true,
  isMentorsPage = false,
  isResearchParticipant = true,
  isSidebarOpen,
}) => {
  const [query, setQuery] = useState("");
  const [mentors, setMentors] = useState([]);
  const [panels, setPanels] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [isIntroCollapsed, setIsIntroCollapsed] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const data = async () => await fetchHomePageData(process.env.PATHWAYS_ORG_ID);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const homePageData = await data(); // Your async data fetch function
        setMentors(homePageData.mentors);
        setPanels(homePageData.panels);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
      }
    };

    fetchData();
  }, []);

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
                  className={`intro-tile ${index === 0 ? "highlighted" : ""}`} // Add "highlighted" class to the first tile
                >
                  <div
                    className="intro-tile-image"
                    style={{
                      backgroundImage: `linear-gradient(rgba(245, 246, 247, ${
                        index === 0 ? "0.9" : "0.8"
                      }), rgba(245, 246, 247, ${
                        index === 0 ? "0.9" : "0.8"
                      })), url(${mentor.image})`,
                      backgroundSize: "25%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  <div className="intro-tile-number">{index + 1}</div>

                  <h1 className="intro-tile-title">{mentor.title}</h1>
                </div>

                {index < mentorData.length - 1 && (
                  <div
                    className={`intro-tile-arrow ${
                      index === 0 ? "intro-tile-arrow-highlighted" : ""
                    }`}
                  >
                    →
                  </div>
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
            {panels.map((card) => (
              <PanelCard
                key={card._id}
                id={card._id}
                title={card.title}
                subtitle={card.subtitle}
                mentors={card.mentors}
                url={card.url}
                isMentorsPage={isMentorsPage}
                isSidebarOpen={isSidebarOpen}
                onClick={() =>
                  handleCardSelect(card.url, card.title, [card._id])
                }
              />
            ))}
          </div>
          <div className="mentor-cards">
            {filteredMentors.map((mentor) => (
              <Card
                key={mentor._id.$oid}
                id={mentor._id.$oid}
                name={mentor.name}
                title={mentor.title}
                thumbnail={mentor.thumbnail}
                mentorUrl={mentor.mentorUrl}
                isMentorsPage={isMentorsPage}
                isSidebarOpen={isSidebarOpen}
                onClick={() =>
                  handleCardSelect(mentor.mentorUrl, mentor.name, [
                    mentor._id.$oid,
                  ])
                }
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
