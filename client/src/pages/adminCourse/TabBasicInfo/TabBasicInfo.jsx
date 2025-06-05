import axios from 'axios';
import { useEffect, useState } from 'react';
import base_url from '../../../settings/base_url';
import base64Course from './course-default';

// Component imports
import { ActionButtons, CourseInfoFields, ImageUploader } from './components';

// Material UI imports
import {
    Alert,
    Box,
    Card,
    Container,
    Grid,
    Snackbar,
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

const TabBasicInfo = ({ id, nextStep, title: initialTitle, audience: initAud, lang: initLang, category: initCTG, price: initPrice, image: initImage, typeofstudy: initType, academic_hours: initHours }) => {
    const [title, setTitle] = useState(initialTitle || "");
    const [audience, setAudience] = useState(initAud || "");
    const [lang, setLang] = useState(initLang || "ru");
    const [category, setCategory] = useState(initCTG || 0);
    const [price, setPrice] = useState(initPrice || 0);
    const [defImage, setDefImage] = useState(!initImage || initImage === base64Course);
    const [image, setImage] = useState(initImage || (defImage ? base64Course : ""));
    const [typeofstudy, setTypeOfStudy] = useState(initType || "");
    const [academicHours, setAcademicHours] = useState(initHours || 0);
    
    const [editingExisting, setEditingExisting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const [formErrors, setFormErrors] = useState({});
    
    // Make sure default image is applied when defImage is true
    useEffect(() => {
        if (defImage && !image) {
            setImage(base64Course);
        }
    }, [defImage, image]);useEffect(() => {
        if (id !== 0) {
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
                    
                    const courseImage = res.data.course_image || "";
                    // Check if the image is the default one or empty
                    const isDefaultImage = !courseImage || courseImage === base64Course;
                    setDefImage(isDefaultImage);
                    setImage(isDefaultImage ? base64Course : courseImage);
                    
                    // Handle both type_of_study and course_type_of_study fields
                    const studyType = res.data.type_of_study || res.data.course_type_of_study || "";
                    setTypeOfStudy(studyType);
                    
                    // Handle academic hours field
                    setAcademicHours(res.data.academic_hours || 0);
                    
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
    };    const validateForm = () => {
        const errors = {};
        
        if (!title.trim()) errors.title = 'Пожалуйста, введите название курса';
        if (!audience) errors.audience = 'Пожалуйста, выберите тип субъекта';
        if (!lang) errors.lang = 'Пожалуйста, выберите язык курса';
        if (!category) errors.category = 'Пожалуйста, выберите категорию';
        if (price < 0) errors.price = 'Цена не может быть отрицательной';
        if (academicHours < 1) errors.academicHours = 'Академические часы должны быть больше 0';
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
        }        const formData = {
            title,
            audience,
            lang,
            category,
            price,
            image,
            typeofstudy,
            academic_hours: academicHours
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
                        {/* Course Info Fields Section */}
                        <Grid item xs={12} md={7}>
                            <Card elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                                <CourseInfoFields
                                    title={title}
                                    setTitle={setTitle}
                                    audience={audience}
                                    setAudience={setAudience}
                                    lang={lang}
                                    setLang={setLang}
                                    category={category}
                                    setCategory={setCategory}
                                    price={price}
                                    setPrice={setPrice}
                                    academicHours={academicHours}
                                    setAcademicHours={setAcademicHours}
                                    typeofstudy={typeofstudy}
                                    setTypeOfStudy={setTypeOfStudy}
                                    formErrors={formErrors}
                                />
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
                                <ImageUploader
                                    image={image}
                                    setImage={setImage}
                                    defImage={defImage}
                                    setDefImage={setDefImage}
                                    base64Course={base64Course}
                                    loading={loading}
                                    handleFileChange={handleFileChange}
                                    formErrors={formErrors}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                    
                    <ActionButtons loading={loading} saveAndNext={saveAndNext} />
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