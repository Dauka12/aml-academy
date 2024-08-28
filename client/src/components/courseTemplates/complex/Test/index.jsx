import React, { useEffect, useState } from 'react';

import './style.scss';

import axios from 'axios';
import { FaCheck } from "react-icons/fa6";
import { useLocation } from 'react-router';
import base_url from '../../../../settings/base_url';

function TestPage({
    name,
    questions,
    quizId,
    handleOpenModal,
    handleQuizSuccesful,
    handleQuizFail,
    finished
}) {

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        console.log(location);
        if (
            (location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)
        ) {
            setKazakh(true);
        }
    }, [])


    const jwtToken = localStorage.getItem('jwtToken');

    const [currQuestion, setCurrQuestion] = useState(0)
    const [checkedQustions, setCheckedQustions] = useState({ '123': 0 })

    const [isLoading, setLoading] = useState(true);
    const [matchingPairAnswers, setMatchingPairAnswers] = useState([]);

    useEffect(() => {
        setCurrQuestion(0);


        let _checkedQustions = {};
        questions.filter(question => question.mcqOption.length > 0).map(question => {
            _checkedQustions[question.question_id] = 0;
        })



        setCheckedQustions(_checkedQustions)
        setLoading(false);
    }, [questions])

    const handleUpdatePairs = (matched) => {
        const _matched = matched.map(answer => {
            return {
                'question': answer.question,
                'left_part': answer.left_part,
                'right_part': answer.right_part
            }
        })
        setMatchingPairAnswers(_matched)

    }

    const handleAnswerClick = (answerId, question_id) => {
        setCheckedQustions(prevQuestions => {


            return {
                ...prevQuestions,
                [question_id]: answerId
            };
        });
    };

    const handleAnswerClick_2 = (answerId, question_id) => {

        if (answerId === null) {
            setCheckedQustions(prevQuestions => {


                return {
                    ...prevQuestions,
                    [question_id]: []
                };
            });

            return
        }

        setCheckedQustions(prevQuestions => {

            if (prevQuestions[question_id].includes(answerId)) {

                const updatedQuestion = prevQuestions[question_id].filter(id => id !== answerId);

                return {
                    ...prevQuestions,
                    [question_id]: updatedQuestion
                };
            }

            return {
                ...prevQuestions,
                [question_id]: [
                    ...prevQuestions[question_id],
                    answerId
                ]
            };
        });
    };

    const finishTest = () => {


        const fetchData = async () => {
            let newCheckedQuestions = []
            Object.keys(checkedQustions).map(key => {
                const value = checkedQustions[key];

                if (!Array.isArray(value)) {
                    newCheckedQuestions.push({
                        question: key,
                        answer: value
                    })
                } else {
                    value.map(answerId => {
                        newCheckedQuestions.push({
                            question: key,
                            answer: answerId
                        })
                    })
                }
            })

            try {
                const response = await axios.post(
                    `${base_url}/api/aml/quiz/checkQuiz/${quizId}`,
                    {
                        'mcqQuestionAnswerList': newCheckedQuestions,
                        'matchingPairAnswers': matchingPairAnswers
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );


                if (response.data === 'quiz failed') {
                    handleQuizFail(false);
                } else if (response.data === 'zanova') {
                    handleQuizFail(true);
                } else if (response.data === 'quiz completed') {
                    handleQuizSuccesful();
                }

            } catch (error) {

            }
        };

        fetchData();
        // handleOpenModal();
    }

    if (!questions || questions.length === 0 && checkedQustions != undefined) return null;

    const handleCheck = (isChecked) => {

    };

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        )
    }

    return (
        <div className="testPage">
            <div className="test-wrapper">
                <div className="title">{name}</div>
                <div className="test">
                    <div className="question-header">
                        <div className="question-num">
                            <div>{isKazakh ? 'Сұрақ' : 'Вопрос'}</div>
                            <div>{currQuestion + 1}/{questions.length}</div>
                        </div>
                        <div className="question-text">
                            <div>{questions[currQuestion] ? questions[currQuestion].question_title : null}</div>
                            <div className="question-img">{questions[currQuestion]?.image
                                ? (
                                    <img src={questions[currQuestion].image} alt={questions[currQuestion].question_title} />
                                )
                                : null}</div>
                        </div>
                    </div>

                    {
                        questions[currQuestion] && questions[currQuestion].mcqOption
                            && questions[currQuestion].mcqOption.filter(option => option.is_true === true).length < 2
                            ? (
                                <MSQ_Body
                                    questions={questions}
                                    checkedQustions={checkedQustions}
                                    currQuestion={currQuestion}
                                    finished={finished}
                                    handleAnswerClick={handleAnswerClick}
                                    handleCheck={handleCheck}
                                />
                            ) : null
                    }

                    {
                        questions[currQuestion] && questions[currQuestion].mcqOption
                            && questions[currQuestion].mcqOption.filter(option => option.is_true === true).length >= 2
                            ? (
                                <MSQ_Body_2
                                    questions={questions}
                                    checkedQustions={checkedQustions}
                                    currQuestion={currQuestion}
                                    finished={finished}
                                    handleAnswerClick={handleAnswerClick_2}
                                    handleCheck={handleCheck}
                                />
                            ) : null
                    }

                    {
                        questions[currQuestion] && questions[currQuestion].matchingPairs
                            && questions[currQuestion].matchingPairs.length > 0
                            ? <MatchingQuestion
                                finished={finished}
                                answers={questions[currQuestion].matchingPairs}
                                question_id={questions[currQuestion].question_id}
                                handleUpdatePairs={handleUpdatePairs}
                            /> : null
                    }
                </div>

                <div className="actions">
                    {currQuestion !== 0 ? <div className="prev" onClick={() => { setCurrQuestion(currQuestion - 1) }}>{isKazakh ? 'Алдыңғы сұрақ' : 'Предыдущий вопрос'}</div> : null}
                    {currQuestion !== questions.length - 1 ? <div className="next" onClick={() => { setCurrQuestion(currQuestion + 1) }}>{isKazakh ? 'Келесі сұрақ' : 'Следующий вопрос'}</div> : null}
                    {currQuestion === questions.length - 1
                        ? <div className={`finish ${finished ? 'disabled' : null}`}
                            onClick={() => {
                                if (finished) return;
                                finishTest()
                            }
                            }>{isKazakh ? 'Тестілеуді аяқтау' : 'Завершить тест'}</div>
                        : null}
                </div>
            </div>
        </div>
    );
}

const MSQ_Body = ({
    questions,
    currQuestion,
    checkedQustions,
    finished,
    handleAnswerClick,
    handleCheck
}) => {

    const _handleAnswerClick = (answerId) => {
        handleAnswerClick(answerId, questions[currQuestion].question_id)
    }

    return (
        <div className="question-body">
            {
                questions[currQuestion] ? questions[currQuestion].mcqOption.map(answer => {

                    let isChecked = false;

                    if (finished) {
                        isChecked = answer.is_true;
                    } else {
                        isChecked = checkedQustions[questions[currQuestion].question_id] === answer.mcq_option_id;
                    }

                    return (
                        <div className="test-answer" key={answer.mcq_option_id} onClick={() => _handleAnswerClick(answer.mcq_option_id)}>
                            <div className={`checkbox ${isChecked ? 'checked' : null}`} onClick={handleCheck}>
                                {isChecked ? <FaCheck /> : null}
                            </div>
                            <div className="answer-text">
                                <p>{answer.mcq_option_title}</p>
                            </div>
                        </div>
                    );
                }) : null
            }
        </div>
    )
}

const MSQ_Body_2 = ({
    questions,
    currQuestion,
    checkedQustions,
    finished,
    handleAnswerClick,
    handleCheck
}) => {

    const _handleAnswerClick = (answerId) => {
        handleAnswerClick(answerId, questions[currQuestion].question_id)
    }

    return (
        <div className="question-body">
            {
                questions[currQuestion] ? questions[currQuestion].mcqOption.map(answer => {

                    let isChecked = false;

                    if (finished) {
                        isChecked = answer.is_true;
                    } else {
                        if (!Array.isArray(checkedQustions[questions[currQuestion].question_id])) {
                            handleAnswerClick(null, questions[currQuestion].question_id);
                        } else {
                            isChecked = checkedQustions[questions[currQuestion].question_id].includes(answer.mcq_option_id);
                        }
                        // isChecked = checkedQustions.length !== 0 && checkedQustions[currQuestion] && checkedQustions[currQuestion].answer === answer.mcq_option_id;
                    }

                    return (
                        <div className="test-answer" key={answer.mcq_option_id} onClick={() => _handleAnswerClick(answer.mcq_option_id)}>
                            <div className={`checkbox ${isChecked ? 'checked' : null}`} onClick={handleCheck}>
                                {isChecked ? <FaCheck /> : null}
                            </div>
                            <div className="answer-text">
                                <p>{answer.mcq_option_title}</p>
                            </div>
                        </div>
                    );
                }) : null
            }
        </div>
    )
}

const MatchingQuestion = ({ question_id, answers, handleUpdatePairs, finished }) => {
    const [_answers, _setUnswers] = useState(answers)
    const [right, setRight] = useState([])
    const [left, setLeft] = useState([])
    const [matched, setMatched] = useState([]);
    const [question, setQuestion] = useState(null)
    const [currLeft, setCurrLeft] = useState(null);
    const [currRight, setCurrRight] = useState(null);

    useEffect(() => {

        const left = answers.map(answer => {
            const id = answer['matching_pair_id']
            const text = answer['leftPart']
            return {
                id,
                text
            }
        })
        setLeft(left)

        const right = answers.map(answer => {
            const id = answer['matching_pair_id']
            const text = answer['rightPart']
            return {
                id,
                text
            }
        })

        setRight(right)
    }, [])

    useEffect(() => {
        handleUpdatePairs(matched);
    }, [matched])

    const updatePairs = (leftId, rightId) => {
        if (!leftId || !rightId) return;

        const leftPart = answers.find(answer => answer.matching_pair_id === leftId)?.leftPart;
        const rightPart = answers.find(answer => answer.matching_pair_id === rightId)?.rightPart;

        if (leftPart && rightPart) {
            const id = matched.length;

            setMatched(prev => [
                ...prev,
                {
                    question: question_id,
                    id,
                    left_part: leftPart,
                    leftId,
                    right_part: rightPart,
                    rightId
                }
            ]);

            setLeft(prev => prev.filter(item => item.id !== leftId));
            setRight(prev => prev.filter(item => item.id !== rightId));

        }

        setCurrLeft(null);
        setCurrRight(null);
    };

    const unmatchPairs = (id) => {
        const pair = matched.filter(item => item.id === id)[0];
        setLeft(prev => [...prev, { id: pair.leftId, text: pair.left_part }]);
        setRight(prev => [...prev, { id: pair.rightId, text: pair.right_part }]);
        setMatched(prev => prev.filter(item => item.id !== id));
    }

    const leftPairClick = (id) => {
        if (currLeft === id) {
            setCurrLeft(null);
            return;
        }

        setCurrLeft(id)
        updatePairs(id, currRight)
    }

    const rightPairClick = (id) => {
        if (currRight === id) {
            setCurrRight(null);
            return;
        }

        setCurrRight(id)
        updatePairs(currLeft, id)
    }

    return (
        <div className="matching-question-body">
            <div className="matched">
                {
                    matched.map(answer => {
                        const id = answer.id;

                        return (
                            <div className="row" key={id} onClick={() => unmatchPairs(id)}>
                                <div className="left">
                                    <div className={`pair`}>
                                        {answer.left_part}
                                    </div>
                                </div>
                                <div className="right">
                                    <div className={`pair`}>
                                        {answer.right_part}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="non-matched">
                {
                    _answers.map(answer => {
                        const id = answer.matching_pair_id;

                        const leftText = left.find(v => v.id === id)?.text;
                        const rightText = right.find(v => v.id === id)?.text;

                        if (!leftText && !rightText) return null;

                        return (
                            <div className="row" key={`${id}${leftText}${rightText}`}>
                                <div className="left">
                                    {
                                        leftText
                                            ? (
                                                <div className={`pair ${currLeft === id ? 'active' : null}`} onClick={() => leftPairClick(id)}>
                                                    {leftText}
                                                </div>
                                            ) : null
                                    }
                                </div>
                                <div className="right">
                                    {
                                        rightText
                                            ? (
                                                <div className={`pair ${currRight === id ? 'active' : null}`} onClick={() => rightPairClick(id)}>
                                                    {rightText}
                                                </div>
                                            ) : null
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default TestPage;