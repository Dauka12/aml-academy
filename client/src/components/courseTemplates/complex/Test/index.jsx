import { useEffect, useState } from 'react';

import './style.scss';

import axios from 'axios';
import { FaCheck } from "react-icons/fa6";
import { useLocation } from 'react-router';
import base_url from '../../../../settings/base_url';

// Import MUI components
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography
} from '@mui/material';

function TestPage({
    name,
    questions,
    quizId,
    handleOpenModal,
    handleQuizSuccesful,
    handleQuizFail,
    finished,
    onProgressToNextModule,
    isKazakh: propIsKazakh
}) {

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if ((location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)) {
            setKazakh(true);
        }
    }, []);

    const jwtToken = localStorage.getItem('jwtToken');

    const [currQuestion, setCurrQuestion] = useState(0)
    const [checkedQustions, setCheckedQustions] = useState({ '123': 0 })

    const [isLoading, setLoading] = useState(true);
    const [matchingPairAnswers, setMatchingPairAnswers] = useState([]);

    useEffect(() => {
        setCurrQuestion(0);

        let _checkedQustions = {};
        questions.filter(question => question.mcqOption?.length > 0).map(question => {
            _checkedQustions[question.question_id] = 0;
        });

        setCheckedQustions(_checkedQustions);
        setLoading(false);
    }, [questions]);

    const handleUpdatePairs = (matched) => {
        const _matched = matched.map(answer => {
            return {
                'question': answer.question,
                'left_part': answer.left_part,
                'right_part': answer.right_part
            }
        });
        setMatchingPairAnswers(_matched);
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
            return;
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

    const [testResults, setTestResults] = useState([]);
    const [resultsModalOpen, setResultsModalOpen] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    // New state to track if results are available (only right after test completion)
    const [resultsAvailable, setResultsAvailable] = useState(false);

    // Don't automatically calculate results when finished changes
    // We'll only calculate when the test is explicitly finished

    // Calculate which questions were answered correctly
    const calculateTestResults = () => {
        let results = [];
        let correctCount = 0;

        // Process MCQ single-answer questions
        questions.filter(q => q.mcqOption?.length > 0 && q.mcqOption.filter(opt => opt.is_true).length < 2).forEach(question => {
            const userAnswer = checkedQustions[question.question_id];
            const correctAnswer = question.mcqOption.find(opt => opt.is_true)?.mcq_option_id;
            const isCorrect = userAnswer === correctAnswer;
            
            if (isCorrect) correctCount++;
            
            results.push({
                questionId: question.question_id,
                questionTitle: question.question_title,
                isCorrect,
                questionType: 'single'
            });
        });

        // Process MCQ multi-answer questions
        questions.filter(q => q.mcqOption?.length > 0 && q.mcqOption.filter(opt => opt.is_true).length >= 2).forEach(question => {
            const userAnswers = Array.isArray(checkedQustions[question.question_id]) ? 
                checkedQustions[question.question_id] : [];
            
            const correctAnswers = question.mcqOption
                .filter(opt => opt.is_true)
                .map(opt => opt.mcq_option_id);
            
            // Check if all correct answers were selected and no incorrect ones
            const allCorrectSelected = correctAnswers.every(id => userAnswers.includes(id));
            const noIncorrectSelected = userAnswers.every(id => correctAnswers.includes(id));
            const isCorrect = allCorrectSelected && noIncorrectSelected && userAnswers.length === correctAnswers.length;
            
            if (isCorrect) correctCount++;
            
            results.push({
                questionId: question.question_id,
                questionTitle: question.question_title,
                isCorrect,
                questionType: 'multi'
            });
        });

        // Process matching questions
        questions.filter(q => q.matchingPairs?.length > 0).forEach(question => {
            const normalize = (s) => (s || '').toString().replace(/\s+/g, ' ').trim();
            const userMatches = matchingPairAnswers.filter(match => match.question === question.question_id);
            const correctPairsMap = new Map(
                question.matchingPairs.map(p => [normalize(p.leftPart), normalize(p.rightPart)])
            );

            const allPairsProvided = userMatches.length === question.matchingPairs.length;
            const allPairsValid = userMatches.every(m => {
                const l = normalize(m.left_part);
                const r = normalize(m.right_part);
                return correctPairsMap.get(l) === r;
            });

            const isCorrect = allPairsProvided && allPairsValid;

            if (isCorrect) correctCount++;

            results.push({
                questionId: question.question_id,
                questionTitle: question.question_title,
                isCorrect,
                questionType: 'matching'
            });
        });

        setTestResults(results);
        setScore({
            correct: correctCount,
            total: results.length
        });
        
        // Set results available after calculation
        setResultsAvailable(true);
    };

    // Handler to open results modal
    const handleOpenResultsModal = () => {
        setResultsModalOpen(true);
    };

    // Handler to close results modal
    const handleCloseResultsModal = () => {
        setResultsModalOpen(false);
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

                // Calculate results immediately after getting server response
                calculateTestResults();

                if (response.data === 'quiz failed') {
                    handleQuizFail(false);
                } else if (response.data === 'zanova') {
                    handleQuizFail(true);
                } else if (response.data === 'quiz completed') {
                    handleQuizSuccesful();
                }
            } catch (error) {
                console.error("Error submitting quiz:", error);
            }
        };

        fetchData();
    }

    if (!questions || questions?.length === 0 && checkedQustions != undefined) return null;

    const handleCheck = (isChecked) => {
        // Empty function
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
                <Typography ml={2}>Загрузка...</Typography>
            </Box>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ 
            width: '100%', 
            pb: 5,
            '&.testPage': {
                width: '100%'
            }
        }}>
            <Box sx={{ 
                px: { xs: 2, md: 7 }, 
                pt: 5,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography 
                    variant="h4" 
                    sx={{
                        color: '#3A3939',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 600,
                        lineHeight: '26px',
                        mb: 2.5,
                        px: { xs: 0, md: 15 }
                    }}
                >
                    {name}
                </Typography>

                <Paper 
                    elevation={4} 
                    sx={{ 
                        p: 5.5, 
                        mb: 5,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                >
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 6.25,
                        pb: 5,
                        borderBottom: '1px solid #E2E2E2'
                    }}>
                        <Box>
                            <Typography 
                                sx={{ 
                                    color: '#747474',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    lineHeight: '26px'
                                }}
                            >
                                {isKazakh ? 'Сұрақ' : 'Вопрос'}
                            </Typography>
                            <Typography 
                                sx={{ 
                                    color: '#C4C4C4',
                                    fontSize: '30px',
                                    fontWeight: 700,
                                    lineHeight: '26px'
                                }}
                            >
                                {currQuestion + 1}/{questions?.length}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography 
                                sx={{ 
                                    color: '#000',
                                    fontSize: '18px',
                                    fontWeight: 500,
                                    lineHeight: 1.4,
                                    userSelect: 'none'
                                }}
                            >
                                {questions[currQuestion] ? questions[currQuestion].question_title : null}
                            </Typography>
                            
                            {questions[currQuestion]?.image && (
                                <Box sx={{ mt: 1.25, width: '100%' }}>
                                    <Box
                                        component="img"
                                        src={questions[currQuestion].image}
                                        alt={questions[currQuestion].question_title}
                                        sx={{ 
                                            userSelect: 'none',
                                            maxWidth: '800px',
                                            width: '100%'
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {
                        questions[currQuestion] && questions[currQuestion].mcqOption
                            && questions[currQuestion].mcqOption.filter(option => option.is_true === true)?.length < 2
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
                            && questions[currQuestion].mcqOption.filter(option => option.is_true === true)?.length >= 2
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
                            && questions[currQuestion].matchingPairs?.length > 0
                            ? <MatchingQuestion
                                finished={finished}
                                answers={questions[currQuestion].matchingPairs}
                                question_id={questions[currQuestion].question_id}
                                handleUpdatePairs={handleUpdatePairs}
                            /> : null
                    }
                </Paper>

                <Stack 
                    direction="row" 
                    spacing={3} 
                    justifyContent="flex-end" 
                    alignItems="center"
                >
                    {currQuestion !== 0 && (
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={() => setCurrQuestion(currQuestion - 1)}
                            sx={{ 
                                py: 1.25, 
                                px: 3.75,
                                textTransform: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            {isKazakh ? 'Алдыңғы сұрақ' : 'Предыдущий вопрос'}
                        </Button>
                    )}
                    
                    {currQuestion !== questions?.length - 1 && (
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={() => setCurrQuestion(currQuestion + 1)}
                            sx={{ 
                                py: 1.25, 
                                px: 3.75,
                                textTransform: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            {isKazakh ? 'Келесі сұрақ' : 'Следующий вопрос'}
                        </Button>
                    )}
                    
                    {currQuestion === questions?.length - 1 && !finished && (
                        <Button 
                            variant="contained"
                            color="success"
                            onClick={() => {
                                if (finished) return;
                                finishTest()
                            }}
                            sx={{ 
                                py: 1.25, 
                                px: 3.75,
                                textTransform: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': { opacity: 0.8 },
                                cursor: 'pointer'
                            }}
                        >
                            {isKazakh ? 'Тестілеуді аяқтау' : 'Завершить тест'}
                        </Button>
                    )}                    {/* Only show results button if results are available */}
                    {resultsAvailable && (
                        <Button 
                            variant="contained"
                            color="info"
                            onClick={handleOpenResultsModal}
                            sx={{ 
                                py: 1.25, 
                                px: 3.75,
                                textTransform: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            {(propIsKazakh !== undefined ? propIsKazakh : isKazakh) ? 'Нәтижелерді қарау' : 'Просмотр результатов'}
                        </Button>
                    )}

                    {/* Show Next Module button when test is finished and function is available */}
                    {finished && onProgressToNextModule && (
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                console.log('🔄 TestPage: Next Module button clicked');
                                onProgressToNextModule();
                            }}
                            sx={{ 
                                py: 1.25, 
                                px: 3.75,
                                textTransform: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': { opacity: 0.8 },
                                background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                                fontWeight: 600
                            }}
                        >
                            {(propIsKazakh !== undefined ? propIsKazakh : isKazakh) ? 'Келесі модуль' : 'Следующий модуль'}
                        </Button>
                    )}
                </Stack>
            </Box>

            {/* Results Modal - only render if results are available */}
            {resultsAvailable && (
                <Dialog 
                    open={resultsModalOpen} 
                    onClose={handleCloseResultsModal}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">
                                {isKazakh ? 'Тест нәтижелері' : 'Результаты теста'}
                            </Typography>
                            <IconButton onClick={handleCloseResultsModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {/* Score summary */}
                        <Box sx={{ mb: 3, textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {isKazakh ? 'Жалпы балл' : 'Общий счет'}: {score.correct} / {score.total}
                            </Typography>
                            <Typography variant="h6" sx={{ 
                                color: score.correct/score.total >= 0.7 ? '#4caf50' : '#f44336'
                            }}>
                                {Math.round((score.correct/score.total) * 100)}%
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* Question results */}
                        <List>
                            {testResults.map((result, index) => (
                                <ListItem 
                                    key={result.questionId}
                                    sx={{
                                        borderRadius: 1,
                                        mb: 1,
                                        bgcolor: result.isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.05)',
                                    }}
                                >
                                    <ListItemIcon>
                                        {result.isCorrect ? 
                                            <CheckCircleIcon color="success" /> : 
                                            <CancelIcon color="error" />
                                        }
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={`${index + 1}. ${result.questionTitle}`}
                                        secondary={
                                            <Typography variant="body2" color={result.isCorrect ? 'success.main' : 'error.main'}>
                                                {result.isCorrect ? 
                                                    (isKazakh ? 'Дұрыс жауап берілді' : 'Правильный ответ') : 
                                                    (isKazakh ? 'Қате жауап берілді' : 'Неправильный ответ')
                                                }
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant="contained" 
                            onClick={handleCloseResultsModal}
                            sx={{ px: 4, textTransform: 'none' }}
                        >
                            {isKazakh ? 'Жабу' : 'Закрыть'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}

const MSQ_Body = ({
    questions,
    currQuestion,
    checkedQustions,
    finished,
    handleAnswerClick
}) => {
    const _handleAnswerClick = (answerId) => {
        handleAnswerClick(answerId, questions[currQuestion].question_id)
    }

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if ((location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)) {
            setKazakh(true);
        }
    }, [location]);

    return (
        <Box sx={{ py: 3.75, px: { xs: 2, sm: 3.75 }, display: 'flex', flexDirection: 'column', gap: 3.75 }}>
            {questions[currQuestion] && questions[currQuestion].mcqOption.map(answer => {
                let isChecked = false;
                let userSelected = false;
                const isCorrect = answer.is_true;
                
                // Determine if this was the user's selection
                userSelected = checkedQustions[questions[currQuestion].question_id] === answer.mcq_option_id;

                if (finished) {
                    isChecked = answer.is_true;
                } else {
                    isChecked = userSelected;
                }
                
                return (
                    <Paper 
                        key={answer.mcq_option_id}
                        elevation={1}
                        onClick={() => !finished && _handleAnswerClick(answer.mcq_option_id)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            p: 1.875,
                            borderRadius: '10px',
                            cursor: finished ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                            border: finished ? 
                                isCorrect ? '2px solid #4caf50' : '1px solid #f44336' :
                                '1px solid #e0e0e0',
                            backgroundColor: finished ? 
                                isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.05)' : 
                                'white',
                            '&:hover': finished ? {} : {
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            },
                            mb: 1.5,
                            position: 'relative'
                        }}
                    >
                        <Box 
                            sx={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '5px',
                                border: isChecked ? 
                                    (finished && isCorrect) ? '2px solid #4caf50' : '2px solid #1976d2' :
                                    '2px solid #ccc',
                                backgroundColor: isChecked ? 
                                    (finished && isCorrect) ? '#4caf50' : '#1976d2' : 
                                    'transparent',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 1.5,
                                mt: 0.25,
                                flexShrink: 0
                            }}
                        >
                            {(!finished && isChecked) || (finished && isCorrect) ? (
                                <FaCheck color="white" />
                            ) : null}
                        </Box>
                        
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', width: '90%' }}>
                            <Typography 
                                sx={{ 
                                    pr: 8.75, 
                                    userSelect: 'none',
                                    fontWeight: finished || userSelected ? 500 : 400
                                }}
                            >
                                {answer.mcq_option_title}
                            </Typography>
                            
                            {finished && (
                                <Typography 
                                    sx={{ 
                                        position: 'absolute',
                                        bottom: -5,
                                        right: 12,
                                        marginBottom:'10px',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: isCorrect ? '#4caf50' : '#f44336'
                                    }}
                                >
                                    {isCorrect ? 
                                        (isKazakh ? 'Дұрыс' : 'Правильно') : 
                                        (isKazakh ? 'Қате' : 'Неправильно')
                                }
                                </Typography>
                            )}
                        </Box>

                        {userSelected && finished && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 12,
                                    fontSize: '12px',
                                    backgroundColor: '#2196f3',
                                    color: 'white',
                                    px: 1,
                                    py: 0.375,
                                    borderRadius: '12px',
                                    opacity: 0.8
                                }}
                            >
                                {isKazakh ? 'Сіздің жауабыңыз' : 'Ваш ответ'}
                            </Box>
                        )}
                    </Paper>
                );
            })}
        </Box>
    );
}

const MSQ_Body_2 = ({
    questions,
    currQuestion,
    checkedQustions,
    finished,
    handleAnswerClick
}) => {
    const _handleAnswerClick = (answerId) => {
        handleAnswerClick(answerId, questions[currQuestion].question_id)
    }

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if ((location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)) {
            setKazakh(true);
        }
    }, [location]);

    return (
        <Box sx={{ py: 3.75, px: { xs: 2, sm: 3.75 }, display: 'flex', flexDirection: 'column', gap: 3.75 }}>
            {questions[currQuestion] && questions[currQuestion].mcqOption.map(answer => {
                let isChecked = false;
                let userSelected = false;
                const isCorrect = answer.is_true;
                
                // Check if this was selected by user
                if (!Array.isArray(checkedQustions[questions[currQuestion].question_id])) {
                    handleAnswerClick(null, questions[currQuestion].question_id);
                } else {
                    userSelected = checkedQustions[questions[currQuestion].question_id].includes(answer.mcq_option_id);
                }

                if (finished) {
                    isChecked = answer.is_true;
                } else {
                    isChecked = userSelected;
                }

                return (
                    <Paper 
                        key={answer.mcq_option_id}
                        elevation={1}
                        onClick={() => !finished && _handleAnswerClick(answer.mcq_option_id)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            p: 1.875,
                            borderRadius: '10px',
                            cursor: finished ? 'default' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                            border: finished ? 
                                isCorrect ? '2px solid #4caf50' : '1px solid #f44336' :
                                '1px solid #e0e0e0',
                            backgroundColor: finished ? 
                                isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.05)' : 
                                'white',
                            '&:hover': finished ? {} : {
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            },
                            mb: 1.5,
                            position: 'relative'
                        }}
                    >
                        <Box 
                            sx={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '5px',
                                border: isChecked ? 
                                    (finished && isCorrect) ? '2px solid #4caf50' : '2px solid #1976d2' :
                                    '2px solid #ccc',
                                backgroundColor: isChecked ? 
                                    (finished && isCorrect) ? '#4caf50' : '#1976d2' : 
                                    'transparent',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 1.5,
                                mt: 0.25,
                                flexShrink: 0
                            }}
                        >
                            {(!finished && isChecked) || (finished && isCorrect) ? (
                                <FaCheck color="white" />
                            ) : null}
                        </Box>
                        
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', width: '90%' }}>
                            <Typography 
                                sx={{ 
                                    pr: 8.75, 
                                    userSelect: 'none',
                                    fontWeight: finished || userSelected ? 500 : 400
                                }}
                            >
                                {answer.mcq_option_title}
                            </Typography>
                            
                            {finished && (
                                <Typography 
                                    sx={{ 
                                        position: 'absolute',
                                        bottom: -5,
                                        right: 12,
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: isCorrect ? '#4caf50' : '#f44336'
                                    }}
                                >
                                    {isCorrect ? 
                                        (isKazakh ? 'Дұрыс' : 'Правильно') : 
                                        (isKazakh ? 'Қате' : 'Неправильно')
                                    }
                                </Typography>
                            )}
                        </Box>

                        {userSelected && finished && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 12,
                                    fontSize: '12px',
                                    backgroundColor: '#2196f3',
                                    color: 'white',
                                    px: 1,
                                    py: 0.375,
                                    borderRadius: '12px',
                                    opacity: 0.8
                                }}
                            >
                                {isKazakh ? 'Сіздің жауабыңыз' : 'Ваш ответ'}
                            </Box>
                        )}
                    </Paper>
                );
            })}
        </Box>
    );
}

const MatchingQuestion = ({ question_id, answers, handleUpdatePairs, finished }) => {
    const [right, setRight] = useState([]);
    const [left, setLeft] = useState([]);
    const [matched, setMatched] = useState([]);
    const [currLeft, setCurrLeft] = useState(null);
    const [currRight, setCurrRight] = useState(null);
    const [correctPairs, setCorrectPairs] = useState([]);

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        if ((location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)) {
            setKazakh(true);
        }
    }, [location]);

    // Reset state when answers or question_id changes
    useEffect(() => {
        // Reset all states
        setMatched([]);
        setCurrLeft(null);
        setCurrRight(null);
        
        // Extract left parts
        const left = answers.map(answer => ({
            id: answer['matching_pair_id'],
            text: answer['leftPart']
        }));
        setLeft(left);

        // Extract right parts
        const right = answers.map(answer => ({
            id: answer['matching_pair_id'],
            text: answer['rightPart']
        }));
        setRight(right);

        // Store correct pairs for showing when test is finished
        const correctPairsList = answers.map(answer => ({
            id: answer['matching_pair_id'],
            leftPart: answer['leftPart'],
            rightPart: answer['rightPart']
        }));
        setCorrectPairs(correctPairsList);
        
    }, [answers, question_id]);

    useEffect(() => {
        handleUpdatePairs(matched);
    }, [matched, handleUpdatePairs]);

    // When finished becomes true, we need to show the correct answers
    useEffect(() => {
        if (finished) {
            // Reset user selections when showing answers
            setMatched([]);
            setLeft([]);
            setRight([]);
        }
    }, [finished]);

    const updatePairs = (leftId, rightId) => {
        if (!leftId || !rightId) return;

        const leftPart = answers.find(answer => answer.matching_pair_id === leftId)?.leftPart;
        const rightPart = answers.find(answer => answer.matching_pair_id === rightId)?.rightPart;

        if (leftPart && rightPart) {
            const id = matched?.length;

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
        if (finished) return; // Prevent unmatching when test is finished
        
        const pair = matched.filter(item => item.id === id)[0];
        setLeft(prev => [...prev, { id: pair.leftId, text: pair.left_part }]);
        setRight(prev => [...prev, { id: pair.rightId, text: pair.right_part }]);
        setMatched(prev => prev.filter(item => item.id !== id));
    }

    const leftPairClick = (id) => {
        if (finished) return; // Prevent clicks when test is finished
        
        if (currLeft === id) {
            setCurrLeft(null);
            return;
        }

        setCurrLeft(id);
        updatePairs(id, currRight);
    }

    const rightPairClick = (id) => {
        if (finished) return; // Prevent clicks when test is finished
        
        if (currRight === id) {
            setCurrRight(null);
            return;
        }

        setCurrRight(id);
        updatePairs(currLeft, id);
    }

    return (
        <Box sx={{ my: 2, p: 2 }}>
            {/* Only show active matching interface when not finished */}
            {!finished && (
                <>
                    {/* Show matched pairs section */}
                    <Box sx={{ mb: 3 }}>
                        {matched.map(answer => (
                            <Grid 
                                container
                                key={answer.id} 
                                onClick={() => unmatchPairs(answer.id)}
                                sx={{
                                    mb: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.6
                                    }
                                }}
                            >
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Paper 
                                        elevation={3}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: '8px 0 0 8px',
                                            border: '2px dashed #3A3939',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Typography>{answer.left_part}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Paper 
                                        elevation={3}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: '0 8px 8px 0',
                                            border: '2px dashed #3A3939',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Typography>{answer.right_part}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>

                    {/* Show unmatched items to select from */}
                    <Box>
                        <Typography 
                            variant="h6" 
                            sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#3A3939' }}
                        >
                            {isKazakh ? 'Сәйкестендіру сұрағы' : 'Вопрос на соответствие'}
                        </Typography>
                        
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={6}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ mb: 1, textAlign: 'center', fontWeight: 'medium' }}
                                >
                                    {isKazakh ? 'Сол жақ' : 'Левая часть'}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ mb: 1, textAlign: 'center', fontWeight: 'medium' }}
                                >
                                    {isKazakh ? 'Оң жақ' : 'Правая часть'}
                                </Typography>
                            </Grid>
                        </Grid>
                        
                        {answers.map((answer, index) => {
                            const id = answer.matching_pair_id;
                            const leftText = left.find(v => v.id === id)?.text;
                            const rightText = right.find(v => v.id === id)?.text;

                            if (!leftText && !rightText) return null;

                            return (
                                <Grid 
                                    container
                                    key={`${id}${leftText}${rightText}`} 
                                    sx={{ mb: 2 }}
                                >
                                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
                                        {leftText && (
                                            <Paper 
                                                elevation={3}
                                                onClick={() => leftPairClick(id)}
                                                sx={{
                                                    p: 1.5,
                                                    width: '90%',
                                                    borderRadius: '8px',
                                                    border: currLeft === id ? '2px solid #2196f3' : '2px dashed #3A3939',
                                                    bgcolor: currLeft === id ? 'rgba(33, 150, 243, 0.1)' : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': { 
                                                        opacity: 0.8, 
                                                        boxShadow: 3 
                                                    }
                                                }}
                                            >
                                                <Typography>{leftText}</Typography>
                                            </Paper>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', pl: 1 }}>
                                        {rightText && (
                                            <Paper 
                                                elevation={3}
                                                onClick={() => rightPairClick(id)}
                                                sx={{
                                                    p: 1.5,
                                                    width: '90%',
                                                    borderRadius: '8px',
                                                    border: currRight === id ? '2px solid #2196f3' : '2px dashed #3A3939',
                                                    bgcolor: currRight === id ? 'rgba(33, 150, 243, 0.1)' : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    '&:hover': { 
                                                        opacity: 0.8, 
                                                        boxShadow: 3 
                                                    }
                                                }}
                                            >
                                                <Typography>{rightText}</Typography>
                                            </Paper>
                                        )}
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Box>
                </>
            )}

            {/* Only show correct answers when finished */}
            {finished && (
                <Box sx={{ mb: 3 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#4caf50' }}
                    >
                        {isKazakh ? 'Дұрыс жауаптар' : 'Правильные ответы'}
                    </Typography>
                    
                    {correctPairs.map((pair) => (
                        <Grid 
                            container
                            key={pair.id}
                            sx={{ mb: 2 }}
                        >
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Paper 
                                    elevation={3}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '8px 0 0 8px',
                                        border: '2px solid #4caf50',
                                        bgcolor: 'rgba(76, 175, 80, 0.1)'
                                    }}
                                >
                                    <Typography>{pair.leftPart}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Paper 
                                    elevation={3}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '0 8px 8px 0',
                                        border: '2px solid #4caf50',
                                        bgcolor: 'rgba(76, 175, 80, 0.1)'
                                    }}
                                >
                                    <Typography>{pair.rightPart}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default TestPage;
