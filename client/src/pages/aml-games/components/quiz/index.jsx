import React, { useState } from 'react';

import { IoCheckmark } from "react-icons/io5";
import './style.scss';

function GameQuiz({
    questions
}) {
    return (
        <div className="game-quiz">
            {
                questions.map((question, index) => {

                    return <Question
                        key={index}
                        question={question.question}
                        answers={question.answers}
                    />
                })
            }
        </div>
    );
}

export const Question = ({
    question,
    answers
}) => {
    const [userAnswer, setUserAnswer] = useState(null);

    return (
        <div className="question">
            <div className="question-text">{question}</div>
            <div className="answers">
                {
                    answers.map((answer, index) => {

                        return (
                            <div key={index} className={`${userAnswer === answer ? 'active' : ''}`}>
                                <span
                                    onClick={(e) => {
                                        setUserAnswer(answer);
                                    }}
                                >
                                    {userAnswer === answer ? <IoCheckmark /> : null}
                                </span>
                                <div>{answer}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameQuiz;