import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import base_url from '../../settings/base_url';

const ApplicationForm = ({ eventId }) => {
    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        comment: '',
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const { t } = useTranslation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${base_url}/api/aml/event/makeRequestEvent`, null, {
                params: {
                    id: eventId,
                    ...formData
                }
            });
            setSnackbar({ open: true, message: t('Заявка успешно отправлена') });
            setFormData({ username: '', phoneNumber: '', email: '', comment: '' });
        } catch (error) {
            console.error("Error submitting form:", error);
            setSnackbar({ open: true, message: t('Ошибка при отправке заявки') });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                {t('Оставить заявку')}
            </Typography>
            <TextField
                fullWidth
                label={t('Имя')}
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label={t('Номер телефона')}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label={t('Email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label={t('Комментарий')}
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                {t('Отправить заявку')}
            </Button>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </Box>
    );
};

export default ApplicationForm;