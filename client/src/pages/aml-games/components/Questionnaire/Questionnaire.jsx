import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { nextTask } from "../../game-2/store/slices/taskSlice";
import SubmissionButton from "../sub-button";
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
  const [userAnswers, setUserAnswers] = useState(Array(questions?.length).fill(null));
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    setUserAnswers(updatedAnswers);

    if (currentQuestion < questions?.length - 1) {
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

    const score = correctAnswersCount / questions?.length;
    return score;
  };

  const handleConfirm = () => {
    const score = calculateScore();
    handleNextTask()
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
      <div style={{ display: 'flex', width: '100%', justifyContent: 'right', marginTop: '50px' }}>
        <SubmissionButton handling={handleConfirm} />
      </div>
    </div>
  );
};

export default Questionnaire;
