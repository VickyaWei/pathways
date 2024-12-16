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

const FooterWithTimer = ({ setSelectedContent }) => {
  const initialTargetTimeInSeconds = 1 * 60;
  const snoozeTimeInSeconds = 5 * 60; // 5 minutes for snooze
  const [timeElapsed, setTimeElapsed] = useState(() => {
    const savedTime = localStorage.getItem("timeElapsed");
    return savedTime ? Math.max(0, parseInt(savedTime, 10)) : 0;
  });
  const [targetTimeInSeconds, setTargetTimeInSeconds] = useState(initialTargetTimeInSeconds);
  const [snoozeTimeElapsed, setSnoozeTimeElapsed] = useState(0); // State for snooze time
  const [openModal, setOpenModal] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const [isSnoozed, setIsSnoozed] = useState(false);  // Snooze state
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timeElapsed < targetTimeInSeconds && !isSnoozed) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("timeElapsed", newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeElapsed >= targetTimeInSeconds && !openModal && !isSnoozed) {
      setOpenModal(true);
    }

    // If snooze is active, track snooze time
    if (isSnoozed && snoozeTimeElapsed < snoozeTimeInSeconds) {
      interval = setInterval(() => {
        setSnoozeTimeElapsed((prevTime) => {
          const newTime = prevTime + 1;
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeElapsed, openModal, isSnoozed, snoozeTimeElapsed]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("timeElapsed");
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const formatProgress = (elapsed, target) => {
    const count = Math.floor(elapsed / 60);
    const total = Math.floor(target / 60);
    return `${count}/${total}`;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleExtendTime = () => {
    setSnoozeTimeElapsed(0);  // Reset snooze time
    setIsSnoozed(true);  // Mark as snoozed
    setTimeElapsed(0);  // Reset regular timer
    setTargetTimeInSeconds(snoozeTimeInSeconds); // Set target to 5 minutes for snooze
    setIsNextButtonEnabled(true);
    handleCloseModal();
  };

  const handleGoToRecommendations = () => {
    handleCloseModal(); // Close the modal
    navigate("/transition"); // Redirect to transition page
  };

  const handlePrevious = () => {
    setSelectedContent(null);
  };

  return (
    <Box className="footer-with-timer-container">
      <Button 
        className="footer-previous-button" 
        onClick={handlePrevious}
      >
        Back
      </Button>

      <Typography className="footer-timer">
        {isSnoozed
          ? `Snoozed For: ${formatProgress(snoozeTimeElapsed, snoozeTimeInSeconds)} min`
          : `Time Elapsed: ${formatProgress(timeElapsed, targetTimeInSeconds)} min`}
      </Typography>

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
            onClick={handleExtendTime}
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
