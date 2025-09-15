import React from 'react';
import {
    DashboardOutlined,
    QuizOutlined
} from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../LanguageToggle.tsx';
import { DashboardView as DashboardViewType } from './DashboardSidebar';

interface DashboardViewProps {
    onViewChange: (view: DashboardViewType) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onViewChange }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <LanguageToggle/>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <DashboardOutlined sx={{ 
                            fontSize: { xs: 32, sm: 42 }, 
                            mr: 2.5, 
                            color: theme.palette.primary.main 
                        }} />
                        <Typography
                            variant={isMobile ? "h4" : "h3"}
                            sx={{
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {t('dashboard.dash')}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Typography variant={isMobile ? "h6" : "h5"} gutterBottom sx={{ 
                        fontWeight: 600, 
                        mb: 2,
                        fontSize: { xs: '1.1rem', sm: '1.5rem' }
                    }}>
                        {t('dashboard.subtitle')}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ 
                            mb: 3, 
                            fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                    >
                        {t('dashboard.results')}
                    </Typography>

                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                    >
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
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <QuizOutlined sx={{ 
                                    fontSize: { xs: 20, sm: 24 }, 
                                    mr: 2, 
                                    color: theme.palette.primary.main, 
                                    mt: 0.5 
                                }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom sx={{ 
                                        fontWeight: 600,
                                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                    }}>
                                        {t('dashboard.test')}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ 
                                            fontSize: { xs: '0.95rem', sm: '1.05rem' },
                                            mb: 2
                                        }}
                                    >
                                        {t('dashboard.testDescription')}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ 
                                            mt: 2, 
                                            borderRadius: 2, 
                                            textTransform: 'none', 
                                            fontWeight: 600,
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            py: { xs: 1, sm: 1.2 }
                                        }}
                                        onClick={() => onViewChange('tests')}
                                    >
                                        {t('dashboard.startTest')}
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </motion.div>
                </Paper>
            </motion.div>

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
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            mb: 4,
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            fontSize: { xs: '1.3rem', sm: '2rem' }
                        }}
                    >
                        {t('dashboard.events')}
                    </Typography>

                    <Box sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ 
                                fontSize: { xs: '1rem', sm: '1.1rem' }
                            }}
                        >
                            {t('dashboard.eventDescription')}
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </motion.div>
    );
};

export default DashboardView;