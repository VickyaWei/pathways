// src/components/Bookmarks/Bookmarks.js
import React from 'react';
import useBookmarks from '../../hooks/useBookmarks';
import Tile from '../../components/TileList/Tile/Tile';
import "./Bookmarks.css"

const Bookmarks = () => {
  const { bookmarkedItems } = useBookmarks(); // Correct usage, just destructuring

  return (
    <div className="bookmarks">
      <div className="bookmark-tiles">
        {bookmarkedItems.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          bookmarkedItems.map((item) => (
            <Tile key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
