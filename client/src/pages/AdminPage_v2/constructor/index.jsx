import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../settings/base_url';

import './style.scss';

import QuestionnaireForm from '../../adminCourse/fillQuestionnaire/Questionnaire';
import ContentConstructor from '../ContentConstructor';
import ModuleStructure from '../ModuleStructure';

// Material UI Components
import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Fade,
    Grid,
    IconButton,
    List,
    ListItem,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
    Zoom
} from '@mui/material';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';

// Material UI Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';

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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
            },
        },
    },
});

function NewTabConstructor({ saveCancel, save, id }) {
    const [stepConstructor, setStepConstructor] = useState('structure');
    const [currentModules, setCurrentModules] = useState([]);
    const [addingNewModule, setAddingNewModule] = useState(false);
    const [newModuleName, setNewModuleName] = useState(() => {
        const moduleCount = Array.isArray(currentModules) ? currentModules.length + 1 : 1;
        return `Модуль №${moduleCount}`;
    });
    const [lesson, setLesson] = useState(0);
    const [title, setTitle] = useState("");
    const [previous, setPrevious] = useState("structure");
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [loading, setLoading] = useState(false);
    // State for confirmation dialog
    const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

    // Animation variants for list items
    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.05,
                duration: 0.3,
                ease: "easeOut"
            }
        }),
        exit: {
            opacity: 0,
            x: -30,
            transition: { duration: 0.2 }
        }
    };

    // Animation variants for page transitions
    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    useEffect(() => {
        fetchModules();
    }, [id]);

    const fetchModules = () => {
        setLoading(true);
        axios
            .get(base_url + '/api/aml/chapter/modulesOfCourse', {
                params: { id }
            })
            .then((res) => {
                setCurrentModules(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(function (error) {
                console.error("Error fetching modules:", error);
                setCurrentModules([]);
                setNotification({
                    show: true,
                    message: 'Ошибка при загрузке модулей',
                    type: 'error'
                });
                setLoading(false);
            });
    };

    const addModule = () => {
        if (newModuleName.trim() === '') {
            setNotification({
                show: true,
                message: 'Пожалуйста введите название модуля',
                type: 'warning'
            });
            return;
        }

        setLoading(true);
        axios
            .post(base_url + '/api/aml/chapter/addModule', { id, newModuleName })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setCurrentModules(res.data);
                    setNewModuleName("Модуль №" + (res.data.length + 1));
                } else {
                    console.error("API не вернул массив:", res.data);
                    fetchModules();
                }
                setAddingNewModule(false);
                setNotification({
                    show: true,
                    message: 'Модуль успешно добавлен',
                    type: 'success'
                });
            })
            .catch(function (error) {
                console.error("Ошибка при добавлении модуля:", error);
                setNotification({
                    show: true,
                    message: error.message || 'Ошибка при добавлении модуля',
                    type: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteClick = (moduleId) => {
        setConfirmDialog({
            open: true,
            id: moduleId
        });
    };

    const deleteModule = () => {
        const moduleId = confirmDialog.id;
        setConfirmDialog({ open: false, id: null });

        if (!moduleId) return;

        setLoading(true);
        axios
            .post(base_url + '/api/aml/chapter/deleteModule', null, {
                params: { id: moduleId }
            })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setCurrentModules(res.data);
                    setNewModuleName("Модуль №" + (res.data.length + 1));
                } else {
                    console.error("API не вернул массив после удаления:", res.data);
                    fetchModules();
                }
                setNotification({
                    show: true,
                    message: 'Модуль успешно удалён',
                    type: 'success'
                });
            })
            .catch((error) => {
                console.error("Ошибка при удалении модуля:", error);
                setNotification({
                    show: true,
                    message: error.message || 'Ошибка при удалении модуля',
                    type: 'error'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const lessonsById = (x) => {
        setPrevious("structure");
        setStepConstructor(x.module_id);
    }

    const lessonById = (x) => {
        setPrevious(stepConstructor);
        setStepConstructor('constructor');
        setLesson(x);
    }

    const setLessonTitle = (title) => {
        setTitle(title);
    }

    const toQuestionnaire = () => {
        setPrevious(stepConstructor);
        setStepConstructor('questionnaire');
    }

    if (stepConstructor === 'constructor') {
        return <ContentConstructor
            saveCancel={saveCancel}
            save={save}
            id={lesson}
            title={title}
            setStepConstructor={setStepConstructor}
            previous={previous}
        />;
    }

    return (
        <ThemeProvider theme={theme}>
            <motion.div
                className="admin-page-constructor"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
            >
                {/* Header Section with Back Button when needed */}
                <Box mb={4}>
                    {stepConstructor === 'structure' ? (
                        <Typography variant="h4" component="h1" fontWeight="600" color="primary.main">
                            Программа курса - конструктор
                        </Typography>
                    ) : stepConstructor === 'questionnaire' ? (
                        <Box display="flex" alignItems="center" gap={2}>
                            <IconButton
                                onClick={() => setStepConstructor(previous)}
                                size="large"
                                sx={{ color: 'primary.main' }}
                            >
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="h4" component="h1" fontWeight="600" color="primary.main">
                                Тестирование модуля
                            </Typography>
                        </Box>
                    ) : stepConstructor !== 'constructor' ? (
                        <Box display="flex" alignItems="center" gap={2}>
                            <IconButton
                                onClick={() => setStepConstructor("structure")}
                                size="large"
                                sx={{ color: 'primary.main' }}
                            >
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="h4" component="h1" fontWeight="600" color="primary.main">
                                Структура модуля
                            </Typography>
                        </Box>
                    ) : null}
                </Box>

                {/* Main Content Area */}
                <Box className="body">
                    {stepConstructor === 'structure' ? (
                        <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <Typography
                                variant="h5"
                                component="div"
                                fontWeight="600"
                                color="primary.main"
                                mb={4}
                            >
                                Структура
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    {loading ? (
                                        <Box display="flex" justifyContent="center" py={4}>
                                            <CircularProgress color="primary" />
                                        </Box>
                                    ) : (
                                        <Card sx={{ p: 0, overflow: 'visible', boxShadow: 'none', border: `1px solid ${alpha('#000', 0.05)}` }}>
                                            <AnimatePresence>
                                                <List sx={{ p: 0 }}>
                                                    {Array.isArray(currentModules) && currentModules.map((x, index) => (
                                                        <motion.div
                                                            key={x.module_id}
                                                            custom={index}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            variants={listItemVariants}
                                                            layout
                                                        >
                                                            <ListItem
                                                                sx={{
                                                                    p: 2,
                                                                    borderBottom: '1px solid',
                                                                    borderColor: alpha('#000', 0.05),
                                                                    '&:last-child': { borderBottom: 'none' },
                                                                    transition: 'all 0.2s ease',
                                                                    '&:hover': { backgroundColor: alpha('#000', 0.02) }
                                                                }}
                                                                secondaryAction={
                                                                    <Box>
                                                                        <Tooltip title="Редактировать модуль">
                                                                            <IconButton
                                                                                onClick={() => lessonsById(x)}
                                                                                sx={{ color: 'primary.main' }}
                                                                            >
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Удалить модуль">
                                                                            <IconButton
                                                                                onClick={() => handleDeleteClick(x.module_id)}
                                                                                sx={{ color: 'primary.main' }}
                                                                            >
                                                                                <CloseIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Box>
                                                                }
                                                            >
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
                                                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                                        <Box component="span" fontWeight="600">{x.name}</Box>: {x.lessons != null ? x.lessons?.length : 0} Уроков
                                                                    </Typography>
                                                                </Box>
                                                            </ListItem>
                                                        </motion.div>
                                                    ))}
                                                </List>
                                            </AnimatePresence>

                                            {addingNewModule ? (
                                                <Fade in timeout={400}>
                                                    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: alpha('#000', 0.05) }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                            <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
                                                            <TextField
                                                                fullWidth
                                                                variant="outlined"
                                                                size="small"
                                                                value={newModuleName}
                                                                onChange={(e) => setNewModuleName(e.target.value)}
                                                                autoFocus
                                                                sx={{
                                                                    '& .MuiOutlinedInput-root': {
                                                                        borderRadius: 2
                                                                    }
                                                                }}
                                                            />
                                                        </Box>

                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="inherit"
                                                                onClick={() => {
                                                                    setNewModuleName("Модуль №" + (Array.isArray(currentModules) ? currentModules.length + 1 : 1));
                                                                    setAddingNewModule(false);
                                                                }}
                                                            >
                                                                Отменить
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                startIcon={<SaveIcon />}
                                                                onClick={addModule}
                                                                disabled={!newModuleName.trim()}
                                                            >
                                                                Сохранить
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Fade>
                                            ) : (
                                                <Zoom in={!addingNewModule} timeout={300}>
                                                    <Box>
                                                        <Button
                                                            fullWidth
                                                            variant="text"
                                                            color="primary"
                                                            startIcon={<AddCircleOutlineIcon />}
                                                            onClick={() => setAddingNewModule(true)}
                                                            sx={{
                                                                p: 2,
                                                                justifyContent: 'flex-start',
                                                                borderTop: '1px solid',
                                                                borderColor: alpha('#000', 0.05),
                                                                borderRadius: 0
                                                            }}
                                                        >
                                                            Добавить модуль
                                                        </Button>
                                                    </Box>
                                                </Zoom>
                                            )}
                                        </Card>
                                    )}
                                </Grid>

                                {/* Help Box */}
                                <Grid item xs={12} md={4}>
                                    <Card
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            bgcolor: alpha(theme.palette.primary.main, 0.03)
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                                            <HelpOutlineIcon sx={{ color: 'primary.main' }} />
                                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                                Справка
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ mb: 2 }} />
                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <EditIcon sx={{ mr: 1, fontSize: 18, opacity: 0.75 }} /> - Редактировать модуль
                                        </Typography>
                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CloseIcon sx={{ mr: 1, fontSize: 18, opacity: 0.75 }} /> - Удалить модуль
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Card>
                    ) : stepConstructor === 'questionnaire' ? (
                        <QuestionnaireForm id={previous} saveCancel={saveCancel} save={save} />
                    ) : stepConstructor !== 'constructor' ? (
                        <ModuleStructure id={stepConstructor} toQuestionnaire={toQuestionnaire} setLessonTitle={setLessonTitle} lessonById={lessonById} />
                    ) : null}
                </Box>

                {/* Confirmation Dialog */}
                <Dialog
                    open={confirmDialog.open}
                    onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Подтверждение удаления
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы точно хотите удалить модуль? Это действие нельзя будет отменить.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>
                            Отмена
                        </Button>
                        <Button onClick={deleteModule} color="primary" variant="contained" autoFocus>
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Loading Overlay */}
                {loading && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999
                        }}
                    >
                        <CircularProgress color="primary" />
                    </Box>
                )}

                {/* Notification using MUI Snackbar */}
                <Snackbar
                    open={notification.show}
                    autoHideDuration={6000}
                    onClose={() => setNotification({ ...notification, show: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setNotification({ ...notification, show: false })}
                        severity={notification.type}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            </motion.div>
        </ThemeProvider>
    );
}

export default NewTabConstructor;