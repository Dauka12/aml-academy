import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { SessionExamQuestionResponse, StudentAnswerResponse } from '../types/testSession';
import { useTranslation } from 'react-i18next';

interface TestNavigationPanelProps {
    questions: SessionExamQuestionResponse[];
    currentIndex: number;
    answers: StudentAnswerResponse[];
    onQuestionSelect: (index: number) => void;
}

const TestNavigationPanel: React.FC<TestNavigationPanelProps> = ({
    questions,
    currentIndex,
    answers,
    onQuestionSelect
}) => {
    // Create a Set of question IDs that have been answered
    const answeredQuestionIds = new Set(answers.map(answer => answer.questionId));
    const {t, i18n } = useTranslation();
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                {t('testlist.navigation')}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    justifyContent: 'center',
                    maxWidth: '100%'
                }}
            >
                {questions.map((question, index) => {
                    const isAnswered = answeredQuestionIds.has(question.id);
                    const isCurrent = index === currentIndex;

                    return (
                        <Button
                            key={question.id}
                            variant={isCurrent ? "contained" : "outlined"}
                            color={isAnswered ? "success" : "primary"}
                            size="small"
                            onClick={() => onQuestionSelect(index)}
                            sx={{
                                minWidth: '40px',
                                height: '40px',
                                p: 0
                            }}
                        >
                            {index + 1}
                        </Button>
                    );
                })}
            </Box>
        </Box>
    );
};

export default TestNavigationPanel;