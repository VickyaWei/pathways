// src/components/Tile/Tile.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../../hooks/useBookmarks";
import "./Tile.css";

const Tile = ({ id, title, description, image, url, data }) => {
  const { bookmarkedItems, toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarkedItems.some((item) => item.id === id);

  const handleBookmark = () => {
    toggleBookmark({ id, title, description, image, url, data });
  };

  return (
    <div className="tile">
      <div className="tile-content">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={image} alt={title} />
        </a>
        <h3>{title}</h3>

        <p>{description}</p>

        <button
          onClick={handleBookmark}
          className="bookmark-button"
          aria-label="Bookmark"
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
