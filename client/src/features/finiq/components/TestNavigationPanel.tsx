import { Box, Button, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpIcon from '@mui/icons-material/Help';
import React from 'react';
import { SessionExamQuestionResponse } from '../types/testSession';
import { useTranslation } from 'react-i18next';

interface TestNavigationPanelProps {
    questions: SessionExamQuestionResponse[];
    currentIndex: number;
    getAnsweredStatus: (questionId: number) => boolean;
    onQuestionSelect: (index: number) => void;
}

const TestNavigationPanel: React.FC<TestNavigationPanelProps> = ({
    questions,
    currentIndex,
    getAnsweredStatus,
    onQuestionSelect
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    // Detect if we're on a mobile device
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    // Determine button size based on screen size and number of questions
    const buttonSize = isMobile ? '32px' : isMediumScreen ? '36px' : '40px';
    const fontSize = isMobile ? '0.75rem' : '0.875rem';
    const spacing = isMobile ? 0.5 : 1;
    
    return (
        <Paper 
            elevation={4} 
            sx={{
                p: isMobile ? 1.5 : 2,
                borderRadius: isMobile ? '16px 16px 0 0' : 2,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                position: 'sticky',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
                width: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderBottom: 0
            }}
        >
            <Typography 
                variant={isMobile ? "body2" : "subtitle1"} 
                gutterBottom 
                sx={{ 
                    fontWeight: 600, 
                    color: 'primary.main',
                    mb: isMobile ? 1 : 1.5,
                    textAlign: 'center',
                    fontSize: isMobile ? '0.8rem' : '1rem'
                }}
            >
                {t('testlist.navigation')}
            </Typography>

            <Box sx={{ 
                mb: 1.5, 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 2 }, 
                justifyContent: 'center',
                flexWrap: 'wrap',
                backgroundColor: 'rgba(245, 178, 7, 0.05)',
                borderRadius: '12px',
                p: 1
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: 'success.dark',
                            fontWeight: 600
                        }}
                    >
                        {t('testlist.answered')}
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HelpIcon color="warning" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: 'warning.dark',
                            fontWeight: 600
                        }}
                    >
                        {t('testlist.unanswered')}
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: spacing,
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    maxWidth: '100%',
                    maxHeight: isMobile ? '180px' : 'none',
                    overflow: 'auto',
                    pb: isMobile ? 1 : 0,
                    pt: isMobile ? 1 : 0,
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#f5b207 transparent',
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        height: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#f5b207',
                        borderRadius: '10px',
                    }
                }}
            >
                {questions.map((question, index) => {
                    const isAnswered = getAnsweredStatus(question.id);
                    const isCurrent = index === currentIndex;

                    return (
                        <Button
                            key={question.id}
                            variant={isCurrent ? "contained" : "outlined"}
                            color={isAnswered ? "success" : "primary"}
                            size="small"
                            onClick={() => onQuestionSelect(index)}
                            sx={{
                                minWidth: buttonSize,
                                width: buttonSize,
                                height: buttonSize,
                                p: 0,
                                fontSize,
                                borderRadius: '50%',
                                fontWeight: 600,
                                position: 'relative',
                                boxShadow: isCurrent ? 3 : 0,
                                backgroundColor: isAnswered ? (isCurrent ? theme.palette.success.main : 'transparent') : 'transparent',
                                borderWidth: '2px',
                                m: '1px',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    backgroundColor: isAnswered ? 
                                        (isCurrent ? theme.palette.success.main : 'rgba(76, 175, 80, 0.1)') : 
                                        (isCurrent ? theme.palette.primary.main : 'rgba(25, 118, 210, 0.1)')
                                },
                                '&::after': isAnswered ? {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-2px',
                                    right: '-2px',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.success.main,
                                    border: `1px solid ${theme.palette.background.paper}`
                                } : {}
                            }}
                        >
                            {index + 1}
                        </Button>
                    );
                })}
            </Box>
            
            <Box 
                sx={{ 
                    mt: 1.5, 
                    display: 'flex', 
                    justifyContent: isMobile ? 'space-around' : 'space-between',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 1.5,
                    flexDirection: isMobile ? 'row' : 'row',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    alignItems: 'center',
                    gap: isMobile ? 1 : 0
                }}
            >
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: isMobile ? '0.7rem' : '0.875rem',
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        padding: isMobile ? '4px 8px' : '4px 10px',
                        borderRadius: '8px'
                    }}
                >
                    {t('testlist.totalQuestions')}: <Box component="span" sx={{ fontWeight: 700, ml: 0.5, color: 'primary.main' }}>{questions.length}</Box>
                </Typography>
                
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: isMobile ? '0.7rem' : '0.875rem',
                        backgroundColor: 'rgba(76, 175, 80, 0.05)',
                        padding: isMobile ? '4px 8px' : '4px 10px',
                        borderRadius: '8px'
                    }}
                >
                    {t('testlist.answered')}: <Box component="span" sx={{ fontWeight: 700, color: 'success.main', ml: 0.5 }}>
                        {questions.filter(q => getAnsweredStatus(q.id)).length}
                    </Box>
                </Typography>
                
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: isMobile ? '0.7rem' : '0.875rem',
                        backgroundColor: 'rgba(255, 152, 0, 0.05)',
                        padding: isMobile ? '4px 8px' : '4px 10px',
                        borderRadius: '8px'
                    }}
                >
                    {t('testlist.remaining')}: <Box component="span" sx={{ fontWeight: 700, color: 'warning.main', ml: 0.5 }}>
                        {questions.length - questions.filter(q => getAnsweredStatus(q.id)).length}
                    </Box>
                </Typography>
            </Box>
        </Paper>
    );
};

export default TestNavigationPanel;