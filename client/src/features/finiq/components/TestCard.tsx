import {
    AccessTimeOutlined,
    MenuBookOutlined,
    PlayArrowRounded
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    LinearProgress,
    Typography,
    styled
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useTestSessionManager from '../hooks/useTestSessionManager.ts';
import { ExamResponse } from '../types/exam.ts';
import { formatDate } from '../utils/dateUtils.ts';


const StyledCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)'
    }
}));

const TestButton = styled(Button)(({ theme }) => ({
    borderRadius: 14,
    padding: theme.spacing(1.2, 2),
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.16)',
    }
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
    '&:last-child': {
        marginBottom: 0
    }
}));

interface TestCardProps {
    exam: ExamResponse;
}

const TestCard: React.FC<TestCardProps> = ({ exam }) => {
    const navigate = useNavigate();
    const { startExamSession } = useTestSessionManager();
    const [isStarting, setIsStarting] = useState(false);
    const { t, i18n } = useTranslation();
    const language = i18n.language || 'kz';

    const handleStartTest = async () => {
        try {
            setIsStarting(true);
            const result = await startExamSession(exam.id);

            if (result.payload && typeof result.payload === 'object' && 'id' in result.payload) {
                navigate(`/finiq/test/${result.payload.id}`);
            }
        } catch (error) {
            console.error('Failed to start exam:', error);
        } finally {
            setIsStarting(false);
        }
    };

    return (
        <StyledCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card sx={{ boxShadow: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                    title={language === 'ru' ? exam.nameRus : exam.nameKaz}
                    subheader={language === 'ru' ? exam.typeRus : exam.typeKaz}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
                    subheaderTypographyProps={{ sx: { color: 'text.secondary' } }}
                />

                <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                    <Box sx={{ mb: 2 }}>
                        <InfoItem>
                            <AccessTimeOutlined fontSize="small" color="action" sx={{ mr: 1.5, opacity: 0.7 }} />
                            <Typography variant="body2" color="text.secondary">
                                {t('cardtest.start')} {formatDate(exam.startTime)}
                            </Typography>
                        </InfoItem>

                        <InfoItem>
                            <AccessTimeOutlined fontSize="small" color="action" sx={{ mr: 1.5, opacity: 0.7 }} />
                            <Typography variant="body2" color="text.secondary">
                                {t('cardtest.duration')} {exam.durationInMinutes} минут
                            </Typography>
                        </InfoItem>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <InfoItem>
                        <MenuBookOutlined fontSize="small" color="action" sx={{ mr: 1.5, opacity: 0.7 }} />
                        <Typography variant="body2" color="text.secondary">
                            {t('cardtest.numberOfQuestions')} {exam.questions?.length || 'Загрузка...'}
                        </Typography>
                    </InfoItem>

                    <Box mt={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        {t('cardtest.status')}
                        </Typography>
                        <Box sx={{
                            display: 'inline-block',
                            py: 0.5,
                            px: 1.5,
                            borderRadius: 2,
                            bgcolor: 'info.light',
                            color: '#fff',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                        }}>
                            {t('cardtest.available')}
                        </Box>
                    </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                    <TestButton
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={isStarting ? null : <PlayArrowRounded />}
                        disabled={isStarting}
                        onClick={handleStartTest}
                    >
                        {isStarting ? (
                            <>
                                <LinearProgress
                                    color="inherit"
                                    sx={{ width: 20, mr: 1 }}
                                />
                                {t('cardtest.load')}
                            </>
                        ) : (
                            t('cardtest.startTest')
                        )}
                    </TestButton>
                </CardActions>
            </Card>
        </StyledCard>
    );
};

export default TestCard;