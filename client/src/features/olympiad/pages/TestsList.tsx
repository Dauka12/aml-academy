import { Alert, Box, CircularProgress, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SessionCard from '../components/SessionCard.tsx';
import TestCard from '../components/TestCard.tsx';
import useExamManager from '../hooks/useExamManager.ts';
import useTestSessionManager from '../hooks/useTestSessionManager.ts';

const TestsList: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const { exams, loading: examsLoading, error: examsError, fetchAllExams } = useExamManager();
    const {
        sessions,
        loading: sessionsLoading,
        error: sessionsError,
        getStudentSessions
    } = useTestSessionManager();

    useEffect(() => {
        fetchAllExams();
        getStudentSessions();
    }, [fetchAllExams, getStudentSessions]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const isLoading = examsLoading || sessionsLoading;
    const error = examsError || sessionsError;

    const activeExams = exams.filter(exam => {
        // Check if the exam has a startTime and it's in the future or present
        if (!exam.startTime) return false;
        const examStartTime = new Date(exam.startTime);
        return examStartTime <= new Date();
    });

    // Filter exams that don't already have an active or completed session
    const availableExams = activeExams.filter(exam =>
        !sessions.some(session => session.examData.id === exam.id)
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Олимпиада - Тесты
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {isLoading ? (
                <Box display="flex" justifyContent="center" p={3}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="test tabs">
                            <Tab label="Доступные тесты" />
                            <Tab label="Мои тесты" />
                        </Tabs>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        {tabValue === 0 && (
                            <Grid container spacing={3}>
                                {availableExams.length === 0 ? (
                                    <Box width="100%" p={2}>
                                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                                            <Typography variant="body1">
                                                Нет доступных тестов в данный момент
                                            </Typography>
                                        </Paper>
                                    </Box>
                                ) : (
                                    availableExams.map(exam => (
                                        <Grid item xs={12} md={6} lg={4} key={exam.id}>
                                            <TestCard exam={exam} />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        )}

                        {tabValue === 1 && (
                            <Grid container spacing={3}>
                                {sessions.length === 0 ? (
                                    <Box width="100%" p={2}>
                                        <Paper sx={{ p: 3, textAlign: 'center' }}>
                                            <Typography variant="body1">
                                                У вас еще нет пройденных тестов
                                            </Typography>
                                        </Paper>
                                    </Box>
                                ) : (
                                    sessions.map(session => (
                                        <Grid item xs={12} md={6} lg={4} key={session.id}>
                                            <SessionCard session={session} />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        )}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default TestsList;