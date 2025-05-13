import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
    Alert,
    Autocomplete,
    Button,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import base_url from '../../../../settings/base_url';

const AddToCourse = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');
    const [userData, setUserData] = useState([]);
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
        fetchUserAndCourses();
    }, []);

    const fetchUserAndCourses = () => {
        axios.get(base_url + '/api/aml/course/getUsersAndCourses')
            .then(response => {
                setUserData(response.data.users);
                setCourseData(response.data.courses);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                showNotification("Ошибка при загрузке пользователей и курсов", "error");
            });
    };

    const handleAddClick = () => {
        if (!selectedUser || !selectedCourse) {
            showNotification("Пожалуйста, выберите и пользователя, и курс", "warning");
            return;
        }
        
        axios.put(`${base_url}/api/aml/course/saveUser/${selectedUser.user_id}/course/${selectedCourse.course_id}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then(response => {
                console.log("User added to course successfully:", response);
                showNotification("Пользователь успешно добавлен на курс");
                setSelectedUser(null);
                setSelectedCourse(null);
            })
            .catch(error => {
                console.error("Error in adding user to course:", error);
                showNotification(error.response?.data?.message || "Произошла ошибка при добавлении пользователя", "error");
            });
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
                    <Autocomplete
                        value={selectedUser}
                        onChange={(event, newValue) => {
                            setSelectedUser(newValue);
                        }}
                        options={userData || []}
                        disablePortal
                        includeInputInList
                        autoHighlight
                        getOptionLabel={(option) => {
                            // Безопасно получаем имя и фамилию
                            if (!option) return '';
                            return `${option.firstname || ''} ${option.lastname || ''}`.trim();
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option.user_id}>
                                {`${option.firstname || ''} ${option.lastname || ''}`}
                            </li>
                        )}
                        filterOptions={(options, state) => {
                            // Простой встроенный фильтр без сложной логики
                            const inputValue = state.inputValue.toLowerCase().trim();
                            return options.filter(option => 
                                `${option.firstname || ''} ${option.lastname || ''}`.toLowerCase().includes(inputValue)
                            );
                        }}
                        isOptionEqualToValue={(option, value) => option.user_id === value.user_id}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Выберите пользователя" 
                                variant="outlined" 
                                fullWidth
                            />
                        )}
                    />
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
