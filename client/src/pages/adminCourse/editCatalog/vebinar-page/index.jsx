import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    Card,
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

export default function VebinarPage() {
    const [webinars, setWebinars] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [currentWebinar, setCurrentWebinar] = useState({
        type: '',
        name: '',
        webinar_for_member_of_the_system: '',
        description: '',
        date: '',
        link: '',
        multipartFile: null
    });
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
        axios.get(`${base_url}/api/aml/webinar/getWebinars`, {
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

    const handleCreateWebinar = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('type', currentWebinar.type);
        formData.append('name', currentWebinar.name);
        formData.append('description', currentWebinar.description);
        formData.append('webinar_for_member_of_the_system', currentWebinar.webinar_for_member_of_the_system);

        // Format date to ISO string
        const isoDate = new Date(currentWebinar.date).toISOString();
        formData.append('date', isoDate);

        formData.append('link', currentWebinar.link);

        if (currentWebinar.multipartFile) {
            formData.append('multipartFile', currentWebinar.multipartFile);
        }

        axios.post(`${base_url}/api/aml/webinar/createWebinar`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(() => {
                fetchWebinars();
                showNotification('Вебинар успешно создан');
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error creating webinar:', error);
                showNotification('Ошибка при создании вебинара', 'error');
            });
    };

    const openModal = () => {
        setCurrentWebinar({
            type: '',
            name: '',
            webinar_for_member_of_the_system: '',
            description: '',
            date: '',
            link: '',
            multipartFile: null
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
                onClick={openModal}
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
                                    image={webinar.image}
                                    alt={webinar.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {webinar.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Дата: {webinar.date}
                                    </Typography>
                                    <Typography variant="body2">
                                        {webinar.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            
            <Dialog open={showModal} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Создать вебинар
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box component="form" onSubmit={handleCreateWebinar} sx={{ '& .MuiTextField-root': { my: 1 } }}>
                        <TextField
                            fullWidth
                            name="type"
                            label="Тип"
                            value={currentWebinar.type}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="name"
                            label="Название"
                            value={currentWebinar.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="webinar_for_member_of_the_system"
                            label="Аудитория"
                            value={currentWebinar.webinar_for_member_of_the_system}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="description"
                            label="Описание"
                            multiline
                            rows={4}
                            value={currentWebinar.description}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            name="date"
                            label="Дата"
                            type="datetime-local"
                            value={currentWebinar.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <TextField
                            fullWidth
                            name="link"
                            label="URL"
                            value={currentWebinar.link}
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
                                    name="multipartFile"
                                    onChange={handleChange}
                                    required
                                    hidden
                                />
                            </Button>
                            {currentWebinar.multipartFile && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Выбран файл: {currentWebinar.multipartFile.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Отмена</Button>
                    <Button 
                        onClick={handleCreateWebinar} 
                        variant="contained"
                        color="success"
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
