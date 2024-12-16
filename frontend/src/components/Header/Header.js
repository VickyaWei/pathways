import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <h1 className="site-title">Psychology Pathways</h1>
      <div className="header-logo-container">
        <img 
          src="/images/CSUFlogo.jpg" 
          alt="CSUF Logo" 
          className="csuf-logo"
        />
        <img 
          src="/images/NSFlogo.png" 
          alt="NSF Logo" 
          className="nsf-logo"
        />
      </div>
    </header>
  );
};

export default Header;