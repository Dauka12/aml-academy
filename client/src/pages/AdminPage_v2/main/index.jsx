import React, { useState } from 'react';
import { useLocation } from 'react-router';
import TabBasicInfo from '../../adminCourse/TabBasicInfo/TabBasicInfo';
import FAQStep from '../../adminCourse/TabFAQ/FaqStep';
import { BuilderNavbar } from '../../adminCourse/builderNavbar/BuilderNavbar';
import NewTabConstructor from '../constructor';
import './style.scss';

// Material UI imports
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Button,
    Fade,
    Paper,
    Step,
    StepConnector,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery,
    Zoom
} from '@mui/material';
import { alpha, createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#374761',
        },
        secondary: {
            main: '#7E869E',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff'
        },
    },
    typography: {
        fontFamily: 'Ubuntu, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '1.75rem',
            color: '#374761'
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 5,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

// Custom styled step connector
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
        borderColor: alpha(theme.palette.primary.main, 0.2),
    },
}));

// Custom styled step label
const CustomStepLabel = styled(StepLabel)(({ theme, active }) => ({
    '& .MuiStepLabel-label': {
        color: active ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.5),
        fontSize: '1rem',
        fontWeight: active ? 500 : 400,
    },
    '& .MuiStepLabel-iconContainer': {
        display: { xs: 'none', md: 'flex' }
    }
}));

// Main function component
function AdminPage_Main() {
    const location = useLocation();
    const axId = new URLSearchParams(location.search).get('id');
    const [currentID, setCurrentID] = useState(axId || 0);
    const [currentStep, setCurrentStep] = useState("basic-info");
    const [save, setSave] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // Steps for the stepper
    const steps = [
        { label: 'Основные данные', value: 'basic-info' },
        { label: 'FAQ', value: 'faq' },
        { label: 'Программа Курса', value: 'constructor' }
    ];
    
    // Get the active step index
    const activeStep = steps.findIndex(step => step.value === currentStep);

    const toFAQ = (id) => {
        setCurrentID(id);
        setCurrentStep("faq");
    };

    const toConsctrutor = () => {
        setCurrentStep("constructor");
    };

    const saveCancel = () => {
        setSave(false);
    };

    const handleSave = () => {
        setSave(true);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100vh',
                    overflow: 'hidden',
                    bgcolor: 'background.default'
                }}
            >
                <BuilderNavbar />
                
                <Box 
                    sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        flexGrow: 1,
                        overflow: 'hidden'
                    }}
                >
                    {/* Sidebar with steps */}
                    <Paper
                        component={motion.div}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        elevation={isMobile ? 0 : 2}
                        sx={{
                            width: { xs: '100%', md: 322 },
                            height: { xs: 'auto', md: '100%' },
                            padding: { 
                                xs: 2, 
                                md: '40px 40px 0px 40px' 
                            },
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: { xs: 'row', md: 'column' },
                            alignItems: { xs: 'center', md: 'flex-start' },
                            justifyContent: { xs: 'space-between', md: 'flex-start' },
                            gap: 2,
                            boxShadow: { 
                                xs: 'none', 
                                md: '4px 4px 9px 0px rgba(0, 0, 0, 0.05)' 
                            },
                            zIndex: 1
                        }}
                    >
                        <Typography 
                            variant="h1" 
                            sx={{ 
                                mb: { xs: 0, md: 2 },
                                display: { xs: 'none', md: 'block' } 
                            }}
                        >
                            Создание курса
                        </Typography>
                        
                        {/* Stepper - desktop version */}
                        <Box 
                            sx={{ 
                                display: { xs: 'none', md: 'block' }, 
                                width: '100%'
                            }}
                        >
                            <Stepper 
                                activeStep={activeStep} 
                                orientation="vertical" 
                                connector={<CustomStepConnector />}
                                sx={{ mt: 1 }}
                            >
                                {steps.map((step, index) => (
                                    <Step key={step.value}>
                                        <CustomStepLabel active={currentStep === step.value}>
                                            {step.label}
                                        </CustomStepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        
                        {/* Mobile Steps */}
                        <Box 
                            sx={{ 
                                display: { xs: 'flex', md: 'none' },
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            {steps.map((step, index) => (
                                <React.Fragment key={step.value}>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            color: currentStep === step.value 
                                                ? 'primary.main' 
                                                : alpha(theme.palette.primary.main, 0.5),
                                            fontWeight: currentStep === step.value ? 500 : 400
                                        }}
                                    >
                                        {step.label}
                                    </Typography>
                                    
                                    {index < steps.length - 1 && (
                                        <ArrowForwardIosIcon 
                                            fontSize="small" 
                                            sx={{ 
                                                color: alpha(theme.palette.primary.main, 0.5),
                                                fontSize: '0.7rem'
                                            }} 
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </Box>
                        
                        {/* Save Button */}
                        <Zoom in={currentStep === 'constructor'}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                sx={{
                                    mt: { xs: 0, md: 'auto' },
                                    mb: { xs: 0, md: 2 },
                                    display: currentStep === 'constructor' ? 'flex' : 'none',
                                    fontWeight: 500,
                                    py: 1,
                                    px: 2
                                }}
                            >
                                <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                                    Сохранить изменения
                                </Box>
                            </Button>
                        </Zoom>
                    </Paper>
                    
                    {/* Main content area */}
                    <Box 
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        sx={{ 
                            flexGrow: 1, 
                            overflow: 'auto',
                            bgcolor: 'background.default',
                            height: { xs: 'calc(100vh - 140px)', md: '100%' }
                        }}
                    >
                        <Fade in timeout={800}>
                            <Box>
                                {currentStep === 'basic-info' && <TabBasicInfo id={currentID} nextStep={toFAQ} />}
                                {currentStep === 'faq' && <FAQStep id={currentID} nextStep={toConsctrutor} />}
                                {currentStep === 'constructor' && <NewTabConstructor saveCancel={saveCancel} save={save} id={currentID} />}
                            </Box>
                        </Fade>
                    </Box>
                </Box>
                
                {/* Notification could be enhanced with MUI Snackbar */}
                {/* {showNotification && <Notification message="Изменения сохранены" onClose={() => setShowNotification(false)} />} */}
            </Box>
        </ThemeProvider>
    );
}

export default AdminPage_Main;