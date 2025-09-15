import React, { useState } from 'react';
import {
    QuizOutlined
} from '@mui/icons-material';
import {
    Alert,
    Box,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SessionCard from '../SessionCard.tsx';
import TestCard from '../TestCard.tsx';

interface TestsViewProps {
    exams: any[];
    sessions: any[];
    isLoading: boolean;
    error: string | null;
}

const TestsView: React.FC<TestsViewProps> = ({
    exams,
    sessions,
    isLoading,
    error
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.25
            }
        }
    };

    const itemVariants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 60,
                damping: 15
            }
        }
    };

    // Debug log to verify incoming exams data (remove after validation)
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.log('TestsView exams prop:', exams);
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <Paper
                    elevation={0}
                    sx={{
                        p: isMobile ? 3 : 5,
                        borderRadius: isMobile ? 4 : 6,
                        background: 'rgba(255, 255, 255, 0.97)',
                        backdropFilter: 'blur(15px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                        mb: 4
                    }}
                >
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <QuizOutlined sx={{ 
                            fontSize: { xs: 28, sm: 36 }, 
                            mr: 2, 
                            color: theme.palette.primary.main 
                        }} />
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {t('dashboard.testing')}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {isLoading ? (
                        <Box display="flex" justifyContent="center" p={3}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    variant="fullWidth"
                                    sx={{
                                        '& .MuiTab-root': {
                                            fontWeight: 600,
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            textTransform: 'none',
                                            py: 2
                                        }
                                    }}
                                >
                                    <Tab label={t('dashboard.availableTests')}/>
                                    <Tab label={t('dashboard.mytest')}/>
                                </Tabs>
                            </Box>

                            {tabValue === 0 && (
                                <>
                                    {exams.length > 0 ? (
                                        <Grid container spacing={3}>
                                            {exams.map((exam) => (
                                                <Grid item xs={12} md={6} lg={4} key={exam.id}>
                                                    <TestCard exam={exam} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Box textAlign="center" py={5}>
                                            <Typography variant="h6" color="text.secondary" sx={{
                                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                            }}>
                                                {t('dashboard.notest')}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={1} sx={{
                                                fontSize: { xs: '0.9rem', sm: '1rem' }
                                            }}>
                                                {t('dashboard.notAvailableTests')}
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            )}

                            {tabValue === 1 && (
                                <>
                                    {sessions.length > 0 ? (
                                        <Grid container spacing={3}>
                                            {sessions.map((session) => (
                                                <Grid item xs={12} md={6} lg={4} key={session.id}>
                                                    <SessionCard session={session} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Box textAlign="center" py={5}>
                                            <Typography variant="h6" color="text.secondary" sx={{
                                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                            }}>
                                                {t('dashboard.notest')}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" mt={1} sx={{
                                                fontSize: { xs: '0.9rem', sm: '1rem' }
                                            }}>
                                                {t('dashboard.notaking')}        
                                            </Typography>
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    )}
                </Paper>
            </motion.div>
        </motion.div>
    );
};

export default TestsView;