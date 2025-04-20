import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import TranslateIcon from '@mui/icons-material/Translate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    styled,
    Tooltip,
    Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import TestNavigationPanel from '../components/TestNavigationPanel.tsx';
import TestQuestion from '../components/TestQuestion.tsx';
import TestTimer from '../components/TestTimer.tsx';
import useTestSessionManager from '../hooks/useTestSessionManager.ts';

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

const BoundaryContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    border: '2px solid #f5b207',
    borderRadius: '28px',
    padding: theme.spacing(2),
    margin: '0 auto',
    boxShadow: '0 0 10px rgba(245, 178, 7, 0.3)',
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

const WarningDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 16,
        borderLeft: '8px solid #f44336',
        maxWidth: 450,
    },
    '& .MuiDialogTitle-root': {
        backgroundColor: '#fff3f0',
    },
    '& .MuiDialogContent-root': {
        backgroundColor: '#f9f9f9', // Light gray-white background for better text readability
        borderRadius: 16,
        marginTop: theme.spacing(2),
        padding: theme.spacing(2, 3),
    }
}));

const CountdownCircle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: '#ffebee',
    border: '4px solid #f44336',
    margin: '0 auto 16px auto',
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

const TestSession: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const {
        currentSession,
        loading,
        error,
        getExamSession,
        endExamSession,
        updateAnswer,
        isExamActive,
        getRemainingTime
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

    // New state for mouse boundary tracking with countdown
    const [isMouseOutside, setIsMouseOutside] = useState(false);
    const [mouseWarningOpen, setMouseWarningOpen] = useState(false);
    const [countdownSeconds, setCountdownSeconds] = useState(10);
    const mouseOutsideTimerRef = useRef<NodeJS.Timeout | null>(null);
    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const boundaryRef = useRef<HTMLDivElement>(null);

    // Add a state to store the expected duration
    const [expectedDuration, setExpectedDuration] = useState<number | null>(null);
    // Add a state for the remaining time that updates independently
    const [remainingTime, setRemainingTime] = useState<number>(0);
    // Use a ref to store the interval for independent timer updates
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Define handleEndExam first, before any useEffect that uses it
    const handleEndExam = useCallback(async () => {
        if (!sessionId || !currentSession) return;

        try {
            setIsSubmitting(true);
            await endExamSession(parseInt(sessionId));
            navigate('/olympiad/test-results/' + sessionId);
        } catch (error) {
            console.error('Failed to end exam:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [sessionId, currentSession, endExamSession, navigate]);

    // Load the exam session
    useEffect(() => {
        if (!sessionId) {
            navigate('/olympiad/dashboard');
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
            endTime: new Date(currentSession.endTime).toLocaleString()
        });
    }, [currentSession, sessionId]);

    // Set up independent timer that updates every second
    useEffect(() => {
        if (!currentSession || !expectedDuration) return;

        // Initial calculation
        const calculateRemainingTime = () => {
            const startTimeMs = new Date(currentSession.startTime).getTime();
            const nowMs = new Date().getTime();
            const elapsedMs = nowMs - startTimeMs;
            const elapsedMinutes = Math.floor(elapsedMs / (60 * 1000));
            const remainingMinutes = Math.max(0, expectedDuration - elapsedMinutes);
            return Math.max(0, remainingMinutes * 60); // Convert to seconds
        };

        // Set initial value
        setRemainingTime(calculateRemainingTime());

        // Create interval for consistent updates
        timerIntervalRef.current = setInterval(() => {
            const timeRemaining = calculateRemainingTime();
            setRemainingTime(timeRemaining);
            
            // Auto-submit when time runs out
            if (timeRemaining <= 0) {
                console.log('Time expired, ending exam');
                handleEndExam();
                if (timerIntervalRef.current) {
                    clearInterval(timerIntervalRef.current);
                }
            }
            
            // Show warning when 60 seconds remain
            if (timeRemaining <= 60 && timeRemaining > 0) {
                setAutoSubmitWarning(true);
            } else {
                setAutoSubmitWarning(false);
            }
        }, 1000); // Update every second

        // Clean up
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [currentSession, expectedDuration, handleEndExam]);

    // Return to dashboard if the exam is completed or doesn't exist
    useEffect(() => {
        if (!loading && currentSession && !isExamActive()) {
            console.log('Exam is no longer active, redirecting to results');
            navigate('/olympiad/test-results/' + sessionId);
        }
    }, [currentSession, loading, isExamActive, navigate, sessionId]);

    // Handle mouse movement and boundary checking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!boundaryRef.current) return;

            const boundaryRect = boundaryRef.current.getBoundingClientRect();
            const isOutside =
                e.clientX < boundaryRect.left ||
                e.clientX > boundaryRect.right ||
                e.clientY < boundaryRect.top ||
                e.clientY > boundaryRect.bottom;

            if (isOutside && !isMouseOutside) {
                setIsMouseOutside(true);
                setMouseWarningOpen(true);
                setCountdownSeconds(10);

                // Clear any existing intervals first
                if (countdownIntervalRef.current) {
                    clearInterval(countdownIntervalRef.current);
                }

                // Start countdown interval
                countdownIntervalRef.current = setInterval(() => {
                    setCountdownSeconds((prev) => {
                        const newValue = prev - 1;
                        if (newValue <= 0) {
                            if (countdownIntervalRef.current) {
                                clearInterval(countdownIntervalRef.current);
                            }
                            return 0;
                        }
                        return newValue;
                    });
                }, 1000);

                // Set a timer to close exam if mouse stays outside
                if (mouseOutsideTimerRef.current) {
                    clearTimeout(mouseOutsideTimerRef.current);
                }
                mouseOutsideTimerRef.current = setTimeout(() => {
                    if (isMouseOutside) {
                        handleEndExam();
                    }
                }, 10000);

            } else if (!isOutside && isMouseOutside) {
                setIsMouseOutside(false);
                setMouseWarningOpen(false);

                // Clear the timers if mouse returns
                if (mouseOutsideTimerRef.current) {
                    clearTimeout(mouseOutsideTimerRef.current);
                    mouseOutsideTimerRef.current = null;
                }

                if (countdownIntervalRef.current) {
                    clearInterval(countdownIntervalRef.current);
                    countdownIntervalRef.current = null;
                }
            }
        };

        // Prevent copying text
        const preventCopy = (e: ClipboardEvent | MouseEvent) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('copy', preventCopy as EventListener);
        document.addEventListener('cut', preventCopy as EventListener);
        document.addEventListener('paste', preventCopy as EventListener);
        document.addEventListener('contextmenu', preventCopy);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('copy', preventCopy as EventListener);
            document.removeEventListener('cut', preventCopy as EventListener);
            document.removeEventListener('paste', preventCopy as unknown as EventListener);
            document.removeEventListener('contextmenu', preventCopy);

            if (mouseOutsideTimerRef.current) {
                clearTimeout(mouseOutsideTimerRef.current);
            }

            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
            }
        };
    }, [isMouseOutside, handleEndExam]);

    // Handle the countdown independently
    useEffect(() => {
        if (isMouseOutside && countdownSeconds > 0) {
            const id = setTimeout(() => {
                setCountdownSeconds(prev => Math.max(prev - 1, 0));
            }, 1000);

            return () => clearTimeout(id);
        }
        if( countdownSeconds === 0) {
            handleEndExam();
        }
    }, [isMouseOutside, countdownSeconds]);

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

    const handleSelectOption = (questionId: number, optionId: number) => {
        if (!currentSession) return;
        updateAnswer(currentSession.id, questionId, optionId);
    };

    const handleOpenConfirmEnd = () => {
        setConfirmEndOpen(true);
    };

    const handleCloseConfirmEnd = () => {
        setConfirmEndOpen(false);
    };

    const getCurrentQuestion = () => {
        return currentSession?.examData.questions[currentQuestionIndex];
    };

    // Get the selected answer for current question
    const getSelectedOption = (questionId: number) => {
        if (!currentSession) return null;
        const answer = currentSession.examData.studentAnswer.find(
            answer => answer.questionId === questionId
        );
        return answer ? answer.selectedOptionId : null;
    };

    // Get answered questions count
    const getAnsweredCount = () => {
        if (!currentSession) return 0;
        const uniqueAnsweredQuestions = new Set(
            currentSession.examData.studentAnswer.map(answer => answer.questionId)
        );
        return uniqueAnsweredQuestions.size;
    };

    if (loading || !currentSession) {
        return (
            <PageContainer>
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress size={60} sx={{ color: 'white' }} />
                </Box>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <StyledPaper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Paper elevation={0}>
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                            <Button sx={{ mt: 2 }} onClick={() => navigate('/olympiad/dashboard')}>
                                {t('session.backToDashboard')}
                            </Button>
                        </Paper>
                    </StyledPaper>
                </Container>
            </PageContainer>
        );
    }

    const currentQuestion = getCurrentQuestion();
    const totalQuestions = currentSession.examData.questions.length;
    const answeredCount = getAnsweredCount();

    // Enhance the warning dialog with a pulsating effect for more emphasis
    const pulseAnimation = {
        scale: [1, 1.03, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };
    

    return (
        <PageContainer>
            <Container maxWidth="lg">
                <BoundaryContainer ref={boundaryRef}>
                    <StyledPaper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Paper elevation={0}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="h5" component="h1" fontWeight="600">
                                        {language === 'ru' ? currentSession.examData.nameRus : currentSession.examData.nameKaz }
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {language === 'ru' ? currentSession.examData.typeRus : currentSession.examData.typeKaz }
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                                        <Tooltip title={language === 'ru' ? 'Переключить на казахский' : 'Орыс тіліне ауысу'}>
                                            <LanguageButton 
                                                variant="outlined"
                                                color="primary"
                                                onClick={toggleLanguage}
                                                aria-label="Toggle language"
                                            >
                                                <TranslateIcon sx={{ mr: 0.5 }} fontSize="small" />
                                                {language.toUpperCase()}
                                            </LanguageButton>
                                        </Tooltip>
                                        <TestTimer remainingSeconds={remainingTime} onTimeExpired={handleEndExam} />
                                    </Box>
                                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                                        {t('session.Attempted')} {answeredCount} {t('session.from')} {totalQuestions}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </StyledPaper>

                    {autoSubmitWarning && (
                        <Alert severity="warning" sx={{ mb: 3, borderRadius: 3, boxShadow: '0 6px 20px rgba(255, 152, 0, 0.15)' }}>
                            {t('session.attention')}
                        </Alert>
                    )}

                    {currentQuestion && (
                        <StyledPaper
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <Paper elevation={0}>
                                <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
                                {t('session.question')}  {currentQuestionIndex + 1} {t('session.from')} {totalQuestions}
                                </Typography>

                                <TestQuestion
                                    question={currentQuestion}
                                    selectedOptionId={getSelectedOption(currentQuestion.id)}
                                    onSelectOption={handleSelectOption}
                                />

                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                                    <ActionButton
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon />}
                                        disabled={currentQuestionIndex === 0}
                                        onClick={handlePrevQuestion}
                                        sx={{ borderRadius: 3 }}
                                    >
                                        {t('session.previous')}
                                    </ActionButton>

                                    {currentQuestionIndex < totalQuestions - 1 ? (
                                        <ActionButton
                                            variant="outlined"
                                            color="primary"
                                            endIcon={<ArrowForwardIcon />}
                                            onClick={handleNextQuestion}
                                            sx={{ borderRadius: 3 }}
                                        >
                                            {t('session.next')}
                                        </ActionButton>
                                    ) : (
                                        <ActionButton
                                            variant="contained"
                                            color="primary"
                                            endIcon={<CheckIcon />}
                                            onClick={handleOpenConfirmEnd}
                                            sx={{ borderRadius: 3 }}
                                        >
                                            {t('session.finish')}
                                        </ActionButton>
                                    )}
                                </Box>
                            </Paper>
                        </StyledPaper>
                    )}

                    <StyledPaper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <Paper elevation={0}>
                            <TestNavigationPanel
                                questions={currentSession.examData.questions}
                                currentIndex={currentQuestionIndex}
                                answers={currentSession.examData.studentAnswer}
                                onQuestionSelect={(index) => setCurrentQuestionIndex(index)}
                            />

                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <ActionButton
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={handleOpenConfirmEnd}
                                    disabled={isSubmitting}
                                    sx={{
                                        borderRadius: 3,
                                        px: 6,
                                        py: 1.5,
                                        boxShadow: '0 8px 16px rgba(245, 178, 7, 0.2)'
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24} /> : t('session.finishTest')}
                                </ActionButton>
                            </Box>
                        </Paper>
                    </StyledPaper>
                </BoundaryContainer>

                <Dialog
                    open={confirmEndOpen}
                    onClose={handleCloseConfirmEnd}
                    PaperProps={{
                        sx: {
                            borderRadius: 4,
                            boxShadow: '0 24px 38px rgba(0, 0, 0, 0.14)'
                        }
                    }}
                >
                    <DialogTitle>{t('session.finishTest')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('session.finishTestDescription')}  {totalQuestions}  {t('session.from')} {answeredCount} {t('session.quest')}
                            
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ pb: 3, pr: 3 }}>
                        <Button
                            onClick={handleCloseConfirmEnd}
                            color="error"
                            variant="contained"
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                            {t('session.cancel')}
                        </Button>
                        <Button
                            onClick={handleEndExam}
                            variant="contained"
                            color="primary"
                            autoFocus
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500 }}
                        >
                            {t('session.finish')}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Enhanced mouse boundary warning with countdown */}
                <WarningDialog
                    open={mouseWarningOpen}
                    disableEscapeKeyDown
                    hideBackdrop={false}
                    PaperComponent={motion.div}
                    PaperProps={{
                        initial: { opacity: 0, y: -20 },
                        animate: { opacity: 1, y: 0 },
                        transition: { type: "spring", stiffness: 300, damping: 25 }
                    }}
                >
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#ffebee' }}>
                        <WarningAmberIcon color="error" />
                        <Typography variant="h6">
                            {t('session.mouseWarningTitle')}
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <motion.div animate={pulseAnimation}>
                                <CountdownCircle>
                                    <Typography variant="h3" component="div" color="error" fontWeight="bold">
                                        {countdownSeconds}
                                    </Typography>
                                </CountdownCircle>
                            </motion.div>

                            <TimerIcon color="error" sx={{ mr: 1 }} />
                            <Typography variant="subtitle1" color="error" component="span" fontWeight="bold">
                                {t('session.countdownWarning')}
                            </Typography>
                        </Box>

                        <DialogContentText color="error.dark">
                            {t('session.mouseWarningDetail')}
                        </DialogContentText>

                        <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                            {t('session.mouseWarningAction')}
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 2 }}>
                            {t('session.mouseWarningConsequence')}
                              
                        </Typography>
                    </DialogContent>
                </WarningDialog>
            </Container>
        </PageContainer>
    );
};

export default TestSession;