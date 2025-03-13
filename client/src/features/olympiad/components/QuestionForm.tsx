import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Alert,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Radio,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuestionThunk, updateQuestionThunk } from '../store/slices/examSlice';
import { ExamQuestionRequest, ExamQuestionResponse } from '../types/exam';

interface QuestionFormProps {
    testId: number;
    question?: ExamQuestionResponse;
    onSuccess: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ testId, question, onSuccess }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<ExamQuestionRequest>({
        questionRus: question?.questionRus || '',
        questionKaz: question?.questionKaz || '',
        options: question?.options?.map(opt => ({
            nameRus: opt.nameRus,
            nameKaz: opt.nameKaz
        })) || [{ nameRus: '', nameKaz: '' }, { nameRus: '', nameKaz: '' }],
        correctOptionId: question?.correctOptionId || 0
    });

    const [error, setError] = useState('');

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index: number, field: 'nameRus' | 'nameKaz', value: string) => {
        const newOptions = [...formData.options];
        newOptions[index][field] = value;
        setFormData(prev => ({ ...prev, options: newOptions }));
    };

    const handleCorrectOptionChange = (index: number) => {
        let correctId = index;
        if (question && question.options && question.options[index]) {
            correctId = question.options[index].id;
        }
        setFormData(prev => ({ ...prev, correctOptionId: correctId }));
    };

    const addOption = () => {
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, { nameRus: '', nameKaz: '' }]
        }));
    };

    const removeOption = (index: number) => {
        if (formData.options.length <= 2) {
            setError('Должно быть минимум 2 варианта ответа');
            return;
        }

        const newOptions = formData.options.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            options: newOptions,
            correctOptionId: prev.correctOptionId === index ? 0 : prev.correctOptionId > index ? prev.correctOptionId - 1 : prev.correctOptionId
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.questionRus.trim()) {
            setError('Введите текст вопроса (Рус)');
            return false;
        }
        if (!formData.questionKaz.trim()) {
            setError('Введите текст вопроса (Каз)');
            return false;
        }
        if (formData.options.some(opt => !opt.nameRus.trim() || !opt.nameKaz.trim())) {
            setError('Все варианты ответов должны быть заполнены');
            return false;
        }
        if (formData.correctOptionId === undefined || formData.correctOptionId === null) {
            setError('Выберите правильный вариант ответа');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            if (question?.id) {
                await dispatch(updateQuestionThunk({
                    questionData: formData,
                    id: question.id
                }));
            } else {
                await dispatch(createQuestionThunk({
                    questionData: formData,
                    testId
                }));
            }
            onSuccess();
        } catch (error) {
            console.error('Error submitting question:', error);
            setError('Произошла ошибка при сохранении вопроса');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                {question ? 'Редактировать вопрос' : 'Добавить новый вопрос'}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Вопрос (Рус)"
                            name="questionRus"
                            value={formData.questionRus}
                            onChange={handleQuestionChange}
                            multiline
                            rows={3}
                            required
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Вопрос (Каз)"
                            name="questionKaz"
                            value={formData.questionKaz}
                            onChange={handleQuestionChange}
                            multiline
                            rows={3}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" gutterBottom>
                            Варианты ответов
                        </Typography>
                        
                        {formData.options.map((option, index) => (
                            <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                <Radio
                                    checked={formData.correctOptionId === (question?.options?.[index]?.id || index)}
                                    onChange={() => handleCorrectOptionChange(index)}
                                    size="small"
                                />
                                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={`Вариант ${index + 1} (Рус)`}
                                            value={option.nameRus}
                                            onChange={(e) => handleOptionChange(index, 'nameRus', e.target.value)}
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={`Вариант ${index + 1} (Каз)`}
                                            value={option.nameKaz}
                                            onChange={(e) => handleOptionChange(index, 'nameKaz', e.target.value)}
                                            size="small"
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <IconButton 
                                    color="error" 
                                    onClick={() => removeOption(index)}
                                    disabled={formData.options.length <= 2}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        
                        <Button 
                            startIcon={<AddIcon />} 
                            onClick={addOption} 
                            variant="outlined" 
                            size="small"
                            sx={{ mt: 1 }}
                        >
                            Добавить вариант
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {question ? 'Сохранить изменения' : 'Добавить вопрос'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default QuestionForm;