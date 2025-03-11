import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';

const Login: React.FC = () => {
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
                    py: 5,
                    backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        maxWidth: 500,
                        width: '100%',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                        Olympiad Login
                    </Typography>
                    <Typography>
                        This is a placeholder for the login page
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;