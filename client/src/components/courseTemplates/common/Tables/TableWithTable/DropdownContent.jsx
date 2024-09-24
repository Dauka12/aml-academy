import React from 'react';
import './DropdownContent.scss';

const DropdownContent = ({ isOpen, children }) => {
  const formatText = (text) => {
    if (typeof text !== 'string') {
      return text; // Если text не является строкой, вернуть его как есть
    }

    // Используем регулярное выражение для поиска и подсветки текста в кавычках
    const formattedText = text?.replace(/"(.*?)"/g, (match, p1) => (
      <React.Fragment key={match}>
        <span style={{ fontWeight: 'bold' }}>{p1}</span>
      </React.Fragment>
    ));

    // Разбиваем текст по строкам и добавляем <br> после каждой строки, кроме последней
    const lines = formattedText.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  };

  return <div className={`dropdown-contentTable ${isOpen ? 'open' : ''}`}>{formatText(children)}</div>;
};

export default DropdownContent;

