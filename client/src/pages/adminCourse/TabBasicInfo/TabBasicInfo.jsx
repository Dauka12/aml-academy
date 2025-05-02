import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../settings/base_url';
import plusSign from '../images/pluc-image.svg';
import base64Course from './course-default';

// Material UI imports
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Alert,
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
        },
        MuiSelect: {
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

function fileToBase64(file, callback) {
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
        if (typeof callback === 'function') {
            callback(reader.result);
        }
    };

    reader.readAsDataURL(file);
}

const TabBasicInfo = ({ id, nextStep, title: initialTitle, audience: initAud, lang: initLang, category: initCTG, price: initPrice, image: initImage, typeofstudy: initType }) => {
    const [title, setTitle] = useState(initialTitle || "");
    const [audience, setAudience] = useState(initAud || "");
    const [lang, setLang] = useState(initLang || "ru");
    const [category, setCategory] = useState(initCTG || 0);
    const [price, setPrice] = useState(initPrice || 0);
    const [image, setImage] = useState(initImage || "");
    const [typeofstudy, setTypeOfStudy] = useState(initType || "");

    const [imageSource, setImageSource] = useState('');
    const [defImage, setDefImage] = useState(true);
    const [editingExisting, setEditingExisting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [formErrors, setFormErrors] = useState({});
    
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
                    setTitle(res.data.course_name || "");
                    setAudience(res.data.course_for_member_of_the_system || "");
                    setCategory(res.data.courseCategory ? res.data.courseCategory.category_id : 0);
                    setPrice(res.data.course_price || 0);
                    setImage(res.data.course_image || "");
                    
                    // Handle both type_of_study and course_type_of_study fields
                    const studyType = res.data.type_of_study || res.data.course_type_of_study || "";
                    setTypeOfStudy(studyType);
                    
                    setEditingExisting(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching course data:", error);
                    setLoading(false);
                    setNotification({
                        open: true,
                        message: 'Ошибка при загрузке данных курса',
                        severity: 'error'
                    });
                });
        }
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        
        if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
            setNotification({
                open: true,
                message: 'Файл слишком большой. Максимальный размер 5MB',
                severity: 'error'
            });
            return;
        }
        
        setLoading(true);
        fileToBase64(selectedFile, (base64String) => {
            setImage(base64String);
            setDefImage(false);
            setLoading(false);
        });
    };

    const validateForm = () => {
        const errors = {};
        
        if (!title.trim()) errors.title = 'Пожалуйста, введите название курса';
        if (!audience) errors.audience = 'Пожалуйста, выберите тип субъекта';
        if (!lang) errors.lang = 'Пожалуйста, выберите язык курса';
        if (!category) errors.category = 'Пожалуйста, выберите категорию';
        if (price < 0) errors.price = 'Цена не может быть отрицательной';
        if (!typeofstudy) errors.typeofstudy = 'Пожалуйста, выберите тип обучения';
        if (!image && !defImage) errors.image = 'Пожалуйста, загрузите изображение или используйте по умолчанию';
        
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
            urlPath = '/api/aml/course/updateBasicInfo/' + id;
        }

        const formData = {
            title,
            audience,
            lang,
            category,
            price,
            image,
            typeofstudy
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
                console.error("Error saving course data:", error);
                setNotification({
                    open: true,
                    message: 'Ошибка при сохранении данных',
                    severity: 'error'
                });
                setLoading(false);
            });
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
                    Основные данные
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                    <Grid container spacing={4}>
                        {/* Text Inputs Section */}
                        <Grid item xs={12} md={7}>
                            <Card elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                                <Typography 
                                    variant="h5" 
                                    component="h2" 
                                    color="primary.main"
                                    fontWeight={500}
                                    gutterBottom
                                >
                                    Название курса
                                </Typography>
                                
                                <TextField
                                    fullWidth
                                    label="Введите название курса"
                                    variant="outlined"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    error={!!formErrors.title}
                                    helperText={formErrors.title}
                                    margin="normal"
                                    sx={{ mb: 3 }}
                                />
                                
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth error={!!formErrors.audience}>
                                            <InputLabel>Аудитория (Тип Субъекта)</InputLabel>
                                            <Select
                                                value={audience}
                                                onChange={(e) => setAudience(e.target.value)}
                                                label="Аудитория (Тип Субъекта)"
                                            >
                                                <MenuItem value="">--Выберите тип субъекта--</MenuItem>
                                                <MenuItem value="Государственные органы-регуляторы">Государственные органы-регуляторы</MenuItem>
                                                <MenuItem value="Субъект финансового мониторнга">Субъект финансового мониторнга</MenuItem>
                                                <MenuItem value="Правоохранительные">Правоохранительные органы</MenuItem>
                                                <MenuItem value="Общественное объединение">Общественное объединение</MenuItem>
                                                <MenuItem value="Для всех субъектов">Для всех субъектов</MenuItem>
                                            </Select>
                                            {formErrors.audience && <FormHelperText>{formErrors.audience}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth error={!!formErrors.lang}>
                                            <InputLabel>Язык курса</InputLabel>
                                            <Select
                                                value={lang}
                                                onChange={(e) => setLang(e.target.value)}
                                                label="Язык курса"
                                            >
                                                <MenuItem value="">--Выберите язык курса--</MenuItem>
                                                <MenuItem value="ru">Русский</MenuItem>
                                                <MenuItem value="en">Английский</MenuItem>
                                                <MenuItem value="kz">Казахский</MenuItem>
                                            </Select>
                                            {formErrors.lang && <FormHelperText>{formErrors.lang}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth error={!!formErrors.category}>
                                            <InputLabel>Категория</InputLabel>
                                            <Select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                label="Категория"
                                            >
                                                <MenuItem value="">--Выберите категорию--</MenuItem>
                                                <MenuItem value={1}>AML Academy</MenuItem>
                                            </Select>
                                            {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Цена"
                                            type="number"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoneyIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="outlined"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            error={!!formErrors.price}
                                            helperText={formErrors.price}
                                            inputProps={{ min: 0 }}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <FormControl fullWidth error={!!formErrors.typeofstudy}>
                                            <InputLabel>Тип обучения</InputLabel>
                                            <Select
                                                value={typeofstudy}
                                                onChange={(e) => setTypeOfStudy(e.target.value)}
                                                label="Тип обучения"
                                            >
                                                <MenuItem value="">--Выберите тип обучения--</MenuItem>
                                                <MenuItem value="дистанционное">Дистанционное</MenuItem>
                                                <MenuItem value="онлайн">Онлайн</MenuItem>
                                            </Select>
                                            {formErrors.typeofstudy && <FormHelperText>{formErrors.typeofstudy}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        
                        {/* Image Upload Section */}
                        <Grid item xs={12} md={5}>
                            <Card 
                                elevation={0} 
                                sx={{ 
                                    p: 3, 
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                            >
                                <Typography 
                                    variant="h5" 
                                    component="h2" 
                                    color="primary.main"
                                    fontWeight={500}
                                    gutterBottom
                                >
                                    Обложка курса
                                </Typography>
                                
                                <Box 
                                    sx={{ 
                                        mt: 2, 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1
                                    }}
                                >
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            width: 300,
                                            height: 300,
                                            borderRadius: 2,
                                            border: '1px dashed rgba(55, 71, 97, 0.44)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            cursor: 'pointer'
                                        }}
                                        component="label"
                                        htmlFor="upload-image"
                                    >
                                        {loading ? (
                                            <CircularProgress />
                                        ) : image ? (
                                            <Box 
                                                component="img"
                                                src={image.startsWith('data:') ? image : `https://amlacademy.kz/aml/${image}`}
                                                alt="Course cover"
                                                sx={{ 
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <Box 
                                                sx={{ 
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    color: 'secondary.main'
                                                }}
                                            >
                                                <CloudUploadIcon sx={{ fontSize: 60, mb: 1 }} />
                                                <Typography variant="body2">
                                                    Нажмите чтобы загрузить изображение
                                                </Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                    
                                    <input
                                        type="file"
                                        id="upload-image"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        htmlFor="upload-image"
                                        startIcon={<PhotoCamera />}
                                        sx={{ mt: 1, mb: 2 }}
                                    >
                                        Загрузить изображение
                                    </Button>
                                    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={defImage}
                                                onChange={(e) => {
                                                    if (defImage) {
                                                        setImage("");
                                                        setDefImage(false);
                                                    } else {
                                                        setImage(base64Course);
                                                        setImageSource(plusSign);
                                                        setDefImage(true);
                                                    }
                                                }}
                                            />
                                        }
                                        label="Использовать обложку по умолчанию"
                                    />
                                    
                                    {formErrors.image && (
                                        <Typography color="error" variant="caption">
                                            {formErrors.image}
                                        </Typography>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                    
                    <Box 
                        sx={{ 
                            mt: 5, 
                            display: 'flex', 
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
                            {loading ? <CircularProgress size={24} /> : 'Перейти далее'}
                        </Button>
                        
                        <Button
                            variant="text"
                            color="inherit"
                            sx={{ 
                                ml: 3, 
                                color: 'rgba(55, 71, 97, 0.50)',
                                textDecoration: 'underline'
                            }}
                            startIcon={<ArrowBackIcon />}
                        >
                            Вернуться назад
                        </Button>
                    </Box>
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

export default TabBasicInfo;