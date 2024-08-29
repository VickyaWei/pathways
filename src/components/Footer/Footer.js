import React from "react";
import { Button, Box } from "@mui/material";
import "./Footer.css"; 

export const Footer = ({
  onPrevious,
  onNext,
  isNextButtonDisabled,
  previousUrl,
  nextUrl,
}) => {
  return (
    <Box className="footer-container">
      <Button className="footer-button" onClick={() => onPrevious(previousUrl)}>
        Previous
      </Button>
      <Button
        className="footer-button"
        onClick={() => onNext(nextUrl)}
        disabled={isNextButtonDisabled} // Disable button based on timer
      >
        Finish Survey
      </Button>
    </Box>
  );
};

export default Footer;
