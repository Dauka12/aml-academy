// src/components/QuizCard.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import SubmissionButton from '../sub-button';
import buttonGreen from './../../assets/buttonGreen.svg';
import buttonRed from './../../assets/buttonRed.svg';
import CardAmlLogo from "./../../assets/card-aml-logo.svg";
import './style.scss';

const Cards = ({ logo, text, handleCorrect, handleSkip }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="QuizCard-container">
            <div className="QuizCard-wrapper" onClick={handleFlip}>
                <div className={`QuizCard ${flipped ? 'flipped' : ''}`}>
                    <div className="QuizCard-face front">
                        <img src={logo} alt="logo" className="logo large" />
                    </div>
                    <div className="QuizCard-face back">
                        <img src={logo} alt="logo" className="logo small" />
                        <p>{text}</p>
                        <div className="buttons">
                            <div className='buttonsDiv' onClick={handleSkip}>
                                <img src={buttonRed} alt="Skip" />
                            </div>
                            <div className='buttonsDiv' onClick={handleCorrect}>
                                <img src={buttonGreen} alt="Correct" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuizCard = ({ quizCardsData, handleSubmit }) => {
    const [cards, setCards] = useState(quizCardsData);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };
    const handleCorrect = () => {
        const currentCard = cards[0];
        setCorrectAnswers([...correctAnswers, currentCard]);
        setCards(cards.slice(1)); // Remove the first card from the deck
    };

    const handleSkip = () => {
        const skippedCard = cards[0];
        setCards([...cards.slice(1), skippedCard]); // Move the first card to the end of the deck
    };

    const handleRemove = (indexToRemove) => {
        const removedAnswer = correctAnswers[indexToRemove];
        setCorrectAnswers(correctAnswers.filter((_, index) => index !== indexToRemove));
        setCards([removedAnswer, ...cards]); // Добавляем убранный ответ обратно в колоду
    };

    const calculateResult = () => {
        const maxAnswer = 3;
        if (correctAnswers?.length > 3) {
            return 0
        }
        const correctCount = correctAnswers.filter(answer => answer.correctAnswer)?.length;
        return correctCount / maxAnswer
    };

    const handleConfirm = () => {
        const result = calculateResult(); // Вычисляем результат
        const answerIds = correctAnswers.map(answer => answer.id); // Собираем ID выбранных карточек
        handleSubmit(answerIds, result); // Отправляем на сервер
        handleNextTask()
        console.log(result);
    };

    return (
        <div className='quiz-confirm'>
            <div className="QuizContainer1">
                <div className="QuizLeft">
                    {cards?.length > 0 ? (
                        <Cards
                            text={cards[0].text}
                            logo={CardAmlLogo}
                            handleCorrect={handleCorrect}
                            handleSkip={handleSkip}
                        />
                    ) : (
                        <p>No more cards to display.</p>
                    )}
                    <div>
                        осталось {cards?.length} карт из 10
                    </div>
                </div>
                <div className="QuizRight">
                    <ul>
                        {correctAnswers.map((answer, index) => (
                            <li key={index}>
                                <span className="remove-button" onClick={() => handleRemove(index)}>&#10060;</span>
                                {answer.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <SubmissionButton handling={handleConfirm} />
        </div>
    );
};

export default QuizCard;
