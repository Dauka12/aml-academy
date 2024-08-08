// QuizQuestion.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BoxOfThree from '../BoxOfThree'; // Подключите свой компонент карточки

import './style.scss'; // Импортируйте свои стили

const QuizQuestion = ({ question, options, correctOptionIndex, onNextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (index) => {
    if (!answered) {
      setSelectedOption(index);
      setAnswered(true);

      if (index === correctOptionIndex) {
        setIsCorrect(true);
        onNextQuestion(true);
      } else {
        setIsCorrect(false);
        onNextQuestion(false);
      }
    }
  };
  useEffect(() => {
    // Сбрасываем состояние карточек при смене вопроса
    setIsCorrect(null);
    setSelectedOption(null);
    setAnswered(false);
  }, [question]); // Отслеживаем изменение вопроса
  
  const resetQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(null);
  };
  

  return (
    <div className="quiz-question">
      <div className="questionQuiz">{question}</div>
      <br /><br />
      <div className="optionsQuiz">
        {options.map((option, index) => (
          <div
            key={index}
            className={`optionQuiz ${answered && selectedOption === index ? (isCorrect ? 'correctQuiz' : 'incorrectQuiz') : ''}`}
            onClick={() => handleOptionClick(index)}
          >
            <BoxOfThree
              question={option.question}
              answer={option.answer}
              flipEnabled={true}
              height={'275px'}
              width={'230px'}
              isOpenInitially={false}
              isCorrect={answered && selectedOption === index ? isCorrect : null}
            />
          </div>
        ))}
      </div>
   
    </div>
  );
};

QuizQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
  correctOptionIndex: PropTypes.number.isRequired,
  onNextQuestion: PropTypes.func.isRequired,
  
};

export default QuizQuestion;
