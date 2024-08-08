import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import './style.scss';

import { BsArrowClockwise } from "react-icons/bs";
import { useLocation } from 'react-router';

const QuestionContainer = ({ questions, leftAnswer, rightAnswer }) => {
    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if (
            (location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)
        ) {
            setKazakh(true);
        }
    }, [])

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleOnDragStart = (e, side, answer) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ answer, side }));
    };

    if (!questions) return null;

    if (questions.length === 0) return null;

    return (
        <div className='dnd-question-container'>
        
            <div className='questions'>
                {
                    currentQuestion < questions.length 
                    ? (
                        <div 
                            className="question-card" 
                            draggable
                            onDragStart={(e) => handleOnDragStart(e, questions[currentQuestion].side, questions[currentQuestion].answer)}
                            onDragEnd={(e) => {
                                setCurrentQuestion(prev => prev + 1);
                            }}
                        >
                            {questions[currentQuestion].answer}
                        </div>
                    ) : (
                        <div 
                            className="question-card" 
                            draggable
                            onDragStart={(e) => {
                                const endText = isKazakh 
                                    ? 'Сұрақтар бітті'
                                    : 'Вопросы закончились';

                                handleOnDragStart(
                                    e, 
                                    { endText }, 
                                    { endText }, 
                                )
                            }}
                        >
                            {
                                isKazakh 
                                    ? 'Сұрақтар бітті'
                                    : 'Вопросы закончились'
                            }
                        </div>
                    )
                }
            </div>
            <div className="two-sides">
                <Side 
                    answer={leftAnswer}
                />
                <Side 
                    answer={rightAnswer}
                />
            </div>

            <div className="actions">
                <div onClick={() => setCurrentQuestion(0)}>
                    <span>
                        { 
                            isKazakh 
                                ? 'Басынан бастау'
                                : 'Начать заново' 
                        }
                    </span>
                    <BsArrowClockwise size={25} />
                </div>
            </div>
        </div>
    );
};

const Side = ({
    answer, 
}) => {
    const mainControls = useAnimation();
    const variants = {
        initial: {
            borderColor: 'rgba(0, 0, 0)',
        },
        correct: {
            borderColor: 'rgba(110, 245, 153)',
        },
        wrong: {
            borderColor: 'rgba(227, 129, 129)',
        },
        hover: {
            borderColor: 'rgba(54, 162, 245)',
        }
    }

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleOnDragStart = (e, side, answer) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ answer, side }));
  };

    const handleOnDragOver = (e) => {
        e.preventDefault(); // Prevent default behavior to enable dropping
        
        e.target.style.cursor = 'pointer';
        e.target.style.transform = 'scale(105%, 105%)';
        mainControls.start('hover');
    };

    const handleOnDragLeave = (e) => {
        e.preventDefault(); // Prevent default behavior
        
        setInitialStyle(e);
    };

    const handleOnDrop = (e, dropSide) => {
        e.preventDefault();
        
        const data = e.dataTransfer.getData('text/plain');
        const { answer, side } = JSON.parse(data);

        if (dropSide === side) {
            setCorrectStyle(e);
        } else {
            setWrongStyle(e);
        }
        
        setTimeout(() => {
            setInitialStyle(e);
        }, 1000);

    };

    const setInitialStyle = (e) => {
        e.target.style.cursor = 'initial';
        e.target.style.transform = 'scale(100%, 100%)';
        mainControls.start('initial');
    }

    const setWrongStyle = (e) => {
        e.target.style.cursor = 'initial';
        e.target.style.transform = 'scale(110%, 110%)';
        mainControls.start('wrong');
    }

    const setCorrectStyle = (e) => {
        e.target.style.cursor = 'initial';
        e.target.style.transform = 'scale(110%, 110%)';
        mainControls.start('correct');
    }

  return (
        <motion.div 
            className='side' 
            animate={mainControls}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            initial='initial'
            variants={variants}
            onDragOver={(e) => handleOnDragOver(e)}
            onDragLeave={(e) => handleOnDragLeave(e)}
            onDrop={(e) => handleOnDrop(e, answer)}
            // whileHover={{ scale: 1.2, rotate: 90 }}
        >
        {
            answer
        }
        </motion.div>
  )
}

export default QuestionContainer;
