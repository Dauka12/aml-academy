import React, { useEffect, useState } from 'react';
import { NavbarGame } from '../navbar';

import amlLogo from './../assets/aml-logo.svg';
import asianMan from './../assets/asian-man.png';
import asianWoman from './../assets/asian-woman.png';
import role_1 from './../assets/role-1.png';
import role_2 from './../assets/role-2.png';
import role_3 from './../assets/role-3.png';
import role_4 from './../assets/role-4.png';
import shapkaImg from './../assets/shapka.png';
import whiteMan from './../assets/white-man.png';
import whiteWoman from './../assets/white-woman.png';
import './style.scss';

import { FaQuestion } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";

import { useNavigate } from 'react-router';
import { questions } from './questions';

function Game_1() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [chosenCharacterId, setCharacterId] = useState(1);
    const [quizPage, setQuizPage] = useState(1);
    const [isSubject, setIsSubject] = useState(false);
    const avatars = [
        whiteMan, asianMan, asianWoman, whiteWoman
    ]
    
    const [userAnswers, setUserAnswers] = useState([
        {
            question: '1. Когда и кем была создана Группа разработки финансовых мер борьбы с отмыванием денег (ФАТФ)?',
            answer: 'США'
        }
    ])

    function scrollToTopAnimated() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const courseContent = document.querySelector('.aml-game-1-main');
        if (courseContent) {
            courseContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const getDotColor = (num) => {
        return step === num 
        ? '#1F3C88'
        : step - 1 === num || step + 1 === num 
        ? '#5792EB'
        : '#B3C9EA'
    }

    const checkAnswer = (question, answer) => {
        const _userAnswers = userAnswers;
        
        let found = false;
        let newUserAnswers = _userAnswers.map(item => {
            if (item.question === question) {
                found = true;
                return {
                    "question": question,
                    "answer": answer
                }
            }

            return item;
        })

        console.log(newUserAnswers);

        if (!found) {
            newUserAnswers.push({
                "question": question,
                "answer": answer,
            })
        }

        console.log(newUserAnswers);

        setUserAnswers(newUserAnswers);
    }

    useEffect(() => {
        scrollToTopAnimated();
    }, [])

    return ( 
        <div className="aml-game-1-main">
            <NavbarGame />
            <div className="container">
                <section>
                    <div className="left">
                        <div className="welcome-message">
                            <div>Добро пожаловать в</div>
                            <div><span>AML</span><span>GAME!</span></div>

                        </div>
                        <div className="mission">
                            <div className="title">миссия</div>
                            <div className="desc">Обучение субъектов финансового мониторинга, предоставляя им возможность получить знания и навыки, необходимые для эффективного выполнения требований законодательства о противодействии легализации доходов, полученных преступным путем (ПОД/ФТ), а также подготовки к различным ситуациям, с которыми они могут столкнуться в реальной жизни.</div>
                        </div>
                    </div>

                    <div className="right">
                        <div className="developers">
                            <img src={amlLogo} alt="" />
                            <div>Игра разработана при поддержке уполномоченного органа в сфере ПОД/ФТ – Агентства по финансовому мониторингу</div>
                        </div>
                        <div>
                            <p>По итогам прохождения игры Вы получите:</p>
                            <div className="advantages">
                                <div className="title">Преимущество игры</div>
                                <div className='list'>
                                    <div><span></span>Гибкость и удобство</div>
                                    <div><span></span>Эффективная подача материала</div>
                                    <div><span></span>Закрепление знаний</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='list'>
                                    <div><span></span>Знания в области ПОД/ФТ</div>
                                    <div><span></span>Навыки для реализации требований законодательства о ПОД/ФТ</div>
                                    <div><span></span>Сертификат, подтверждающий прохождение игры</div>
                                </div>
                            </div>
                            <div>
                                <img src={shapkaImg} alt="" />
                                <p>Игра позволяет обучиться и закрепить полученные знания. Для полной эффективности вам также доступны другие виды курсов: базовые, профильные, продвинутые и тематические курсы</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="title">
                        <div>Выбранная роль :</div>
                        <div><FaQuestion /></div>
                    </div>
                    <div className="roles">
                        <div className='chosen'>
                            <img src={role_1} alt="" />
                            <div className="title">Ювелирный магазин</div>
                            <div className="icon"><IoCheckmark /></div>
                        </div>
                        <div>
                            <img src={role_2} alt="" />
                            <div className="title">Нотариус</div>
                        </div>
                        <div>
                            <img src={role_3} alt="" />
                            <div className="title">Банк</div>
                        </div>
                        <div>
                            <img src={role_4} alt="" />
                            <div className="title">Обменные пункты</div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="title">
                        <div className="progress">
                            <div className="dots">
                                <div 
                                    className="dot" 
                                    style={{
                                        backgroundColor: getDotColor(1)
                                    }}
                                ></div>
                                <div 
                                    className="dot" 
                                    style={{
                                        backgroundColor: getDotColor(2)
                                    }}
                                ></div>
                                <div 
                                    className="dot" 
                                    style={{
                                        backgroundColor: getDotColor(3)
                                    }}
                                ></div>
                            </div>
                            <div className="pagination">{step} из 3</div>
                        </div>
                        <div><FaQuestion /></div>
                    </div>

                    <div className="form-container">
                        {
                            step === 1 
                                ? (
                                    <div className="first-step">
                                        <div className="left">
                                            <div className="question">Являетесь ли вы субьектом ?</div>

                                            <div className="answers">
                                                <div>
                                                    <span className={`${isSubject ? 'active' : null}`} onClick={() => setIsSubject(true)}>
                                                        {
                                                            isSubject ? <IoCheckmark /> : null
                                                        }
                                                    </span>
                                                    <div>Да</div>
                                                </div>
                                                <div>
                                                    <span className={`${!isSubject ? 'active' : null}`} onClick={() => setIsSubject(false)}>
                                                        {
                                                            !isSubject ? <IoCheckmark /> : null
                                                        }
                                                    </span>
                                                    <div>Нет</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            : step === 2
                                ? (
                                    <div className="second-step">
                                        <div className="left">
                                            <div className="question">Выберите своего персонажа для начала игры</div>

                                            <div className='avatars'>
                                                <div onClick={(e) => setCharacterId(1)}>
                                                    <img src={whiteMan} alt="" className='chosen' />
                                                    {chosenCharacterId === 1 ? <div className="icon"><IoCheckmark /></div> : null} 
                                                    {chosenCharacterId !== 1 ? <div className="overlay"></div> : null}
                                                </div>
                                                <div onClick={(e) => setCharacterId(2)}>
                                                    <img src={asianMan} alt="" />
                                                    {chosenCharacterId !== 2 ? <div className="overlay"></div> : null}
                                                    {chosenCharacterId === 2 ? <div className="icon"><IoCheckmark /></div> : null} 
                                                </div>
                                                <div onClick={(e) => setCharacterId(3)}>
                                                    <img src={asianWoman} alt="" />
                                                    {chosenCharacterId !== 3 ? <div className="overlay"></div> : null}
                                                    {chosenCharacterId === 3 ? <div className="icon"><IoCheckmark /></div> : null} 
                                                </div>
                                                <div onClick={(e) => setCharacterId(4)}>
                                                    <img src={whiteWoman} alt="" />
                                                    {chosenCharacterId !== 4 ? <div className="overlay"></div> : null}
                                                    {chosenCharacterId === 4 ? <div className="icon"><IoCheckmark /></div> : null} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            : step === 3 
                                ? (
                                    <div className="third-step">
                                        <div>
                                            <div className="left">
                                                <div className="questions">
                                                    {
                                                        questions.filter((item, index) => index+1 === quizPage*2 || index+1 === (quizPage*2)-1).map((question, index) => {

                                                            return (
                                                                <div key={index}>
                                                                    <div className="desc">{question.question}</div>
                                                                    <div className="answers">
                                                                        {
                                                                            question.options.map((option, idx) => {
                                                                                let userAnswer = userAnswers.filter(item => item.question === question.question);
                                                                                if (userAnswer.length === 0) {
                                                                                    userAnswer.push({
                                                                                        'answer': '',
                                                                                        'question': ''
                                                                                    })
                                                                                }

                                                                                return (
                                                                                    <div key={idx}>
                                                                                        <span
                                                                                            className={userAnswer[0].answer === option ? 'active' : ''}
                                                                                            onClick={(e) => checkAnswer(question.question, option)}
                                                                                        >
                                                                                            {
                                                                                                userAnswer[0].answer === option ? <IoCheckmark /> : null
                                                                                            }
                                                                                        </span>
                                                                                        <div>{option}</div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="avatar">
                                                    <img src={avatars[chosenCharacterId-1]} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="quiz-progress">
                                            <div className={`${quizPage === 1 ? 'active' : null}`}></div>
                                            <div className={`${quizPage === 2 ? 'active' : null}`}></div>
                                            <div className={`${quizPage === 3 ? 'active' : null}`}></div>
                                            <div className={`${quizPage === 4 ? 'active' : null}`}></div>
                                            <div className={`${quizPage === 5 ? 'active' : null}`}></div>
                                        </div>
                                    </div>
                                )
                            : null
                        }
                        <div className="navigation">
                            <div
                                onClick={() => {
                                    if (step === 3 && quizPage !== 1) {
                                        setQuizPage(prev => {
                                            return prev - 1;
                                        })
                                    } else {
                                        setStep(prev => {
                                            if (prev - 1 <= 0) return 1;
                                            
                                            return prev - 1;
                                        })
                                    }
                                }}
                            >Назад</div>
                            <div
                                onClick={() => {
                                    if (quizPage === 5 && step === 3) {
                                        navigate('/courses/aml-games/game/main/1');
                                    }

                                    if (step === 3) {
                                        setQuizPage(prev => {
                                            if (prev + 1 >= 5) {
                                                return 5;
                                            } else {
                                                return prev + 1;
                                            }
                                        })
                                    } else {
                                        setStep(prev => {
                                            if (prev >= 3) return 3;
                                            
                                            return prev + 1;
                                        })
                                    }

                                }}
                            >
                                { quizPage === 5 && step === 3 ? 'Завершить' : 'Далее' }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Game_1;