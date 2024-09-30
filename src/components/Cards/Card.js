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
}) => {
  const { bookmarkedMentors, toggleBookmark } = useBookmarks();

  const cardId = _id && _id.$oid ? _id.$oid : id;

  const isBookmarked = bookmarkedMentors.some(
    (mentor) =>
      (mentor._id && mentor._id.$oid ? mentor._id.$oid : mentor.id) === cardId
  );

  const handleBookmark = () => {
    toggleBookmark(
      { _id: { $oid: cardId }, title, subtitle, thumbnail, url },
      "mentor"
    );
  };

  return (
    <div
      className={`card ${isMentorsPage ? "card-mentors-page" : ""} ${
        isSidebarOpen ? "" : "sidebar-closed-card"
      }`}
    >
      <h2 className="card-title">{title}</h2>
      <a href={url} className="card-link">
        <img src={thumbnail} alt={title} className="card-thumbnail" />
      </a>
      <h3 className="card-subtitle">{subtitle}</h3>
      <button onClick={handleBookmark} className="card-bookmark-button">
        <FontAwesomeIcon
          icon={isBookmarked ? faBookmarkSolid : faBookmark}
          className={`card-bookmark-icon ${isBookmarked ? "blue" : "white"}`}
        />
      </button>
    </div>
  );
};

export default Card;
