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
    useMediaQuery,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import LanguageToggle from '../components/LanguageToggle.tsx';
import LoginForm from '../components/LoginForm.tsx';
import { olympiadStore } from '../store/index.ts';
import {
    resetPasswordWithCode,
    sendResetCode,
    verifyResetCode
} from '../api/authApi.ts';

const Login: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetStatus, setResetStatus] = useState<{
        success?: boolean;
        message?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [forgotStep, setForgotStep] = useState<'email' | 'code' | 'password'>('email');

    const MAX_ATTEMPTS = 7;
    const RETRY_DELAY_MS = 500;

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleForgotPasswordOpen = () => {
        setOpenForgotPassword(true);
        handleForgotPasswordReset();
    };

    const handleForgotPasswordClose = () => {
        setOpenForgotPassword(false);
        handleForgotPasswordReset();
    };

    const handleForgotPasswordReset = () => {
        setEmail('');
        setVerificationCode('');
        setNewPassword('');
        setForgotStep('email');
        setResetStatus({});
    };

    const handleSendResetCode = async () => {
        setIsSubmitting(true);
        setResetStatus({});

        const trimmedEmail = email.trim();
        let attempt = 0;
        let lastError: unknown;

        while (attempt < MAX_ATTEMPTS) {
            try {
                await sendResetCode(trimmedEmail);
                setResetStatus({
                    success: true,
                    message: 'Код подтверждения отправлен на указанную почту'
                });
                setEmail(trimmedEmail);
                setForgotStep('code');
                setIsSubmitting(false);
                return;
            } catch (error) {
                lastError = error;
                attempt += 1;
                await sleep(RETRY_DELAY_MS);
                if (attempt >= MAX_ATTEMPTS) {
                    break;
                }
            }
        }

        const message = lastError instanceof Error ? lastError.message : 'Не удалось отправить код подтверждения';
        setResetStatus({ success: false, message });
        setIsSubmitting(false);
    };

    const handleVerifyCode = async () => {
        setIsSubmitting(true);
        setResetStatus({});

        let attempt = 0;
        let lastError: unknown;

        while (attempt < MAX_ATTEMPTS) {
            try {
                await verifyResetCode({ email, code: verificationCode.trim() });
                setResetStatus({
                    success: true,
                    message: 'Код подтверждения успешно проверен'
                });
                setForgotStep('password');
                setIsSubmitting(false);
                return;
            } catch (error) {
                lastError = error;
                attempt += 1;
                await sleep(RETRY_DELAY_MS);
                if (attempt >= MAX_ATTEMPTS) {
                    break;
                }
            }
        }

        const message = lastError instanceof Error ? lastError.message : 'Код подтверждения недействителен';
        setResetStatus({ success: false, message });
        setIsSubmitting(false);
    };

    const handleResetPassword = async () => {
        setIsSubmitting(true);
        setResetStatus({});

        let attempt = 0;
        let lastError: unknown;

        while (attempt < MAX_ATTEMPTS) {
            try {
                await resetPasswordWithCode({
                    email,
                    code: verificationCode.trim(),
                    newPassword: newPassword
                });
                setResetStatus({
                    success: true,
                    message: 'Пароль успешно сброшен'
                });
                setIsSubmitting(false);
                setTimeout(() => {
                    handleForgotPasswordClose();
                }, 3000);
                return;
            } catch (error) {
                lastError = error;
                attempt += 1;
                await sleep(RETRY_DELAY_MS);
                if (attempt >= MAX_ATTEMPTS) {
                    break;
                }
            }
        }

        const message = lastError instanceof Error ? lastError.message : 'Не удалось сбросить пароль';
        setResetStatus({ success: false, message });
        setIsSubmitting(false);
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
                            {forgotStep === 'email' && (
                                <>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 3,
                                            textAlign: 'center',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        Пожалуйста, введите адрес электронной почты, на который отправить код подтверждения
                                    </Typography>
                                    <TextField
                                        margin="dense"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: isMobile ? '56px' : 'auto',
                                            }
                                        }}
                                    />
                                </>
                            )}

                            {forgotStep === 'code' && (
                                <>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 3,
                                            textAlign: 'center',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        Введите код подтверждения, который мы отправили на вашу почту
                                    </Typography>
                                    <TextField
                                        margin="dense"
                                        label="Код подтверждения"
                                        type="text"
                                        fullWidth
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: isMobile ? '56px' : 'auto',
                                            }
                                        }}
                                    />
                                </>
                            )}

                            {forgotStep === 'password' && (
                                <>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 3,
                                            textAlign: 'center',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        Придумайте новый пароль для входа
                                    </Typography>
                                    <TextField
                                        margin="dense"
                                        label="Новый пароль"
                                        type="password"
                                        fullWidth
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: isMobile ? '56px' : 'auto',
                                            }
                                        }}
                                    />
                                </>
                            )}
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
                                onClick={() => {
                                    if (forgotStep === 'email') {
                                        handleSendResetCode();
                                    } else if (forgotStep === 'code') {
                                        handleVerifyCode();
                                    } else {
                                        handleResetPassword();
                                    }
                                }}
                                variant="contained"
                                disabled={isSubmitting ||
                                    (forgotStep === 'email' && !email) ||
                                    (forgotStep === 'code' && !verificationCode) ||
                                    (forgotStep === 'password' && !newPassword)
                                }
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
                                {forgotStep === 'email' && 'Отправить код'}
                                {forgotStep === 'code' && 'Подтвердить код'}
                                {forgotStep === 'password' && 'Сбросить пароль'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Container>
        </Provider>
    );
};

export default Login;