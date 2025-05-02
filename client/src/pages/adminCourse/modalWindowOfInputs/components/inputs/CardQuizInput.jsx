import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const CardQuizInput = ({ values, setValues }) => {
    const handleAddQuestion = () => {
        setValues(prevValues => ({
            ...prevValues,
            questions: [
                ...prevValues.questions || [],
                {
                    question: 'Вопрос',
                    options: [
                        {
                            question: '',
                            answer: '',
                        },
                    ],
                    correctOptionIndex: -1,
                }
            ]
        }));
    };

    const handleAddOption = (questionIndex) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options.push({
                question: '',
                answer: ''
            });
            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    const handleChangeQuestionText = (questionIndex, text) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].question = text;
            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    const handleChangeOptionQuestion = (questionIndex, optionIndex, text) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options[optionIndex].question = text;
            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    const handleChangeOptionAnswer = (questionIndex, optionIndex, text) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options[optionIndex].answer = text;
            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].correctOptionIndex = optionIndex;
            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    const handleRemoveQuestion = (questionIndex) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions.splice(questionIndex, 1);
            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    const handleRemoveOption = (questionIndex, optionIndex) => {
        setValues(prevValues => {
            const updatedQuestions = [...prevValues.questions];
            updatedQuestions[questionIndex].options.splice(optionIndex, 1);

            // Update correctOptionIndex if needed
            if (optionIndex === updatedQuestions[questionIndex].correctOptionIndex) {
                updatedQuestions[questionIndex].correctOptionIndex = -1;
            } else if (optionIndex < updatedQuestions[questionIndex].correctOptionIndex) {
                updatedQuestions[questionIndex].correctOptionIndex -= 1;
            }

            return {
                ...prevValues,
                questions: updatedQuestions
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Вопросы
            </Typography>

            {values.questions?.map((question, questionIndex) => (
                <Card key={questionIndex} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={500}>
                                Вопрос {questionIndex + 1}
                            </Typography>

                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveQuestion(questionIndex)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <TextField
                            fullWidth
                            size="small"
                            label="Текст вопроса"
                            value={question.question}
                            onChange={(e) => handleChangeQuestionText(questionIndex, e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                            Варианты ответов
                        </Typography>

                        <Box sx={{ pl: 1, mb: 1 }}>
                            {question.options.map((option, optionIndex) => (
                                <Box
                                    key={optionIndex}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 1,
                                        bgcolor: question.correctOptionIndex === optionIndex ? 'success.lighter' : 'transparent',
                                        p: 1,
                                        borderRadius: 1
                                    }}
                                >
                                    <TextField
                                        size="small"
                                        label="Вариант ответа"
                                        value={option.question}
                                        onChange={(e) => handleChangeOptionQuestion(questionIndex, optionIndex, e.target.value)}
                                        sx={{ flex: 1 }}
                                    />

                                    <TextField
                                        size="small"
                                        label="Фидбек"
                                        value={option.answer}
                                        onChange={(e) => handleChangeOptionAnswer(questionIndex, optionIndex, e.target.value)}
                                        sx={{ flex: 1 }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={question.correctOptionIndex === optionIndex}
                                                onChange={() => handleCorrectOptionChange(questionIndex, optionIndex)}
                                                size="small"
                                            />
                                        }
                                        label="Верный"
                                        sx={{ ml: 0, minWidth: 80 }}
                                    />

                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                                        disabled={question.options.length <= 1}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>

                        <Button
                            startIcon={<AddIcon />}
                            size="small"
                            variant="outlined"
                            onClick={() => handleAddOption(questionIndex)}
                            sx={{ mt: 1 }}
                        >
                            Добавить вариант ответа
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={handleAddQuestion}
                sx={{ mt: 1 }}
            >
                Добавить вопрос
            </Button>
        </Box>
    );
};

export default CardQuizInput;
