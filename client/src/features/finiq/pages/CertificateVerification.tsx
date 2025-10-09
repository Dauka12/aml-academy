import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import { useTranslation } from 'react-i18next';
import { verifyExamSession } from '../api/examApi.ts';
import type { ExamVerificationResponse } from '../types/exam.ts';

const PageContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    alignItems: 'center'
}));

const VerificationCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: theme.spacing(5),
    boxShadow: '0 18px 48px rgba(0, 0, 0, 0.18)',
    position: 'relative',
    overflow: 'hidden'
}));

const Badge = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1, 2),
    background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.12) 0%, rgba(63, 81, 181, 0.12) 100%)',
    borderRadius: 999,
    color: theme.palette.primary.main,
    fontWeight: 600,
    width: 'fit-content'
}));

const StatCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: 20,
    backgroundColor: '#f8f9ff',
    boxShadow: 'inset 0 0 0 1px rgba(25, 118, 210, 0.08)',
    textAlign: 'center'
}));

const HighlightText = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.primary.main
}));

const DetailsBox = styled(Box)(({ theme }) => ({
    borderRadius: 20,
    background: 'rgba(26, 39, 81, 0.04)',
    padding: theme.spacing(3.5),
    marginTop: theme.spacing(3)
}));

const CertificateVerification: React.FC = () => {
    const { sessionId } = useParams<{ sessionId: string }>();
    const [data, setData] = useState<ExamVerificationResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            if (!sessionId) {
                setError(t('certificateVerification.errors.noSessionId'));
                setLoading(false);
                return;
            }

            const numericId = Number(sessionId);
            if (Number.isNaN(numericId)) {
                setError(t('certificateVerification.errors.invalidSessionId'));
                setLoading(false);
                return;
            }

            try {
                const response = await verifyExamSession(numericId);
                setData(response);
            } catch (apiError: any) {
                setError(apiError?.message || t('certificateVerification.errors.default'));
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [sessionId, t]);

    const categoryName = useMemo(() => {
        if (!data) return '';
        if (i18n.language?.startsWith('kz')) {
            return data.categoryNameKaz;
        }
        if (i18n.language?.startsWith('en')) {
            return data.categoryNameRus;
        }
        return data.categoryNameRus;
    }, [data, i18n.language]);

    const formattedStart = useMemo(() => (data ? dayjs(data.startTime).format('DD.MM.YYYY HH:mm') : ''), [data]);
    const formattedEnd = useMemo(() => (data ? dayjs(data.endTime).format('DD.MM.YYYY HH:mm') : ''), [data]);

    const formattedDuration = useMemo(() => {
        if (!data) return '';
        const minutes = data.durationMinutes;
        const days = Math.floor(minutes / (24 * 60));
        const hours = Math.floor((minutes % (24 * 60)) / 60);
        const mins = minutes % 60;

        const parts: string[] = [];
        if (days) parts.push(t('certificateVerification.duration.days', { count: days }));
        if (hours) parts.push(t('certificateVerification.duration.hours', { count: hours }));
        if (mins) parts.push(t('certificateVerification.duration.minutes', { count: mins }));

        return parts.join(' ');
    }, [data, t]);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <PageContainer>
            <Container maxWidth="md">
                {loading ? (
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" color="white" gap={2}>
                        <CircularProgress color="inherit" />
                        <Typography variant="h6">{t('certificateVerification.loading')}</Typography>
                    </Box>
                ) : error ? (
                    <VerificationCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={goBack}
                            sx={{ borderRadius: 2 }}
                        >
                            {t('certificateVerification.actions.goBack')}
                        </Button>
                    </VerificationCard>
                ) : data ? (
                    <VerificationCard
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge>
                            <VerifiedIcon />
                            {t('certificateVerification.badge')}
                        </Badge>

                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mt: 3,
                                mb: 2,
                                color: '#1A2751'
                            }}
                        >
                            {t('certificateVerification.title')}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                            {t('certificateVerification.subtitle', { sessionId })}
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <StatCard>
                                    <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <HighlightText variant="h5">
                                        {[data.lastname, data.firstname, data.middlename].filter(Boolean).join(' ')}
                                    </HighlightText>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('certificateVerification.labels.participant')}
                                    </Typography>
                                </StatCard>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatCard>
                                    <EmojiEventsIcon color="warning" sx={{ fontSize: 36, mb: 1 }} />
                                    <HighlightText variant="h6">{data.score}</HighlightText>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('certificateVerification.labels.score')}
                                    </Typography>
                                </StatCard>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatCard>
                                    <SchoolIcon color="success" sx={{ fontSize: 36, mb: 1 }} />
                                    <HighlightText variant="h6">#{data.rank}</HighlightText>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('certificateVerification.labels.rank')}
                                    </Typography>
                                </StatCard>
                            </Grid>
                        </Grid>

                        <DetailsBox>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {t('certificateVerification.labels.category')}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {categoryName}
                                    </Typography>
                                    {data.organization && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {t('certificateVerification.labels.organization')}: {data.organization}
                                        </Typography>
                                    )}
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Email: {data.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        {t('certificateVerification.labels.timeline')}
                                    </Typography>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <AccessTimeIcon color="primary" fontSize="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            {t('certificateVerification.labels.started')}: {formattedStart}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1} mt={1.5}>
                                        <AccessTimeIcon color="primary" fontSize="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            {t('certificateVerification.labels.completed')}: {formattedEnd}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1} mt={1.5}>
                                        <AccessTimeIcon color="primary" fontSize="small" />
                                        <Typography variant="body2" color="text.secondary">
                                            {t('certificateVerification.labels.duration')}: {formattedDuration}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </DetailsBox>

                        <Divider sx={{ my: 4 }} />

                        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                {t('certificateVerification.footer.disclaimer')}
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={goBack}
                                sx={{ borderRadius: 2 }}
                            >
                                {t('certificateVerification.actions.goBack')}
                            </Button>
                        </Box>
                    </VerificationCard>
                ) : null}
            </Container>
        </PageContainer>
    );
};

export default CertificateVerification;
