import { useState, useEffect } from 'react';

const useBookmarks = () => {
  const [bookmarkedMentors, setBookmarkedMentors] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [bookmarkedMentorPanels, setBookmarkedMentorPanels] = useState([]);

  // Fetch bookmarks from the server
  const fetchBookmarks = async () => {
    try {
      const response = await fetch('http://localhost:5001/bookmarks');
      const data = await response.json();
      // Sort data based on type to separate mentors, resources, and mentor panels
      setBookmarkedMentors(data.filter((item) => item.type === 'mentor'));
      setBookmarkedResources(data.filter((item) => item.type === 'resource'));
      setBookmarkedMentorPanels(data.filter((item) => item.type === 'mentor-panel'));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const toggleBookmark = async (item, category) => {
    try {
      if (category === 'mentor') {
        const existingBookmark = bookmarkedMentors.find(
          (bookmark) => bookmark.item._id.$oid === item._id.$oid
        );
        if (existingBookmark) {
          await fetch('http://localhost:5001/bookmarks', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              itemId: item._id.$oid,
              category: 'mentor',
            }),
          });
          setBookmarkedMentors((prevItems) =>
            prevItems.filter(
              (bookmark) => bookmark.item._id.$oid !== item._id.$oid
            )
          );
        } else {
          await fetch('http://localhost:5001/bookmarks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item, category: 'mentor' }),
          });
          setBookmarkedMentors((prevItems) => [...prevItems, item]);
        }
      }

    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  return { bookmarkedMentors, bookmarkedResources, bookmarkedMentorPanels, toggleBookmark };
};

export default useBookmarks;
