import React from 'react';
import './Header.css';

const Header = ({ showTitle }) => {
  return (
    <header className="header-container">
      {showTitle && <h1 className="site-title">Next Steps</h1>}
      <div className="logo-container">
        <img src='./images/CSUFlogo.jpg' alt="CSUF Logo" className="csuf-logo" />
        <img src='./images/NSFlogo.png' alt="NSF Logo" className="nsf-logo" />
      </div>
    </header>
  );
}

export default Header;
