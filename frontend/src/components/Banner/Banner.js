import React from "react";
import './Banner.css';

const Banner = ({ text, imageSrc }) => {
  return (
    <div className="banner">
      <div className="banner-text">
        Looks like you want to search for <span className="highlight">{text}</span>
      </div>
      <img
        src={imageSrc}
        alt="Banner Icon"
        className="banner-icon"
      />  
    </div>
  );
};

export default Banner;
