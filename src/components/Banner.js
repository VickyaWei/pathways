import React from "react";

const Banner = ({ text, imageSrc }) => {
  return (
    <div className="banner">
      <div className="banner-text">{text}</div>
      <img
        src={imageSrc}
        alt="Banner Icon"
        className="banner-icon"
      />  
    </div>
  );
};

export default Banner;
