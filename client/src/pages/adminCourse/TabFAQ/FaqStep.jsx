import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import base_url from "../../../settings/base_url";

// Material UI imports
// Material UI imports
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Create a theme with indigo primary color
const theme = createTheme({
    palette: {
        primary: {
            main: '#374761',
        },
        secondary: {
            main: '#7E869E',
        },
        background: {
            default: '#f5f7fa',
        },
    },
    typography: {
        fontFamily: 'Ubuntu, sans-serif',
        h1: {
            fontWeight: 500,
            fontSize: '30px',
            color: 'rgba(55, 71, 97, 0.50)'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 5,
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 5,
                    }
                }
            }
        }
    },
});

const FAQStep = ({ nextStep, id }) => {
    const [what_course_represents, setWhat_course_represents] = useState("");
    const [who_course_intended_for, setWho_course_intended_for] = useState("");
    const [what_is_duration, setWhat_is_duration] = useState("");
    const [what_is_availability, setWhat_is_availability] = useState("");
    const [what_is_agenda_of_course, setWhat_is_agenda_of_course] = useState([]); // Теперь массив
    const [what_you_will_get, setWhat_you_will_get] = useState("");

    const [loading, setLoading] = useState(false);
    const [editingExisting, setEditingExisting] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    // Функции для работы с программой курса
    const addAgendaItem = () => {
        setWhat_is_agenda_of_course([...what_is_agenda_of_course, ""]);
    };

    const updateAgendaItem = (index, value) => {
        const newAgenda = [...what_is_agenda_of_course];
        newAgenda[index] = value;
        setWhat_is_agenda_of_course(newAgenda);
    };

    const deleteAgendaItem = (index) => {
        const newAgenda = what_is_agenda_of_course.filter((_, i) => i !== index);
        setWhat_is_agenda_of_course(newAgenda);
    };

    const moveAgendaItem = (fromIndex, toIndex) => {
        const newAgenda = [...what_is_agenda_of_course];
        const [movedItem] = newAgenda.splice(fromIndex, 1);
        newAgenda.splice(toIndex, 0, movedItem);
        setWhat_is_agenda_of_course(newAgenda);
    };

    useEffect(() => {
        if (id != 0) {
            setLoading(true);
            axios
                .get(base_url + "/api/aml/course/basicInfoCourse", {
                    params: {
                        id: id
                    }
                })
                .then((res) => {
                    setWhat_course_represents(res.data.what_course_represents || "");
                    setWho_course_intended_for(res.data.who_course_intended_for || "");
                    setWhat_is_duration(res.data.what_is_duration || "");
                    setWhat_is_availability(res.data.what_is_availability || "");
                    // Конвертируем строку в массив при загрузке
                    const agendaString = res.data.what_is_agenda_of_course || "";
                    const agendaArray = agendaString ? agendaString.split('|||').filter(item => item.trim()) : [];
                    setWhat_is_agenda_of_course(agendaArray);
                    setWhat_you_will_get(res.data.what_you_will_get || "");
                    setEditingExisting(true);
                })
                .catch(error => {
                    console.error("Error fetching FAQ data:", error);
                    setNotification({
                        open: true,
                        message: 'Ошибка при загрузке данных FAQ',
                        severity: 'error'
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const validateForm = () => {
        const errors = {};

        if (!what_course_represents.trim()) errors.what_course_represents = 'Это поле обязательно для заполнения';
        if (!who_course_intended_for.trim()) errors.who_course_intended_for = 'Это поле обязательно для заполнения';
        if (!what_is_duration.trim()) errors.what_is_duration = 'Это поле обязательно для заполнения';
        if (!what_is_availability.trim()) errors.what_is_availability = 'Это поле обязательно для заполнения';
        // Проверяем, что есть хотя бы один пункт программы и он не пустой
        if (what_is_agenda_of_course.length === 0 || what_is_agenda_of_course.every(item => !item.trim())) {
            errors.what_is_agenda_of_course = 'Необходимо добавить хотя бы один пункт программы';
        }
        if (!what_you_will_get.trim()) errors.what_you_will_get = 'Это поле обязательно для заполнения';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveAndNext = () => {
        if (!validateForm()) {
            setNotification({
                open: true,
                message: 'Для продолжения необходимо заполнить все поля',
                severity: 'warning'
            });
            return;
        }

        let urlPath = '/api/aml/course/saveBasicInfoDraft';

        if (editingExisting) {
            urlPath = '/api/aml/course/updateNoBasicInfo/' + id;
        }

        // Конвертируем массив в строку с разделителем для отправки на бэкенд
        const agendaString = what_is_agenda_of_course.filter(item => item.trim()).join('|||');

        const formData = {
            what_course_represents,
            what_is_availability,
            what_is_agenda_of_course: agendaString, // Отправляем строку
            what_you_will_get,
            who_course_intended_for,
            what_is_duration,
        };

        setLoading(true);
        axios
            .post(base_url + urlPath, formData)
            .then((res) => {
                setNotification({
                    open: true,
                    message: 'Данные успешно сохранены',
                    severity: 'success'
                });
                setTimeout(() => {
                    nextStep(res.data);
                }, 1000);
            })
            .catch(error => {
                console.error("Error saving FAQ data:", error);
                setNotification({
                    open: true,
                    message: 'Ошибка при сохранении данных',
                    severity: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleBack = () => {
        window.location.href = `/new-admin-page/?id=${id}`;
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                maxWidth="lg"
                sx={{
                    pt: { xs: 3, md: 5 },
                    pl: { xs: 2, md: 13 },
                    pr: { xs: 2, md: 4 }
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    Раздел FAQ
                </Typography>

                <Card
                    elevation={0}
                    sx={{
                        p: 4,
                        mt: 3,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.background.paper, 0.8)
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <QuizIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                        <Typography
                            variant="h5"
                            component="h2"
                            color="primary.main"
                            fontWeight={500}
                        >
                            Ответьте на часто задаваемые вопросы
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Что из себя представляет данный курс?"
                                variant="outlined"
                                value={what_course_represents}
                                onChange={(e) => setWhat_course_represents(e.target.value)}
                                error={!!formErrors.what_course_represents}
                                helperText={formErrors.what_course_represents}
                                placeholder="Введите ответ"
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Для кого предназначен курс?"
                                variant="outlined"
                                value={who_course_intended_for}
                                onChange={(e) => setWho_course_intended_for(e.target.value)}
                                error={!!formErrors.who_course_intended_for}
                                helperText={formErrors.who_course_intended_for}
                                placeholder="Введите ответ"
                                multiline
                                rows={2}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Длительность курса"
                                variant="outlined"
                                value={what_is_duration}
                                onChange={(e) => setWhat_is_duration(e.target.value)}
                                error={!!formErrors.what_is_duration}
                                helperText={formErrors.what_is_duration}
                                placeholder="Введите ответ"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Доступность курса"
                                variant="outlined"
                                value={what_is_availability}
                                onChange={(e) => setWhat_is_availability(e.target.value)}
                                error={!!formErrors.what_is_availability}
                                helperText={formErrors.what_is_availability}
                                placeholder="Введите ответ"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                                Программа курса
                                {formErrors.what_is_agenda_of_course && (
                                    <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                                        {formErrors.what_is_agenda_of_course}
                                    </Typography>
                                )}
                            </Typography>
                            
                            {/* Список пунктов программы */}
                            {what_is_agenda_of_course.map((item, index) => (
                                <Paper 
                                    key={index} 
                                    elevation={1} 
                                    sx={{ 
                                        p: 2, 
                                        mb: 1, 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        bgcolor: alpha(theme.palette.primary.main, 0.03)
                                    }}
                                >
                                    <DragHandleIcon sx={{ mr: 1, color: 'text.secondary', cursor: 'grab' }} />
                                    
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder={`Пункт ${index + 1}`}
                                        value={item}
                                        onChange={(e) => updateAgendaItem(index, e.target.value)}
                                        sx={{ mr: 1 }}
                                    />
                                    
                                    <IconButton 
                                        color="error" 
                                        onClick={() => deleteAgendaItem(index)}
                                        disabled={what_is_agenda_of_course.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Paper>
                            ))}
                            
                            {/* Кнопка добавления нового пункта */}
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={addAgendaItem}
                                sx={{ mt: 2 }}
                                fullWidth
                            >
                                Добавить пункт программы
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Что вы получите?"
                                variant="outlined"
                                value={what_you_will_get}
                                onChange={(e) => setWhat_you_will_get(e.target.value)}
                                error={!!formErrors.what_you_will_get}
                                helperText={formErrors.what_you_will_get}
                                placeholder="Введите ответ"
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            display: 'flex',
                            mt: 5,
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={saveAndNext}
                            disabled={loading}
                            endIcon={<ArrowForwardIcon />}
                            sx={{ py: 1.5, px: 4 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : 'Перейти далее'}
                        </Button>

                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleBack}
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                ml: 3,
                                color: 'rgba(55, 71, 97, 0.50)',
                                textDecoration: 'underline'
                            }}
                        >
                            Вернуться назад
                        </Button>
                    </Box>
                </Card>

                <Box
                    sx={{
                        mt: 4,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2
                    }}
                >
                    <HelpOutlineIcon sx={{ color: 'primary.main', mt: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        Раздел FAQ содержит ответы на вопросы, которые часто задают пользователи.
                        Заполните все поля, чтобы предоставить полную информацию о вашем курсе.
                    </Typography>
                </Box>

                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={() => setNotification({ ...notification, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setNotification({ ...notification, open: false })}
                        severity={notification.severity}
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default FAQStep;