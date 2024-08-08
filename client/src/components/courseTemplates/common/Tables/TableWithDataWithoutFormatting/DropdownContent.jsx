import React from 'react';
import './DropdownContent.scss';

const DropdownContent = ({ isOpen, children }) => {
  return <div className={`dropdown-contentData ${isOpen ? 'open' : ''}`}>{ children }</div>;
};

export default DropdownContent;
