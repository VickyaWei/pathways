import React from "react";
import { data as eachMentor } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../hooks/useBookmarks";
import "./CardStyles.css";

const PanelCard = ({
  id,
  title,
  subtitle,
  mentors,
  url,
  isMentorsPage,
  isSidebarOpen,
  onClick
}) => {
  const displayMentors = mentors.slice(0, 4);
  
  const findMentorById = (id) => {
    return eachMentor.find((mentor) => mentor._id && mentor._id.$oid === id);
  };

  const { bookmarkedMentors, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedMentors.some((item) => item._id === id);

  const handleClick = (e) => {
    if (!e.target.closest('.card-bookmark-button')) {
      onClick();
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (!e.target.closest('.card-bookmark-button')) {
      onClick();
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark({ _id: id, title, subtitle, mentors, url }, 'mentor');
  };

  return (
    <div 
      className={`card ${isMentorsPage ? "card-mentors-page" : ""} ${
        isSidebarOpen ? "" : "sidebar-closed-card"
      }`}
      onClick={handleClick}
    >
      <h2 className="card-title">{title}</h2>
      <div 
        className="panel-card-link" 
        onClick={handleLinkClick}
      >
        <div className="panel-card-thumbnail-container">
          {displayMentors.map((mentorId, index) => {
            const mentorData = findMentorById(mentorId);
            return (
              mentorData && (
                <div key={index}>
                  <img
                    src={mentorData.thumbnail}
                    alt={mentorData.name}
                    className="panel-card-thumbnail"
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
      <h3 className="card-subtitle">{subtitle}</h3>

      <button
        onClick={handleBookmark}
        className="card-bookmark-button"
        aria-label={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        <FontAwesomeIcon
          icon={isBookmarked ? faBookmarkSolid : faBookmark}
          className={`card-bookmark-icon ${isBookmarked ? "blue" : "white"}`}
        />
      </button>
    </div>
  );
};

export default PanelCard;