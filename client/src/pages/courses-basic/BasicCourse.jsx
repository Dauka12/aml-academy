import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';

// MUI components
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    LinearProgress,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Rating,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';

// MUI Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DevicesIcon from '@mui/icons-material/Devices';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PaymentIcon from '@mui/icons-material/Payment';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// Components
import FeedBacks from '../../components/feedbackBlock/FeedBacks';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/v2';
import PaymentHalyk from '../paymentPage/PaymentHalyk';

// Assets
import qr from './../../assets/icons/cashless-payment.png';
import lector1 from './../../assets/images/Lector_1_cropped.png';
import lector2 from './../../assets/images/Lector_2_cropped.png';
import lector3 from './../../assets/images/Lector_3_cropped.png';

// Settings
import base_url from '../../settings/base_url';

// Custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1F3C88',
            light: '#2D56B3',
            dark: '#152a5f',
        },
        secondary: {
            main: '#e9e9e9',
            dark: '#d0d0d0',
        },
        success: {
            main: '#4CAF50',
        },
        text: {
            primary: '#343434',
            secondary: '#666666',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'Inter, Ubuntu, Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: '1rem',
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.9rem',
            lineHeight: 1.5,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                },
                sizeLarge: {
                    padding: '12px 24px',
                    fontSize: '1rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&:before': {
                        display: 'none',
                    },
                    '&.Mui-expanded': {
                        margin: '8px 0',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    padding: '0 16px',
                    minHeight: 56,
                    '&.Mui-expanded': {
                        minHeight: 56,
                    },
                },
                content: {
                    margin: '12px 0',
                    '&.Mui-expanded': {
                        margin: '12px 0',
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '8px 16px 16px',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    margin: '24px 0',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                padding: {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    padding: '8px 0',
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 24,
                    '&:last-child': {
                        paddingBottom: 24,
                    },
                },
            },
        },
    },
});

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

function BasicCourse() {
    const jwtToken = localStorage.getItem('jwtToken');
    let user_id = localStorage.getItem("user_id");
    const { t } = useTranslation();
    const { id } = useParams();
    let user_idd = parseInt(user_id, 10);
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const isTablet = useMediaQuery(muiTheme.breakpoints.down('lg'));

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    const [request, setRequest] = useState({
        email: '',
        name: '',
        phone: ''
    });

    const isModuleCourse = (course) => course && [41, 47, 79, 81].includes(course.course_id);
    const isFreeCourse = (course) => course && (course.course_price === 0 || course.course_price === 1);
    const userHasAccess = (userId) => data2 && data2.includes(userId);

    useEffect(() => {
        if (location.search.includes('81') || location.pathname.includes('81')) {
            setKazakh(true);
        }
    }, [location]);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const requestOnchange = (key, value) => {
        setRequest(
            { ...request, [key]: value }
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/justGetCourseById/${id}`);
                const responseUserCourse = await axios.get(`${base_url}/api/aml/course/getUserBazovii`);
                if (response.status === 200) {
                    setData(response.data);
                    setData2(responseUserCourse.data);
                    console.log(responseUserCourse.data);
                } else {
                    setError(response.statusText);
                }
            } catch (error) {
                setError(error);
                console.error(error);
            }

            setLoading(false);
        };

        fetchData();
    }, [id]);

    // Function to get course action button
    const getCourseActionButton = (size = 'large', fullWidth = false) => {
        if (jwtToken !== null) {
            if (isModuleCourse(data) && !userHasAccess(user_idd)) {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size={size}
                        fullWidth={fullWidth}
                        onClick={handleClickOpen}
                        endIcon={<PaymentIcon />}
                        component={motion.button}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {t("buy a module")}
                    </Button>
                );
            } else if (isModuleCourse(data) && userHasAccess(user_idd)) {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size={size}
                        fullWidth={fullWidth}
                        component={RouterLink}
                        to={`/courses/${id}/read`}
                        endIcon={<PlayCircleOutlineIcon />}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {isKazakh ? 'Сабақты өту' : 'Пройти урок'}
                    </Button>
                );
            } else if (isFreeCourse(data)) {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size={size}
                        fullWidth={fullWidth}
                        component={RouterLink}
                        to={`/courses/${id}/read`}
                        endIcon={<PlayCircleOutlineIcon />}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {isKazakh ? 'Сабақты өту' : 'Пройти урок'}
                    </Button>
                );
            } else {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size={size}
                        fullWidth={fullWidth}
                        onClick={handleClickOpen}
                        endIcon={<PaymentIcon />}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {t("buy a course")}
                    </Button>
                );
            }
        } else {
            if (isFreeCourse(data)) {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size={size}
                        fullWidth={fullWidth}
                        component={RouterLink}
                        to="/login"
                        endIcon={<PlayCircleOutlineIcon />}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {isKazakh ? 'Сабақты өту' : 'Пройти урок'}
                    </Button>
                );
            } else {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        size={size}
                        fullWidth={fullWidth}
                        component={RouterLink}
                        to="/login"
                        endIcon={<PaymentIcon />}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {t("buy a course")}
                    </Button>
                );
            }
        }
    };

    // Extract agenda items into a list format
    const getAgendaItems = (agendaHtml) => {
        if (!agendaHtml) return [];
        // Basic parsing to extract numbered items from HTML
        const matches = agendaHtml.match(/\d+\.\s[^<.]+/g) || [];
        return matches.map(item => item.trim());
    };

    // Get features list from course data
    const getFeaturesList = (course) => {
        if (!course) return [];

        const features = [];

        if (course.what_is_duration) {
            features.push({
                icon: <AccessTimeIcon />,
                text: course.what_is_duration
            });
        }

        if (course.what_is_availability) {
            features.push({
                icon: <CalendarTodayIcon />,
                text: t("Access period") + ": " +
                    course.what_is_availability.replace(/пользователю/i, "").replace(/\./g, "")
            });
        }

        if (course.type_of_study) {
            features.push({
                icon: <DevicesIcon />,
                text: t("Study format") + ": " + course.type_of_study
            });
        }

        features.push({
            icon: <LanguageIcon />,
            text: t("Available in") + ": " + (isKazakh ? "Қазақ тілінде" : "Русский язык")
        });

        if (!isFreeCourse(course)) {
            features.push({
                icon: <WorkspacePremiumIcon />,
                text: isModuleCourse(course)
                    ? t("Module completion certificate")
                    : t("Course completion certificate")
            });
        }

        return features;
    };

    return (
        <ThemeProvider theme={theme}>
            <Header dark={true} />

            <Box sx={{ 
                bgcolor: 'background.default', 
                minHeight: '100vh', 
                height: 'auto',
                pt: { xs: 10, md: 12 }, // Увеличиваем отступ сверху для компенсации фиксированного Header
                pb: 8,
                overflow: 'visible'
            }}>
                <Container maxWidth="lg" sx={{ 
                    minHeight: 'auto',
                    height: 'auto',
                    overflow: 'visible'
                }}>
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        sx={{ mb: 2, color: 'text.secondary' }}
                    >
                        <Link underline="hover" color="inherit" component={RouterLink} to="/">
                            {t("Home")}
                        </Link>
                        <Link underline="hover" color="inherit" component={RouterLink} to="/courses">
                            {t("Courses")}
                        </Link>
                        <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                            {isLoading ? t("Loading...") : (
                                isModuleCourse(data)
                                    ? t("Module")
                                    : isFreeCourse(data)
                                        ? t("Free lesson")
                                        : t("Course")
                            )}
                        </Typography>
                    </Breadcrumbs>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Skeleton variant="rectangular" height={60} />
                            <Skeleton variant="rectangular" height={400} />
                            <Skeleton variant="rectangular" height={200} />
                        </Box>
                    ) : (
                        <AnimatePresence>
                            <Grid container spacing={4}>
                                {/* Main content column */}
                                <Grid item xs={12} lg={8}>
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeIn}
                                    >
                                        {/* Course Hero Section */}
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                mb: 4,
                                                overflow: 'hidden',
                                                bgcolor: 'background.paper',
                                            }}
                                        >
                                            {/* Course header image */}
                                            <Box
                                                sx={{
                                                    height: { xs: 200, sm: 240 },
                                                    width: '100%',
                                                    position: 'relative',
                                                    bgcolor: 'primary.dark',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {data.course_image ? (
                                                    <img
                                                        src={`${base_url}/aml/${data.course_image}`}
                                                        alt={data.course_name}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            height: '100%',
                                                            width: '100%',
                                                            background: `linear-gradient(135deg, #1F3C88 0%, #2D56B3 100%)`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <SchoolIcon sx={{ fontSize: 80, color: 'white', opacity: 0.7 }} />
                                                    </Box>
                                                )}

                                                {/* Overlay gradient */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
                                                    }}
                                                />

                                                {/* Course title on image (mobile only) */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        p: 3,
                                                        width: '100%',
                                                        display: { xs: 'block', md: 'none' }
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h1"
                                                        sx={{
                                                            color: 'white',
                                                            fontSize: { xs: '1.5rem', sm: '2rem' },
                                                            textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
                                                        }}
                                                    >
                                                        {data.course_name}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Course content */}
                                            <Box sx={{ p: { xs: 2, md: 4 } }}>
                                                {/* Desktop title */}
                                                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                                    <Typography variant="h1" gutterBottom>
                                                        {data.course_name}
                                                    </Typography>
                                                </Box>

                                                {/* Stats row */}
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    sx={{
                                                        flexWrap: 'wrap',
                                                        gap: 1,
                                                        mb: 3
                                                    }}
                                                >
                                                    <Chip
                                                        icon={<AccessTimeIcon />}
                                                        label={data.duration}
                                                        variant="outlined"
                                                        color="primary"
                                                    />

                                                    {data.rating && (
                                                        <Chip
                                                            icon={<StarIcon />}
                                                            label={`${data.rating}/5`}
                                                            variant="outlined"
                                                            color="primary"
                                                        />
                                                    )}

                                                    {!isFreeCourse(data) && (
                                                        <Chip
                                                            icon={<AttachMoneyIcon />}
                                                            label={`${data.course_price} тенге`}
                                                            variant="outlined"
                                                            color="primary"
                                                        />
                                                    )}

                                                    {data.course_for_member_of_the_system && (
                                                        <Chip
                                                            icon={<GroupIcon />}
                                                            label={data.course_for_member_of_the_system}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </Stack>

                                                {/* Course description */}
                                                <Typography variant="body1" paragraph>
                                                    {data.what_course_represents}
                                                </Typography>

                                                {/* Mobile CTA Button */}
                                                <Box sx={{ display: { xs: 'block', lg: 'none' }, mt: 3, mb: 2 }}>
                                                    {getCourseActionButton('large', true)}
                                                </Box>
                                            </Box>
                                        </Paper>

                                        {/* Content Tabs */}
                                        <Paper elevation={1} sx={{ mb: 4 }}>
                                            <Tabs
                                                value={tabIndex}
                                                onChange={handleTabChange}
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                sx={{
                                                    borderBottom: 1,
                                                    borderColor: 'divider',
                                                    px: 2
                                                }}
                                            >
                                                <Tab label={t("Overview")} id="tab-0" />
                                                <Tab label={t("Content")} id="tab-1" />
                                                <Tab label={t("Instructors")} id="tab-2" />
                                                <Tab label={t("Reviews")} id="tab-3" />
                                            </Tabs>

                                            {/* Tab 1: Overview */}
                                            <Box
                                                role="tabpanel"
                                                hidden={tabIndex !== 0}
                                                id="tabpanel-0"
                                                sx={{ p: { xs: 2, sm: 3 } }}
                                            >
                                                {tabIndex === 0 && (
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={staggerContainer}
                                                    >
                                                        {/* What you'll learn */}
                                                        <motion.div variants={fadeInUp}>
                                                            <Typography variant="h3" gutterBottom>
                                                                {t("What you'll learn")}
                                                            </Typography>

                                                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                                                {getAgendaItems(data.what_is_agenda_of_course).map((item, index) => (
                                                                    <Grid item xs={12} sm={6} key={index}>
                                                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                                                            <CheckCircleOutlineIcon color="success" sx={{ mt: 0.3 }} />
                                                                            <Typography variant="body1">
                                                                                {item.replace(/^\d+\.\s/, '')}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        </motion.div>

                                                        <Divider />

                                                        {/* Requirements */}
                                                        <motion.div variants={fadeInUp}>
                                                            <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
                                                                {t("Requirements")}
                                                            </Typography>

                                                            <Typography variant="body1" paragraph>
                                                                {data.who_course_intended_for}
                                                            </Typography>
                                                        </motion.div>

                                                        <Divider />

                                                        {/* Course/Module Features */}
                                                        <motion.div variants={fadeInUp}>
                                                            <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
                                                                {isModuleCourse(data) ? t("Module features") : t("Course features")}
                                                            </Typography>

                                                            <Grid container spacing={3}>
                                                                {getFeaturesList(data).map((feature, index) => (
                                                                    <Grid item xs={12} md={6} key={index}>
                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                            <Avatar
                                                                                sx={{
                                                                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                                    color: 'primary.main'
                                                                                }}
                                                                            >
                                                                                {feature.icon}
                                                                            </Avatar>
                                                                            <Typography variant="body1">
                                                                                {feature.text}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        </motion.div>

                                                        {data.what_you_will_get && (
                                                            <>
                                                                <Divider />
                                                                <motion.div variants={fadeInUp}>
                                                                    <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
                                                                        {t("What you get")}
                                                                    </Typography>

                                                                    <Typography variant="body1">
                                                                        {data.what_you_will_get}
                                                                    </Typography>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </Box>

                                            {/* Tab 2: Content */}
                                            <Box
                                                role="tabpanel"
                                                hidden={tabIndex !== 1}
                                                id="tabpanel-1"
                                                sx={{ p: { xs: 2, sm: 3 } }}
                                            >
                                                {tabIndex === 1 && (
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={fadeIn}
                                                    >
                                                        <Typography variant="h3" gutterBottom>
                                                            {isModuleCourse(data) ? t("Module content") : t("Course content")}
                                                        </Typography>

                                                        <Box sx={{ mb: 2 }}>
                                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                                {isModuleCourse(data)
                                                                    ? `${getAgendaItems(data.what_is_agenda_of_course).length} ${t("sections")} • ${data.duration}`
                                                                    : `${getAgendaItems(data.what_is_agenda_of_course).length} ${t("sections")} • ${data.duration}`
                                                                }
                                                            </Typography>
                                                        </Box>

                                                        {/* Content accordion */}
                                                        {getAgendaItems(data.what_is_agenda_of_course).map((item, index) => (
                                                            <Accordion key={index} defaultExpanded={index === 0}>
                                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                                    <Typography sx={{ fontWeight: 500 }}>
                                                                        {index + 1}. {item.replace(/^\d+\.\s/, '')}
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <PlayCircleOutlineIcon color="action" />
                                                                        <Typography variant="body2">
                                                                            {t("Content will be available after enrollment")}
                                                                        </Typography>
                                                                    </Box>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))}

                                                        {/* Learning Process Section */}
                                                        {data != null && !isFreeCourse(data) && (
                                                            <Box sx={{ mt: 4 }}>
                                                                <Typography variant="h3" gutterBottom>
                                                                    {t("learning process")}
                                                                </Typography>

                                                                <Paper
                                                                    variant="outlined"
                                                                    sx={{
                                                                        p: 3,
                                                                        borderRadius: 2,
                                                                        bgcolor: alpha(theme.palette.primary.main, 0.03)
                                                                    }}
                                                                >
                                                                    <Grid container spacing={2} alignItems="center">
                                                                        {[
                                                                            {
                                                                                text: t("Enrollment"),
                                                                                icon: <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                                                                            },
                                                                            {
                                                                                text: t("payment"),
                                                                                icon: <PaymentIcon color="primary" sx={{ fontSize: 40 }} />
                                                                            },
                                                                            {
                                                                                text: t("providing access"),
                                                                                icon: <DevicesIcon color="primary" sx={{ fontSize: 40 }} />
                                                                            },
                                                                            {
                                                                                text: t("training"),
                                                                                icon: <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
                                                                            },
                                                                            {
                                                                                text: isModuleCourse(data) ? t("test") : t("certificate"),
                                                                                icon: <WorkspacePremiumIcon color="primary" sx={{ fontSize: 40 }} />
                                                                            }
                                                                        ].map((item, index) => (
                                                                            <React.Fragment key={index}>
                                                                                <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                                                                                    <Paper
                                                                                        component={motion.div}
                                                                                        whileHover={{
                                                                                            y: -5,
                                                                                            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
                                                                                        }}
                                                                                        sx={{
                                                                                            height: 100,
                                                                                            display: 'flex',
                                                                                            flexDirection: 'column',
                                                                                            alignItems: 'center',
                                                                                            justifyContent: 'center',
                                                                                            p: 2,
                                                                                            borderRadius: 2
                                                                                        }}
                                                                                        elevation={1}
                                                                                    >
                                                                                        {item.icon}
                                                                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                                                                            {item.text}
                                                                                        </Typography>
                                                                                    </Paper>
                                                                                </Grid>

                                                                                {index < 4 && (
                                                                                    <Grid item xs={0} sm={0.5} sx={{
                                                                                        display: { xs: 'none', sm: 'flex' },
                                                                                        justifyContent: 'center'
                                                                                    }}>
                                                                                        <ArrowForwardIcon color="action" />
                                                                                    </Grid>
                                                                                )}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </Grid>
                                                                </Paper>
                                                            </Box>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </Box>

                                            {/* Tab 3: Instructors */}
                                            <Box
                                                role="tabpanel"
                                                hidden={tabIndex !== 2}
                                                id="tabpanel-2"
                                                sx={{ p: { xs: 2, sm: 3 } }}
                                            >
                                                {tabIndex === 2 && (
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={staggerContainer}
                                                    >
                                                        <Typography variant="h3" gutterBottom>
                                                            {t("Meet your instructors")}
                                                        </Typography>

                                                        <Grid container spacing={3}>

                                                            {
                                                                [{
                                                                    img: lector1,
                                                                    name: 'Махметов Муратбек',
                                                                    title: t("Senior Instructor"),
                                                                    text: t("makhmetov"),
                                                                    bio: t("Expert with over 10 years of experience in financial monitoring and AML regulations.")
                                                                },
                                                                {
                                                                    img: lector2,
                                                                    name: 'Махашева Асем',
                                                                    title: t("Instructor"),
                                                                    text: t("makhmetov"),
                                                                    bio: t("Specializes in regulatory compliance and financial risk assessment methodologies.")
                                                                },
                                                                {
                                                                    img: lector3,
                                                                    name: 'Шагатаев Даурен',
                                                                    title: t("Instructor"),
                                                                    text: t("makhmetov"),
                                                                    bio: t("Industry professional with practical experience implementing AML systems in financial institutions.")
                                                                }].map((lector, index) => (
                                                                    <Grid item xs={12} key={index}>
                                                                        <motion.div
                                                                            variants={fadeInUp}
                                                                            whileHover={{ y: -4 }}
                                                                            transition={{ duration: 0.2 }}
                                                                        >
                                                                            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                                                                                <CardMedia
                                                                                    component="img"
                                                                                    sx={{
                                                                                        width: { xs: '100%', sm: 200 },
                                                                                        height: { xs: 240, sm: 'auto' },
                                                                                        objectFit: 'cover'
                                                                                    }}
                                                                                    image={lector.img}
                                                                                    alt={lector.name}
                                                                                />
                                                                                <CardContent>
                                                                                    <Typography variant="h4" gutterBottom>
                                                                                        {lector.name}
                                                                                    </Typography>
                                                                                    <Typography variant="subtitle1" color="primary" gutterBottom>
                                                                                        {lector.title}
                                                                                    </Typography>
                                                                                    <Typography variant="body1" paragraph>
                                                                                        {lector.bio}
                                                                                    </Typography>
                                                                                    <Typography variant="body2" color="text.secondary">
                                                                                        {lector.text}
                                                                                    </Typography>
                                                                                </CardContent>
                                                                            </Card>
                                                                        </motion.div>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                    </motion.div>
                                                )}
                                            </Box>

                                            {/* Tab 4: Reviews */}
                                            <Box
                                                role="tabpanel"
                                                hidden={tabIndex !== 3}
                                                id="tabpanel-3"
                                                sx={{ p: { xs: 2, sm: 3 } }}
                                            >
                                                {tabIndex === 3 && (
                                                    <motion.div
                                                        initial="hidden"
                                                        animate="visible"
                                                        variants={fadeIn}
                                                    >
                                                        <Typography variant="h3" gutterBottom>
                                                            {t("Student Feedback")}
                                                        </Typography>

                                                        {/* Reviews summary */}
                                                        <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
                                                            <Box sx={{ textAlign: 'center' }}>
                                                                <Typography variant="h2" sx={{ color: 'primary.main' }}>
                                                                    {data.rating || 5.0}
                                                                </Typography>
                                                                <Rating value={data.rating || 5} precision={0.5} readOnly size="large" sx={{ mb: 1 }} />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {t("Course Rating")}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{ flexGrow: 1 }}>
                                                                {[5, 4, 3, 2, 1].map(star => (
                                                                    <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                                        <Typography variant="body2" sx={{ minWidth: 15 }}>
                                                                            {star}
                                                                        </Typography>
                                                                        <StarIcon sx={{ fontSize: 16, ml: 0.5, color: 'warning.main' }} />
                                                                        <LinearProgress
                                                                            variant="determinate"
                                                                            value={star === 5 ? 85 : star === 4 ? 10 : 2}
                                                                            sx={{
                                                                                mx: 1,
                                                                                flexGrow: 1,
                                                                                height: 8,
                                                                                borderRadius: 1
                                                                            }}
                                                                        />
                                                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                                                            {star === 5 ? '85%' : star === 4 ? '10%' : '2%'}
                                                                        </Typography>
                                                                    </Box>
                                                                ))}
                                                            </Box>
                                                        </Box>

                                                        {/* Reviews list */}
                                                        <FeedBacks feedBacks={data !== null ? data.courseComments : []} />
                                                    </motion.div>
                                                )}
                                            </Box>
                                        </Paper>
                                    </motion.div>
                                </Grid>

                                {/* Sidebar column */}
                                <Grid item xs={12} lg={4}>
                                    <Box
                                        sx={{
                                            position: { xs: 'static', lg: 'sticky' },
                                            top: 24,
                                            display: { xs: 'none', lg: 'block' }
                                        }}
                                    >
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={fadeIn}
                                        >
                                            {/* Enrollment card */}
                                            <Paper elevation={2} sx={{ mb: 3, overflow: 'hidden' }}>
                                                {data.course_image && (
                                                    <CardMedia
                                                        component="img"
                                                        height={180}
                                                        image={`${base_url}/aml/${data.course_image}`}
                                                        alt={data.course_name}
                                                        sx={{ objectFit: 'cover' }}
                                                    />
                                                )}

                                                <CardContent>
                                                    {!isFreeCourse(data) ? (
                                                        <Box sx={{ mb: 3 }}>
                                                            <Typography
                                                                variant="h3"
                                                                color="primary.main"
                                                                gutterBottom
                                                            >
                                                                {data.course_price} тенге
                                                            </Typography>

                                                            {data.course_price_sale && (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            textDecoration: 'line-through',
                                                                            color: 'text.secondary'
                                                                        }}
                                                                    >
                                                                        {data.course_price_sale} тенге
                                                                    </Typography>
                                                                    <Chip
                                                                        label={`-${Math.round((1 - data.course_price / data.course_price_sale) * 100)}%`}
                                                                        color="error"
                                                                        size="small"
                                                                    />
                                                                </Box>
                                                            )}
                                                        </Box>
                                                    ) : (
                                                        <Box sx={{ mb: 3 }}>
                                                            <Typography
                                                                variant="h3"
                                                                color="success.main"
                                                                gutterBottom
                                                            >
                                                                {t("Free")}
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {/* CTA Button */}
                                                    {getCourseActionButton('large', true)}

                                                    {/* Course includes */}
                                                    <List sx={{ mt: 3 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ fontWeight: 600, mb: 1 }}
                                                        >
                                                            {t("This course includes")}:
                                                        </Typography>

                                                        {getFeaturesList(data).map((feature, index) => (
                                                            <ListItem key={index} sx={{ py: 0.5 }} disableGutters>
                                                                <ListItemIcon sx={{ minWidth: 36 }}>
                                                                    {feature.icon}
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={feature.text}
                                                                    primaryTypographyProps={{
                                                                        variant: 'body2'
                                                                    }}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </CardContent>
                                            </Paper>

                                            {/* Additional info card */}
                                            <Paper elevation={1} sx={{ p: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <InfoIcon color="primary" />
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                        {t("Need help?")}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                                    {t("For questions about course content, payments or technical issues, please contact our support team.")}
                                                </Typography>
                                                <Box sx={{ mt: 2 }}>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        component={RouterLink}
                                                        to="/contact"
                                                    >
                                                        {t("Contact us")}
                                                    </Button>
                                                </Box>
                                            </Paper>
                                        </motion.div>
                                    </Box>
                                </Grid>
                            </Grid>
                        </AnimatePresence>
                    )}
                </Container>
            </Box>

            {/* Payment Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                PaperProps={{
                    component: motion.div,
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 20 },
                    elevation: 3
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h4">
                        {t('payment')}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 1 }}>
                    <DialogContentText paragraph>
                        {t('paymentdesc')}
                        {data != null && [41, 47, 81].includes(data.course_id) }
                    </DialogContentText>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAgreementChecked}
                                onChange={(e) => setIsAgreementChecked(e.target.checked)}
                                name="agreement"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="body2">
                                {t('iread')}
                                <Link component={RouterLink} to="/offer-agreement" color="primary">
                                {t('offer')}
                                </Link>
                            </Typography>
                        }
                        sx={{ mt: 2 }}
                    />
                </DialogContent>

                <DialogActions sx={{ flexDirection: 'column', p: 3, pt: 0 }}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={5}>
                            <Box
                                component={RouterLink}
                                to={`/payment/${id}`}
                                sx={{
                                    textDecoration: 'none',
                                    display: 'block',
                                    height: '100%'
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{ height: '100%' }}
                                >
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            borderRadius: 2,
                                            border: isAgreementChecked ? '2px solid transparent' : '2px solid rgba(0,0,0,0.08)',
                                            opacity: isAgreementChecked ? 1 : 0.7,
                                            pointerEvents: isAgreementChecked ? 'auto' : 'none',
                                            bgcolor: theme.palette.background.paper,
                                            '&:hover': {
                                                boxShadow: isAgreementChecked ? '0px 6px 12px rgba(0,0,0,0.1)' : undefined,
                                            }
                                        }}
                                    >
                                        <img src={qr} alt="QR Code" style={{ width: 140, height: 140 }} />
                                        <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
                                            {t('kaspipay')}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                                            {t('qr')}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{ height: '100%' }}
                            >
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        height: '100%',
                                        borderRadius: 2,
                                        border: isAgreementChecked ? '2px solid transparent' : '2px solid rgba(0,0,0,0.08)',
                                        opacity: isAgreementChecked ? 1 : 0.7,
                                        pointerEvents: isAgreementChecked ? 'auto' : 'none',
                                        bgcolor: theme.palette.background.paper,
                                        '&:hover': {
                                            boxShadow: isAgreementChecked ? '0px 6px 12px rgba(0,0,0,0.1)' : undefined,
                                        }
                                    }}
                                >
                                    <Box sx={{ mb: 2 }}>
                                        <PaymentHalyk id={id} />
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
                                        {t("bank")}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                                        {t("securepay")}
                                    </Typography>
                                </Paper>
                            </motion.div>     
                        </Grid>
                    </Grid>
                </DialogActions>
                <DialogContentText paragraph sx={{ 
                        p: 2,
                        color: 'primary.main',
                        fontWeight: 500
                    }}>
                    {t("paymentsupport")}
                    </DialogContentText>
            </Dialog>

            <Footer />
        </ThemeProvider>
    );
}

export default BasicCourse;
