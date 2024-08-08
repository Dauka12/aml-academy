import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const BoxOfThree = ({ question, answer, flipEnabled = true, isOpenInitially = false, width = '200px', height = '150px', isCorrect }) => {
  const [flipped, setFlipped] = useState(isOpenInitially);

  useEffect(() => {
    setFlipped(isOpenInitially);
  }, [isOpenInitially, question]);

  const handleFlip = () => {
    if (flipEnabled) {
      setFlipped(!flipped);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''} ${isCorrect !== null ? (isCorrect ? 'correctBox' : 'incorrectBox') : ''}`} onClick={handleFlip} style={{ width, height }}>
      <div className="card-content">
        <div className={`face front ${flipped ? 'hidden' : ''}`}>
          <div className="question">{question}</div>
        </div>
        <div className={`face back ${flipped ? '' : 'hidden'}`}>
          <div className="answer">{answer}</div>
        </div>
      </div>
    </div>
  );
};

BoxOfThree.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  flipEnabled: PropTypes.bool,
  isOpenInitially: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  isCorrect: PropTypes.bool,
};

export default BoxOfThree;
