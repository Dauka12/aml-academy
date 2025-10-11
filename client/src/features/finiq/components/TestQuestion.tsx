import {
    Box,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionExamQuestionResponse } from '../types/testSession';

interface TestQuestionProps {
    question: SessionExamQuestionResponse;
    selectedOptionId: number | null;
    onSelectOption: (questionId: number, optionId: number) => void;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
    question,
    selectedOptionId,
    onSelectOption
}) => {
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelectOption(question.id, parseInt(event.target.value));
    };
    const { t, i18n } = useTranslation();
    const[language, setLanguage] = useState(i18n.language); 

    useEffect(() => {
        console.log('question: ', question);
        setLanguage(i18n.language);
        
    },[i18n.language])

    return (
        <Box>
            <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
                <Typography variant="h6" gutterBottom>
                    {language === 'ru' ? question.questionRus : question.questionKaz }
                </Typography>
            </Paper>

            <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
                <RadioGroup
                    value={selectedOptionId?.toString() || ""}
                    onChange={handleOptionChange}
                >
                    {question.options.map((option) => (
                        <Paper 
                            key={option.id} 
                            elevation={selectedOptionId === option.id ? 2 : 0}
                            sx={{ 
                                mb: 2, 
                                p: 2, 
                                border: '2px solid',
                                borderColor: selectedOptionId === option.id ? 'primary.main' : 'transparent',
                                borderRadius: 2,
                                bgcolor: selectedOptionId === option.id ? 'rgba(25, 118, 210, 0.08)' : 'white',
                                transition: 'all 0.2s',
                                position: 'relative',
                                '&:hover': {
                                    bgcolor: selectedOptionId === option.id ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                                    borderColor: selectedOptionId === option.id ? 'primary.main' : 'divider',
                                },
                                '&::after': selectedOptionId === option.id ? {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    right: '12px',
                                    transform: 'translateY(-50%)',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23ffffff\'%3E%3Cpath d=\'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\'/%3E%3C/svg%3E")',
                                    backgroundSize: '14px',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                } : {}
                            }}
                        >
                            <FormControlLabel
                                value={option.id.toString()}
                                control={<Radio color="primary" checked={selectedOptionId === option.id} />}
                                label={
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            fontWeight: selectedOptionId === option.id ? 600 : 400,
                                            color: selectedOptionId === option.id ? 'primary.dark' : 'text.primary',
                                            transition: 'all 0.2s',
                                            pl: 1
                                        }}
                                    >
                                        {language === 'ru' ? option.nameRus : option.nameKaz }
                                    </Typography>
                                }
                                sx={{ width: '100%' }}
                            />
                        </Paper>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default TestQuestion;