import React from 'react';
import KeywordDropdown from './KeywordDropdown';
import { InputSearch } from './InputSearch';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-bar-container">
      <InputSearch />
      <KeywordDropdown />
      <button onClick={handleSearch} className="search-button">
        Search
      </button> 
    </div>
  );
};

export default SearchBar;