import React, { createContext, useContext, useState } from 'react';

const CategoryFormatContext = createContext();


export const useCategoryFormat = () => useContext(CategoryFormatContext);


export const CategoryFormatProvider = ({ children }) => {
  const [categoryFormat, setCategoryFormat] = useState('Дистанционно'); 

  const handleChangeCategoryFormat = (format) => {
    setCategoryFormat(format);
  };

  return (
    <CategoryFormatContext.Provider value={{ categoryFormat, handleChangeCategoryFormat }}>
      {children}
    </CategoryFormatContext.Provider>
  );
};
