import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
    Box,
    Button,
    CircularProgress,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOlympiadDispatch, useOlympiadSelector } from '../hooks/useOlympiadStore.ts';
import { registerStudentThunk } from '../store/slices/registrationSlice.ts';
import { RegisterStudentRequest } from '../types/student.ts';

const MotionPaper = motion(Paper);

interface FormErrors {
    firstname?: string;
    lastname?: string;
    middlename?: string;
    iin?: string;
    phone?: string;
    university?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useOlympiadDispatch();
    const { isLoading, success, error } = useOlympiadSelector((state) => state.registration);

    const [formData, setFormData] = useState<RegisterStudentRequest & { confirmPassword: string }>({
        firstname: '',
        lastname: '',
        middlename: '',
        iin: '',
        phone: '',
        university: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (success) {
            // Simulate API response delay for better UX
            const timer = setTimeout(() => {
                navigate('/olympiad/login');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstname.trim()) newErrors.firstname = 'Имя обязательно';
        if (!formData.lastname.trim()) newErrors.lastname = 'Фамилия обязательна';
        if (!formData.iin.trim()) newErrors.iin = 'ИИН обязателен';
        else if (!/^\d{12}$/.test(formData.iin)) newErrors.iin = 'ИИН должен содержать 12 цифр';

        if (!formData.phone.trim()) newErrors.phone = 'Телефон обязателен';
        else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, '')))
            newErrors.phone = 'Введите корректный номер телефона';

        if (!formData.university.trim()) newErrors.university = 'Университет обязателен';

        if (!formData.email.trim()) newErrors.email = 'Email обязателен';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = 'Введите корректный email';

        if (!formData.password) newErrors.password = 'Пароль обязателен';
        else if (formData.password.length < 6)
            newErrors.password = 'Пароль должен содержать не менее 6 символов';

        if (!formData.confirmPassword) newErrors.confirmPassword = 'Подтвердите пароль';
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Пароли не совпадают';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const { confirmPassword, ...registerData } = formData;
            dispatch(registerStudentThunk(registerData));
        }
    };

    return (
        <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 800,
                width: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <EmojiEventsIcon sx={{ fontSize: 60, color: '#f5b207', mb: 2 }} />
                </motion.div>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#1A2751',
                        textAlign: 'center',
                        mb: 1
                    }}
                >
                    Регистрация на олимпиаду
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        maxWidth: '80%'
                    }}
                >
                    Заполните форму для участия в олимпиаде AFM Academy
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Фамилия"
                            name="lastname"
                            variant="outlined"
                            value={formData.lastname}
                            onChange={handleChange}
                            error={!!errors.lastname}
                            helperText={errors.lastname}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Имя"
                            name="firstname"
                            variant="outlined"
                            value={formData.firstname}
                            onChange={handleChange}
                            error={!!errors.firstname}
                            helperText={errors.firstname}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Отчество"
                            name="middlename"
                            variant="outlined"
                            value={formData.middlename}
                            onChange={handleChange}
                            error={!!errors.middlename}
                            helperText={errors.middlename}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ИИН"
                            name="iin"
                            variant="outlined"
                            value={formData.iin}
                            onChange={handleChange}
                            error={!!errors.iin}
                            helperText={errors.iin}
                            disabled={isLoading}
                            inputProps={{ maxLength: 12 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Телефон"
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            disabled={isLoading}
                            placeholder="+7 (XXX) XXX-XX-XX"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Университет"
                            name="university"
                            variant="outlined"
                            value={formData.university}
                            onChange={handleChange}
                            error={!!errors.university}
                            helperText={errors.university}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            disabled={isLoading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Пароль"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            disabled={isLoading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Подтверждение пароля"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            disabled={isLoading}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                {error && (
                    <Box mt={2}>
                        <FormHelperText error>{error}</FormHelperText>
                    </Box>
                )}

                <Box
                    mt={4}
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={2}
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/olympiad/login')}
                        disabled={isLoading}
                        sx={{
                            borderColor: '#1A2751',
                            color: '#1A2751',
                            '&:hover': {
                                borderColor: '#1A2751',
                                backgroundColor: 'rgba(26, 39, 81, 0.04)',
                            },
                            px: 4,
                            py: 1,
                        }}
                    >
                        Уже есть аккаунт
                    </Button>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                bgcolor: '#1A2751',
                                '&:hover': {
                                    bgcolor: '#13203f',
                                },
                                px: 4,
                                py: 1,
                            }}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isLoading ? 'Регистрация...' : success ? 'Регистрация выполнена!' : 'Зарегистрироваться'}
                        </Button>
                    </motion.div>
                </Box>
            </form>
        </MotionPaper>
    );
};

export default RegistrationForm;