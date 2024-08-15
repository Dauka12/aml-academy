import React, { useState } from 'react';
import './style.css';

const QuestionComponent = ({ question, handleAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const onAnswer = (answer) => {
        setSelectedAnswer(answer);
        handleAnswer(question.id, answer); // Передаем выбранный ответ обратно в QuestionMap
    };

    return (
        <div className="question-container">
            <span className="question-text">{question.text}</span>
            <div className="buttons-container">
                <button
                    onClick={() => onAnswer(true)}
                    className={`button ${selectedAnswer === true ? 'button-true' : ''}`}
                >
                    &#8593;
                </button>
                <button
                    onClick={() => onAnswer(false)}
                    className={`button ${selectedAnswer === false ? 'button-false' : ''}`}
                >
                    &#8595;
                </button>
            </div>
        </div>
    );
};

export default QuestionComponent;
