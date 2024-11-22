import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../hooks/useBookmarks";
import "./CardStyles.css";

const Card = ({
  id,
  _id,
  title,
  subtitle,
  thumbnail,
  url,
  isMentorsPage,
  isSidebarOpen,
  onClick
}) => {
  const { bookmarkedMentors, toggleBookmark } = useBookmarks();

  const cardId = _id && _id.$oid ? _id.$oid : id;

  const isBookmarked = bookmarkedMentors.some(
    (mentor) =>
      (mentor._id && mentor._id.$oid ? mentor._id.$oid : mentor.id) === cardId
  );

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(
      { _id: { $oid: cardId }, title, subtitle, thumbnail, url },
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
      <h2 className="card-title">{title}</h2>
      <div 
        className="card-link" 
        onClick={handleLinkClick}
      >
        <img src={thumbnail} alt={title} className="card-thumbnail" />
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

export default Card;