import React, { useState } from 'react';
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

const QuizCard = ({ quizCardsData }) => {
    const [cards, setCards] = useState(quizCardsData);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const handleCorrect = () => {
        setCorrectAnswers([...correctAnswers, cards[0].text]);
        setCards(cards.slice(1)); // Remove the first card from the deck
    };

    const handleSkip = () => {
        const skippedCard = cards[0];
        setCards([...cards.slice(1), skippedCard]); // Move the first card to the end of the deck
    };

    const handleRemove = (indexToRemove) => {
        const removedAnswer = correctAnswers[indexToRemove];
        setCorrectAnswers(correctAnswers.filter((_, index) => index !== indexToRemove));
        setCards([{ text: removedAnswer }, ...cards]); // Add the removed answer back to the deck
    };

    return (
        <div className="QuizContainer1">
            <div className="QuizLeft">
                {cards.length > 0 ? (
                    <Cards
                        text={cards[0].text}
                        logo={CardAmlLogo}
                        handleCorrect={handleCorrect}
                        handleSkip={handleSkip}
                    />
                ) : (
                    <p>No more cards to display.</p>
                )}
            </div>
            <div className="QuizRight">
                <ul>
                    {correctAnswers.map((answer, index) => (
                        <li key={index}>
                            <span className="remove-button" onClick={() => handleRemove(index)}>&#10006;</span>
                            {answer}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default QuizCard;
