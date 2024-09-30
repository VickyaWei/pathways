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
import { useNavigate } from "react-router-dom";
import "./FooterWithTimer.css";

const FooterWithTimer = ({ onPrevious, onNext }) => {
  const initialTimeInSeconds = 1 * 20;
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : initialTimeInSeconds;
  });
  const [openModal, setOpenModal] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem("timeLeft", newTime); // Save timeLeft to local storage
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && !openModal) {
      setOpenModal(true);
    }

    return () => clearInterval(interval);
  }, [timeLeft, openModal]);

  useEffect(() => {
    // Clear the timer when the component unmounts
    return () => {
      localStorage.removeItem("timeLeft");
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSnooze = () => {
    setTimeLeft(5 * 60); // Set timer to 5 minutes (300 seconds)
    setIsNextButtonEnabled(true); // Enable the "Next" button
    handleCloseModal(); // Close the modal
  };

  const handleGoToRecommendations = () => {
    handleCloseModal(); // Close the modal
    navigate("/transition"); // Redirect to transition page
  };

  return (
    <Box className="footer-with-timer-container">
      {timeLeft > 0 && (
        <Typography className="footer-timer">
          Time Left: {formatTime(timeLeft)}
        </Typography>
      )}
      <Button
        className="footer-timer-button"
        onClick={() => {
          if (isNextButtonEnabled) {
            navigate("/transition"); // Redirect to transition page
          }
        }}
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
        <DialogTitle id="alert-dialog-title">Time's Up!</DialogTitle>
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
