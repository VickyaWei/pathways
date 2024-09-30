import React from "react";
import { data as eachMentor } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import useBookmarks from "../../hooks/useBookmarks";
import "./CardStyles.css";


const PanelCard = ({ id, title, subtitle, mentors, url, isMentorsPage, isSidebarOpen }) => {
  const displayMentors = mentors.slice(0, 4);
  const findMentorById = (id) => {
    // Ensure that mentor and _id.$oid exist before accessing
    return eachMentor.find((mentor) => mentor._id && mentor._id.$oid === id);
  };

  const { bookmarkedMentors, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarkedMentors.some((item) => item._id === id);



  const handleBookmark = () => {
    toggleBookmark({ _id: id, title, subtitle, mentors, url }, 'mentor');
  };

  return (
    <div className={`card ${isMentorsPage ? "card-mentors-page" : ""} ${isSidebarOpen ? "" : "sidebar-closed-card"}`}>
      <h2 className="card-title">{title}</h2>
      <a href={url} className="panel-card-link">
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
      </a>
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
