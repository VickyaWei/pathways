import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Subhead.css';

const Subhead = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="subhead-container">
      <div className="subhead">
        <Link 
          to="/get-research-experience" 
          className={`subhead-option ${currentPath === '/get-research-experience' ? 'active' : ''}`} 
        >
          Get Research Experience
        </Link>
        <Link 
          to="/explore-careers" 
          className={`subhead-option ${currentPath === '/explore-careers' ? 'active' : ''}`} 
        >
          Explore Careers
        </Link>
        <Link 
          to="/find-graduate-schools" 
          className={`subhead-option ${currentPath === '/find-graduate-schools' ? 'active' : ''}`} 
        >
          Find Graduate Schools
        </Link>
        <Link 
          to="/talk-to-an-expert" 
          className={`subhead-option ${currentPath === '/talk-to-an-expert' ? 'active' : ''}`} 
        >
          Talk to an Expert
        </Link>
        <Link 
          to="/find-internships" 
          className={`subhead-option ${currentPath === '/find-internships' ? 'active' : ''}`} 
        >
          Find Internships
        </Link>
      </div>
    </div>
  );
};

export default Subhead;
