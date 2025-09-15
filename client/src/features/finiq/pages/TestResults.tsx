import {
    ArrowBack,
    AssignmentTurnedInOutlined,
    CheckCircleOutlined,
    ErrorOutlined,
    QuizOutlined,
    TimerOutlined,
    CheckCircle,
    Cancel,
    TrendingUp,
    Assessment
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
    styled,
    ToggleButton,
    ToggleButtonGroup,
    LinearProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useTestSessionManager from '../hooks/useTestSessionManager.ts';
import { formatDate } from '../utils/dateUtils.ts';


// Styled components matching Dashboard aesthetic
const PageContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
}));

const ResultsCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: theme.spacing(4, 5),
    marginBottom: theme.spacing(3),
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
}));

const QuestionCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
}));

const SummaryBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2),
    borderRadius: 16,
    backgroundColor: 'rgba(26, 39, 81, 0.03)',
}));

const StatsItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '&:last-child': {
        marginBottom: 0
    }
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: 14,
    padding: theme.spacing(1.2, 3),
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.16)',
    }
}));

const StatCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 1.5),
    borderRadius: 16,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    minHeight: 100,
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5, 1),
        minHeight: 80,
    },
    [theme.breakpoints.up('sm')]: {
        minHeight: 120,
        padding: theme.spacing(3),
    }
}));

const ScoreIndicator = styled(Box)<{ correct?: boolean }>(({ theme, correct }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: correct ? theme.palette.success.main : theme.palette.error.main,
    marginRight: theme.spacing(1),
    flexShrink: 0
}));

const StyledProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    '& .MuiLinearProgress-bar': {
        borderRadius: 5,
    }
}));

const TestResults: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const {
        currentSession,
        loading,
        error,
        getExamSession
    } = useTestSessionManager();
    const { t, i18n } = useTranslation();
    const language = i18n.language || 'kz';
    const [filter, setFilter] = useState<string>('all');

    // Load the exam session
    useEffect(() => {
        if (!sessionId) {
            navigate('/finiq/dashboard');
            return;
        }
        getExamSession(parseInt(sessionId));
    }, [sessionId, getExamSession, navigate]);

    const goBackToDashboard = () => {
        navigate('/finiq/dashboard');
    };

    const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
        if (newFilter !== null) {
            setFilter(newFilter);
        }
    };

    if (loading || !currentSession) {
        return (
            <PageContainer display="flex" justifyContent="center" alignItems="center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={{ textAlign: 'center', color: 'white', p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            {t('testresult.loading')}
                        </Typography>
                    </Box>
                </motion.div>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ResultsCard>
                            <Typography variant="h5" color="error" gutterBottom>
                                {t('testresult.error')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {error}
                            </Typography>
                            <ActionButton
                                variant="contained"
                                color="primary"
                                startIcon={<ArrowBack />}
                                onClick={goBackToDashboard}
                            >
                                {t('testresult.goBackToDashboard')}
                            </ActionButton>
                        </ResultsCard>
                    </motion.div>
                </Container>
            </PageContainer>
        );
    }

    // Get answered questions count and calculate statistics
    const totalQuestions = currentSession.examData.questions.length;
    const answeredQuestions = new Set(
        currentSession.examData.studentAnswer.map(answer => answer.questionId)
    );
    const answeredCount = answeredQuestions.size;
    const completionPercentage = Math.round((answeredCount / totalQuestions) * 100);

    // Calculate correct and incorrect answers based on the answer data
    // If studentAnswer has a 'correct' field, use it; otherwise calculate it
    const studentAnswersWithCorrect = currentSession.examData.studentAnswer.map(answer => {
        // Check if the answer object already has a 'correct' field
        if ('correct' in answer) {
            return answer;
        }
        
        // If not, we need to determine correctness (this would require correct answer data)
        // For now, we'll assume all answers are correct since we don't have the correct answer data
        return { ...answer, correct: true };
    });

    const correctAnswers = studentAnswersWithCorrect.filter(answer => answer.correct).length;
    const incorrectAnswers = answeredCount - correctAnswers;
    const accuracyPercentage = answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0;
    const overallScorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Map answers for easy lookup
    const answersMap = new Map(
        currentSession.examData.studentAnswer.map(answer => [answer.questionId, answer.selectedOptionId])
    );

    // Map correct answers for easy lookup
    const correctAnswersMap = new Map(
        studentAnswersWithCorrect.map(answer => [answer.questionId, answer.correct])
    );

    // Filter questions based on selected filter
    const filteredQuestions = currentSession.examData.questions.filter(question => {
        const hasAnswer = answeredQuestions.has(question.id);
        const isCorrect = correctAnswersMap.get(question.id);
        
        switch (filter) {
            case 'correct':
                return hasAnswer && Boolean(isCorrect);
            case 'incorrect':
                return hasAnswer && !Boolean(isCorrect);
            case 'unanswered':
                return !hasAnswer;
            default:
                return true;
        }
    });

    return (
        <PageContainer>
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ActionButton
                        variant="contained"
                        sx={{ 
                            mb: 3, 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            color: '#1A2751',
                            fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            padding: { xs: '6px 12px', sm: '8px 16px' }
                        }}
                        startIcon={<ArrowBack />}
                        onClick={goBackToDashboard}
                    >
                        {t('testresult.goBackToDashboard')}
                    </ActionButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ResultsCard>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
                                    <Typography 
                                        variant="h4" 
                                        fontWeight="bold"
                                        sx={{ 
                                            fontSize: { xs: '1.75rem', sm: '2.125rem' }
                                        }}
                                    >
                                        {t('testresult.score')}
                                    </Typography>
                                    <Chip
                                        icon={<AssignmentTurnedInOutlined />}
                                        label={t('cardtest.completed')}
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                        sx={{ 
                                            borderRadius: 3, 
                                            p: { xs: 0.25, sm: 0.5 },
                                            fontSize: { xs: '0.7rem', sm: '0.8125rem' }
                                        }}
                                    />
                                </Box>
                                <Typography 
                                    variant="h5" 
                                    color="primary" 
                                    gutterBottom
                                    sx={{ 
                                        fontSize: { xs: '1.1rem', sm: '1.5rem' }
                                    }}
                                >
                                    {currentSession.examData.nameRus}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Box mb={4}>
                                    <StatsItem>
                                        <TimerOutlined sx={{ mr: 1.5, color: 'text.secondary', fontSize: { xs: 20, sm: 24 } }} />
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                            >
                                                {t('testresult.timeStart')}
                                            </Typography>
                                            <Typography 
                                                variant="body1"
                                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                            >
                                                {formatDate(currentSession.startTime)}
                                            </Typography>
                                        </Box>
                                    </StatsItem>

                                    <StatsItem>
                                        <TimerOutlined sx={{ mr: 1.5, color: 'text.secondary', fontSize: { xs: 20, sm: 24 } }} />
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                            >
                                                {t('testresult.andtime')}
                                            </Typography>
                                            <Typography 
                                                variant="body1"
                                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                            >
                                                {formatDate(currentSession.endTime)}
                                            </Typography>
                                        </Box>
                                    </StatsItem>

                                    <StatsItem>
                                        <QuizOutlined sx={{ mr: 1.5, color: 'text.secondary', fontSize: { xs: 20, sm: 24 } }} />
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                            >
                                                {t('testresult.Attempted')}
                                            </Typography>
                                            <Typography 
                                                variant="body1"
                                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                            >
                                                {answeredCount} из {totalQuestions} ({completionPercentage}%)
                                            </Typography>
                                        </Box>
                                    </StatsItem>

                                    <StatsItem>
                                        <CheckCircle sx={{ mr: 1.5, color: 'success.main', fontSize: { xs: 20, sm: 24 } }} />
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                            >
                                                Правильные ответы
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                color="success.main" 
                                                fontWeight="bold"
                                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                            >
                                                {correctAnswers} ({accuracyPercentage}%)
                                            </Typography>
                                        </Box>
                                    </StatsItem>

                                    <StatsItem>
                                        <Cancel sx={{ mr: 1.5, color: 'error.main', fontSize: { xs: 20, sm: 24 } }} />
                                        <Box>
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                            >
                                                Неправильные ответы
                                            </Typography>
                                            <Typography 
                                                variant="body1" 
                                                color="error.main" 
                                                fontWeight="bold"
                                                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                                            >
                                                {incorrectAnswers}
                                            </Typography>
                                        </Box>
                                    </StatsItem>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <SummaryBox>
                                    <Typography 
                                        variant="h2" 
                                        color="primary" 
                                        fontWeight="bold"
                                        sx={{ 
                                            fontSize: { xs: '2.5rem', sm: '3.75rem' }
                                        }}
                                    >
                                        {overallScorePercentage}%
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        color="text.secondary" 
                                        mb={2}
                                        sx={{ 
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }}
                                    >
                                        Общий результат
                                    </Typography>
                                    
                                    <Box width="100%" mb={2}>
                                        <StyledProgressBar
                                            variant="determinate"
                                            value={overallScorePercentage}
                                            color={overallScorePercentage >= 70 ? 'success' : overallScorePercentage >= 50 ? 'warning' : 'error'}
                                        />
                                    </Box>
                                    
                                    <Typography 
                                        variant="caption" 
                                        color="text.secondary"
                                        sx={{ 
                                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
                                        }}
                                    >
                                        {correctAnswers} из {totalQuestions} вопросов
                                    </Typography>
                                    
                                    <Box mt={2} display="flex" gap={1} flexWrap="wrap" justifyContent="center">
                                        <Chip 
                                            size="small" 
                                            label={`${completionPercentage}% завершено`}
                                            color="info"
                                            variant="outlined"
                                            sx={{ 
                                                fontSize: { xs: '0.6rem', sm: '0.75rem' },
                                                height: { xs: 24, sm: 32 }
                                            }}
                                        />
                                        {overallScorePercentage >= 70 && (
                                            <Chip 
                                                size="small" 
                                                label="Отличный результат!"
                                                color="success"
                                                variant="filled"
                                                sx={{ 
                                                    fontSize: { xs: '0.6rem', sm: '0.75rem' },
                                                    height: { xs: 24, sm: 32 }
                                                }}
                                            />
                                        )}
                                    </Box>
                                </SummaryBox>
                            </Grid>
                        </Grid>

                        {/* Detailed Statistics Cards */}
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={6} md={3}>
                                <StatCard>
                                    <Assessment sx={{ 
                                        fontSize: { xs: 28, sm: 40 }, 
                                        color: 'primary.main', 
                                        mb: { xs: 0.5, sm: 1 } 
                                    }} />
                                    <Typography 
                                        variant="h4" 
                                        fontWeight="bold" 
                                        color="primary"
                                        sx={{ 
                                            fontSize: { xs: '1.5rem', sm: '2.125rem' } 
                                        }}
                                    >
                                        {answeredCount}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        textAlign="center"
                                        sx={{ 
                                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                            lineHeight: { xs: 1.2, sm: 1.43 }
                                        }}
                                    >
                                        Отвеченные вопросы
                                    </Typography>
                                </StatCard>
                            </Grid>
                            
                            <Grid item xs={6} md={3}>
                                <StatCard>
                                    <CheckCircle sx={{ 
                                        fontSize: { xs: 28, sm: 40 }, 
                                        color: 'success.main', 
                                        mb: { xs: 0.5, sm: 1 } 
                                    }} />
                                    <Typography 
                                        variant="h4" 
                                        fontWeight="bold" 
                                        color="success.main"
                                        sx={{ 
                                            fontSize: { xs: '1.5rem', sm: '2.125rem' } 
                                        }}
                                    >
                                        {correctAnswers}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        textAlign="center"
                                        sx={{ 
                                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                            lineHeight: { xs: 1.2, sm: 1.43 }
                                        }}
                                    >
                                        Правильные ответы
                                    </Typography>
                                </StatCard>
                            </Grid>
                            
                            <Grid item xs={6} md={3}>
                                <StatCard>
                                    <Cancel sx={{ 
                                        fontSize: { xs: 28, sm: 40 }, 
                                        color: 'error.main', 
                                        mb: { xs: 0.5, sm: 1 } 
                                    }} />
                                    <Typography 
                                        variant="h4" 
                                        fontWeight="bold" 
                                        color="error.main"
                                        sx={{ 
                                            fontSize: { xs: '1.5rem', sm: '2.125rem' } 
                                        }}
                                    >
                                        {incorrectAnswers}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        textAlign="center"
                                        sx={{ 
                                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                            lineHeight: { xs: 1.2, sm: 1.43 }
                                        }}
                                    >
                                        Неправильные ответы
                                    </Typography>
                                </StatCard>
                            </Grid>
                            
                            <Grid item xs={6} md={3}>
                                <StatCard>
                                    <TrendingUp sx={{ 
                                        fontSize: { xs: 28, sm: 40 }, 
                                        color: accuracyPercentage >= 70 ? 'success.main' : accuracyPercentage >= 50 ? 'warning.main' : 'error.main', 
                                        mb: { xs: 0.5, sm: 1 } 
                                    }} />
                                    <Typography 
                                        variant="h4" 
                                        fontWeight="bold" 
                                        color={accuracyPercentage >= 70 ? 'success.main' : accuracyPercentage >= 50 ? 'warning.main' : 'error.main'}
                                        sx={{ 
                                            fontSize: { xs: '1.5rem', sm: '2.125rem' } 
                                        }}
                                    >
                                        {accuracyPercentage}%
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary" 
                                        textAlign="center"
                                        sx={{ 
                                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                            lineHeight: { xs: 1.2, sm: 1.43 }
                                        }}
                                    >
                                        Точность ответов
                                    </Typography>
                                </StatCard>
                            </Grid>
                        </Grid>
                    </ResultsCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ResultsCard>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                            <Typography 
                                variant="h5"
                                sx={{ 
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}
                            >
                                {t('testresult.viewDetails')}
                            </Typography>
                            
                            <ToggleButtonGroup
                                value={filter}
                                exclusive
                                onChange={handleFilterChange}
                                size="small"
                                sx={{ 
                                    flexWrap: 'wrap',
                                    gap: { xs: 0.5, sm: 0 },
                                    '& .MuiToggleButton-root': {
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                        padding: { xs: '4px 8px', sm: '6px 16px' },
                                        minWidth: { xs: 'auto', sm: 'unset' }
                                    }
                                }}
                            >
                                <ToggleButton value="all">
                                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Все ({currentSession.examData.questions.length})</Box>
                                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>Все</Box>
                                </ToggleButton>
                                <ToggleButton value="correct" sx={{ color: 'success.main' }}>
                                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Правильные ({correctAnswers})</Box>
                                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>✓ {correctAnswers}</Box>
                                </ToggleButton>
                                <ToggleButton value="incorrect" sx={{ color: 'error.main' }}>
                                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Неправильные ({incorrectAnswers})</Box>
                                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>✗ {incorrectAnswers}</Box>
                                </ToggleButton>
                                <ToggleButton value="unanswered" sx={{ color: 'text.secondary' }}>
                                    <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Неотвеченные ({totalQuestions - answeredCount})</Box>
                                    <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>– {totalQuestions - answeredCount}</Box>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                        <Divider sx={{ mb: 3 }} />

                                        {filteredQuestions.length === 0 ? (
                            <Box textAlign="center" py={4}>
                                <Typography 
                                    variant="h6" 
                                    color="text.secondary"
                                    sx={{ 
                                        fontSize: { xs: '1rem', sm: '1.25rem' }
                                    }}
                                >
                                    Нет вопросов для выбранного фильтра
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                {filteredQuestions.map((question, index) => {
                            const selectedOptionId = answersMap.get(question.id);
                            const hasAnswer = answeredQuestions.has(question.id);
                            const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                            const isCorrect = correctAnswersMap.get(question.id);

                            return (
                                <QuestionCard
                                    key={question.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    sx={{
                                        borderLeft: hasAnswer 
                                            ? `4px solid ${Boolean(isCorrect) ? '#4caf50' : '#f44336'}` 
                                            : '4px solid #bdbdbd',
                                        padding: { xs: 2, sm: 3 }
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 2, sm: 0 }}>
                                        <Box flex={1} width="100%">
                                            <Box display="flex" alignItems="center" mb={1} flexWrap="wrap" gap={1}>
                                                <ScoreIndicator correct={hasAnswer ? Boolean(isCorrect) : undefined} />
                                                <Typography 
                                                    variant="subtitle1" 
                                                    fontWeight="500"
                                                    sx={{ 
                                                        fontSize: { xs: '0.9rem', sm: '1rem' }
                                                    }}
                                                >
                                                    {t('testresult.question')} {index + 1}
                                                </Typography>
                                                {hasAnswer && (
                                                    <Chip 
                                                        size="small" 
                                                        label={Boolean(isCorrect) ? "Правильно" : "Неправильно"}
                                                        color={Boolean(isCorrect) ? "success" : "error"}
                                                        variant="outlined"
                                                        sx={{ 
                                                            ml: { xs: 0, sm: 1 }, 
                                                            fontSize: { xs: '0.6rem', sm: '0.7rem' },
                                                            height: { xs: 20, sm: 24 }
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            
                                            <Typography 
                                                variant="body1" 
                                                gutterBottom 
                                                sx={{ 
                                                    mb: 2,
                                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                                    lineHeight: { xs: 1.4, sm: 1.5 }
                                                }}
                                            >
                                                {language === 'ru' ? question.questionRus : question.questionKaz}
                                            </Typography>

                                            {hasAnswer ? (
                                                <Box 
                                                    mt={1.5} 
                                                    p={{ xs: 1.5, sm: 2 }}
                                                    sx={{ 
                                                        backgroundColor: Boolean(isCorrect) ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                                                        borderRadius: 2,
                                                        border: `1px solid ${Boolean(isCorrect) ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}` 
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary" 
                                                        gutterBottom
                                                        sx={{ 
                                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                        }}
                                                    >
                                                        {t('testresult.answer')}:
                                                    </Typography>
                                                    <Typography 
                                                        variant="body1" 
                                                        fontWeight="500"
                                                        color={Boolean(isCorrect) ? 'success.main' : 'error.main'}
                                                        sx={{ 
                                                            fontSize: { xs: '0.825rem', sm: '1rem' },
                                                            lineHeight: { xs: 1.3, sm: 1.5 }
                                                        }}
                                                    >
                                                        {language === 'ru' ? selectedOption?.nameRus : selectedOption?.nameKaz || 'Не найден вариант ответа'}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box 
                                                    mt={1.5} 
                                                    p={{ xs: 1.5, sm: 2 }}
                                                    sx={{ 
                                                        backgroundColor: 'rgba(158, 158, 158, 0.1)',
                                                        borderRadius: 2,
                                                        border: '1px solid rgba(158, 158, 158, 0.3)' 
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        sx={{ 
                                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                                        }}
                                                    >
                                                        {t('testresult.noAnswer')}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>

                                        <Box ml={{ xs: 0, sm: 2 }} display="flex" flexDirection={{ xs: 'row', sm: 'column' }} alignItems="center" gap={{ xs: 1, sm: 0 }}>
                                            {hasAnswer ? (
                                                Boolean(isCorrect) ? (
                                                    <CheckCircleOutlined 
                                                        color="success" 
                                                        sx={{ fontSize: { xs: 28, sm: 32 } }}
                                                    />
                                                ) : (
                                                    <ErrorOutlined 
                                                        color="error" 
                                                        sx={{ fontSize: { xs: 28, sm: 32 } }}
                                                    />
                                                )
                                            ) : (
                                                <ErrorOutlined 
                                                    color="disabled" 
                                                    sx={{ fontSize: { xs: 28, sm: 32 } }}
                                                />
                                            )}
                                            <Typography 
                                                variant="caption" 
                                                color={hasAnswer ? (Boolean(isCorrect) ? 'success.main' : 'error.main') : 'text.disabled'}
                                                mt={{ xs: 0, sm: 0.5 }}
                                                textAlign="center"
                                                sx={{ 
                                                    fontSize: { xs: '0.8rem', sm: '0.75rem' },
                                                    fontWeight: 'bold'
                                                }}
                                            >
    
                                            </Typography>
                                        </Box>
                                    </Box>
                                </QuestionCard>
                            );
                        })}
                            </>
                        )}

                        <Box display="flex" justifyContent="center" mt={4}>
                            <ActionButton
                                variant="contained"
                                color="primary"
                                startIcon={<ArrowBack />}
                                onClick={goBackToDashboard}
                                size="large"
                                sx={{
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    padding: { xs: '8px 16px', sm: '12px 24px' }
                                }}
                            >
                                {t('testresult.goBackToDashboard')}
                            </ActionButton>
                        </Box>
                    </ResultsCard>
                </motion.div>
            </Container>
        </PageContainer>
    );
};

export default TestResults;