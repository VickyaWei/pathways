import React, { useState } from "react";
import DegreeDropdown from "../../components/DegreeDropdown/DegreeDropdown";
import SubfieldDropdown from "../../components/SubfieldDropdown/SubfieldDropdown";
import ResourceTile from "../../components/ResourceTiles/ResourceTiles";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import "./FindGraduateSchools.css";

const FindGraduateSchools = ({ isSidebarOpen }) => {
  const [selectedSubfield, setSelectedSubfield] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [changed, setChanged] = useState(false);

  const handleSubfieldChange = (subfield) => {
    setSelectedSubfield(subfield);
    setChanged(true);
  };

  const handleDegreeChange = (degree) => {
    setSelectedDegree(degree);
    setChanged(true);
  };
  return (
    <div className="Find-Graduate-Schools">
      <div className="resources-container">
        <div>
          <p className="graduate-highlighted-paragraph">
            Graduate School Resources
          </p>
        </div>
        <div className="dropdown-list">
          <DegreeDropdown
            onDegreeChange={handleDegreeChange}
            className="degree-dropdown"
          />
          <SubfieldDropdown
            onSubfieldChange={handleSubfieldChange}
            className="subfield-dropdown"
          />
        </div>
      </div>

      {/* Toggle Section Links for Mobile */}
      <div className="section-links">
        <a href="#general-resources" className="link-item">
          General Resources
        </a>
        <a href="#additional-resources" className="link-item">
          Subfield-Based Resources
        </a>
      </div>

      <div className={changed ? "change-container" : "start-container"}>
        <div className="general-tiles" id="general-resources">
          <ResourceTile
            tagFilter="Degree General Resources"
            className="degree-general-tile"
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <br />
        <div className="additional-tiles" id="additional-resources">
          <ResourceTile
            tagFilter="Degree Additional Resources"
            selectedSubfield={selectedSubfield}
            selectedDegree={selectedDegree}
            className="degree-additional-tile"
          />
        </div>
      </div>
    </div>
  );
};

export default FindGraduateSchools;
