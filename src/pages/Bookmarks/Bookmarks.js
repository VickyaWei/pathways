import React from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import Tile from '../../components/TileList/Tile/Tile';
import './Bookmarks.css';

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
        <h2>Favorite Mentors</h2>
        <div className="bookmark-tiles">
          {bookmarkedMentors.length === 0 ? (
            <p>No favorite mentors yet.</p>
          ) : (
            bookmarkedMentors.map((mentor) => (
              <Tile key={mentor.id} {...mentor} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
