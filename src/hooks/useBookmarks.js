import { useState, useEffect } from 'react';

const useBookmarks = () => {
  const [bookmarkedMentors, setBookmarkedMentors] = useState(() => {
    const savedMentors = localStorage.getItem('bookmarkedMentors');
    return savedMentors ? JSON.parse(savedMentors) : [];
  });

  const [bookmarkedResources, setBookmarkedResources] = useState(() => {
    const savedResources = localStorage.getItem('bookmarkedResources');
    return savedResources ? JSON.parse(savedResources) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedMentors', JSON.stringify(bookmarkedMentors));
    localStorage.setItem('bookmarkedResources', JSON.stringify(bookmarkedResources));
  }, [bookmarkedMentors, bookmarkedResources]);

  const toggleBookmark = (item, category) => {
    if (category === 'mentor') {
      setBookmarkedMentors((prevItems) => {
        if (!Array.isArray(prevItems)) return [];
        const isAlreadyBookmarked = prevItems.some((bookmark) => bookmark.id === item.id);
        return isAlreadyBookmarked
          ? prevItems.filter((bookmark) => bookmark.id !== item.id)
          : [...prevItems, item];
      });
    } else if (category === 'resource') {
      setBookmarkedResources((prevItems) => {
        if (!Array.isArray(prevItems)) return [];
        const isAlreadyBookmarked = prevItems.some((bookmark) => bookmark.id === item.id);
        return isAlreadyBookmarked
          ? prevItems.filter((bookmark) => bookmark.id !== item.id)
          : [...prevItems, item];
      });
    }
  };

  return { bookmarkedMentors, bookmarkedResources, toggleBookmark };
};

export default useBookmarks;
