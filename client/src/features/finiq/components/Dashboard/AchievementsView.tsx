import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, useTheme, Divider } from '@mui/material';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DashboardView as DashboardViewType } from './DashboardSidebar';
import { useOlympiadDispatch } from '../../hooks/useOlympiadStore';
import { downloadRewardThunk } from '../../store/slices/examSlice';

interface AchievementsViewProps {
    onViewChange: (view: DashboardViewType) => void;
    certificates?: any[];
    diplomas?: any[];
    isLoading?: boolean;
}

const MotionPaper = motion(Paper);

const AchievementsView: React.FC<AchievementsViewProps> = ({
    onViewChange,
    certificates = [],
    diplomas = [],
    isLoading = false
}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch = useOlympiadDispatch();

    const [loadingCert, setLoadingCert] = useState<Record<string, boolean>>({});
    const [loadingDipl, setLoadingDipl] = useState<Record<string, boolean>>({});

    const hasAny = certificates.length > 0 || diplomas.length > 0;

    // Reuse animation pattern from TestsView
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.25 }
        }
    };
    const itemVariants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 60, damping: 15 }
        }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: { xs: 4, sm: 6 },
                        background: 'rgba(255, 255, 255, 0.97)',
                        backdropFilter: 'blur(15px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                        mb: 4
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <EmojiEventsOutlinedIcon sx={{
                            fontSize: { xs: 28, sm: 36 },
                            mr: 2,
                            color: theme.palette.primary.main
                        }} />
                        <Typography
                            variant={"h4"}
                            sx={{
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {t('dashboard.achievements', 'Достижения')}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {!hasAny && !isLoading && (
                        <Box textAlign="center" py={5}>
                            <EmojiEventsOutlinedIcon sx={{ fontSize: 56, color: theme.palette.primary.main, mb: 2 }} />
                            <Typography variant="h6" color="text.primary" sx={{
                                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                                fontWeight: 600,
                                mb: 1
                            }}>
                                {t('dashboard.noAchievementsTitle', 'Пока нет достижений')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mt={1} sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                maxWidth: 480,
                                mx: 'auto'
                            }}>
                                {t('dashboard.noAchievements', 'У вас пока нет сертификатов или дипломов. Пройдите тесты, чтобы получить первые достижения.')}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => onViewChange('tests')}
                                sx={{ mt: 3, borderRadius: 3, px: 3, textTransform: 'none', fontWeight: 600 }}
                            >
                                {t('dashboard.goToTests', 'Перейти к тестам')}
                            </Button>
                        </Box>
                    )}

                    {hasAny && (
                        <Grid container spacing={3}>
                            {certificates.map((c: any, idx) => (
                                <Grid item xs={12} sm={6} md={4} key={`cert-${idx}`}>
                                    <MotionPaper
                                        whileHover={{ y: -6 }}
                                        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                                        elevation={0}
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 3,
                                            border: '1px solid #e3e9ef',
                                            background: '#fff',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            height: '100%'
                                        }}
                                    >
                                        <SchoolOutlinedIcon color="primary" />
                                        <Typography fontWeight={600} fontSize={14}>
                                            {c.title || t('dashboard.certificate', 'Сертификат')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {c.date || '—'}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<DownloadIcon />}
                                            sx={{ mt: 'auto', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                                            disabled={loadingCert[c.sessionId]}
                                            onClick={async () => {
                                                if (!c.blobUrl) {
                                                    setLoadingCert(prev => ({ ...prev, [c.sessionId]: true }));
                                                    try {
                                                        const blobUrl = await dispatch(downloadRewardThunk({ sessionId: c.sessionId, rewardType: 'certificate' }));
                                                        const a = document.createElement('a');
                                                        a.href = blobUrl;
                                                        a.download = `certificate-${c.sessionId}.pdf`;
                                                        a.click();
                                                    } catch (error) {
                                                        console.error('Download failed:', error);
                                                    } finally {
                                                        setLoadingCert(prev => ({ ...prev, [c.sessionId]: false }));
                                                    }
                                                } else {
                                                    const a = document.createElement('a');
                                                    a.href = c.blobUrl;
                                                    a.download = `certificate-${c.sessionId}.pdf`;
                                                    a.click();
                                                }
                                            }}
                                        >
                                            {loadingCert[c.sessionId] ? t('dashboard.loading', 'Загрузка...') : t('dashboard.downloadAgain', 'Скачать')}
                                        </Button>
                                    </MotionPaper>
                                </Grid>
                            ))}
                            {diplomas.map((d: any, idx) => (
                                <Grid item xs={12} sm={6} md={4} key={`dipl-${idx}`}>
                                    <MotionPaper
                                        whileHover={{ y: -6 }}
                                        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                                        elevation={0}
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 3,
                                            border: '1px solid #e3e9ef',
                                            background: '#fff',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            height: '100%'
                                        }}
                                    >
                                        <EmojiEventsOutlinedIcon color="warning" />
                                        <Typography fontWeight={600} fontSize={14}>
                                            {d.title || t('dashboard.diploma', 'Диплом')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {d.place ? t('dashboard.place', '{{place}} место', { place: d.place }) : d.date || '—'}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<DownloadIcon />}
                                            sx={{ mt: 'auto', textTransform: 'none', fontWeight: 600, borderRadius: 2 }}
                                            disabled={loadingDipl[d.sessionId]}
                                            onClick={async () => {
                                                if (!d.blobUrl) {
                                                    setLoadingDipl(prev => ({ ...prev, [d.sessionId]: true }));
                                                    try {
                                                        const blobUrl = await dispatch(downloadRewardThunk({ sessionId: d.sessionId, rewardType: 'diploma' }));
                                                        const a = document.createElement('a');
                                                        a.href = blobUrl;
                                                        a.download = `diploma-${d.sessionId}.pdf`;
                                                        a.click();
                                                    } catch (error) {
                                                        console.error('Download failed:', error);
                                                    } finally {
                                                        setLoadingDipl(prev => ({ ...prev, [d.sessionId]: false }));
                                                    }
                                                } else {
                                                    const a = document.createElement('a');
                                                    a.href = d.blobUrl;
                                                    a.download = `diploma-${d.sessionId}.pdf`;
                                                    a.click();
                                                }
                                            }}
                                        >
                                            {loadingDipl[d.sessionId] ? t('dashboard.loading', 'Загрузка...') : (d.blobUrl ? t('dashboard.downloadAgain', 'Скачать') : t('dashboard.get', 'Получить'))}
                                        </Button>
                                    </MotionPaper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Paper>
            </motion.div>
        </motion.div>
    );
};

export default AchievementsView;
