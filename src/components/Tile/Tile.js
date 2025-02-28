import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../hooks/useBookmarks";
import "./Tile.css";

const Tile = ({ id, title, description, thumbnail, url, isResearchPage, isSidebarOpen }) => {
  const { bookmarkedResources, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarkedResources.some((item) => item.id === id);

  const handleBookmark = () => {
    toggleBookmark({ id, title, description, thumbnail, url }, 'resource');
  };

  const renderDescription = () => {
    if (typeof description === 'string') {
      return <p className="tile-description">{description}</p>;
    } else if (description && description.content) {
      return <p className="tile-description">
        {description.content[0]?.content[0]?.value || 'No description available'}
      </p>;
    }
    return <p className="tile-description">No description available</p>;
  };

  return (
    <div className={`tile ${isResearchPage ? "research-page-tile" : ""} ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="tile-content">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={thumbnail} alt={title} className="tile-thumbnail" />
        </a>
        <h3 className="tile-title">{title}</h3>
        {renderDescription()}
        <button
          onClick={handleBookmark}
          className="bookmark-button"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <FontAwesomeIcon
            icon={isBookmarked ? faBookmarkSolid : faBookmark}
            className={`bookmark-icon ${isBookmarked ? "blue" : "white"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Tile;