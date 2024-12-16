import React, { useState } from "react";
import SubfieldDropdown from "../../components/SubfieldDropdown/SubfieldDropdown";
import ResourceTile from "../../components/ResourceTiles/ResourceTiles";
import "./ExploreCareers.css";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

const ExploreCareers = ({ isSidebarOpen }) => {
  const [selectedSubfield, setSelectedSubfield] = useState([]);
  const [changed, setChanged] = useState(false);

  const handleSubfieldChange = (subfields) => {
    setSelectedSubfield(subfields);
    setChanged(true);
  };

  return (
    <div className="explore-careers">
      <div className="resources-container">
        <div>
          <p className="career-highlighted-paragraph">
            Career Exploration Resources
          </p>
        </div>
        <div className="dropdown-list">
          <SubfieldDropdown
            onSubfieldChange={handleSubfieldChange}
            className="subfield-dropdown"
          />
        </div>
      </div>

      <div className={changed ? "career-change-container" : "start-container"}>
        <div className="general-tiles">
          <ResourceTile
            tagFilter="Career General Resources"
            className="career-general-tile"
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <br />
        <div className="additional-tiles">
          <ResourceTile
            tagFilter="Career Additional Resources"
            selectedSubfield={selectedSubfield}
            className="career-additional-tile"
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreCareers;
