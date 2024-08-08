import React, { useState } from 'react';
import './DropdownButton.scss';

const DropdownButton = ({ label, onClick, isOpen }) => {
  return (
    
    <div className={`dropdown-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
      {label}
      </div>
    
  );
};

export default DropdownButton;
