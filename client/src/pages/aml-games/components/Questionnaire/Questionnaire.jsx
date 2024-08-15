import React, { useState } from "react";
import "./Questionnaire.scss";

const questions = [
  {
    id: 1,
    text: "Описание операции: Покупка золотого кольца\nСумма: 4 500 000 тенге",
    correctAnswer: "не относится",
  },
  {
    id: 2,
    text: "Описание операции: Покупка золотого кольца\nСумма: 15 500 000 тенге",
    correctAnswer: "относится",
  },
  {
    id: 3,
    text: "Описание операции: Покупка золотого кольца\nСумма: 845 500 000 тенге",
    correctAnswer: "относится",
  },
  {
    id: 4,
    text: "Описание операции: Покупка золотого кольца\nСумма: 143 500 000 тенге",
    correctAnswer: "относится",
  },
  {
    id: 5,
    text: "Описание операции: Покупка золотого кольца\nСумма: 15 000 000 тенге",
    correctAnswer: "относится",
  },
  {
    id: 6,
    text: "Описание операции: Покупка золотого кольца\nСумма: 1 300 000 тенге",
    correctAnswer: "не относится",
  },
  // Add more questions as needed
];

const Questionnaire = ({ handleSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    setUserAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    }
  };

  const calculateScore = () => {
    let correctAnswersCount = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswersCount += 1;
      }
    });

    const score = correctAnswersCount / questions.length;
    return score;
  };

  const handleConfirm = () => {
    const score = calculateScore();
    handleSubmit("tagged", score); 
    console.log("User Answers:", userAnswers);
    console.log("Correct Answers:", questions.map((q) => q.correctAnswer));
    console.log("Score:", score);
    setAnswersSubmitted(true);
  };

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
        <div className="questionnaire-question">
          <p>{questions[currentQuestion].text}</p>
        </div>
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
      </div>
      <div className="actions" style={{ display:'flex', width:'60%',justifyContent:'right', marginTop: '30px' }}>
        <button
          className="blue"
          onClick={handleConfirm} // Call handleConfirm when the button is clicked
          disabled={answersSubmitted} // Disable the button after submission
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
