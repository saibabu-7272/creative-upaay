import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

const MobileMenuToggle = ({ isOpen, toggleMenu }) => {
  return (
    <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>
  );
};

export default MobileMenuToggle;
