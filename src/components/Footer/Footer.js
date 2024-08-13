import React, { useState, useEffect } from "react";

import "./Footer.css";

const Footer = ({ onPrevious, onNext }) => {
  const initialTimeInSeconds = 30 * 60; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Convert seconds into minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <footer className="footer-container">
      <button className="footer-button-left" onClick={onPrevious}>
        Previous
      </button>
      <div className="footer-timer">Time Left: {formatTime(timeLeft)}</div>
      <button className="footer-button-right" onClick={onNext}>
        Next
      </button>
    </footer>
  );
};

export default Footer;
