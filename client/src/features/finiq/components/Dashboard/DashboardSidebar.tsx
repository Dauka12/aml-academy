import React from 'react';
import {
    AccountCircleOutlined,
    AssignmentOutlined,
    DashboardOutlined,
    LogoutOutlined,
    EmojiEventsOutlined
} from '@mui/icons-material';
import {
    Box,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    styled,
    Typography,
    useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useOlympiadDispatch, useOlympiadSelector } from '../../hooks/useOlympiadStore';
import { RootState } from '../../store';
import { logoutUser } from '../../store/slices/authSlice.ts';
import { useNavigate } from 'react-router-dom';

// Drawer width
const drawerWidth = 300;

// Define interfaces for the styled components with custom props
interface StyledDrawerProps {
    open: boolean;
}

export type DashboardView = 'dashboard' | 'tests' | 'profile' | 'achievements' | 'achivements'; // include legacy typos for robustness

interface DashboardSidebarProps {
    open: boolean;
    onClose?: () => void;
    currentView: DashboardView;
    onViewChange: (view: DashboardView) => void;
    onLogout: () => void;
}

// IMPORTANT: We must forward the 'open' prop to MUI Drawer when variant="temporary".
// Using shouldForwardProp that blocks 'open' prevents the mobile drawer from appearing.
// We'll instead style via the paper slot and only apply custom transform for desktop via a wrapper class.
const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        background: 'rgba(255, 255, 255, 0.97)',
        borderRight: 'none',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
            width: '85vw',
            maxWidth: 300,
            borderRadius: 0,
        }
    },
}));

const StyledAvatar = styled(motion.div)(({ theme }) => ({
    width: 140,
    height: 140,
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
    border: '5px solid white',
    [theme.breakpoints.down('sm')]: {
        width: 80,
        height: 80,
        marginBottom: theme.spacing(2),
        border: '3px solid white',
    }
}));

const LogoutButton = styled(Button)(({ theme }) => ({
    borderRadius: 14,
    padding: theme.spacing(1.6, 2.5),
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
    borderRadius: 24,
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        borderRadius: 16,
        marginBottom: theme.spacing(2),
    }
}));

const InfoCard = styled(motion.div)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: theme.spacing(4),
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        borderRadius: 16,
    }
}));

const InfoItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    '&:last-child': {
        borderBottom: 'none',
        paddingBottom: 0
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing(0.5)
    }
}));

const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: 12,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5, 2),
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.light + '20',
        '&:hover': {
            backgroundColor: theme.palette.primary.light + '30',
        }
    }
}));

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
    open,
    onClose,
    currentView,
    onViewChange,
    onLogout
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useOlympiadSelector((state: RootState) => state.auth);

    if (!user) return null;

    const fullName = `${user.lastname} ${user.firstname} ${user.middlename}`;
    const isAchievementsView = ['profile','achievements','achivements'].includes(currentView);

    return (
        <StyledDrawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                display: 'flex',
                '& .MuiDrawer-paper': !isMobile ? {
                    transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
                    transition: theme.transitions.create('transform', {
                        duration: theme.transitions.duration.standard,
                    })
                } : {}
            }}
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
                        <AccountCircleOutlined sx={{ 
                            fontSize: { xs: 60, sm: 100 }, 
                            color: theme.palette.primary.main 
                        }} />
                    </StyledAvatar>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Typography
                            variant={isMobile ? "h6" : "h5"}
                            sx={{
                                textAlign: 'center',
                                fontWeight: 600,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1,
                                fontSize: { xs: '1rem', sm: '1.5rem' },
                                lineHeight: 1.2
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
                            variant="body2"
                            sx={{
                                mt: 1.5,
                                textAlign: 'center',
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                fontSize: { xs: '0.8rem', sm: '1rem' }
                            }}
                        >
                            {user.university}
                        </Typography>
                    </motion.div>
                </ProfileCard>

                {/* Navigation menu */}
                <Paper
                    component={motion.div}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 70,
                        delay: 0.25
                    }}
                    elevation={0}
                    sx={{
                        p: isMobile ? 2 : 3,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.97)',
                        backdropFilter: 'blur(15px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                        mb: isMobile ? 2 : 4
                    }}
                >
                    <List component="nav" sx={{ p: 1 }}>
                        <MenuItemButton
                            selected={currentView === 'dashboard'}
                            onClick={() => {
                                onViewChange('dashboard');
                                // Close sidebar on mobile after selection
                                if (isMobile && onClose) {
                                    setTimeout(() => onClose(), 150);
                                }
                            }}
                            sx={{ py: isMobile ? 1 : 1.5 }}
                        >
                            <ListItemIcon>
                                <DashboardOutlined sx={{ 
                                    color: currentView === 'dashboard' ? theme.palette.primary.main : 'inherit',
                                    fontSize: { xs: 20, sm: 24 }
                                }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('dashboard.home')}
                                primaryTypographyProps={{
                                    fontWeight: currentView === 'dashboard' ? 600 : 400,
                                    color: currentView === 'dashboard' ? theme.palette.primary.main : 'inherit',
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                }}
                            />
                        </MenuItemButton>

                        <MenuItemButton
                            selected={currentView === 'tests'}
                            onClick={() => {
                                onViewChange('tests');
                                // Close sidebar on mobile after selection
                                if (isMobile && onClose) {
                                    setTimeout(() => onClose(), 150);
                                }
                            }}
                            sx={{ py: isMobile ? 1 : 1.5 }}
                        >
                            <ListItemIcon>
                                <AssignmentOutlined sx={{ 
                                    color: currentView === 'tests' ? theme.palette.primary.main : 'inherit',
                                    fontSize: { xs: 20, sm: 24 }
                                }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('dashboard.tests')} 
                                primaryTypographyProps={{
                                    fontWeight: currentView === 'tests' ? 600 : 400,
                                    color: currentView === 'tests' ? theme.palette.primary.main : 'inherit',
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                }}
                            />
                        </MenuItemButton>

                        <MenuItemButton
                            selected={isAchievementsView}
                            onClick={() => {
                                onViewChange('achievements');
                                if (isMobile && onClose) {
                                    setTimeout(() => onClose(), 150);
                                }
                            }}
                            sx={{ py: isMobile ? 1 : 1.5 }}
                        >
                            <ListItemIcon>
                                <EmojiEventsOutlined sx={{ 
                                    color: isAchievementsView ? theme.palette.primary.main : 'inherit',
                                    fontSize: { xs: 20, sm: 24 }
                                }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={t('dashboard.achievements')}
                                primaryTypographyProps={{
                                    fontWeight: isAchievementsView ? 600 : 400,
                                    color: isAchievementsView ? theme.palette.primary.main : 'inherit',
                                    fontSize: { xs: '0.9rem', sm: '1rem' }
                                }}
                            />
                        </MenuItemButton>
                    </List>
                </Paper>

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
                            mb: 3,
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            fontSize: { xs: '1rem', sm: '1.2rem' }
                        }}
                    >
                        {t('dashboard.personalInfo')}
                    </Typography>
                    <InfoItem>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                width: 90,
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.8rem', sm: '0.9rem' }
                            }}
                        >
                            ИИН
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                        >
                            {user.iin}
                        </Typography>
                    </InfoItem>

                    <InfoItem>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                width: 90,
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.8rem', sm: '0.9rem' }
                            }}
                        >
                            Email
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                        >
                            {user.email}
                        </Typography>
                    </InfoItem>

                    <InfoItem>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                width: 90,
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.8rem', sm: '0.9rem' }
                            }}
                        >
                            Телефон
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                fontSize: { xs: '0.85rem', sm: '0.95rem' }
                            }}
                        >
                            {user.phone}
                        </Typography>
                    </InfoItem>
                </InfoCard>

                {/* Achievements placeholder (certificates / diplomas) */}
                {isAchievementsView && (
                    <InfoCard
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 70,
                            delay: 0.35
                        }}
                        style={{ marginTop: 16 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                fontSize: { xs: '1rem', sm: '1.2rem' }
                            }}
                        >
                            {t('dashboard.achievements', 'Достижения')}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            py: 2,
                            px: 1
                        }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 2,
                                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                }}
                            >
                                {t('dashboard.noAchievements', 'У вас пока нет сертификатов или дипломов. Пройдите тесты, чтобы получить первые достижения.')}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => onViewChange('tests')}
                                sx={{
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' }
                                }}
                            >
                                {t('dashboard.goToTests', 'Перейти к тестам')}
                            </Button>
                        </Box>
                    </InfoCard>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ p: isMobile ? 2 : 4 }}>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                        <LogoutButton
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={onLogout}
                            startIcon={<LogoutOutlined />}
                            sx={{ 
                                fontSize: { xs: '0.9rem', sm: '0.98rem' },
                                py: { xs: 1.2, sm: 1.6 }
                            }}
                        >
                            {t('dashboard.logout')}
                        </LogoutButton>
                    </motion.div>
                </Box>
            </Box>
        </StyledDrawer>
    );
};

export default DashboardSidebar;