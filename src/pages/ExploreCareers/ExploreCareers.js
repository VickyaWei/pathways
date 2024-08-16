import React, { useState } from "react";
import SubfieldDropdown from "../../components/SubfieldDropdown/SubfieldDropdown";
import { careerAdditionalTileClient } from "../../clients/CareerAdditionalTileClient";
import { careerGeneralTileClient } from "../../clients/CareerGeneralTileClient";
import TileList from "../../components/TileList/TileList/TileList";
import "./ExploreCareers.css";
import PopupModals from "../../components/PopupModals/PopupModals";
import { GeneralTileList } from "../../components/TileList/General/GeneralTileList";
import { AdditionalTileList } from "../../components/TileList/Additional/AdditionalTileList";
import FourTileList from "../../components/TileList/TileList/FourTileList";
import { CareerTileList } from "../../components/TileList/CareerTileList/CareerTileList";

const ExploreCareers = () => {
  const [selectedSubfield, setSelectedSubfield] = useState("");

  const handleSubfieldChange = (subfield) => {
    setSelectedSubfield(subfield);
  };

  return (
    <div className="explore-careers">
      <PopupModals />
      <SubfieldDropdown onSubfieldChange={handleSubfieldChange} className="subfield-dropdown" />
      <div className={selectedSubfield ? "changed-career-tiles-container" : "started-career-tiles"}>
        {!selectedSubfield ? (
          <>
            <div className="career-general-tile">
              <FourTileList
                client={careerGeneralTileClient}
                contentType="careerUpTiles"

              />
            </div>
            <div className="career-additional-tiles">
              <FourTileList
                client={careerAdditionalTileClient}
                contentType="careerDownTiles"
                selectedSubfield={selectedSubfield}
              />
            </div>
          </>
        ) : (
          <>
            <div className="career-general-tiles">
              <GeneralTileList 
                client={careerGeneralTileClient}
                contentType="careerUpTiles"
              />
            </div>
            <div className="career-additional-tiles">
              <CareerTileList 
                client={careerAdditionalTileClient}
                contentType="careerDownTiles"
                selectedSubfield={selectedSubfield}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreCareers;