import React, { useState } from 'react';
import './style.css';

const QuestionComponent = ({ question }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    return (
        <div className="question-container">
            <span className="question-text">{question.text}</span>
            <div className="buttons-container">
                <button
                    onClick={() => handleAnswer(true)}
                    className={`button ${selectedAnswer === true ? 'button-true' : ''}`}
                >
                    &#8593;
                </button>
                <button
                    onClick={() => handleAnswer(false)}
                    className={`button ${selectedAnswer === false ? 'button-false' : ''}`}
                >
                    &#8595;
                </button>
            </div>
        </div>
    );
};

export default QuestionComponent;
