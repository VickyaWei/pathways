import React from "react";
import ResourceTile from "../../components/ResourceTiles/ResourceTiles";
import "./TalkToAnExpert.css";
import { Link } from "react-router-dom";
import Disclaimer from "../../components/Disclaimer/Disclaimer";

const TalkToAnExpert = () => {
  return (
    <div className="talk-to-an-expert">
      <div>
        <h2>Talk More with Pathway Mentors</h2>
        <div className="resource-tile-container">
          <ResourceTile tagFilter="Pathway Mentors" />
        </div>
      </div>

      <div>
        <h2>Talk to an Expert at CSUF</h2>
        <div className="resource-tile-container">
          <ResourceTile tagFilter="Talk to an Expert" />
        </div>
      </div>

      <div>
        <h2>Find Additional Mentoring Programs</h2>
        <div className="resource-tile-container">
          <ResourceTile tagFilter="Mentoring Programs" />
        </div>
      </div>
      <Disclaimer />
    </div>
  );
};

export default TalkToAnExpert;
