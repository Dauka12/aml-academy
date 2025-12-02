import React, { useEffect, useState } from 'react';
import { BuilderNavbar } from '../../../builderNavbar/BuilderNavbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import base_url from '../../../../../settings/base_url';
import { Box, Card, Typography, TextField, Grid, Button, Snackbar, Alert } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function UserStats() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [courses, setCourses] = useState([]);
    const [certs, setCerts] = useState([]);
    const [details, setDetails] = useState({ firstname: '', lastname: '', patronymic: '', email: '', phone_number: '', member_of_the_system: '', type_of_member: '', job_name: '', password: '' });
    const [notify, setNotify] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const statsResponse = await axios.get(base_url + '/api/aml/auth/getData/' + id);
            setUser(statsResponse.data);
            const coursesResp = await axios.get(base_url + `/api/aml/course/admin/user/${id}/courses`);
            setCourses(coursesResp.data || []);
            const certsResp = await axios.get(base_url + `/api/aml/course/admin/user/${id}/certificates`);
            setCerts(certsResp.data || []);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const loadDetails = async () => {
        try {
            const res = await axios.get(base_url + `/api/aml/auth/users/${id}`);
            const found = res.data;
            if (found) {
                setDetails({
                    firstname: found.firstname || '',
                    lastname: found.lastname || '',
                    patronymic: found.patronymic || '',
                    email: found.email || '',
                    phone_number: found.phone_number || '',
                    member_of_the_system: found.member_of_the_system || '',
                    type_of_member: found.type_of_member || '',
                    job_name: found.job_name || '',
                    password: ''
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => { loadDetails(); }, [id]);

    const saveDetails = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const body = { user_id: Number(id), ...details };
            await axios.patch(base_url + '/api/aml/auth/change_user', body, { headers: { Authorization: `Bearer ${token}` } });
            setNotify({ open: true, message: 'Данные пользователя обновлены', severity: 'success' });
        } catch (e) {
            setNotify({ open: true, message: 'Ошибка обновления', severity: 'error' });
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

                <Card sx={{ marginX: '10%', padding: '24px' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Данные пользователя</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}><TextField fullWidth label="Имя" value={details.firstname} onChange={e => setDetails(d => ({...d, firstname: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={4}><TextField fullWidth label="Фамилия" value={details.lastname} onChange={e => setDetails(d => ({...d, lastname: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={4}><TextField fullWidth label="Отчество" value={details.patronymic} onChange={e => setDetails(d => ({...d, patronymic: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={6}><TextField fullWidth label="Email" value={details.email} onChange={e => setDetails(d => ({...d, email: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={6}><TextField fullWidth label="Телефон" value={details.phone_number} onChange={e => setDetails(d => ({...d, phone_number: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={4}><TextField fullWidth label="СФМ" value={details.member_of_the_system} onChange={e => setDetails(d => ({...d, member_of_the_system: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={4}><TextField fullWidth label="Тип участника" value={details.type_of_member} onChange={e => setDetails(d => ({...d, type_of_member: e.target.value}))} /></Grid>
                        <Grid item xs={12} md={4}><TextField fullWidth label="Должность" value={details.job_name} onChange={e => setDetails(d => ({...d, job_name: e.target.value}))} /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Новый пароль" type="password" value={details.password} onChange={e => setDetails(d => ({...d, password: e.target.value}))} /></Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={saveDetails}>Сохранить изменения</Button>
                    </Box>
                </Card>

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
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {courses.map((c, idx) => (
                            <Grid item xs={12} md={6} key={idx}>
                                <Box sx={{ p:2, border:'1px solid #e5e7eb', borderRadius:2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight:600 }}>{c.courseDTO?.course_name}</Typography>
                                    <Typography variant="body2" color="text.secondary">Статус: {c.paymentInfo?.status || '—'}</Typography>
                                    <Typography variant="body2" color="text.secondary">Оплачено: {c.paymentInfo?.payment_date ? new Date(c.paymentInfo.payment_date).toLocaleDateString('ru-RU') : '—'}</Typography>
                                    {typeof c.paymentInfo?.days_left === 'number' && (
                                        <Typography variant="body2" color="warning.main">Осталось {c.paymentInfo.days_left} дней</Typography>
                                    )}
                                </Box>
                            </Grid>
                        ))}
                        {courses.length === 0 && (
                            <Grid item xs={12}><Typography color="text.secondary">Нет данных по курсам</Typography></Grid>
                        )}
                    </Grid>
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

                <Card sx={{ marginX: '20%', padding:'40px' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>Сертификаты</Typography>
                    <Grid container spacing={2}>
                        {certs.map((c, idx) => (
                            <Grid item xs={12} md={6} key={idx}>
                                <Box sx={{ p:2, border:'1px solid #e5e7eb', borderRadius:2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight:600 }}>{c.course_name}</Typography>
                                    <Typography variant="body2" color="text.secondary">Номер: {c.certificate_int}</Typography>
                                    <Typography variant="body2" color="text.secondary">Дата: {c.date_certificate}</Typography>
                                    <Button variant="outlined" size="small" href={c.verify_url} target="_blank">Проверить</Button>
                                </Box>
                            </Grid>
                        ))}
                        {certs.length === 0 && (
                            <Grid item xs={12}><Typography color="text.secondary">Нет сертификатов</Typography></Grid>
                        )}
                    </Grid>
                </Card>
            </Box>
            <Snackbar open={notify.open} autoHideDuration={4000} onClose={() => setNotify(n => ({...n, open:false}))}>
                <Alert severity={notify.severity} onClose={() => setNotify(n => ({...n, open:false}))}>{notify.message}</Alert>
            </Snackbar>
        </div>
    );
}
