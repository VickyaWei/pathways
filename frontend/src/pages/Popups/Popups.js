import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./Popups.css";

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
  onFinal,
}) => {
  return (
    <div className="popupBackground">
      <div className="popupContainer">
        <div className="contentWrapper">
          <div className="popup-title">
            <h1>{title}</h1>
          </div>

          {image && (
            <div className="imageContainer">
              <img src={image} alt="Popup Image" className="popupImage" />
            </div>
          )}

          <div className="textContent">
            <p className="popup-message">{message}</p>
            {addition && <p className="popup-note">{addition}</p>}
          </div>
        </div>

        <div className="navigationButtons">
          {showPrevious && (
            <FaArrowLeft className="arrowButton left" onClick={onPrevious} />
          )}
          {currentPopup === totalPopups - 1 ? (
            <button className="letGoButton" onClick={onFinal}>
              Let's go
            </button>
          ) : (
            <FaArrowRight className="arrowButton right" onClick={onNext} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popups;