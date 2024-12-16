import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../hooks/useBookmarks";
import "./CardStyles.css";

const Card = ({
  _id,
  name,
  title,
  thumbnail,
  mentorUrl,
  isMentorsPage,
  isSidebarOpen,
  onClick
}) => {
  const { bookmarkedMentors, toggleBookmark } = useBookmarks();

  // <?> for safe extraction of $oid
  const cardId = _id?.$oid;

  const isBookmarked = bookmarkedMentors.some(
    (mentor) => mentor._id?.$oid === cardId
  );


  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(
      { _id: { $oid: cardId }, name, title, thumbnail, mentorUrl },
      "mentor"
    );
  };

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

  return (
    <div
      className={`card ${isMentorsPage ? "card-mentors-page" : ""} ${
        isSidebarOpen ? "" : "sidebar-closed-card"
      }`}
      onClick={handleClick}
    >
      <p className="card-title">{name}</p>
      <div 
        className="card-link" 
        onClick={handleLinkClick}
      >
        <img src={thumbnail} alt={title} className="card-thumbnail" />
      </div>
      <h3 className="card-subtitle">{title}</h3>
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

export default Card;