import React from "react";
import Banner from "../components/Banner";
import TopTileList from "../components/TopTiles/TopTileList";
import DownTileList from "../components/DownTiles/DownTileList";

const GetResearchExperience = () => {
  return (
    <div className="GetResearchExperience">
      <div className="markContainer">
        <Banner
          text="Looks like you want to search for research opportunities!"
          imageSrc="./images/NSFlogo.png" // Update the image path as needed
        />
      </div>
      <div className="facultyContainer">
        <p>
          A good way to get started would be to check out faculty research labs
          in the department. Here are some resources to get you started:
        </p>
        <TopTileList />
      </div>
      <div className="otherContainer">
        <p>
          If you would like to find research opportunities elsewehere, here are
          some good ways to get started:
        </p>
        <DownTileList />
      </div>
    </div>
  );
};

export default GetResearchExperience;
