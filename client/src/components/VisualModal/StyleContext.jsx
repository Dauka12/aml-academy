// StyleContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const StyleContext = createContext();

export const useStyle = () => {
  return useContext(StyleContext);
};

export const StyleProvider = ({ children }) => {
  const [userEntry, setUserEntry] = useState(true);
  const[checkStyle, setCheckStyle] = useState(false);

  const [styles, setStyles] = useState({
    fontSize: 'standard',
    fontFamily: 'Arial',
    colorMode: 'light',
    letterInterval: 'standard',
    showImage: true,
    openComponent: null,
  });

  const [open, setOpen] = useState(false);

  const updateStyles = (newStyles) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      ...newStyles,
    }));
  };

  function checkFirstVisit() {
    if (!sessionStorage.getItem("first_visit")) {
      sessionStorage.setItem("first_visit", "yes");
      return true; // First visit in this browser session
    }
    return false; // Not first visit in this session
  }

  const setOpenComponent = (component) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      openComponent: prevStyles.openComponent === component ? null : component,
    }));
  };

  const value = {
    styles,
    updateStyles,
    setOpenComponent,
    open,
    setOpen,
    userEntry,
    setUserEntry,
    checkStyle,
    setCheckStyle
  };

  useEffect(() => {
    if (checkFirstVisit()) {
      setUserEntry(true);
    } else {
      setUserEntry(false);
    }
  }, [])

  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
};
