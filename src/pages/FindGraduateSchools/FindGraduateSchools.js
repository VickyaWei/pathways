import React, { useState } from "react";
import DegreeDropdown from "../../components/DegreeDropdown/DegreeDropdown";
import SubfieldDropdown from "../../components/SubfieldDropdown/SubfieldDropdown";

import "./FindGraduateSchools.css";
import ResourceTile from "../../components/ResourceTiles/ResourceTiles";

const FindGraduateSchools = () => {
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

      <div className={changed ? "change-container" : "start-container"}>
        <div className="general-tiles">
          <ResourceTile tagFilter="Degree General Resources" className="degree-general-tile" />
        </div>
        <br />
        <div className="additional-tiles">
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
