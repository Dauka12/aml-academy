import React from 'react';
import './style.scss';

const JustTextWithP = ({ textData }) => {
  // Check if textData is an array, if not convert it to an array with a single element
  const dataArray = Array.isArray(textData) ? textData : [textData];

  const formatText = (text) => {
    return text?.replace(/"(.*?)"/g, '<span style="font-weight: bold;">$1</span>');
  };

  return (
    <div style={{display:'flex', justifyContent:"center", width:"100%"}}>
      <div style={{width:"70%"}}>
        {dataArray.map((text, index) => { // Use dataArray here
          return (
            <div key={index}>
              {/* Применяем стили в зависимости от того, является ли текст жирным */}
              <p className={'abzac'} dangerouslySetInnerHTML={{ __html: formatText(text) }}></p>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JustTextWithP;
