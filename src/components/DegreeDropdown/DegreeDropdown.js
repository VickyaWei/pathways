import React, { useState } from "react";
import "./DegreeDropdown.css";

const degreeOptions = [
  "Masters",
  "Doctorate",
];

const DegreeDropdown = ({ onDegreeChange }) => {
  const [selectedDegree, setSelectedDegree] = useState("");
  const handleSelectChange = (e) => {
    setSelectedDegree(e.target.value);
    onDegreeChange(e.target.value);
  };
  return (
    <div className="dropdown-container">
      <select id="degree" value={selectedDegree} onChange={handleSelectChange}>
        <option value="">Filter by Subfield</option>
        {degreeOptions.map((degree) => (
          <option key={degree} value={degree}>
            {degree}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DegreeDropdown;
