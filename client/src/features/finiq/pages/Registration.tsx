import { Box, Container, Dialog, DialogContent, DialogTitle, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router';
import LanguageToggle from '../components/LanguageToggle.tsx'; // Add import
import RegistrationForm from '../components/RegistrationForm.tsx';
import { olympiadStore } from '../store/index.ts';

const Registration: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [openServerDialog, setOpenServerDialog] = useState(true);

    useEffect(() => {
        // Dialog will be open by default and cannot be closed
    }, []);

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
                            opacity: 0.6,
                        }}
                    />
                    
                    {/* Add LanguageToggle */}
                    <LanguageToggle />

                    <RegistrationForm />
                </Box>

                {/* Persistent dialog that cannot be closed */}
                <Dialog
                    open={openServerDialog}
                    disableEscapeKeyDown
                    hideBackdrop={false}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: theme.shape.borderRadius * 2,
                            p: 2,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'linear-gradient(135deg, #1e2b60 0%, #13203f 100%)',
                        }
                    }}
                    sx={{
                        '& .MuiBackdrop-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)'
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        textAlign: 'center', 
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}>
                        Уведомление о техническом обслуживании
                    </DialogTitle>
                    <DialogContent>
                        <Typography sx={{ 
                            textAlign: 'center', 
                            color: '#fff',
                            mb: 2,
                            opacity: 0.9,
                            fontSize: { xs: '0.95rem', sm: '1.1rem' }
                        }}>
                            В связи с высокой нагрузкой на сервер регистрация временно недоступна.
                        </Typography>
                        <Typography sx={{ 
                            textAlign: 'center', 
                            color: '#fff',
                            opacity: 0.8,
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}>
                            Пожалуйста, попробуйте позже. Приносим извинения за временные неудобства.
                        </Typography>
                    </DialogContent>
                </Dialog>
            </Container>
        </Provider>
    );
};

export default Registration;