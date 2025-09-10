import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOlympiadDispatch, useOlympiadSelector } from '../hooks/useOlympiadStore';
import { RootState } from '../store';
import { deleteQuestion } from '../store/slices/examSlice';
import { Question } from '../types/exam';

interface QuestionListProps {
    examId: string;
    onEdit: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ examId, onEdit }) => {
    const dispatch = useOlympiadDispatch();
    const { t } = useTranslation();
    const questions = useOlympiadSelector((state: RootState) => state.exam.questions?.[examId] || []);

    const handleDelete = (questionId: string) => {
        dispatch(deleteQuestion({ examId, questionId }));
    };

    return (
        <Box>
            <Typography variant="h6">{t('session.question')}</Typography>
            {questions.length > 0 ? (
                <List>
                    {questions.map((question) => (
                        <ListItem key={question.id}>
                            <ListItemText primary={question.text} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(question)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(question.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    {t('olympiad.noQuestions')}
                </Typography>
            )}
        </Box>
    );
};

export default QuestionList;