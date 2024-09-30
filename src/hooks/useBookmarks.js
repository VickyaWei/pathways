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

  const [bookmarkedMentorPanels, setBookmarkedMentorPanels] = useState(() => {
    const savedMentorPanels = localStorage.getItem('bookmarkedMentorPanels');
    return savedMentorPanels ? JSON.parse(savedMentorPanels) : [];
  })

  useEffect(() => {
    localStorage.setItem('bookmarkedMentors', JSON.stringify(bookmarkedMentors));
    localStorage.setItem('bookmarkedResources', JSON.stringify(bookmarkedResources));
    localStorage.setItem('bookmarkedMentorPanels', JSON.stringify(bookmarkedMentorPanels));
  }, [bookmarkedMentors, bookmarkedResources, bookmarkedMentorPanels]);

  const toggleBookmark = (item, category) => {
    if (category === 'mentor') {
      setBookmarkedMentors((prevItems) => {
        const itemId = item._id && item._id.$oid ? item._id.$oid : item.id;
        const isAlreadyBookmarked = prevItems.some((bookmark) => 
          (bookmark._id && bookmark._id.$oid ? bookmark._id.$oid : bookmark.id) === itemId
        );
        return isAlreadyBookmarked
          ? prevItems.filter((bookmark) => 
              (bookmark._id && bookmark._id.$oid ? bookmark._id.$oid : bookmark.id) !== itemId
            )
          : [...prevItems, item];
      });
    } else if (category === 'resource') {
      setBookmarkedResources((prevItems) => {
        const isAlreadyBookmarked = prevItems.some((bookmark) => bookmark.id === item.id);
        return isAlreadyBookmarked
          ? prevItems.filter((bookmark) => bookmark.id !== item.id)
          : [...prevItems, item];
      });
    }
    else if (category === 'mentor-panel') {
      const itemId = item._id || item.id;
      setBookmarkedMentorPanels((prevItems) => {
        
        const isAlreadyBookmarked = prevItems.some((bookmark) => bookmark._id === itemId);
        return isAlreadyBookmarked
          ? prevItems.filter((bookmark) => bookmark._id !== itemId)
          : [...prevItems, item];
      });
    }
  };

  return { bookmarkedMentors, bookmarkedResources, bookmarkedMentorPanels, toggleBookmark };
};

export default useBookmarks;
