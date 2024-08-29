import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../../hooks/useBookmarks";
import "./ThreeTile.css";

const ThreeTile = ({ id, title, description, image, url, isSidebarOpen }) => {
  const { bookmarkedResources, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedResources.some((item) => item.id === id);

  const handleBookmark = () => {
    toggleBookmark({ id, title, description, image, url }, 'resource');
  };

  return (
    <div className={`three-tile ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="three-tile-content">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={image} alt={title} />
        </a>
        <h3>{title}</h3>
        <p>{description}</p>
        <button
          onClick={handleBookmark}
          className="three-bookmark-button"
          aria-label="three-Bookmark"
        >
          <FontAwesomeIcon
            icon={isBookmarked ? faBookmarkSolid : faBookmark}
            className={`three-bookmark-icon ${isBookmarked ? "blue" : "white"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ThreeTile;
