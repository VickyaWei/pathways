import React, { useEffect, useState } from "react";
import "./Transition.css";
import { useNavigate } from 'react-router-dom';

const Transition = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/recommenderpage");
    }, 3000); // change the time here

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
        <div className="loading-screen">
          <div className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <p className="loading-text">
            Gathering recommendations<br/> for next
            steps in your career exploration ...
          </p>
        </div>
    </div>
  );
};

export default Transition;
