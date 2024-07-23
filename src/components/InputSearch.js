import React, { useState } from "react";

export const InputSearch = (onSearch) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="input-search-container">
      <input
        type="text"
        placeholder="Search for a mentor..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};
