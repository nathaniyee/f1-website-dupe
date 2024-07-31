import React from 'react';
import './NavBar.css';
import logo from './assets/F1_(white).svg.png';
import xLogo from './assets/X_logo_2023_(white).png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavBar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">
          <img src={logo} alt="F1 Logo" className="navbar-logo" />
        </a>
      </div>
      <div className="navbar-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/drivers" className="nav-link">Drivers</Link>
        <Link to="/constructors" className="nav-link">Constructors</Link>
      </div>
      <div className="navbar-icons">
        <a href="https://twitter.com/F1" target="_blank" rel="noopener noreferrer">
          <img src={xLogo} alt='X Logo' className="icon" />
        </a>
        <a href="https://instagram.com/F1" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </a>
        <a href="https://facebook.com/F1" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className="icon" />
        </a>
        <a href="https://tickets.formula1.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </a>
        <button className="sign-in-button">
          SIGN IN
        </button>
      </div>
    </nav>
  );
};

export default NavBar;