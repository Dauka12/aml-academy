import React from 'react';
import './style.scss';

const TextWithLink = ({ text, link }) => {
  if (!text) {
    return null;
  }

  const parts = text.split(/("[^"]*")|\+/).filter(Boolean);
  const formatText = (someText) => {
    return someText.replace(/"(.*?)"/g, '<span style="font-weight: bold;">$1</span>');
  };

  return (
    <div className='divComponent'>
      <p className='textWithoutLink'>
        {parts.map((part, index) => {
          if (part.startsWith('"') && part.endsWith('"')) {
            const content = part.slice(1, -1);
            return (
              <a className='textWithLink' key={index} href={link} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: formatText(content) }} />
            );
          }

          if (part.startsWith('+') && part.endsWith('+')) {
            const content = part.slice(1, -1);
            return (
              <b key={index} href={link} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{ __html: formatText(content) }} />
            );
          }


          // Просто отображаем текст между плюсами
          return <span key={index}>{part}</span>;
        })}
      </p>
    </div>
  );
};

export default TextWithLink;
