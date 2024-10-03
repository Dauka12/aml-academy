import React, { useEffect, useState } from 'react';
import { BuilderNavbar } from '../../../builderNavbar/BuilderNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import base_url from '../../../../../settings/base_url';
import { Box, Card, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function UserStats() {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersResponse = await axios.get(base_url + '/api/aml/auth/getData/' + id);
            setUser(usersResponse.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div>
            <BuilderNavbar />
            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Заголовок страницы */}
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    Статистика пользователя
                </Typography>

                {/* Карточка с курсами (PieChart) */}
                <Card sx={{ marginX: '20%', padding:'40px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        Курсы пользователя
                    </Typography>
                    <PieChart
                        width={400}
                        height={400}
                        series={[
                            {
                                data: [
                                    { id: 0, value: user.finished_courses || 0, label: 'Завершенные курсы' },
                                    { id: 1, value: user.process_courses || 0, label: 'Курсы в процессе' },
                                ],
                            },
                        ]}
                    />
                </Card>

                {/* Карточка с аутентификацией пользователей (BarChart) */}
                <Card sx={{ marginX: '20%', padding:'40px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        Аутентификации пользователя
                    </Typography>
                    {user.authenticated ? (
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: user.authenticated.map(item => item.date) }]}
                            series={[
                                {
                                    data: user.authenticated.map(item => item.count),
                                    label: 'Количество аутентификаций',
                                },
                            ]}
                            width={700}
                            height={400}
                        />
                    ) : (
                        <Typography>Данные по аутентификации недоступны</Typography>
                    )}
                </Card>

                {/* Карточка с регистрациями пользователей (BarChart) */}
                <Card sx={{ marginX: '20%', padding:'40px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                        Дата регистрации
                    </Typography>
                    {user.registration ? (
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: user.registration.map(item => item.date) }]}
                            series={[
                                {
                                    data: user.registration.map(item => item.count),
                                    label: 'Дата регистрации',
                                },
                            ]}
                            width={700}
                            height={400}
                        />
                    ) : (
                        <Typography>Данные по регистрации недоступны</Typography>
                    )}
                </Card>
            </Box>
        </div>
    );
}
