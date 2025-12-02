import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import base_url from "../../../../settings/base_url";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart } from '@mui/x-charts/BarChart';

export default function StatsPage() {
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState('');
    const [statsWeb, setStatsWeb] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        loadUsers(query, page - 1, 10);
    }, [query, page]);

    const loadUsers = async (q, p, size) => {
        try {
            const usersResponse = await axios.get(base_url + '/api/aml/auth/users', {
                params: { q, page: p, size }
            });
            setUsers(usersResponse.data.items || []);
            setTotal(usersResponse.data.total || 0);
            const statsResponse = await axios.get(base_url + '/api/aml/auth/getData');
            setStatsWeb(statsResponse.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title">Выберите пользователя</DialogTitle>
            <DialogContent dividers={true}>
                <Stack spacing={2} sx={{ mb: 2 }}>
                    <TextField
                        label="Поиск (имя/фамилия/email)"
                        size="small"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Stack>
                <InsetList users={users} />
                <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Pagination
                        count={Math.max(1, Math.ceil(total / 10))}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                    />
                </Stack>
            </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>

            <Button onClick={handleClickOpen} variant='outlined' sx={{marginBottom:'20px'}}>Открыть статистику по пользователям</Button>
            <br/>
            <div>
                Количество пользователей: {total}
            </div>
            <br/>
            <div>
                Количество завершенных курсов: {statsWeb?.finished_courses}
            </div>
            <br/>
            <div>
                Количество курсов в процессе: {statsWeb?.process_courses}
            </div>
            <br/>
            <div style={{display: 'flex'}}>
                <div>
                    <h2>Статистика аутентификации пользователей</h2>
                    {statsWeb?.authenticated ? (
                        <BarChart
                            xAxis={[{scaleType: 'band', data: statsWeb.authenticated.map(item => item.date)}]}
                            series={[{
                                data: statsWeb.authenticated.map(item => item.count),
                                label: 'Посещение пользователей'
                            }]}
                            width={700}
                            height={400}
                        />
                    ) : (
                        <p>Данные загружаются или отсутствуют</p>
                    )}
                </div>

                <div>
                    <h2>Статистика регистрации пользователей</h2>
                    {statsWeb?.registration ? (
                        <BarChart
                            xAxis={[{scaleType: 'band', data: statsWeb.registration.map(item => item.date)}]}
                            series={[{
                                data: statsWeb.registration.map(item => item.count),
                                label: 'Регистрация пользователей'
                            }]}
                            width={700}
                            height={400}
                        />
                    ) : (
                        <p>Данные загружаются или отсутствуют</p>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

function InsetList({users}) {
    const navigate = useNavigate();

    function handleOpenStats(id) {
        navigate(`/user-stats/${id}`);
    }
    const sortedUsers = [...users].sort((a, b) => {
        const lastNameA = a.lastname || '';
        const lastNameB = b.lastname || '';
        return lastNameA.localeCompare(lastNameB);
    });

    return (
        <List
            sx={{width: '100%', maxWidth: 1200, minWidth: 500, bgcolor: 'background.paper'}}
            aria-label="contacts"
        >
            {
                sortedUsers.length > 0 ? sortedUsers.map((user, index) => (
                    <ListItem key={index} disablePadding secondaryAction={
                        <Button size="small" variant="outlined" onClick={() => handleOpenStats(user.user_id)}>Открыть</Button>
                    }>
                        <ListItemButton onClick={() => handleOpenStats(user.user_id)}>
                            <ListItemText primary={`${user.lastname} ${user.firstname}`} secondary={user.email} />
                        </ListItemButton>
                    </ListItem>
                )) : <p>Пользователи не найдены</p>
            }
        </List>
    );
}
