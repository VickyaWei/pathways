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
import BackToTop from "../../components/BackToTop/BackToTop";

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

  const [userStatus, setUserStatus] = useState(1);

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


  const USER_STATUS = {
    SELECT_MENTOR: 1,
    INTERVIEW_MENTOR: 2,
    GET_RESOURCES: 3,
    REVISIT: 4
  };


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

  const handleCardSelect = async (url, title, targetMentors = []) => {
    const updatedUrl = appendHomePageDataToUrl(targetMentors, url);
    setSelectedContent({ url: updatedUrl, title });
    
    // Update user status when selecting a mentor
    if (userStatus === USER_STATUS.SELECT_MENTOR) {
      const newStatus = USER_STATUS.INTERVIEW_MENTOR;
      setUserStatus(newStatus);
      // Update status in database
      // await updateUserStatus(userId, newStatus);
    }
  };


const mentorData = [
    { 
      title: "Select a mentor", 
      image: "./images/selective.png", 
      number: 1,
      status: USER_STATUS.SELECT_MENTOR
    },
    { 
      title: "Interview mentor(s)", 
      image: "./images/chat.png", 
      number: 2,
      status: USER_STATUS.INTERVIEW_MENTOR
    },
    {
      title: "Get personalized resources",
      image: "./images/human-resources.png",
      number: 3,
      status: USER_STATUS.GET_RESOURCES
    },
    {
      title: "Revisit for updates",
      image: "./images/returning-visitor.png",
      number: 4,
      status: USER_STATUS.REVISIT
    },
  ];

  return (
    <div className={`mentorpal ${isMentorsPage ? "mentors-page" : ""}`}>
      {showExtras && <Header />}

      {showExtras && !selectedContent && (
        <div className="intro-section">
          <div className={`intro-tiles-container ${isIntroCollapsed ? "collapsed" : ""}`}>
            {mentorData.map((mentor, index) => (
              <React.Fragment key={mentor.number}>
                <div
                  className={`intro-tile ${mentor.status === userStatus ? "highlighted" : ""}`}
                >
                  <div
                    className="intro-tile-image"
                    style={{
                      backgroundImage: `linear-gradient(rgba(245, 246, 247, ${
                        mentor.status === userStatus ? "0.9" : "0.8"
                      }), rgba(245, 246, 247, ${
                        mentor.status === userStatus ? "0.9" : "0.8"
                      })), url(${mentor.image})`,
                      backgroundSize: "25%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  <div className="intro-tile-number">{mentor.number}</div>
                  <h1 className="intro-tile-title">{mentor.title}</h1>
                </div>

                {index < mentorData.length - 1 && (
                  <div
                    className={`intro-tile-arrow ${
                      mentor.status === userStatus ? "intro-tile-arrow-highlighted" : ""
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
        // When content is selected, only show the iframe

        <div className="embedded-content-frame">
          <iframe
            src={selectedContent.url}
            title={selectedContent.title}
            className="content-iframe"
          />
        </div>
      ) : (
        // When no content is selected, show navigation and mentor sections
        <>
          <div className="section-links">
            <a href="#mentor-panels">Mentor Panels</a>
            <a href="#individual-mentors">Individual Mentors</a>
          </div>

          <div className="mentor-grid">
            <div className="mentor-panels" id="mentor-panels">
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

            <div className="mentor-cards" id="individual-mentors">
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
        </>
      )}

      {showExtras &&
        (isResearchParticipant ? (
          <FooterWithTimer setSelectedContent={setSelectedContent} />
        ) : (
          <Footer />
        ))}

      <BackToTop />
    </div>
  );
};

export default MentorPal;
