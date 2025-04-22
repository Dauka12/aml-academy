import {
    Alert,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    useMediaQuery, useTheme
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import LanguageToggle from '../components/LanguageToggle.tsx';
import LoginForm from '../components/LoginForm.tsx';
import { olympiadStore } from '../store/index.ts';

const Login: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [iin, setIin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetStatus, setResetStatus] = useState<{
        success?: boolean;
        message?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleForgotPasswordOpen = () => {
        setOpenForgotPassword(true);
        setResetStatus({});
    };

    const handleForgotPasswordClose = () => {
        setOpenForgotPassword(false);
        setIin('');
        setEmail('');
        setPassword('');
        setResetStatus({});
    };

    const handlePasswordReset = async () => {
        setIsSubmitting(true);
        setResetStatus({});
        
        try {
            await axios.post('https://amlacademy.kz/api/olympiad/auth/forgot-password', {
                iin,
                email,
                password
            });
            
            setResetStatus({
                success: true,
                message: 'Пароль успешно сброшен'
            });
            
            // Clear form after successful reset
            setIin('');
            setEmail('');
            setPassword('');
            
            // Close dialog after a short delay
            setTimeout(() => {
                handleForgotPasswordClose();
            }, 3000);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Произошла ошибка при сбросе пароля';
            setResetStatus({
                success: false,
                message: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <Provider store={olympiadStore}>
            <Container maxWidth={false} disableGutters>
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        py: 5,
                        backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle, transparent 20%, #1A2751 80%)',
                            opacity: 0.6,
                            zIndex: 1, // Explicitly set a low z-index for the background
                        }}
                    />
                    
                    <Box sx={{ position: 'relative', zIndex: 10 }}>
                        <LanguageToggle />
                    </Box>
                    
                    <Box sx={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <LoginForm />
                        <Button 
                            sx={{ mt: 2, color: '#fff', textDecoration: 'underline' }} 
                            onClick={handleForgotPasswordOpen}
                        >
                            Забыли пароль?
                        </Button>
                    </Box>

                    {/* Forgot Password Dialog */}
                    <Dialog open={openForgotPassword} onClose={handleForgotPasswordClose} maxWidth="xs" fullWidth>
                        <DialogTitle>Сброс пароля</DialogTitle>
                        <DialogContent>
                            {resetStatus.message && (
                                <Alert 
                                    severity={resetStatus.success ? "success" : "error"} 
                                    sx={{ mb: 2 }}
                                >
                                    {resetStatus.message}
                                </Alert>
                            )}
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Пожалуйста, введите свой ИИН, электронную почту и новый пароль
                            </Typography>
                            <TextField
                                margin="dense"
                                label="ИИН"
                                type="text"
                                fullWidth
                                value={iin}
                                onChange={(e) => setIin(e.target.value)}
                                inputProps={{ maxLength: 12 }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="dense"
                                label="Новый пароль"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleForgotPasswordClose} color="primary">
                                Отмена
                            </Button>
                            <Button 
                                onClick={handlePasswordReset} 
                                color="primary"
                                disabled={!iin || !email || !password || isSubmitting}
                            >
                                Сбросить пароль
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Container>
        </Provider>
    );
};

export default Login;