import {
    AccountCircleOutlined,
    ChevronLeftOutlined,
    DashboardOutlined,
    LogoutOutlined,
    MenuOutlined
} from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Paper,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { logoutUser } from '../store/slices/authSlice.ts';

// Drawer width
const drawerWidth = 300; // Увеличил ширину для более комфортного просмотра

const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: open ? drawerWidth : 0,
    flexShrink: 0,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        background: 'rgba(255, 255, 255, 0.97)',
        borderRight: 'none',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: open ? drawerWidth : 0,
    },
}));

const ContentContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(5, 5, 5, open ? 5 : 8), // Увеличенные отступы
    paddingTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4), // Увеличенный промежуток
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
}));

const StyledAvatar = styled(motion.div)(({ theme }) => ({
    width: 140, // Увеличен размер
    height: 140,
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3), // Увеличенный отступ
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    border: '5px solid white',
}));

const LogoutButton = styled(Button)(({ theme }) => ({
    borderRadius: 14,
    padding: theme.spacing(1.6, 2.5), // Увеличенные отступы
    fontSize: '0.98rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 6px 16px rgba(211, 47, 47, 0.25)',
    '&:hover': {
        boxShadow: '0 8px 20px rgba(211, 47, 47, 0.35)',
    }
}));

const ProfileCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24, // Увеличенное закругление
    padding: theme.spacing(5), // Больший отступ внутри
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
    marginBottom: theme.spacing(4), // Увеличенный отступ
}));

const InfoCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24, // Увеличенное закругление
    padding: theme.spacing(4), // Больший отступ внутри
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 0), // Увеличенный отступ
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    '&:last-child': {
        borderBottom: 'none',
        paddingBottom: 0
    }
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 1300,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
}));

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/olympiad/login');
    };

    if (!user) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
                color: 'white'
            }}>
                <Typography variant="h5">Загрузка...</Typography>
            </Box>
        );
    }

    const fullName = `${user.lastname} ${user.firstname} ${user.middlename}`;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.25
            }
        }
    };

    const itemVariants = {
        hidden: { y: 25, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 60,
                damping: 15
            }
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundImage: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)'
        }}>
            {/* Background effect */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle, transparent 20%, #1A2751 80%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Toggle Drawer Button */}
            <ToggleButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDrawerToggle}
                size="large"
            >
                {open ? <ChevronLeftOutlined /> : <MenuOutlined />}
            </ToggleButton>

            {/* Drawer */}
            <AnimatePresence>
                <StyledDrawer
                    variant="permanent"
                    open={open}
                >
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: open ? 1 : 0 }}>
                        <ProfileCard
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 70,
                                delay: 0.2
                            }}
                        >
                            <StyledAvatar
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    delay: 0.4
                                }}
                            >
                                <AccountCircleOutlined sx={{ fontSize: 100, color: theme.palette.primary.main }} />
                            </StyledAvatar>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 1 // Добавлен отступ
                                    }}
                                >
                                    {fullName}
                                </Typography>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        mt: 1.5, // Увеличенный отступ
                                        textAlign: 'center',
                                        color: theme.palette.text.secondary,
                                        fontWeight: 500,
                                        fontSize: '1rem' // Увеличен размер шрифта
                                    }}
                                >
                                    {user.university}
                                </Typography>
                            </motion.div>
                        </ProfileCard>

                        <InfoCard
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 70,
                                delay: 0.3
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 3, // Увеличенный отступ
                                    fontWeight: 600,
                                    color: theme.palette.primary.main,
                                    fontSize: '1.2rem' // Увеличен размер шрифта
                                }}
                            >
                                Личная информация
                            </Typography>

                            <InfoItem>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        width: 90, // Увеличена ширина
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.9rem' // Увеличен размер шрифта
                                    }}
                                >
                                    ИИН
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '0.95rem' // Увеличен размер шрифта
                                    }}
                                >
                                    {user.iin}
                                </Typography>
                            </InfoItem>

                            <InfoItem>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        width: 90, // Увеличена ширина
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.9rem' // Увеличен размер шрифта
                                    }}
                                >
                                    Email
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '0.95rem' // Увеличен размер шрифта
                                    }}
                                >
                                    {user.email}
                                </Typography>
                            </InfoItem>

                            <InfoItem>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        width: 90, // Увеличена ширина
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.9rem' // Увеличен размер шрифта
                                    }}
                                >
                                    Телефон
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: '0.95rem' // Увеличен размер шрифта
                                    }}
                                >
                                    {user.phone}
                                </Typography>
                            </InfoItem>
                        </InfoCard>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ p: 4 }}> {/* Увеличенный отступ */}
                            <LogoutButton
                                component={motion.button}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                                startIcon={<LogoutOutlined />}
                            >
                                Выйти из системы
                            </LogoutButton>
                        </Box>
                    </Box>
                </StyledDrawer>
            </AnimatePresence>

            <ContentContainer open={open}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5, // Увеличенный отступ
                                borderRadius: 6, // Увеличенное закругление
                                background: 'rgba(255, 255, 255, 0.97)',
                                backdropFilter: 'blur(15px)',
                                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                                mb: 4 // Увеличенный отступ снизу
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}> {/* Увеличенный отступ */}
                                <DashboardOutlined sx={{ fontSize: 42, mr: 2.5, color: theme.palette.primary.main }} /> {/* Увеличены размеры */}
                                <Typography
                                    variant="h3" // Увеличенный заголовок
                                    sx={{
                                        fontWeight: 700,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    Панель управления
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 4 }} /> {/* Увеличенный отступ */}

                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                Добро пожаловать в систему олимпиады!
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 3, fontSize: '1.1rem' }} // Увеличен размер текста и отступ
                            >
                                Здесь вы сможете отслеживать свой прогресс, управлять профилем и просматривать предстоящие задания.
                            </Typography>

                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.2 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4, // Увеличенный отступ
                                        bgcolor: 'rgba(26, 39, 81, 0.04)',
                                        borderRadius: 4, // Увеличенное закругление
                                        border: '1px solid rgba(26, 39, 81, 0.08)'
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontStyle: 'italic',
                                            fontSize: '1.05rem' // Увеличен размер шрифта
                                        }}
                                    >
                                        Следите за обновлениями системы. Скоро здесь появится больше функций.
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Paper>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5, // Увеличенный отступ
                                borderRadius: 6, // Увеличенное закругление
                                background: 'rgba(255, 255, 255, 0.97)',
                                backdropFilter: 'blur(15px)',
                                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            <Typography
                                variant="h4" // Увеличенный заголовок
                                sx={{
                                    mb: 4, // Увеличенный отступ
                                    fontWeight: 600,
                                    color: theme.palette.primary.main
                                }}
                            >
                                Предстоящие события
                            </Typography>

                            <Box sx={{ p: 5, textAlign: 'center' }}> {/* Увеличенный отступ */}
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontSize: '1.1rem' }} // Увеличен размер шрифта
                                >
                                    Информация о предстоящих событиях будет отображаться здесь
                                </Typography>
                            </Box>
                        </Paper>
                    </motion.div>
                </motion.div>
            </ContentContainer>
        </Box>
    );
};

export default Dashboard;