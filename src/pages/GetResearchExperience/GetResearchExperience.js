import React from "react";
import "./GetResearchExperience.css";

import ResearchTopTile from "../../components/ResearchTiles/ResearchTopTile";
import ResearchDownTile from "../../components/ResearchTiles/ResearchDownTile";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

const GetResearchExperience = () => {
  return (
    <div className="GetResearchExperience">
      <div className="facultyContainer">
        <p className="title">
          Looks like you want to get more research experience!
        </p>
        <p className="highlighted-paragraph">
          Check out the research opportunities available in our Department, to get started:
        </p>
        <ResearchTopTile />
      </div>
      <div className="otherContainer">
        <p className="highlighted-paragraph">
          If you would like to find research opportunities elsewhere, here are some good ways to get started:
        </p>
        <ResearchDownTile />
      </div>
      <div>
        <Disclaimer />
      </div>
    </div>
  );
};

export default GetResearchExperience;
