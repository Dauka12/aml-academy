import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Snackbar,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import type { AlertColor } from '@mui/material/Alert';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ExamForm from '../components/ExamForm.tsx';
import ExamList from '../components/ExamList.tsx';
import ExamViewer from '../components/ExamViewer.tsx';
import QuestionForm from '../components/QuestionForm.tsx';
import RegionTopStudentsTab from '../components/RegionTopStudentsTab.tsx';
import OverallStatisticsTab from '../components/OverallStatisticsTab.tsx';
import { useOlympiadDispatch, useOlympiadSelector } from '../hooks/useOlympiadStore.ts';
import { RootState } from '../store/index.ts';
import { clearError, fetchAllExams as fetchAllExamsAction, fetchExamById } from '../store/slices/examSlice.ts';
import theme from '../theme.ts'; // Adjust path as necessary
import { ExamResponse } from '../types/exam.ts';

const TAB_INDEX = {
    LIST: 0,
    CREATE: 1,
    OVERALL_STATS: 2,
    REGION_STATS: 3,
    MANAGE: 4
} as const;

const TAB_NAMES = {
    0: 'list',
    1: 'create',
    2: 'overall-statistics',
    3: 'region-statistics',
    4: 'manage'
} as const;

const TAB_INDICES = {
    'list': 0,
    'create': 1,
    'overall-statistics': 2,
    'region-statistics': 3,
    'manage': 4
} as const;

const OlympiadManager: React.FC = () => {
    const dispatch = useOlympiadDispatch();
    const { currentExam, loading, error } = useOlympiadSelector((state: RootState) => state.exam);
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize active tab from URL or default to LIST
    const getInitialTab = () => {
        const tabParam = searchParams.get('tab');
        if (tabParam && tabParam in TAB_INDICES) {
            return TAB_INDICES[tabParam as keyof typeof TAB_INDICES];
        }
        return TAB_INDEX.LIST;
    };

    const [activeTab, setActiveTab] = useState<number>(getInitialTab());
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('error');
    const [viewMode, setViewMode] = useState<'view' | 'edit'>('edit');
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchAllExamsAction());
    }, [dispatch]);

    // Sync tab with URL on load and when URL changes
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && tabParam in TAB_INDICES) {
            const tabIndex = TAB_INDICES[tabParam as keyof typeof TAB_INDICES];
            setActiveTab(tabIndex);
        }
    }, [searchParams]);

    useEffect(() => {
        // Show errors in snackbar
        if (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage(error);
            setShowSnackbar(true);
        }
    }, [error]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        // Update URL with new tab
        const tabName = TAB_NAMES[newValue as keyof typeof TAB_NAMES];
        if (tabName) {
            setSearchParams({ tab: tabName });
        }
    };

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
        dispatch(clearError());
    };

    const handleNotify = useCallback((message: string, severity: AlertColor = 'info') => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setShowSnackbar(true);
    }, []);

    const handleEditExam = (exam: ExamResponse) => {
        dispatch(fetchExamById(exam.id));
        setActiveTab(TAB_INDEX.MANAGE);
        setViewMode('edit');
        setSearchParams({ tab: 'manage' });
    };

    const handleViewExam = (exam: ExamResponse) => {
        dispatch(fetchExamById(exam.id));
        setActiveTab(TAB_INDEX.MANAGE);
        setViewMode('view');
        setSearchParams({ tab: 'manage' });
    };

    // Success handler for QuestionForm
    const handleQuestionSuccess = () => {
        if (currentExam) {
            dispatch(fetchExamById(currentExam.id));
        }
    };

    const getTabs = () => {
        const tabs = [
            <Tab label={t('manager.listofexams')} key="tab-list" />,
            <Tab label={t('manager.createofexam')} key="tab-create" />,
            <Tab label="Общая статистика" key="tab-overall" />,
            <Tab label={t('manager.regionStatsTab')} key="tab-region" />
        ];

        if (currentExam) {
            tabs.push(
                <Tab
                    label={
                        viewMode === 'view'
                            ? `${t('manager.view')} ${currentExam.nameKaz}`
                            : `${t('manager.manage')} ${currentExam.nameRus}`
                    }
                    key="tab-manage"
                />
            );
        }

        return tabs;
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)'
        }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.97)',
                            backdropFilter: 'blur(15px)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                            mb: 4
                        }}
                    >
                        <Box display="flex" alignItems="center" mb={3}>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                {t('manager.manageofOlympiad')}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            sx={{
                                mb: 3,
                                '& .MuiTab-root': {
                                    fontWeight: 600,
                                    fontSize: '1rem'
                                }
                            }}
                        >
                            {getTabs()}
                        </Tabs>

                        {/* Tab content */}
                        <Box sx={{ position: 'relative', minHeight: '400px' }}>
                            {loading && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        zIndex: 10,
                                        borderRadius: 2
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            )}

                            {/* Exams List Tab */}
                            {activeTab === TAB_INDEX.LIST && (
                                <ExamList
                                    onEditExam={handleEditExam}
                                    onViewExam={handleViewExam}
                                />
                            )}

                            {/* Create Exam Tab */}
                            {activeTab === TAB_INDEX.CREATE && (
                                <ExamForm />
                            )}

                            {/* Overall statistics tab */}
                            {activeTab === TAB_INDEX.OVERALL_STATS && (
                                <OverallStatisticsTab />
                            )}

                            {/* Region statistics tab */}
                            {activeTab === TAB_INDEX.REGION_STATS && (
                                <RegionTopStudentsTab onNotify={handleNotify} />
                            )}

                            {/* Questions Tab - Only visible when an exam is selected */}
                            {activeTab === TAB_INDEX.MANAGE && currentExam && (
                                viewMode === 'view' ? (
                                    <ExamViewer exam={currentExam} />
                                ) : (
                                    <QuestionForm
                                        testId={currentExam.id}
                                        onSuccess={handleQuestionSuccess}
                                    />
                                )
                            )}
                        </Box>
                    </Paper>
                </motion.div>
            </Container>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OlympiadManager;