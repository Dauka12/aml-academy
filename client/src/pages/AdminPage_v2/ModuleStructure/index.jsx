import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './style.scss';

import base_url from '../../../settings/base_url';

// Material UI Components
import {
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    Fade,
    Grid,
    IconButton,
    List,
    ListItem,
    Paper,
    TextField,
    Tooltip,
    Typography,
    Zoom
} from '@mui/material';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Material UI Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';

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

// Debug filter function to troubleshoot filtering issues
function debugFilter(array, filterFn) {
    console.log('=== Debug Filter ===');
    console.log('Input array:', array);

    if (!array || !Array.isArray(array)) {
        console.log('❌ Input is not an array:', array);
        return [];
    }

    const result = array.reduce((filtered, item, index) => {
        const passes = filterFn(item);
        console.log(
            `Item ${index}:`,
            {
                item,
                '_active property': item?._active,
                'typeof _active': item?._active !== undefined ? typeof item._active : 'undefined',
                'passes filter': passes
            }
        );

        if (passes) {
            filtered.push(item);
        }
        return filtered;
    }, []);

    console.log('Filtered result:', result);
    console.log('=== End Debug Filter ===');
    return result;
}

const ModuleStructure = ({ id, toQuestionnaire, lessonById, setLessonTitle }) => {
    const navigate = useNavigate();
    const [module, setModule] = useState({
        title: '',
        number_of_lessons: 0
    });
    const [currentLessons, setCurrentLessons] = useState([]);
    const [loading, setLoading] = useState(false);

    const [newLessonName, setNewLessonName] = useState("Урок №" + (currentLessons?.length + 1));
    const [addingNewLesson, setAddingNewLesson] = useState(false);

    const refreshLessonsList = () => {
        setLoading(true);
        axios
            .get(base_url + '/api/aml/chapter/lessonsByModuleId', {
                params: {
                    id
                }
            })
            .then((res) => {
                console.log('Refreshed lessons data: ', res.data);
                const lessons = Array.isArray(res.data) ? res.data : [];
                
                const activeLessons = debugFilter(
                    lessons,
                    x => x && x._active === true
                );

                setModule({
                    title: res.data?.name || "",
                    number_of_lessons: activeLessons.length
                });
                setNewLessonName("Урок №" + (lessons.length + 1));
                setCurrentLessons(lessons);
            })
            .catch(function (error) {
                console.error("API Error during refresh:", error);
                alert("Ошибка при обновлении списка уроков");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        refreshLessonsList();
    }, [id]);

    const addLesson = () => {
        if (newLessonName !== '') {
            setLoading(true);
            axios
                .post(base_url + '/api/aml/chapter/addLesson', { id, newLessonName })
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setCurrentLessons(res.data);
                        setNewLessonName("Урок №" + (res.data.length + 1));
                    } else {
                        console.error("API не вернул массив после добавления урока:", res.data);
                        refreshLessonsList();
                    }
                    setAddingNewLesson(false);
                })
                .catch(function (error) {
                    console.error("Ошибка при добавлении урока:", error);
                    alert(error?.response?.data?.message || error.message || "Ошибка при добавлении урока");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            alert('Пожалуйста введите название урока');
        }
    };

    const deleteLesson = (lessonId) => {
        if (window.confirm('Вы точно хотите удалить урок?')) {
            setLoading(true);
            axios
                .post(base_url + '/api/aml/chapter/deleteLesson', null, {
                    params: {
                        id: lessonId
                    }
                })
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setCurrentLessons(res.data);
                        setNewLessonName("Урок №" + (res.data.length + 1));
                    } else {
                        console.error("API не вернул массив после удаления урока:", res.data);
                        refreshLessonsList();
                    }
                })
                .catch(function (error) {
                    console.error("Ошибка при удалении урока:", error);
                    alert(error?.response?.data?.message || error.message || "Ошибка при удалении урока");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

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
        })
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ p: 3 }}>
                <Fade in timeout={800}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            backgroundColor: 'background.default',
                            boxShadow: 'none'
                        }}
                    >
                        <Box sx={{ display:'flex', alignItems:'center', gap:2, mb:4 }}>
                            <TextField
                                value={module.title}
                                onChange={(e) => setModule(m => ({...m, title: e.target.value}))}
                                size="small"
                                label="Название модуля"
                                sx={{ minWidth: 320 }}
                            />
                            <Button
                                variant="contained"
                                onClick={async () => {
                                    try {
                                        await axios.put(base_url + '/api/aml/chapter/renameModule', null, { params: { id, name: module.title } });
                                    } catch (err) {
                                        alert('Ошибка сохранения названия модуля');
                                    }
                                }}
                            >
                                Сохранить
                            </Button>
                            <Typography component="span" variant="h6" sx={{ ml: 1, color: 'secondary.main' }}>
                                {`Всего: ${module.number_of_lessons} уроков`}
                            </Typography>
                        </Box>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                                        <CircularProgress size={40} />
                                    </Box>
                                ) : (
                                    <Card sx={{ p: 0, overflow: 'visible' }}>
                                        <List sx={{ p: 0 }}>
                                            {debugFilter(currentLessons || [], x => x && x._active === true).map((x, index) => (
                                                <motion.div
                                                    key={index}
                                                    custom={index}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={listItemVariants}
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
                                                                <Tooltip title="Редактировать урок">
                                                                    <IconButton 
                                                                        onClick={() => {
                                                                            setLessonTitle(x.topic);
                                                                            lessonById(x.lesson_id);
                                                                        }}
                                                                        sx={{ color: 'primary.main' }}
                                                                    >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Удалить урок">
                                                                    <IconButton 
                                                                        onClick={() => deleteLesson(x.lesson_id)}
                                                                        sx={{ color: 'primary.main' }}
                                                                    >
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Box>
                                                        }
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
                                                            <DescriptionIcon sx={{ color: 'primary.main' }} />
                                                            <TextField
                                                                defaultValue={x.topic}
                                                                size="small"
                                                                onBlur={async (e) => {
                                                                    const newName = e.target.value;
                                                                    if (!newName || newName === x.topic) return;
                                                                    try {
                                                                        await axios.put(base_url + '/api/aml/chapter/renameLesson', null, { params: { id: x.lesson_id, name: newName } });
                                                                        refreshLessonsList();
                                                                    } catch (err) {
                                                                        alert('Ошибка сохранения названия урока');
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                    </ListItem>
                                                </motion.div>
                                            ))}
                                        </List>

                                        {addingNewLesson ? (
                                            <Fade in timeout={400}>
                                                <Box sx={{ p: 2, borderTop: '1px solid', borderColor: alpha('#000', 0.05) }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
                                                        <TextField
                                                            fullWidth
                                                            variant="outlined"
                                                            size="small"
                                                            value={newLessonName}
                                                            onChange={(e) => setNewLessonName(e.target.value)}
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
                                                                setNewLessonName("Урок №" + (currentLessons?.length + 1));
                                                                setAddingNewLesson(false);
                                                            }}
                                                        >
                                                            Отменить
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            startIcon={<SaveIcon />}
                                                            onClick={addLesson}
                                                            disabled={!newLessonName}
                                                        >
                                                            Сохранить
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Fade>
                                        ) : (
                                            <Zoom in={!addingNewLesson} timeout={300}>
                                                <Box>
                                                    <Button
                                                        fullWidth
                                                        variant="text"
                                                        color="primary"
                                                        startIcon={<AddCircleOutlineIcon />}
                                                        onClick={() => setAddingNewLesson(true)}
                                                        sx={{ 
                                                            p: 2, 
                                                            justifyContent: 'flex-start', 
                                                            borderTop: '1px solid', 
                                                            borderColor: alpha('#000', 0.05),
                                                            borderRadius: 0
                                                        }}
                                                    >
                                                        Добавить урок
                                                    </Button>
                                                </Box>
                                            </Zoom>
                                        )}
                                    </Card>
                                )}
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card 
                                    sx={{ 
                                        p: 3, 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'space-between',
                                        bgcolor: alpha(theme.palette.primary.main, 0.03)
                                    }}
                                >
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                                        Заполнить вопросы для тестирования
                                    </Typography>
                                    
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SchoolIcon />}
                                        onClick={toQuestionnaire}
                                        sx={{ alignSelf: 'flex-start', mt: 2 }}
                                    >
                                        Перейти
                                    </Button>
                                </Card>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.secondary.main, 0.08) }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                <HelpOutlineIcon sx={{ color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Управление уроками:
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EditIcon sx={{ mr: 1, fontSize: 18, opacity: 0.75 }} /> - Редактировать урок
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CloseIcon sx={{ mr: 1, fontSize: 18, opacity: 0.75 }} /> - Удалить урок
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </ThemeProvider>
    );
};

export default ModuleStructure;
