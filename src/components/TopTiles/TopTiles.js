import React from "react";

const TopTiles = (props) => {
  const { id, title, description, image, url } = props;
  return (
    <div className="tile" key={id}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
      </a>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default TopTiles;
