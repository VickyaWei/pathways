import React from "react";
import useBookmarks from "../../hooks/useBookmarks";
import Card from "../../components/Cards/Card";
import Tile from "../../components/Tile/Tile";
import "./Bookmarks.css";

const Bookmarks = () => {
  const { bookmarkedMentors, bookmarkedResources } = useBookmarks();

  return (
    <div className="bookmarks">
      <div className="bookmark-section">
        <h2>Favorite Resources</h2>
        <div className="bookmark-tiles">
          {bookmarkedResources.length === 0 ? (
            <p>No favorite resources yet.</p>
          ) : (
            bookmarkedResources.map((resource) => (
              <Tile key={resource.id} {...resource} />
            ))
          )}
        </div>
      </div>

      <div className="bookmark-section">
        <h2 className="favorite-mentors">Favorite Mentors</h2>
        <div className="mentor-bookmark-tiles">
        {bookmarkedMentors.length === 0 ? (
            <p>No favorite mentors yet.</p>
          ) : (
            bookmarkedMentors.map((mentor) => (
              <Card
                key={mentor._id.$oid}
                _id={mentor._id}
                name={mentor.name}
                title={mentor.title}
                thumbnail={mentor.thumbnail}
                mentorUrl={mentor.mentorUrl}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
