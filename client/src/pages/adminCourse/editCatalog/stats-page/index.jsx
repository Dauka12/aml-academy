import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import base_url from "../../../../settings/base_url";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart } from '@mui/x-charts/BarChart';

export default function StatsPage() {
    const [open, setOpen] = React.useState(false);
    const [userData, setUserData] = React.useState([]);
    const [statsWeb, setStatsWeb] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchUsers().then(data => console.log('data fetched: ' + data));
    }, []);

    const fetchUsers = async () => {
        try {
            const usersResponse = await axios.get(base_url + '/api/aml/course/getUsersAndCourses');
            setUserData(usersResponse.data.users);

            const statsResponse = await axios.get(base_url + '/api/aml/auth/getData');
            setStatsWeb(statsResponse.data);
            console.log(statsResponse.data);
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
                    <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                        <InsetList users={userData}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>

            <Button onClick={handleClickOpen} variant='outlined' sx={{marginBottom:'20px'}}>Открыть статистику по пользователям</Button>
            <br/>
            <div>
                Количество пользователей: {userData.length}
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

    return (
        <List
            sx={{width: '100%', maxWidth: 1200, minWidth: 500, bgcolor: 'background.paper'}}
            aria-label="contacts"
        >
            {
                users.length > 0 ? users.map((user, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => handleOpenStats(user.user_id)}>
                            <ListItemText primary={`${user.firstname} ${user.lastname}`}/>
                        </ListItemButton>
                    </ListItem>
                )) : <p>Пользователи не найдены</p>
            }
        </List>
    );
}
