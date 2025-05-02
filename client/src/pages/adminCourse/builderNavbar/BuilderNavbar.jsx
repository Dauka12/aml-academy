import React from 'react';
import { useNavigate } from 'react-router';
import amlLogo from '../images/aml-logo.png';
import './builderNavbar.scss';

// Material UI imports
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const BuilderNavbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar 
            position="static" 
            color="default" 
            elevation={4}
            sx={{ 
                bgcolor: '#fff', 
                boxShadow: '0px 4px 9px 0px rgba(0, 0, 0, 0.09)',
                zIndex: theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ height: 90, px: { xs: 2, md: 5 } }}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 0.9 }
                    }}
                    onClick={() => navigate("/manager")}
                >
                    <Box 
                        component="img"
                        src={amlLogo}
                        alt="AML"
                        sx={{ 
                            width: 79, 
                            height: 'auto',
                            userSelect: 'none' 
                        }}
                    />
                    
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            color: '#21324D',
                            fontFamily: 'Ubuntu, sans-serif',
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box component="span" sx={{ fontWeight: 700, mr: 0.5 }}>AML</Box>
                        <Box component="span" sx={{ fontWeight: 300 }}>Редактор Курса</Box>
                    </Typography>
                </Box>
                
                <Box sx={{ flexGrow: 1 }} />
                
                <IconButton 
                    aria-label="home" 
                    onClick={() => navigate('/')}
                    sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        transition: 'all 0.2s',
                        '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.16),
                        }
                    }}
                >
                    <HomeIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};