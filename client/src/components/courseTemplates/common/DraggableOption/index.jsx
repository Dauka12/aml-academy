// DraggableOption/index.jsx
import React from 'react';
import './style.scss';
import parseText from '../../../../util/ParseTextFromFormatTextarea';

const DraggableOption = ({ option, onDragStart, version=1 }) => {


  if (version === 2) {
    return (
      <div className="draggable-option" draggable="true" onDragStart={(e) => onDragStart(e, option)}>
        {option.split('\\n').map((child, index) => {
            return (
                <React.Fragment key={index}>
                    <p>
                      {parseText(child)}
                    </p>
                </React.Fragment>
            );
        })}
      </div>
    )
  }

  return (
    <div className="draggable-option" draggable="true" onDragStart={(e) => onDragStart(e, option)}>
      {option}
    </div>
  );
};

export default DraggableOption;
