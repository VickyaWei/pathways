import React from "react";
import "./GetResearchExperience.css";
import Disclaimer from "../../components/Disclaimer/Disclaimer";
import ResourceTile from "../../components/ResourceTiles/ResourceTiles";

const GetResearchExperience = ({ isSidebarOpen }) => {
  return (
    <div className="get-research-experience-container">
      <div
        className={`get-research-experience ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="facultyContainer">
          <p className="title">
            Looks like you want to get more research experience!
          </p>
          <p className="research-highlighted-paragraph">
            Check out the research opportunities available in our Department, to
            get started:
          </p>

          <div className="tile-grid">
            <ResourceTile tagFilter="Research Up Tiles" isResearchPage={true} />
          </div>
        </div>
        <div className="otherContainer">
          <p className="research-highlighted-paragraph">
            If you would like to find research opportunities elsewhere, here are
            some good ways to get started:
          </p>

          <div className="tile-grid">
            <ResourceTile
              tagFilter="Research Down Tiles"
              isResearchPage={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetResearchExperience;
