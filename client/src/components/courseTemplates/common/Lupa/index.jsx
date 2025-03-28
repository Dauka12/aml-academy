// DraggableOption/index.jsx
import React from 'react';
import parseText from '../../../../util/ParseTextFromFormatTextarea.jsx';
import './style.scss';

const Lupa = ({ option, onDragStart, version=1 }) => {

  if (version === 2) {
    return (
      <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => onDragStart(e, option)}>
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
    <div className="draggable-option-lupa" draggable="true" onDragStart={(e) => onDragStart(e, option)}>
      {option}
    </div>
  );
};

export default Lupa;
