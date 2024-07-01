import React, { useState, useEffect } from 'react';

const Footer = ({ onPrevious, onNext }) => {
  const initialTimeInSeconds = 30 * 60; // 30 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Convert seconds into minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-buttons">
          <button className="btn" onClick={onPrevious}>
            Previous
          </button>
          <div className="footer-timer">
          Time Left: {formatTime(timeLeft)}
        </div>
          <button className="btn" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
