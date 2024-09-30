import React, { useState } from "react";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePrevious = () => {
    setOpenPopup(true); // Always show the popup on click
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleGoToQualtrics = () => {
    handleClosePopup();
    window.location.href = "https://google.com"; // Replace with actual URL
  };

  const handleFinishSurvey = () => {
    window.location.href = "https://google.com"; // Redirect to Google or any other URL
  };

  return (
    <Box className="footer-container">
      <Button className="footer-button" onClick={handlePrevious}>
        Previous
      </Button>
      <Button className="footer-button" onClick={handleFinishSurvey}>
        FINISH SURVEY
      </Button>

      {/* Popup Dialog */}
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Reminder</DialogTitle>
        <DialogContent>
          <Typography>
            You've visited the MentorPal page. Please complete the Qualtrics survey.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
          <Button onClick={handleGoToQualtrics} color="primary">
            Go to Qualtrics
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Footer;
