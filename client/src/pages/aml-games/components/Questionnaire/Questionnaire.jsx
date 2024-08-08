import React, { useState } from "react";
import "./Questionnaire.scss";

const questions = [
  {
    id: 1,
    text: "Описание операции: Покупка золотого кольца\nСумма: 4 500 000 тенге",
  },
  {
    id: 2,
    text: "Описание операции: Покупка золотого кольца\nСумма: 15 500 000 тенге",
  },
  {
    id: 3,
    text: "Описание операции: Покупка золотого кольца\nСумма: 845 500 000 тенге",
  },
  {
    id: 4,
    text: "Описание операции: Покупка золотого кольца\nСумма: 143 500 000 тенге",
  },
  {
    id: 5,
    text: "Описание операции: Покупка золотого кольца\nСумма: 15 000 000 тенге",
  },
  {
    id: 6,
    text: "Описание операции: Покупка золотого кольца\nСумма: 1 300 000 тенге",
  },
  // Добавьте сюда остальные вопросы
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswersSubmitted(true); // All answers have been submitted
    }
  };

  const handleSelectAnswer = (answer) => {
    console.log(`Ответ выбран: ${answer}`);
    if (currentQuestion === questions.length - 1) {
      setAnswersSubmitted(true); // Submit answers on the last question
    } else {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    }
  };

  // Функция для определения класса кнопки на основе её типа
  const getButtonClass = (index) => {
    if (index === 0) {
      return "questionnaire-button not-relevant";
    } else if (index === 1) {
      return "questionnaire-button relevant";
    }
    return "questionnaire-button";
  };

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-content">
        <div
          className={getButtonClass(0)}
          onClick={() => handleSelectAnswer("не относится")}
        >
          Сделка <u>не относится</u> к пороговой операции
        </div>
        {answersSubmitted ? (
          <div className="questionnaire-question">
            <p>Ответы приняты</p>
          </div>
        ) : (
          <div className="questionnaire-question">
            <p>{questions[currentQuestion].text}</p>
          </div>
        )}
        <div
          className={getButtonClass(1)}
          onClick={() => handleSelectAnswer("относится")}
        >
          Сделка <u>относится</u> к пороговой операции
        </div>
      </div>
      <div className="questionnaire-navigation">
        <div className="dots">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`dot ${index === currentQuestion ? "active" : ""}`}
              onClick={() => setCurrentQuestion(index)}
            />
          ))}
        </div>
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Назад
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
