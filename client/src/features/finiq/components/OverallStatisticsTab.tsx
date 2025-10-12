import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import {
    Timer as TimerIcon
} from '@mui/icons-material';
import React, { useEffect, useState, useRef } from 'react';
import { getOverallStatistics, getStudentCount } from '../api/statisticsApi';
import type { OverallStatistics } from '../types/exam';

const OverallStatisticsTab: React.FC = () => {
    const [statistics, setStatistics] = useState<OverallStatistics | null>(null);
    const [studentCounts, setStudentCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        // Первая загрузка данных
        loadStatistics();

        // Запускаем интервал для обновления каждые 5 секунд
        intervalRef.current = setInterval(() => {
            loadStatistics();
        }, 5000);

        // Очищаем интервал при размонтировании
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const loadStatistics = async () => {
        try {
            setIsUpdating(true);
            setError(null);
            
            // Загружаем оба запроса параллельно и ждем завершения обоих
            const [overallData, studentCountData] = await Promise.all([
                getOverallStatistics(),
                getStudentCount()
            ]);
            
            // Обновляем данные только после того, как оба запроса завершены
            setStatistics(overallData);
            setStudentCounts(studentCountData);
            setLoading(false);
        } catch (err: any) {
            setError(err.message || 'Ошибка при загрузке статистики');
            setLoading(false);
        } finally {
            setIsUpdating(false);
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
    const totalRegistered = Object.values(studentCounts).reduce((sum, count) => sum + count, 0);
    const totalParticipants = statistics.totalStudents;
    const completedLast30Days = statistics.attemptsLast30Days;

    return (
        <Box>
            {/* Statistics */}
            <Typography variant="h5" gutterBottom fontWeight="bold" mb={3}>
                Статистика
                {isUpdating && (
                    <CircularProgress size={20} sx={{ ml: 2, verticalAlign: 'middle' }} />
                )}
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

            {/* Regional Statistics Tables */}
            <Grid container spacing={3} mb={4}>
                {/* Unique Attempts by Region */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" mb={2}>
                        Уникальные попытки по регионам
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: 900 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>№</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Регион</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Количество</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statistics.uniqueAttemptsByRegion?.map((region, index) => (
                                    <TableRow 
                                        key={region.regionName}
                                        sx={{ 
                                            '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                            '&:hover': { backgroundColor: '#f0f0f0' }
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{region.regionName}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                                            {region.count.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!statistics.uniqueAttemptsByRegion || statistics.uniqueAttemptsByRegion.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            <Typography color="text.secondary">Нет данных</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* All Attempts by Region */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" mb={2}>
                        Все попытки по регионам (с пересдачами)
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: 900 }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>№</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Регион</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Количество</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statistics.attemptsByRegion?.map((region, index) => (
                                    <TableRow 
                                        key={region.regionName}
                                        sx={{ 
                                            '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                            '&:hover': { backgroundColor: '#f0f0f0' }
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{region.regionName}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                            {region.count.toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {(!statistics.attemptsByRegion || statistics.attemptsByRegion.length === 0) && (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            <Typography color="text.secondary">Нет данных</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OverallStatisticsTab;
