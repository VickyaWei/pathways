import React from "react";
import "./Content.css";

const Content = ({ title, displayName, description, images }) => {
  const renderDescription = () => {
    if (typeof description === "string") {
      return <p>{description}</p>;
    } else if (description && description.content) {
      return description.content.map((item, index) => (
        <p key={index}>{item.content[0].value}</p>
      ));
    } else {
      return <p>No description available</p>;
    }
  };

  return (
    <div className="content">
      <h2 className="content-title">{title}</h2>
     
      {images && images.length > 0 && (
        <img
          src={images[0].fields?.file?.url}
          alt={title || "Content image"}
          className="content-image"
        />
      )}
       <div className="content-description">{renderDescription()}</div>
      {displayName && <h3 className="content-display-name">{displayName}</h3>}
      
    </div>
  );
};

export default Content;