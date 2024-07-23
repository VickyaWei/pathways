import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import KeywordDropdown from "../components/KeywordDropdown";

const MentorPal = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search action
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search Query:", searchQuery);
    // Example: Filter mentorData based on searchQuery and selected keywords
  };

  const mentorData = [
    { title: "Select a mentor", image: "./images/mentorpanel.jpg", number: 1 },
    {
      title: "Interview mentor(s)",
      image: "./images/mentorpal_intro.jpg",
      number: 2,
    },
    {
      title: "Get personalized resources",
      image: "./images/mentorpal_intro.jpg",
      number: 3,
    },
  ];

  return (
    <div className="mentorpal">
      <Header />
      <div className="tiles-container">
        {mentorData.map((mentor) => (
          <div className="tile" key={mentor.number}>
            <div className="tile-content">
              <h1 className="tile-title">{mentor.title}</h1>
            </div>
            <img
              src={mentor.image}
              className="tile-image"
              alt={`Tile ${mentor.number}`}
            />
            <h2 className="tile-num">{mentor.number}</h2>
          </div>
        ))}
      </div>
      <SearchBar />
    </div>
  );
};

export default MentorPal;
