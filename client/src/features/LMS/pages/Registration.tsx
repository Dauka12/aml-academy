import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router';
import RegistrationForm from '../components/RegistrationForm.tsx';

const Registration: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    
    return (
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

                    <RegistrationForm />
                </Box>
            </Container>
    );
};

export default Registration;