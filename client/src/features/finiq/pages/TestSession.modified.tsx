import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, styled, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import useTestSessionManager from '../hooks/useTestSessionManager';

const PageContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    userSelect: 'none', // Disable text selection
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
}));

const StyledPaper = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
}));

const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: 14,
    padding: theme.spacing(1.2, 3),
    fontWeight: 600,
    textTransform: 'none',
}));

const LanguageButton = styled(Button)(({ theme }) => ({
    minWidth: 48,
    height: 48,
    borderRadius: 24,
    padding: theme.spacing(1),
    fontWeight: 600,
    border: '2px solid',
    marginRight: theme.spacing(1),
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
    },
}));

const TestSession = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const {
        currentSession,
        loading,
        error,
        getExamSession,
        endExamSession,
        updateAnswer,
        isExamActive
    } = useTestSessionManager();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [confirmEndOpen, setConfirmEndOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [autoSubmitWarning, setAutoSubmitWarning] = useState(false);
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language); // Default language

    // Handle language toggle between Kazakh and Russian
    const toggleLanguage = () => {
        const newLanguage = language === 'ru' ? 'kz' : 'ru';
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    // Add a state to store the expected duration
    const [expectedDuration, setExpectedDuration] = useState(null);
    // Add a state for the remaining time that updates independently
    const [remainingTime, setRemainingTime] = useState(0);
    // Use a ref to store the interval for independent timer updates
    const timerIntervalRef = useRef(null);

    // Define handleEndExam first, before any useEffect that uses it
    const handleEndExam = useCallback(async () => {
        if (!sessionId || !currentSession) return;

        try {
            setIsSubmitting(true);
            await endExamSession(parseInt(sessionId));
            navigate('/finiq/test-results/' + sessionId);
        } catch (error) {
            console.error('Failed to end exam:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [sessionId, currentSession, endExamSession, navigate]);

    // Load the exam session
    useEffect(() => {
        if (!sessionId) {
            navigate('/finiq/dashboard');
            return;
        }
        getExamSession(parseInt(sessionId));
    }, [sessionId, getExamSession, navigate]);

    // Auto-submit when time runs out and setup duration
    useEffect(() => {
        if (!currentSession) return;

        // Extract duration from test data if available, or default to 100 minutes
        const testDurationMinutes = currentSession.examData?.durationInMinutes || 100;
        setExpectedDuration(testDurationMinutes);

        console.log('---- Test Session Time Check ----');
        console.log('Current session ID:', sessionId);
        console.log('Current date/time:', new Date().toLocaleString());
        console.log('Expected test duration (minutes):', testDurationMinutes);
        console.log('Session data:', {
            id: currentSession.id,
            startTime: new Date(currentSession.startTime).toLocaleString(),
            endTime: currentSession.endTime ? new Date(currentSession.endTime).toLocaleString() : 'Not ended'
        });
    }, [currentSession, sessionId]);

    // Set up independent timer that updates every second
    useEffect(() => {
        if (!currentSession || !expectedDuration) return;

        // Initial calculation
        const calculateRemainingTime = () => {
            if (!currentSession.endTime) {
                // If no end time is set, calculate based on start time + duration
                const startTime = new Date(currentSession.startTime);
                const endTime = new Date(startTime.getTime() + expectedDuration * 60000); // minutes to milliseconds
                const now = new Date();
                const remainingMs = endTime.getTime() - now.getTime();
                
                // If time's up, auto-submit
                if (remainingMs <= 0) {
                    setAutoSubmitWarning(true);
                    // Give a brief moment for the warning to display
                    setTimeout(() => {
                        handleEndExam();
                    }, 2000);
                }
                
                return Math.max(0, Math.floor(remainingMs / 1000));
            } else {
                const endTime = new Date(currentSession.endTime);
                const now = new Date();
                return Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));
            }
        };

        // Set initial value
        setRemainingTime(calculateRemainingTime());

        // Update time every second
        timerIntervalRef.current = setInterval(() => {
            const newRemainingTime = calculateRemainingTime();
            setRemainingTime(newRemainingTime);
            
            // Show warning when 5 minutes remaining
            if (newRemainingTime === 300) {
                // Alert user about 5 minutes remaining
                console.log('5 minutes remaining!');
            }
        }, 1000);

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [currentSession, expectedDuration, handleEndExam]);

    // Return to dashboard if the exam is completed or doesn't exist
    useEffect(() => {
        if ((!loading && !currentSession) || (currentSession && !isExamActive() && currentSession.endTime)) {
            navigate('/finiq/dashboard');
        }
    }, [currentSession, loading, isExamActive, navigate, sessionId]);

    const handleNextQuestion = () => {
        if (currentSession && currentQuestionIndex < currentSession.examData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSelectOption = (questionId, optionId) => {
        if (sessionId && currentSession) {
            updateAnswer(parseInt(sessionId), questionId, optionId);
        }
    };

    const handleOpenConfirmEnd = () => {
        setConfirmEndOpen(true);
    };

    const handleCloseConfirmEnd = () => {
        setConfirmEndOpen(false);
    };

    const getCurrentQuestion = () => {
        return currentSession?.examData.questions[currentQuestionIndex] || null;
    };

    const getSelectedOption = (questionId) => {
        if (!currentSession) return null;
        
        // Find selected option from answers
        const answer = currentSession.examData.studentAnswer.find(
            answer => answer.questionId === questionId
        );
        
        return answer ? answer.selectedOptionId : null;
    };

    const getAnsweredCount = () => {
        if (!currentSession || !currentSession.examData.studentAnswer) return 0;
        
        return new Set(
            currentSession.examData.studentAnswer.map(answer => answer.questionId)
        ).size;
    };

    if (loading || !currentSession) {
        return (
            <PageContainer>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '80vh'
                }}>
                    <Typography variant="h5" color="white">
                        {t('test.loading')}...
                    </Typography>
                </Box>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '80vh',
                    gap: 2
                }}>
                    <Typography variant="h5" color="error">
                        {t('test.errorLoading')}
                    </Typography>
                    <Typography color="white">{error}</Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/finiq/dashboard')}
                    >
                        {t('test.returnToDashboard')}
                    </Button>
                </Box>
            </PageContainer>
        );
    }

    const currentQuestion = getCurrentQuestion();
    const totalQuestions = currentSession.examData.questions.length;
    const answeredCount = getAnsweredCount();

    // Render everything else as before
    // (I've removed the implementation details to keep this focused on the core changes)
    
    return (
        <PageContainer>
            {/* Your existing UI implementation would go here */}
            <Typography variant="h4" color="white" align="center">
                Test Session UI would render here
            </Typography>
        </PageContainer>
    );
};

export default TestSession;