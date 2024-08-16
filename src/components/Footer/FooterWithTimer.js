import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./FooterWithTimer.css"; // Import the CSS file

const FooterWithTimer = ({ onPrevious, onNext }) => {
  const initialTimeInSeconds = 1 * 60; // 1 minute in seconds (for testing purposes)
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  const [openModal, setOpenModal] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !openModal) {
      setOpenModal(true); // Show the modal when the timer reaches zero
    }

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [timeLeft, openModal]);

  // Convert seconds into minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle snooze
  const handleSnooze = () => {
    setTimeLeft(5 * 60); // Set timer to 5 minutes (300 seconds)
    setIsNextButtonEnabled(true); // Enable the "Next" button
    handleCloseModal(); // Close the modal
  };

  // Handle going to recommendations
  const handleGoToRecommendations = () => {
    // Implement navigation to recommendations
    handleCloseModal(); // Close the modal
  };

  return (
    <Box className="footer-with-timer-container">
      <Button className="footer-timer-button" onClick={onPrevious}>
        Previous
      </Button>
      <Typography className="footer-timer">
        Time Left: {formatTime(timeLeft)}
      </Typography>
      <Button
        className="footer-timer-button"
        onClick={onNext}
        disabled={!isNextButtonEnabled} // Disable button based on timer
      >
        Next
      </Button>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{}</DialogTitle>
        <DialogContent>
          <Typography>
            You've now spent 30 minutes talking with mentors. Would you like to
            move on to our recommendations page?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            className="snooze-button"
            onClick={handleSnooze}
            color="primary"
          >
            Snooze for 5 Minutes
          </Button>
          <Button
            className="recommendations-button"
            onClick={handleGoToRecommendations}
            color="primary"
          >
            Go to Recommendations
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FooterWithTimer;
