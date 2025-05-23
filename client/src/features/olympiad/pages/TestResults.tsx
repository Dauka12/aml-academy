import {
    ArrowBack,
    AssignmentTurnedInOutlined,
    CheckCircleOutlined,
    ErrorOutlined,
    QuizOutlined,
    TimerOutlined
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
    styled
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
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

    // Load the exam session
    useEffect(() => {
        if (!sessionId) {
            navigate('/olympiad/dashboard');
            return;
        }
        getExamSession(parseInt(sessionId));
    }, [sessionId, getExamSession, navigate]);

    const goBackToDashboard = () => {
        navigate('/olympiad/dashboard');
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

    // Map answers for easy lookup
    const answersMap = new Map(
        currentSession.examData.studentAnswer.map(answer => [answer.questionId, answer.selectedOptionId])
    );

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
                        sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#1A2751' }}
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
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h4" fontWeight="bold">
                                        {t('testresult.score')}
                                    </Typography>
                                    <Chip
                                        icon={<AssignmentTurnedInOutlined />}
                                        label={t('cardtest.completed')}
                                        color="success"
                                        variant="outlined"
                                        sx={{ borderRadius: 3, p: 0.5 }}
                                    />
                                </Box>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    {currentSession.examData.nameRus}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Box mb={4}>
                                    <StatsItem>
                                        <TimerOutlined sx={{ mr: 1.5, color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('testresult.timeStart')}
                                            </Typography>
                                            <Typography variant="body1">
                                                {formatDate(currentSession.startTime)}
                                            </Typography>
                                        </Box>
                                    </StatsItem>

                                    <StatsItem>
                                        <TimerOutlined sx={{ mr: 1.5, color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('testresult.andtime')}
                                            </Typography>
                                            <Typography variant="body1">
                                                {formatDate(currentSession.endTime)}
                                            </Typography>
                                        </Box>
                                    </StatsItem>

                                    <StatsItem>
                                        <QuizOutlined sx={{ mr: 1.5, color: 'text.secondary' }} />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('testresult.Attempted')}
                                            </Typography>
                                            <Typography variant="body1">
                                                {answeredCount} из {totalQuestions} ({completionPercentage}%)
                                            </Typography>
                                        </Box>
                                    </StatsItem>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <SummaryBox>
                                    <Typography variant="h2" color="primary" fontWeight="bold">
                                        {answeredCount}/{totalQuestions}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {t('testresult.answerquestions')}
                                    </Typography>
                                </SummaryBox>
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
                        <Typography variant="h5" gutterBottom>
                            {t('testresult.viewDetails')}
                        </Typography>
                        <Divider sx={{ mb: 3, mt: 1 }} />

                        {currentSession.examData.questions.map((question, index) => {
                            const selectedOptionId = answersMap.get(question.id);
                            const hasAnswer = answeredQuestions.has(question.id);
                            const selectedOption = question.options.find(opt => opt.id === selectedOptionId);

                            return (
                                <QuestionCard
                                    key={question.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Box flex={1}>
                                            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                                                {t('testresult.question')} {index + 1}: {language === 'ru' ? question.questionRus : question.questionKaz}
                                            </Typography>

                                            {hasAnswer ? (
                                                <Box mt={1.5}>
                                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                                        {t('testresult.answer')}
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight="500">
                                                        {language === 'ru' ? selectedOption?.nameRus : selectedOption?.nameKaz || 'Не найден вариант ответа'}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary" mt={1.5}>
                                                    {t('testresult.noAnswer')}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box ml={2}>
                                            {hasAnswer ? (
                                                <CheckCircleOutlined color="disabled" fontSize="large" />
                                            ) : (
                                                <ErrorOutlined color="error" fontSize="large" />
                                            )}
                                        </Box>
                                    </Box>
                                </QuestionCard>
                            );
                        })}

                        <Box display="flex" justifyContent="center" mt={4}>
                            <ActionButton
                                variant="contained"
                                color="primary"
                                startIcon={<ArrowBack />}
                                onClick={goBackToDashboard}
                                size="large"
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