import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Popups = ({
  title,
  message,
  leftNote,
  rightNote,
  image,
  addition,
  onNext,
  onPrevious,
  showPrevious,
  currentPopup,
  totalPopups,
}) => {
  return (
    <div className="popupBackground">
      <div className="popupContainer">
        <div className="title">
          <h1>{title}</h1>
        </div>

        <div className="middle">
          <div className="leftNote">
            <p>{leftNote}</p>
          </div>

          <div className="imageContainer">
            {image && (
              <img src={image} alt="Popup Image" className="popupImage" />
            )}
          </div>

          <div className="rightNote">
            <p>{rightNote}</p>
          </div>
        </div>

        <div className="body">
          <p>{message}</p>
          <p className="note">{addition}</p>
        </div>

        {showPrevious && (
          <FaArrowLeft className="arrowButton left" onClick={onPrevious} />
        )}
        {currentPopup === totalPopups - 1 ? (
          <button className="letGoButton" onClick={onNext}>
            Let's go
          </button>
        ) : (
          <FaArrowRight className="arrowButton right" onClick={onNext} />
        )}
        
      </div>
    </div>
  );
};

export default Popups;
