import React, { useEffect, useState } from "react";
import cl from './Dropdown.module.css';
import { useStyle } from "../../components/VisualModal/StyleContext";


const Dropdown = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { styles} = useStyle();


  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? `${cl.accordion__item} ${cl.open} text-content` : cl.accordion__item}>
      <div className={`${cl.accordion__header} text-content`} onClick={toggleAccordion}>
        <span className={`${cl.accordion__title} text-content`}>{title}</span>
        <span className={cl.accordion__arrow}></span>
      </div>
      <div className={cl.accordion__content}>
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
