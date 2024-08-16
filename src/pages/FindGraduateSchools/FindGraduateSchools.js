import React, { useState } from "react";
import DegreeDropdown from "../../components/DegreeDropdown/DegreeDropdown";
import SubfieldDropdown from "../../components/SubfieldDropdown/SubfieldDropdown";
import { degreeAdditionalTileClient } from "../../clients/DegreeAdditionalTileClient";
import { degreeGeneralTileClient } from "../../clients/DegreeGeneralTileClient";
import TileList from "../../components/TileList/TileList/TileList";
import { GeneralTileList } from "../../components/TileList/General/GeneralTileList";
import { AdditionalTileList } from "../../components/TileList/Additional/AdditionalTileList";

import "./FindGraduateSchools.css";
import ThreeTileList from "../../components/TileList/TileList/ThreeTileList";
import FourTileList from "../../components/TileList/TileList/FourTileList";

const FindGraduateSchools = () => {
  const [selectedSubfield, setSelectedSubfield] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");

  const handleSubfieldChange = (subfield) => {
    setSelectedSubfield(subfield);
  };

  const handleDegreeChange = (degree) => {
    setSelectedDegree(degree);
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

      <div
        className={
          selectedDegree || selectedSubfield
            ? "changed-degree-tiles-container"
            : "started-degree-tiles"
        }
      >
        {!selectedDegree && !selectedSubfield ? (
          <>
            <div className="degree-general-tiles">
              <FourTileList
                client={degreeGeneralTileClient}
                contentType="degreeGeneralResources"
              />
            </div>
            <div className="degree-additional-tiles">
              <FourTileList
                client={degreeAdditionalTileClient}
                contentType="degreeAdditionalResources"
              />
            </div>
          </>
        ) : (
          <>
            <div className="degree-general-tiles">
              <GeneralTileList
                client={degreeGeneralTileClient}
                contentType="degreeGeneralResources"
              />
            </div>
            <div className="degree-additional-tiles">
              <AdditionalTileList
                client={degreeAdditionalTileClient}
                contentType="degreeAdditionalResources"
                selectedSubfield={selectedSubfield}
                selectedDegree={selectedDegree}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindGraduateSchools;
