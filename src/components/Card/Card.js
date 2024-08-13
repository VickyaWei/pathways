import React from "react";
import "./Card.css";

export const Card = ({ img, title, subtitle, url }) => (
  <a href={url} className="card-link">
    <div className="card">
      {img && <img src={img} alt={title} className="card-img" />}
      <h2 className="card-title">{title}</h2>
      <h3 className="card-subtitle">{subtitle}</h3>
    </div>
  </a>
);
