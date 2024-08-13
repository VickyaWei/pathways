// src/hooks/useBookmarks.js
import { useState, useEffect } from 'react';

const useBookmarks = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedItems');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const toggleBookmark = (item) => {
    setBookmarkedItems((prevItems) => {
      const isAlreadyBookmarked = prevItems.some((bookmark) => bookmark.id === item.id);
      if (isAlreadyBookmarked) {
        return prevItems.filter((bookmark) => bookmark.id !== item.id);
      } else {
        return [...prevItems, item];
      }
    });
  };

  return { bookmarkedItems, toggleBookmark };
};

export default useBookmarks;
