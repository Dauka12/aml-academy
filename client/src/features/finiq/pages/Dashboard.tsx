import {
    ChevronLeftOutlined,
    MenuOutlined
} from '@mui/icons-material';
import {
    Box,
    IconButton,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useExamManager from '../hooks/useExamManager.ts';
import { useOlympiadDispatch, useOlympiadSelector } from '../hooks/useOlympiadStore';
import useTestSessionManager from '../hooks/useTestSessionManager.ts';
import { RootState } from '../store';
import { logoutUser } from '../store/slices/authSlice.ts';
import { DashboardSidebar, DashboardContent, DashboardViewType } from '../components/Dashboard';

const ToggleButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
}));

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const { user } = useOlympiadSelector((state: RootState) => state.auth);
    const dispatch = useOlympiadDispatch();
    const navigate = useNavigate();

    const [currentView, setCurrentView] = useState<DashboardViewType>('dashboard');
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Initialize sidebar state based on device type
    const [open, setOpen] = useState(() => !isMobile);

    // Get exams and sessions data
    const { exams, loading: examsLoading, error: examsError, fetchAllExams } = useExamManager();
    const {
        sessions,
        loading: sessionsLoading,
        error: sessionsError,
        getStudentSessions
    } = useTestSessionManager();

    // Update sidebar state when device type changes
    React.useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    const handleDrawerToggle = () => {
        // Simple invert without premature auto-close; actual auto-close on mobile
        // is handled inside the sidebar when a menu item is selected.
        setOpen(prev => !prev);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/finiq/login');
    };

    const handleViewChange = (view: DashboardViewType) => {
        setCurrentView(view);
    };

    useEffect(() => {
        // Load tests data
        fetchAllExams();
        getStudentSessions();
    }, [fetchAllExams, getStudentSessions]);

    if (!user) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
                color: 'white'
            }}>
                <Typography variant={isMobile ? "h6" : "h5"}>Загрузка...</Typography>
            </Box>
        );
    }

    // Filter exams for test list
    const isLoading = examsLoading || sessionsLoading;
    const error = examsError || sessionsError;

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)'
        }}>
            {/* Background effect */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, transparent 20%, #1A2751 80%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Toggle Drawer Button */}
            <Box sx={{ position: 'fixed', top: isMobile ? 10 : 20, left: isMobile ? 10 : 20, zIndex: 1300 }}>
                <motion.div>
                    <ToggleButton
                        onClick={handleDrawerToggle}
                        size="large"
                    >
                        {open ? <ChevronLeftOutlined /> : <MenuOutlined />}
                    </ToggleButton>
                </motion.div>
            </Box>

            {/* Sidebar */}
            <DashboardSidebar
                open={open}
                onClose={() => setOpen(false)}
                currentView={currentView}
                onViewChange={handleViewChange}
                onLogout={handleLogout}
            />

            {/* Content */}
            <DashboardContent
                open={open}
                currentView={currentView}
                onViewChange={handleViewChange}
                exams={exams}
                sessions={sessions}
                isLoading={isLoading}
                error={error}
            />
        </Box>
    );
};

export default Dashboard;