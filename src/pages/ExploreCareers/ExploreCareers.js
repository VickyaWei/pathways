import React, { useState } from "react";
import SubfieldDropdown from "../../components/SubfieldDropdown/SubfieldDropdown";
import ResourceTile from "../../components/ResourceTiles/ResourceTiles";

import "./ExploreCareers.css";

const ExploreCareers = () => {
  const [selectedSubfield, setSelectedSubfield] = useState([]);
  const [changed, setChanged] = useState(false);


  const handleSubfieldChange = (subfields) => {
    setSelectedSubfield(subfields);
    setChanged(true);
  };

  return (
    <div className="explore-careers">
      <SubfieldDropdown
        onSubfieldChange={handleSubfieldChange}
        className="subfield-dropdown"
      />
      <div className={changed ? "change-container" : "start-container"}>
        <div className="general-tiles">
          <ResourceTile
            tagFilter="Career General Resources"
            className="career-general-tile"
          />
        </div>
        <br />
        <div className="additional-tiles">
          <ResourceTile
            tagFilter="Career Additional Resources"
            selectedSubfield={selectedSubfield}
            className="career-additional-tile"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreCareers;