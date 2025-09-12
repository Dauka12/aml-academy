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
                        py: isMobile ? 3 : 5,
                        px: isMobile ? 1 : 3,
                        backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
                        overflowY: 'auto'
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
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button 
                                sx={{ 
                                    mt: 3, 
                                    color: 'rgba(255, 255, 255, 0.9)', 
                                    textDecoration: 'underline',
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    fontWeight: 500,
                                    '&:hover': {
                                        color: '#fff',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        textDecoration: 'underline'
                                    },
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1
                                }} 
                                onClick={handleForgotPasswordOpen}
                            >
                                Забыли пароль?
                            </Button>
                        </motion.div>
                    </Box>

                    {/* Forgot Password Dialog */}
                    <Dialog 
                        open={openForgotPassword} 
                        onClose={handleForgotPasswordClose} 
                        maxWidth="sm" 
                        fullWidth
                        fullScreen={isMobile}
                        PaperProps={{
                            sx: {
                                borderRadius: isMobile ? 0 : theme.shape.borderRadius * 2,
                                mx: isMobile ? 0 : 2
                            }
                        }}
                    >
                        <DialogTitle sx={{
                            pb: 1,
                            pt: 3,
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            color: '#1A2751'
                        }}>
                            Сброс пароля
                        </DialogTitle>
                        <DialogContent sx={{ px: isMobile ? 2 : 4 }}>
                            {resetStatus.message && (
                                <Alert 
                                    severity={resetStatus.success ? "success" : "error"} 
                                    sx={{ mb: 2 }}
                                >
                                    {resetStatus.message}
                                </Alert>
                            )}
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    mb: 3,
                                    textAlign: 'center',
                                    color: 'text.secondary'
                                }}
                            >
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
                                sx={{ 
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        height: isMobile ? '56px' : 'auto',
                                    }
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ 
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        height: isMobile ? '56px' : 'auto',
                                    }
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Новый пароль"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: isMobile ? '56px' : 'auto',
                                    }
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{
                            justifyContent: 'center',
                            p: 3,
                            gap: 2,
                            flexDirection: isMobile ? 'column' : 'row'
                        }}>
                            <Button 
                                onClick={handleForgotPasswordClose} 
                                variant="outlined"
                                sx={{
                                    borderColor: '#1A2751',
                                    color: '#1A2751',
                                    '&:hover': {
                                        borderColor: '#1A2751',
                                        backgroundColor: 'rgba(26, 39, 81, 0.04)',
                                    },
                                    px: 4,
                                    py: 1.5,
                                    width: isMobile ? '100%' : 'auto',
                                    maxWidth: { xs: '300px', sm: 'none' },
                                }}
                            >
                                Отмена
                            </Button>
                            <Button 
                                onClick={handlePasswordReset} 
                                variant="contained"
                                disabled={!iin || !email || !password || isSubmitting}
                                sx={{
                                    bgcolor: '#1A2751',
                                    '&:hover': {
                                        bgcolor: '#13203f',
                                    },
                                    px: 4,
                                    py: 1.5,
                                    width: isMobile ? '100%' : 'auto',
                                    maxWidth: { xs: '300px', sm: 'none' },
                                }}
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