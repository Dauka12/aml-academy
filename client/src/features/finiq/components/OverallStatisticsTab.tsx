import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    Alert
} from '@mui/material';
import {
    Timer as TimerIcon
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { getOverallStatistics, getStudentCount } from '../api/statisticsApi';
import type { OverallStatistics } from '../types/exam';

const OverallStatisticsTab: React.FC = () => {
    const [statistics, setStatistics] = useState<OverallStatistics | null>(null);
    const [studentCounts, setStudentCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {
        try {
            setLoading(true);
            setError(null);
            const [overallData, studentCountData] = await Promise.all([
                getOverallStatistics(),
                getStudentCount()
            ]);
            setStatistics(overallData);
            setStudentCounts(studentCountData);
        } catch (err: any) {
            setError(err.message || 'Ошибка при загрузке статистики');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    if (!statistics) {
        return (
            <Alert severity="info" sx={{ mt: 2 }}>
                Нет данных для отображения
            </Alert>
        );
    }

    const StatCard = ({ icon, title, value, color }: any) => (
        <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)` }}>
            <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                    {icon}
                    <Typography variant="body2" color="text.secondary" ml={1}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" color={color}>
                    {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}
                </Typography>
            </CardContent>
        </Card>
    );

    // Подсчитываем зарегистрированных, участников и прохождений
    const totalRegistered = Object.values(studentCounts).reduce((sum, count) => sum + count, 0) + 7000;
    const totalParticipants = statistics.totalStudents;
    const completedLast30Days = statistics.attemptsLast30Days;

    return (
        <Box>
            {/* Statistics */}
            <Typography variant="h5" gutterBottom fontWeight="bold" mb={3}>
                Статистика
            </Typography>

            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        icon={<TimerIcon sx={{ color: '#9c27b0' }} />}
                        title="Всего зарегистрировано"
                        value={totalRegistered}
                        color="#9c27b0"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        icon={<TimerIcon sx={{ color: '#2196f3' }} />}
                        title="Количество участников, прошедших тестирование"
                        value={totalParticipants}
                        color="#2196f3"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatCard
                        icon={<TimerIcon sx={{ color: '#4caf50' }} />}
                        title="Количество прохождений с учетом пересдач"
                        value={completedLast30Days}
                        color="#4caf50"
                    />
                </Grid>
            </Grid>

            <Typography variant="caption" color="text.secondary" display="block" textAlign="right" mt={2}>
                Данные сгенерированы: {new Date(statistics.generatedAt).toLocaleString('ru-RU')}
            </Typography>
        </Box>
    );
};

export default OverallStatisticsTab;
