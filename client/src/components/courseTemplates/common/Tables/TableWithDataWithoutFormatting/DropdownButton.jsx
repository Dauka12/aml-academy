import React, { useState } from 'react';
import './DropdownButton.scss';

const DropdownButton = ({ label, onClick, isOpen }) => {
  
  return (
    
    <div className={`dropdown-buttonData ${isOpen ? 'open' : ''}`} title={label} onClick={onClick}>
      {label}
      </div>
    
  );
};

export default DropdownButton;
