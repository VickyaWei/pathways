import React from "react";
import "./Search.css";

export const Search = ({ handleSearchChange, query }) => {
  return (
    <div className="input-search-container">
      <input
        type="text"
        placeholder="Search for a mentor..."
        value={query}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};
