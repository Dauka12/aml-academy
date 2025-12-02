import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
    Alert,
    Autocomplete,
    Button,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Typography,
    Box
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import base_url from '../../../../settings/base_url';

const AddToCourse = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');
    const [userData, setUserData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [userPage, setUserPage] = useState(1);
    const [userQuery, setUserQuery] = useState('');
    const [courseData, setCourseData] = useState([]);
    
    // Notification state
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const showNotification = (message, severity = 'success') => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchUsers(userQuery, userPage - 1, 20);
        }, 400);
        return () => clearTimeout(handler);
    }, [userQuery, userPage]);

    const fetchCourses = () => {
        axios.get(base_url + '/api/aml/course/getUsersAndCourses')
            .then(response => {
                setCourseData(response.data.courses);
            })
            .catch(error => {
                console.error("Error fetching courses: ", error);
                showNotification("Ошибка при загрузке курсов", "error");
            });
    };

    const fetchUsers = (q, p, size) => {
        axios.get(base_url + '/api/aml/auth/users', { params: { q, page: p, size }})
            .then(response => {
                setUserData(response.data.items || []);
                setTotalUsers(response.data.total || 0);
            })
            .catch(error => {
                console.error("Error fetching users: ", error);
                showNotification("Ошибка при загрузке пользователей", "error");
            });
    };

    const handleAddClick = async () => {
        if (!selectedCourse || !selectedUsers || selectedUsers.length === 0) {
            showNotification("Выберите курс и хотя бы одного пользователя", "warning");
            return;
        }
        const results = await Promise.allSettled(selectedUsers.map(u => 
            axios.put(`${base_url}/api/aml/course/saveUser/${u.user_id}/course/${selectedCourse.course_id}`, {}, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
        ));
        const success = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected');
        if (success) {
            showNotification(`Успешно добавлено: ${success}`);
        }
        if (failed.length) {
            const already = failed.filter(f => f.reason?.response?.status === 400 || f.reason?.response?.status === 409).length;
            if (already) showNotification(`Уже добавлено: ${already}`, "warning");
            const other = failed.length - already;
            if (other) showNotification(`Ошибок: ${other}`, "error");
        }
        setSelectedUsers([]);
        setSelectedCourse(null);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            {/* Notification Snackbar */}
            <Snackbar 
                open={notification.open} 
                autoHideDuration={6000} 
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert 
                    onClose={handleCloseNotification} 
                    severity={notification.severity} 
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {notification.message}
                </Alert>
            </Snackbar>

            <Typography variant="h6" sx={{ mb: 2 }}>Добавить пользователя на курс</Typography>
            
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={5}>
                    <TextField
                        label="Поиск пользователя"
                        value={userQuery}
                        onChange={(e) => { setUserQuery(e.target.value); setUserPage(1); }}
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <Autocomplete
                        multiple
                        value={selectedUsers}
                        onChange={(event, newValue) => {
                            setSelectedUsers(newValue);
                        }}
                        options={userData || []}
                        disablePortal
                        includeInputInList
                        autoHighlight
                        getOptionLabel={(option) => {
                            // Безопасно получаем имя и фамилию
                            if (!option) return '';
                            return `${option.firstname || ''} ${option.lastname || ''} (${option.email || ''})`.trim();
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option.user_id}>
                                {`${option.firstname || ''} ${option.lastname || ''} (${option.email || ''})`}
                            </li>
                        )}
                        filterOptions={(options, state) => {
                            // Простой встроенный фильтр без сложной логики
                            const inputValue = state.inputValue.toLowerCase().trim();
                            return options.filter(option => 
                                `${option.firstname || ''} ${option.lastname || ''} (${option.email || ''})`.toLowerCase().includes(inputValue)
                            );
                        }}
                        isOptionEqualToValue={(option, value) => option.user_id === value.user_id}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Выберите пользователей" 
                                variant="outlined" 
                                fullWidth
                            />
                        )}
                    />
                    <Box sx={{ display:'flex', justifyContent:'flex-end', mt:1 }}>
                        <Pagination
                            count={Math.max(1, Math.ceil(totalUsers / 20))}
                            page={userPage}
                            onChange={(_, v) => setUserPage(v)}
                            size="small"
                        />
                    </Box>
                </Grid>
                
                <Grid item xs={12} md={5}>
                    <Autocomplete
                        value={selectedCourse}
                        onChange={(event, newValue) => {
                            setSelectedCourse(newValue);
                        }}
                        options={courseData || []}
                        disablePortal
                        includeInputInList
                        autoHighlight
                        getOptionLabel={(option) => {
                            if (!option) return '';
                            return `${option.course_name || ''} (ID: ${option.course_id || ''})`;
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option.course_id}>
                                {`${option.course_name || ''} (ID: ${option.course_id || ''})`}
                            </li>
                        )}
                        filterOptions={(options, state) => {
                            const inputValue = state.inputValue.toLowerCase().trim();
                            return options.filter(option => 
                                `${option.course_name || ''} (ID: ${option.course_id || ''})`.toLowerCase().includes(inputValue)
                            );
                        }}
                        isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Выберите курс" 
                                variant="outlined" 
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        startIcon={<PersonAddIcon />}
                        onClick={handleAddClick}
                        fullWidth
                        sx={{ 
                            py: 1.5, 
                            bgcolor: '#1a441a',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: '#2f862f',
                                transform: 'scale(1.05)',
                                transition: 'all 0.2s'
                            }
                        }}
                    >
                        Добавить
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AddToCourse;
