import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import QuizIcon from '@mui/icons-material/Quiz'
import ReplayIcon from '@mui/icons-material/Replay'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import {
    Box,
    Button,
    Card, CardContent,
    Checkbox,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Fade,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Tooltip,
    Typography,
    Zoom
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import base_url from '../../../settings/base_url'


// Existing transformation function
const transformQuizData = (responseData) => {
    const transformedQuestions = responseData.quizList.map(item => {

        if (item.mcqOption?.length > 0 && item.matchingPairs?.length == 0) {
            let questionStructure = {
                question: {
                    question_title: item.question_title
                },
                mcqOptionList: item.mcqOption.map(option => ({
                    mcq_option_title: option.mcq_option_title,
                    is_true: option.is_true
                }))
            };

            return questionStructure;

        } else if (item.matchingPairs?.length > 0 && item.mcqOption?.length == 0) {
            let questionStructure = {
                question: {
                    question_title: item.question_title
                },
                matchingPairs: item.matchingPairs.map(option => ({
                    leftPart: option.leftPart,
                    rightPart: option.rightPart
                }))
            };

            return questionStructure;
        }
    });

    return transformedQuestions.filter(question => question !== undefined && question !== null);
}

// Styled components
const QuizPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 8px 24px rgba(55, 71, 97, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0px 12px 28px rgba(55, 71, 97, 0.15)',
    }
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1.5),
    borderLeft: '4px solid #374761',
    position: 'relative',
    transition: 'all 0.2s ease',
    '&:hover': {
        boxShadow: '0px 6px 16px rgba(55, 71, 97, 0.12)',
        transform: 'translateY(-2px)',
    }
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    fontWeight: 500,
    color: '#374761',
    backgroundColor: alpha('#374761', 0.1),
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(4),
    textTransform: 'none',
    fontWeight: 500,
}));

// Tutorial steps content
const tutorialSteps = [
    {
        label: 'Добро пожаловать в Конструктор Тестов',
        description: 'Создавайте интерактивные тесты для ваших учебных модулей. Следуйте этой короткой инструкции, чтобы узнать, как создать эффективный тест.',
        icon: <QuizIcon color="primary" />
    },
    {
        label: 'Шаг 1: Придумайте название теста',
        description: 'Начните с создания информативного названия, которое ясно описывает содержание теста. Хорошее название поможет студентам понять, что их ожидает.',
        icon: <AssignmentIcon color="primary" />
    },
    {
        label: 'Шаг 2: Создайте разнообразные вопросы',
        description: 'Используйте разные типы вопросов для проверки знаний. Вы можете создавать вопросы с одним или несколькими правильными ответами (MCQ) или вопросы на сопоставление пар.',
        icon: <FormatListNumberedIcon color="primary" />
    },
    {
        label: 'Шаг 3: Настройте правильные ответы',
        description: 'Для каждого вопроса обязательно укажите правильные ответы. Для вопросов MCQ отметьте правильные варианты галочкой. Для вопросов на сопоставление создайте корректные пары.',
        icon: <CheckCircleOutlineIcon color="primary" />
    },
    {
        label: 'Готово!',
        description: 'Теперь вы знаете, как создать эффективный тест. Нажмите "Начать создание теста", чтобы приступить к работе.',
        icon: <EmojiObjectsIcon color="primary" />
    },
];

// Example templates for quick start
const templateExamples = [
    {
        title: "Базовый тест с вариантами ответов",
        description: "Шаблон из 5 вопросов с вариантами ответов",
        questions: 5
    },
    {
        title: "Тест на сопоставление",
        description: "4 вопроса на сопоставление пар",
        questions: 4
    },
    {
        title: "Комбинированный тест",
        description: "Тест с разными типами вопросов",
        questions: 8
    }
];

const QuestionnaireForm = ({ saveCancel, save, id }) => {
    const token = localStorage.getItem('jwtToken');
    const [title, setTitle] = useState("QUIZ");
    const [questions, setQuestions] = useState([]);
    const [tutorialOpen, setTutorialOpen] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [showHelpDialog, setShowHelpDialog] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);

    // Fetch quiz data as in original code
    useEffect(() => {
        axios
            .get(base_url + "/api/aml/quiz/getQuiz/" + id, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((res) => {
                if (res.data) {
                    setTitle(res.data.quiz_title);
                    const transformedData = transformQuizData(res.data);
                    setQuestions(transformedData);
                    // If we have data, let's assume the user doesn't need the tutorial
                    setTutorialOpen(transformedData.length === 0);
                }
            })
            .catch((Error) => {
                setTitle("Новое тестирование");
                setQuestions([]);
            });
    }, []);

    // Save quiz data as in original code
    useEffect(() => {
        if (save) {
            const quizData = {
                module_id: id,
                quiz: { quiz_title: title },
                questions: questions
            };

            axios
                .post(base_url + '/api/aml/quiz/saveQuiz', quizData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                .then(response => {
                    console.log('Quiz saved successfully', response);
                    alert('Тест сохранен');
                    saveCancel();
                })
                .catch(error => {
                    console.error('Error saving quiz', error);
                    alert('Ошибка! Тест не сохранен');
                    saveCancel();
                });
        }
    }, [save, id, questions, title]);

    // All the handlers from original code
    const handleInputChange = (questionIndex, index, newValue, type, field) => {
        if (type === 'mcqOptionList') {
            const updatedQuestions = [...questions];

            if (field == 'is_true') {
                if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex][type][index]) {
                    // Toggle the is_true value
                    updatedQuestions[questionIndex][type][index][field] = !updatedQuestions[questionIndex][type][index][field];

                    setQuestions(updatedQuestions);
                }
            } else {
                if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex][type][index]) {
                    if (newValue === '') {
                        // Remove the object if newValue is an empty string
                        updatedQuestions[questionIndex][type].splice(index, 1);
                    } else {
                        // Update the field with the new value
                        updatedQuestions[questionIndex][type][index][field] = newValue;
                    }
                    setQuestions(updatedQuestions);
                }
            }
        } else if (type == 'matchingPairs') {
            const updatedQuestions = [...questions];
            if (updatedQuestions[questionIndex] && updatedQuestions[questionIndex][type][index]) {
                updatedQuestions[questionIndex][type][index][field] = newValue;

                const pair = updatedQuestions[questionIndex][type][index];
                if (pair.leftPart === '' && pair.rightPart === '') {
                    updatedQuestions[questionIndex][type].splice(index, 1);
                }

                setQuestions(updatedQuestions);
            }
        }
    }

    const handleValueChange = (index, newValue) => {
        const updatedQuestions = [...questions];

        if (updatedQuestions[index] && updatedQuestions[index]['question']) {
            if (newValue === '') {
                // Remove the object if newValue is an empty string
                updatedQuestions[index].question.question_title = newValue;
                // updatedQuestions[index].splice(index, 1);
            } else {
                // Update the field with the new value
                updatedQuestions[index].question.question_title = newValue;
            }
            setQuestions(updatedQuestions);
        }
    }

    const handleAddToList = (questionIndex) => {
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];

        if (question.mcqOptionList) {
            // Add a new empty MCQ option
            question.mcqOptionList.push({
                mcq_option_title: '', // Or some default value
                is_true: false
            });
        } else if (question.matchingPairs) {
            // Add a new empty matching pair
            question.matchingPairs.push({
                leftPart: '', // Or some default value
                rightPart: '' // Or some default value
            });
        }

        setQuestions(updatedQuestions);
    }

    const handleAddQuestion = () => {
        const updatedQuestions = [...questions];

        // Define the structure of a new question with the default type mcqOptionList
        const newQuestion = {
            question: {
                question_title: ""
            },
            mcqOptionList: []
        };

        // Add the new question to the updatedQuestions array
        updatedQuestions.push(newQuestion);

        // Update the state with the new list of questions
        setQuestions(updatedQuestions);
    };

    const handleQuestionTypeChange = (index, newValue) => {
        const updatedQuestions = [...questions]
        const currentQuestion = updatedQuestions[index];

        if (currentQuestion.matchingPairs) {
            delete currentQuestion.matchingPairs;
        }
        if (currentQuestion.mcqOptionList) {
            delete currentQuestion.mcqOptionList;
        }
        // Add the new question type with an initial structure
        if (newValue === 'mcqOptionList') {
            currentQuestion.mcqOptionList = [];
        } else if (newValue === 'matchingPairs') {
            currentQuestion.matchingPairs = [];
        }
        setQuestions(updatedQuestions);
    }

    const deleteQuestion = (index) => {
        const updatedQuestions = [...questions]
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions)
    }

    const getQType = (x) => {
        if (x.mcqOptionList) {
            return 'mcqOptionList';
        } else if (x.matchingPairs) {
            return 'matchingPairs';
        } else {
            return 'Unknown'; // or any other default string you prefer
        }
    }

    // New tutorial navigation functions
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkipTutorial = () => {
        setTutorialOpen(false);
    };

    const handleFinishTutorial = () => {
        setTutorialOpen(false);
    };

    const handleStartTutorialAgain = () => {
        setActiveStep(0);
        setTutorialOpen(true);
    };

    // Function to use a template quiz as starting point
    const handleUseTemplate = (templateIndex) => {
        // This would create a pre-filled quiz based on the selected template
        const newQuestions = [];
        const numberOfQuestions = templateExamples[templateIndex].questions;

        for (let i = 0; i < numberOfQuestions; i++) {
            if (templateIndex === 0 || (templateIndex === 2 && i < 5)) {
                // MCQ questions for templates 0 and 2 (partially)
                newQuestions.push({
                    question: { question_title: `Вопрос ${i + 1}` },
                    mcqOptionList: [
                        { mcq_option_title: "Вариант ответа 1", is_true: false },
                        { mcq_option_title: "Вариант ответа 2", is_true: true },
                        { mcq_option_title: "Вариант ответа 3", is_true: false }
                    ]
                });
            } else {
                // Matching pairs for template 1 and the rest of template 2
                newQuestions.push({
                    question: { question_title: `Вопрос ${i + 1}` },
                    matchingPairs: [
                        { leftPart: "Элемент A", rightPart: "Соответствие 1" },
                        { leftPart: "Элемент B", rightPart: "Соответствие 2" }
                    ]
                });
            }
        }

        setTitle(`${templateExamples[templateIndex].title}`);
        setQuestions(newQuestions);
        setTutorialOpen(false);
    };

    // Toggle preview mode to see how questions will appear to students
    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Tutorial Dialog */}
            <Dialog
                open={tutorialOpen}
                fullWidth
                maxWidth="md"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        overflow: 'visible'
                    }
                }}
            >
                <DialogTitle sx={{
                    bgcolor: '#374761',
                    color: 'white',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <QuizIcon /> Конструктор Тестов
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={4} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {tutorialSteps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel
                                            StepIconComponent={() => (
                                                <Box sx={{
                                                    bgcolor: activeStep >= index ? alpha('#374761', 0.1) : 'transparent',
                                                    borderRadius: '50%',
                                                    width: 36,
                                                    height: 36,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {step.icon}
                                                </Box>
                                            )}
                                        >
                                            <Typography variant="subtitle1" fontWeight={500} color="#374761">
                                                {step.label}
                                            </Typography>
                                        </StepLabel>
                                        <StepContent>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 1 }}>
                                                {step.description}
                                            </Typography>
                                            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={index === tutorialSteps.length - 1 ? handleFinishTutorial : handleNext}
                                                    sx={{ color: 'white', bgcolor: '#374761', '&:hover': { bgcolor: '#2a3549' } }}
                                                >
                                                    {index === tutorialSteps.length - 1 ? 'Начать создание теста' : 'Далее'}
                                                </Button>
                                                {index > 0 && (
                                                    <Button
                                                        onClick={handleBack}
                                                        variant="outlined"
                                                        sx={{ color: '#374761', borderColor: '#374761' }}
                                                    >
                                                        Назад
                                                    </Button>
                                                )}
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#374761' }}>
                                Начните с шаблона
                            </Typography>
                            <Typography variant="body2" paragraph color="text.secondary">
                                Выберите готовый шаблон для быстрого начала работы:
                            </Typography>

                            <Grid container spacing={2}>
                                {templateExamples.map((template, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': { boxShadow: 3, borderColor: '#374761' },
                                                transition: 'all 0.2s'
                                            }}
                                            onClick={() => handleUseTemplate(index)}
                                        >
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight={500}>
                                                    {template.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {template.description}
                                                </Typography>
                                                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                    <FormatListNumberedIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.6 }} />
                                                    {template.questions} вопросов
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box sx={{ mt: 3, textAlign: 'center' }}>
                                <Button
                                    variant="text"
                                    onClick={handleSkipTutorial}
                                    sx={{ color: '#374761' }}
                                >
                                    Пропустить руководство и начать с нуля
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            {/* Help Dialog */}
            <Dialog open={showHelpDialog} onClose={() => setShowHelpDialog(false)}>
                <DialogTitle>Помощь по составлению тестов</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="subtitle2" gutterBottom>Типы вопросов:</Typography>
                        <Typography variant="body2" paragraph>
                            1. <strong>MCQ</strong> - вопросы с одним или несколькими правильными ответами
                        </Typography>
                        <Typography variant="body2" paragraph>
                            2. <strong>Пары</strong> - задания на сопоставление левой и правой части
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>Советы:</Typography>
                        <Typography variant="body2" component="ul">
                            <li>Формулируйте вопросы четко и однозначно</li>
                            <li>Создавайте разнообразные варианты ответов</li>
                            <li>Не забудьте отметить правильные ответы</li>
                            <li>Для лучшего результата используйте разные типы вопросов</li>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowHelpDialog(false)} sx={{ color: '#374761' }}>
                        Закрыть
                    </Button>
                    <Button
                        onClick={() => {
                            setShowHelpDialog(false);
                            handleStartTutorialAgain();
                        }}
                        startIcon={<ReplayIcon />}
                        sx={{ color: '#374761' }}
                    >
                        Пройти обучение заново
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Main Quiz Builder */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <QuizPaper>
                    {/* Header and Controls */}
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="h1" color="#374761" fontWeight={600}>
                            Конструктор Тестов
                        </Typography>

                        <Box>
                            <Tooltip title="Режим предпросмотра">
                                <Button
                                    variant={previewMode ? "contained" : "outlined"}
                                    sx={{
                                        mr: 1,
                                        color: previewMode ? 'white' : '#374761',
                                        bgcolor: previewMode ? '#374761' : 'transparent',
                                        '&:hover': { bgcolor: previewMode ? '#2a3549' : alpha('#374761', 0.1) }
                                    }}
                                    onClick={togglePreviewMode}
                                >
                                    {previewMode ? "Выйти из предпросмотра" : "Предпросмотр"}
                                </Button>
                            </Tooltip>

                            <Tooltip title="Помощь">
                                <IconButton
                                    onClick={() => setShowHelpDialog(true)}
                                    sx={{ color: '#374761' }}
                                >
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Quiz title */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Название тестирования"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{
                            sx: {
                                borderRadius: 2,
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha('#374761', 0.2),
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: alpha('#374761', 0.5),
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#374761',
                                }
                            }
                        }}
                        sx={{ mb: 4 }}
                    />

                    {questions.length === 0 ? (
                        <Fade in={true}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    py: 8,
                                    px: 4,
                                    borderRadius: 2,
                                    bgcolor: alpha('#374761', 0.03),
                                    border: `1px dashed ${alpha('#374761', 0.2)}`
                                }}
                            >
                                <QuizIcon sx={{ fontSize: 60, color: alpha('#374761', 0.2), mb: 2 }} />
                                <Typography variant="h6" color="#374761" gutterBottom>
                                    Начните создавать ваш тест
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                                    Добавьте вопросы различных типов, чтобы создать интересный и познавательный тест для ваших студентов.
                                </Typography>
                                <ActionButton
                                    variant="contained"
                                    startIcon={<AddCircleOutlineIcon />}
                                    onClick={handleAddQuestion}
                                    sx={{
                                        bgcolor: '#374761',
                                        color: 'white',
                                        px: 3,
                                        py: 1.2,
                                        '&:hover': { bgcolor: '#2a3549' }
                                    }}
                                >
                                    Добавить первый вопрос
                                </ActionButton>
                            </Box>
                        </Fade>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormatListNumberedIcon sx={{ color: '#374761', mr: 1 }} />
                                    <Typography variant="h6" color="#374761">
                                        Вопросы тестирования ({questions.length})
                                    </Typography>
                                </Box>

                                <StyledChip
                                    label={`${(questions.filter(q => q.mcqOptionList).length)} MCQ · ${questions.filter(q => q.matchingPairs).length} Пары`}
                                    size="small"
                                />
                            </Box>

                            <Box>
                                {questions.map((x, index) => {
                                    if (!x) return null;

                                    return (
                                        <Zoom
                                            in={true}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                            key={index}
                                        >
                                            <QuestionCard elevation={previewMode ? 1 : 2}>
                                                {!previewMode && (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -10,
                                                            left: -10,
                                                            bgcolor: '#374761',
                                                            color: 'white',
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 'bold',
                                                            fontSize: 14
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </Box>
                                                )}

                                                <Grid container spacing={3}>
                                                    {/* Question Title and Type */}
                                                    <Grid item xs={12}>
                                                        <Grid container alignItems="center" spacing={2}>
                                                            {previewMode && (
                                                                <Grid item xs={1}>
                                                                    <Typography variant="h6" fontWeight={700} color="#374761">
                                                                        {index + 1}.
                                                                    </Typography>
                                                                </Grid>
                                                            )}

                                                            <Grid item xs={previewMode ? 11 : 9}>
                                                                {previewMode ? (
                                                                    <Typography variant="h6" color="#374761">
                                                                        {x.question.question_title || "Без названия"}
                                                                    </Typography>
                                                                ) : (
                                                                    <TextField
                                                                        fullWidth
                                                                        label="Вопрос"
                                                                        variant="outlined"
                                                                        value={x.question.question_title}
                                                                        onChange={(e) => handleValueChange(index, e.target.value)}
                                                                        InputProps={{
                                                                            sx: {
                                                                                borderRadius: 1,
                                                                            }
                                                                        }}
                                                                    />
                                                                )}
                                                            </Grid>

                                                            {!previewMode && (
                                                                <>
                                                                    <Grid item xs={2}>
                                                                        <FormControl fullWidth size="small">
                                                                            <InputLabel>Тип вопроса</InputLabel>
                                                                            <Select
                                                                                value={getQType(x)}
                                                                                onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
                                                                                label="Тип вопроса"
                                                                            >
                                                                                <MenuItem value="mcqOptionList">MCQ</MenuItem>
                                                                                <MenuItem value="matchingPairs">Пары</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>

                                                                    <Grid item xs={1}>
                                                                        <Tooltip title="Удалить вопрос">
                                                                            <IconButton
                                                                                onClick={() => deleteQuestion(index)}
                                                                                color="error"
                                                                                size="small"
                                                                            >
                                                                                <DeleteOutlineIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Grid>
                                                                </>
                                                            )}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>

                                                    {/* Question Content */}
                                                    <Grid item xs={12}>
                                                        <Box sx={{ pl: previewMode ? 4 : 2 }}>
                                                            {x.mcqOptionList ? (
                                                                <Grid container spacing={2}>
                                                                    {x.mcqOptionList.map((y, answersIndex) => (
                                                                        <Grid item xs={12} key={answersIndex}>
                                                                            <Grid container alignItems="center" spacing={1}>
                                                                                <Grid item xs={previewMode ? 11 : 9}>
                                                                                    {previewMode ? (
                                                                                        <Box sx={{
                                                                                            display: 'flex',
                                                                                            alignItems: 'center',
                                                                                            p: 1,
                                                                                            borderRadius: 1,
                                                                                            bgcolor: alpha('#374761', 0.05)
                                                                                        }}>
                                                                                            <Checkbox
                                                                                                disabled
                                                                                                checked={y.is_true}
                                                                                                size="small"
                                                                                                sx={{ color: '#37476180' }}
                                                                                            />
                                                                                            <Typography>
                                                                                                {y.mcq_option_title || "Вариант без названия"}
                                                                                            </Typography>
                                                                                        </Box>
                                                                                    ) : (
                                                                                        <TextField
                                                                                            fullWidth
                                                                                            label="Вариант ответа"
                                                                                            variant="outlined"
                                                                                            size="small"
                                                                                            value={y.mcq_option_title}
                                                                                            onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'mcqOptionList', 'mcq_option_title')}
                                                                                        />
                                                                                    )}
                                                                                </Grid>

                                                                                {!previewMode && (
                                                                                    <Grid item xs={3}>
                                                                                        <FormControlLabel
                                                                                            control={
                                                                                                <Checkbox
                                                                                                    checked={y.is_true}
                                                                                                    onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'mcqOptionList', 'is_true')}
                                                                                                    sx={{ color: '#37476180' }}
                                                                                                />
                                                                                            }
                                                                                            label="Правильный"
                                                                                        />
                                                                                    </Grid>
                                                                                )}
                                                                            </Grid>
                                                                        </Grid>
                                                                    ))}

                                                                    {!previewMode && (
                                                                        <Grid item xs={12}>
                                                                            <Button
                                                                                startIcon={<AddCircleOutlineIcon />}
                                                                                onClick={() => handleAddToList(index)}
                                                                                variant="text"
                                                                                sx={{ color: '#374761', mt: 1 }}
                                                                            >
                                                                                Добавить вариант ответа
                                                                            </Button>
                                                                        </Grid>
                                                                    )}
                                                                </Grid>
                                                            ) : x.matchingPairs ? (
                                                                <Grid container spacing={2}>
                                                                    {x.matchingPairs.map((y, answersIndex) => (
                                                                        <Grid item xs={12} key={answersIndex}>
                                                                            <Grid container alignItems="center" spacing={2}>
                                                                                <Grid item xs={previewMode ? 5 : 5}>
                                                                                    {previewMode ? (
                                                                                        <Box sx={{
                                                                                            p: 1.5,
                                                                                            bgcolor: alpha('#374761', 0.07),
                                                                                            borderRadius: 1,
                                                                                            textAlign: 'center'
                                                                                        }}>
                                                                                            {y.leftPart || "Левая часть"}
                                                                                        </Box>
                                                                                    ) : (
                                                                                        <TextField
                                                                                            fullWidth
                                                                                            label="Левая часть"
                                                                                            variant="outlined"
                                                                                            size="small"
                                                                                            value={y.leftPart}
                                                                                            onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'matchingPairs', 'leftPart')}
                                                                                        />
                                                                                    )}
                                                                                </Grid>

                                                                                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                                                                    <SwapHorizIcon sx={{ color: '#37476180' }} />
                                                                                </Grid>

                                                                                <Grid item xs={previewMode ? 5 : 5}>
                                                                                    {previewMode ? (
                                                                                        <Box sx={{
                                                                                            p: 1.5,
                                                                                            bgcolor: alpha('#374761', 0.07),
                                                                                            borderRadius: 1,
                                                                                            textAlign: 'center'
                                                                                        }}>
                                                                                            {y.rightPart || "Правая часть"}
                                                                                        </Box>
                                                                                    ) : (
                                                                                        <TextField
                                                                                            fullWidth
                                                                                            label="Правая часть"
                                                                                            variant="outlined"
                                                                                            size="small"
                                                                                            value={y.rightPart}
                                                                                            onChange={(e) => handleInputChange(index, answersIndex, e.target.value, 'matchingPairs', 'rightPart')}
                                                                                        />
                                                                                    )}
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    ))}

                                                                    {!previewMode && (
                                                                        <Grid item xs={12}>
                                                                            <Button
                                                                                startIcon={<AddCircleOutlineIcon />}
                                                                                onClick={() => handleAddToList(index)}
                                                                                variant="text"
                                                                                sx={{ color: '#374761', mt: 1 }}
                                                                            >
                                                                                Добавить пару
                                                                            </Button>
                                                                        </Grid>
                                                                    )}
                                                                </Grid>
                                                            ) : null}
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </QuestionCard>
                                        </Zoom>
                                    );
                                })}
                            </Box>
                        </>
                    )}

                    {/* Add new question button */}
                    {!previewMode && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <ActionButton
                                variant="contained"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={handleAddQuestion}
                                sx={{
                                    bgcolor: '#374761',
                                    color: 'white',
                                    px: 3,
                                    py: 1.2,
                                    '&:hover': { bgcolor: '#2a3549' }
                                }}
                            >
                                Добавить новый вопрос
                            </ActionButton>
                        </Box>
                    )}

                    {/* Preview stats */}
                    {previewMode && questions.length > 0 && (
                        <Box sx={{ mt: 4, p: 3, bgcolor: alpha('#374761', 0.05), borderRadius: 2 }}>
                            <Typography variant="subtitle1" gutterBottom color="#374761" fontWeight={500}>
                                Статистика теста:
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="text.secondary">
                                        Всего вопросов:
                                    </Typography>
                                    <Typography variant="h6" color="#374761">
                                        {questions.length}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" color="text.secondary">
                                        Вопросов MCQ:
                                    </Typography>
                                    <Typography variant="h6" color="#374761">
                                        {questions.filter(q => q.mcqOptionList).length}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography variant="body2" color="text.secondary">
                                        Вопросов на сопоставление:
                                    </Typography>
                                    <Typography variant="h6" color="#374761">
                                        {questions.filter(q => q.matchingPairs).length}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={togglePreviewMode}
                                    sx={{ color: '#374761', borderColor: '#374761' }}
                                >
                                    Вернуться к редактированию
                                </Button>
                            </Box>
                        </Box>
                    )}
                </QuizPaper>
            </motion.div>
        </Container>
    );
};

export default QuestionnaireForm;