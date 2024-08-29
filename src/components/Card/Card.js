import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../hooks/useBookmarks";

const Card = ({ id, img, title, subtitle, url }) => {
  const { bookmarkedResources, toggleBookmark } = useBookmarks();

  // Determine if the item is bookmarked
  const isBookmarked = bookmarkedResources.some((item) => item.id === id);

  const handleMentorBookmark = (e) => {
    e.preventDefault(); 
    toggleBookmark({ id, img, title, subtitle, url }, "mentor");
  };

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <a href={url} className="card-link">
        {img && <img src={img} alt={title} className="card-img" />}
      </a>
      <h3 className="card-subtitle">{subtitle}</h3>
      <button
        onClick={handleMentorBookmark}
        className="card-bookmark-button"
        aria-label="Bookmark"
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
