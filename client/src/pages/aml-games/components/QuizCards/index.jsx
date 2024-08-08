import React, { useState } from 'react';
import buttonGreen from './../../assets/buttonGreen.svg';
import buttonRed from './../../assets/buttonRed.svg';
import './style.scss';



const QuizCard = ({ logo, text }) => {
    const [flipped, setFlipped] = useState(false);
    const [displayContent, setDisplayContent] = useState({ logo, text });
    const [disabled, setDisabled] = useState(false);

    const handleFlip = () => {
        if (disabled) return;
        setFlipped(!flipped);
        setTimeout(() => {
            if (flipped) {
                setDisplayContent({ logo, text });
            }
        }, 400);
    };

    const handleDisable = () => {
        setDisabled(true);
    };

    return (
        <div className={`QuizCard-container ${disabled ? 'disabled' : ''}`}>
            <div className="QuizCard-wrapper" onClick={handleFlip}>
                <div className={`QuizCard ${flipped ? 'flipped' : ''}`}>
                    <div className="QuizCard-face front">
                        <img src={logo} alt="logo" className="logo large" />
                    </div>
                    <div className="QuizCard-face back">
                        <img src={displayContent.logo} alt="logo" className="logo small" />
                        <p>{displayContent.text}</p>
                        <div className="buttons">
                            <div className='buttonsDiv' onClick={handleDisable}>
                                <img src={buttonRed} alt="" />
                            </div>
                            <div className='buttonsDiv' onClick={handleDisable}>
                                <img src={buttonGreen} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
