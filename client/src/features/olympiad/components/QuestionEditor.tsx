import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addQuestion, updateQuestion } from '../store/slices/examSlice';
import { ExamQuestion } from '../types/exam';

interface QuestionEditorProps {
    question?: ExamQuestion;
    examId: string;
    onClose: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, examId, onClose }) => {
    const dispatch = useDispatch();
    const [questionText, setQuestionText] = useState(question ? question.text || question.questionRus : '');
    const [questionId] = useState(question ? question.id : undefined);
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (questionId) {
            dispatch(updateQuestion({ id: questionId.toString(), text: questionText, examId }));
        } else {
            dispatch(addQuestion({ text: questionText, examId }));
        }
        onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6">{question ? t('olympiad.editQuestion') : t('olympiad.addQuestion')}</Typography>
            <TextField
                label={t('olympiad.questionText')}
                variant="outlined"
                fullWidth
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                {question ? t('common.update') : t('common.add')}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                {t('common.cancel')}
            </Button>
        </Box>
    );
};

export default QuestionEditor;