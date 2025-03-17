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
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTestSessionManager from '../hooks/useTestSessionManager.ts';
import { ExamResponse } from '../types/exam.ts';
import { formatDate } from '../utils/dateUtils.ts';

interface TestCardProps {
    exam: ExamResponse;
}

const TestCard: React.FC<TestCardProps> = ({ exam }) => {
    const navigate = useNavigate();
    const { startExamSession } = useTestSessionManager();
    const [isStarting, setIsStarting] = useState(false);

    const handleStartExam = async () => {
        try {
            setIsStarting(true);
            const result = await startExamSession(exam.id);

            // Navigate to the test session page
            if (result.payload && 'id' in result.payload) {
                navigate(`/olympiad/test/${result.payload.id}`);
            }
        } catch (error) {
            console.error('Failed to start exam:', error);
        } finally {
            setIsStarting(false);
        }
    };

    return (
        <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardHeader
                title={exam.nameRus}
                subheader={exam.typeRus}
                titleTypographyProps={{ variant: 'h6' }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                    <Box display="flex" alignItems="center" mb={0.5}>
                        <AccessTimeOutlined fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            Начало: {formatDate(exam.startTime)}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" pl={3.5}>
                        Продолжительность: {exam.durationInMinutes} минут
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" alignItems="center">
                    <MenuBookOutlined fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        Количество вопросов: {exam.questions?.length || 'Загрузка...'}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={isStarting ? null : <PlayArrowRounded />}
                    disabled={isStarting}
                    onClick={handleStartExam}
                    sx={{ borderRadius: 2 }}
                >
                    {isStarting ? (
                        <>
                            <LinearProgress 
                                size={20} 
                                color="inherit" 
                                sx={{ width: 20, mr: 1 }} 
                            />
                            Загрузка...
                        </>
                    ) : (
                        'Начать тест'
                    )}
                </Button>
            </CardActions>
        </Card>
    );
};

export default TestCard;