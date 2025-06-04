import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './QuizApp.scss';
import QuizQuestion from './QuizQuestion';

const QuizApp = ({ questions }) => {
  const location = useLocation();
  const [isKazakh, setKazakh] = useState(false);

  useEffect(() => {
    if (location.search.includes('81') || location.pathname.includes('81')) {
      setKazakh(true);
    }
  }, [location]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowNextQuestionButton(true);
  };

  const handleNextQuestionButtonClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowNextQuestionButton(false);
  };

  if (!questions || !questions?.length) {
    return <div></div>;
  }

  const isLastQuestion = currentQuestionIndex === questions?.length - 1;

  return (
    <div className="quiz-app">
      {currentQuestionIndex < questions?.length ? (
        <div>
          <QuizQuestion
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            correctOptionIndex={questions[currentQuestionIndex].correctOptionIndex}
            onNextQuestion={handleNextQuestion}
            showNextQuestionButton={showNextQuestionButton}
          />
        </div>
      ) : (
        <div className="quiz-completed">
          <p>Quiz Completed!</p>
          <p>Your Score: {score}</p>
        </div>
      )}

      {showNextQuestionButton && !isLastQuestion && (
        <button className="buttonQuiz" onClick={handleNextQuestionButtonClick}>
          {isKazakh ? 'Келесі сұрақ' : 'Следующий вопрос'}
        </button>
      )}
    </div>
  );
};

QuizApp.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          answer: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
      correctOptionIndex: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default QuizApp;
