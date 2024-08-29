import React, { useEffect, useState } from "react";
import "./Transition.css";
import {RecommenderPage} from "../RecommenderPage/RecommenderPage";

const Transition = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // change the time here

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
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
      ) : (
        <RecommenderPage />
      )}
    </div>
  );
};

export default Transition;
