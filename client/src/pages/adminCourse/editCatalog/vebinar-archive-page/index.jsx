import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import base_url from "../../../../settings/base_url";

export default function VebinarArchivePage() {
    const [webinars, setWebinars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [modalType, setModalType] = useState(null);
    const [currentWebinar, setCurrentWebinar] = useState({});
    const [showModal, setShowModal] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');
    
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
        fetchWebinars();
    }, []);

    const fetchWebinars = () => {
        axios.get(`${base_url}/api/aml/webinar/archive/getWebinars`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
        })
            .then((res) => {
                setWebinars(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching webinars:", error);
                setLoading(false);
                showNotification("Ошибка при загрузке вебинаров", "error");
            });
    };

    const handleCreateUpdateWebinar = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('data', JSON.stringify({
            webinar_name: currentWebinar.webinar_name,
            webinar_description: currentWebinar.webinar_description,
            webinar_url: currentWebinar.webinar_url,
            webinar_date: currentWebinar.webinar_date,
            webinar_for_member_of_the_system: currentWebinar.webinar_for_member_of_the_system
        }));

        if (currentWebinar.webinar_image && currentWebinar.webinar_image instanceof File) {
            formData.append('file', currentWebinar.webinar_image);
        }

        const url = modalType === 'create'
            ? `${base_url}/api/aml/webinar/archive/createWebinar`
            : `${base_url}/api/aml/webinar/archive/updateWebinar/${currentWebinar.webinarA_id}`;

        axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(() => {
                fetchWebinars();
                showNotification(`Вебинар успешно ${modalType === 'create' ? 'создан' : 'изменен'}`);
                setShowModal(false);
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    showNotification("Ошибка авторизации. Проверьте ваши права доступа.", "error");
                } else {
                    showNotification(`Ошибка ${modalType === 'create' ? 'создания' : 'изменения'} вебинара`, "error");
                }
            });
    };

    const handleDeleteWebinar = (id) => {
        if (window.confirm('Вы точно хотите удалить этот вебинар?')) {
            axios.delete(`${base_url}/api/aml/webinar/archive/deleteWebinar/${id}`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
            })
                .then(() => {
                    fetchWebinars();
                    showNotification('Вебинар успешно удален');
                })
                .catch((error) => {
                    console.error("Error deleting webinar:", error);
                    showNotification('Ошибка при удалении вебинара', 'error');
                });
        }
    };

    const openModal = (type, webinar = {}) => {
        setModalType(type);
        setCurrentWebinar(webinar);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentWebinar({});
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setCurrentWebinar({ ...currentWebinar, [name]: files[0] });
        } else {
            setCurrentWebinar({ ...currentWebinar, [name]: value });
        }
    };

    return (
        <Box>
            {/* Notification Snackbar */}
            <Snackbar 
                open={notification.open} 
                autoHideDuration={6000} 
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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

            <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={() => openModal('create')}
                sx={{ 
                    mb: 3, 
                    bgcolor: '#334661', 
                    '&:hover': { bgcolor: '#334661cc' }
                }}
            >
                Создать вебинар
            </Button>
            
            {isLoading ? (
                <Typography>Загрузка...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {webinars.map((webinar, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={webinar.webinar_image}
                                    alt={webinar.webinar_name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {webinar.webinar_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Дата: {webinar.webinar_date}
                                    </Typography>
                                    <Typography variant="body2">
                                        {webinar.webinar_description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        startIcon={<EditIcon />} 
                                        onClick={() => openModal('edit', webinar)}
                                        color="primary"
                                    >
                                        Изменить
                                    </Button>
                                    <Button 
                                        size="small" 
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteWebinar(webinar.webinarA_id)}
                                        color="error"
                                    >
                                        Удалить
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            
            <Dialog open={showModal} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {modalType === 'create' ? 'Создать вебинар' : 'Изменить вебинар'}
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box component="form" onSubmit={handleCreateUpdateWebinar} sx={{ '& .MuiTextField-root': { my: 1 } }}>
                        <TextField
                            fullWidth
                            name="webinar_name"
                            label="Название"
                            value={currentWebinar.webinar_name || ''}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="webinar_description"
                            label="Описание"
                            multiline
                            rows={4}
                            value={currentWebinar.webinar_description || ''}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="webinar_date"
                            label="Дата"
                            value={currentWebinar.webinar_date || ''}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="webinar_url"
                            label="URL"
                            value={currentWebinar.webinar_url || ''}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="webinar_for_member_of_the_system"
                            label="Для участников системы"
                            value={currentWebinar.webinar_for_member_of_the_system || ''}
                            onChange={handleChange}
                            required
                        />
                        <Box sx={{ my: 2 }}>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Загрузить изображение
                                <input
                                    type="file"
                                    name="webinar_image"
                                    onChange={handleChange}
                                    required={modalType === 'create'}
                                    hidden
                                />
                            </Button>
                            {currentWebinar.webinar_image instanceof File && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Выбран файл: {currentWebinar.webinar_image.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Отмена</Button>
                    <Button 
                        onClick={handleCreateUpdateWebinar} 
                        variant="contained"
                        color="primary"
                    >
                        {modalType === 'create' ? 'Создать' : 'Изменить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};