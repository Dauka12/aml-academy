import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext';
import navbar_items from '../navbar_items';
import LangBtn from './lang-btn';

import logo from './logo.svg';
import './style.scss';

// Мемоизированные компоненты для оптимизации
const MemoizedMenuItem = memo(({ item, handleCloseNavMenu, handleMenuClick }) => (
  <MenuItem onClick={() => handleMenuClick(item)}>
    <Typography textAlign="center">{item.title}</Typography>
  </MenuItem>
));

MemoizedMenuItem.displayName = 'MemoizedMenuItem';

const MemoizedListItem = memo(({ item, handleDrawerItemClick }) => (
  <ListItem disablePadding>
    <ListItemButton onClick={() => handleDrawerItemClick(item)}>
      <ListItemText primary={item.title} />
    </ListItemButton>
  </ListItem>
));

MemoizedListItem.displayName = 'MemoizedListItem';

function HeaderOptimized() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [navMenus, setNavMenus] = useState({});
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Мемоизируем проверку авторизации
  const isLoggedIn = useMemo(() => 
    Boolean(localStorage.getItem('firstname')), 
    []
  );

  // Оптимизированная проверка роли
  const checkRole = useCallback(async () => {
    const userRole = localStorage.getItem('role');
    if (userRole === 'ROLE_ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  // Оптимизированный обработчик скролла
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 50;
    setScrolled(isScrolled);
  }, []);

  useEffect(() => {
    checkRole();
    
    // Throttled scroll handler для производительности
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [checkRole, handleScroll]);

  // Мемоизированные обработчики
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleMenuClick = useCallback((item) => {
    if (item.submenu) {
      setNavMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    } else {
      navigate(item.link);
    }
    handleCloseNavMenu();
  }, [navigate, handleCloseNavMenu]);

  const handleDrawerItemClick = useCallback((item) => {
    if (!item.submenu) {
      navigate(item.link);
      setMobileOpen(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('firstname');
    localStorage.removeItem('role');
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/');
    handleCloseUserMenu();
  }, [navigate, setIsLoggedIn, handleCloseUserMenu]);

  // Мемоизированные стили
  const appBarStyles = useMemo(() => ({
    background: scrolled 
      ? 'rgba(6, 28, 69, 0.95)' 
      : 'rgba(6, 28, 69, 0.1)',
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
    boxShadow: scrolled 
      ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
      : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [scrolled]);

  // Мемоизированный рендер навигационных элементов
  const renderNavItems = useMemo(() => 
    navbar_items.map((item) => (
      <MemoizedMenuItem
        key={item.id}
        item={item}
        handleCloseNavMenu={handleCloseNavMenu}
        handleMenuClick={handleMenuClick}
      />
    )), [handleCloseNavMenu, handleMenuClick]);

  const renderDrawerItems = useMemo(() => 
    navbar_items.map((item) => (
      <MemoizedListItem
        key={item.id}
        item={item}
        handleDrawerItemClick={handleDrawerItemClick}
      />
    )), [handleDrawerItemClick]);

  return (
    <AppBar 
      position="fixed" 
      sx={appBarStyles}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: { xs: 40, sm: 50 },
              width: 'auto',
              mr: 2,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
            loading="eager" // Приоритетная загрузка логотипа
          />

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
              {navbar_items.map((item) => (
                <Button
                  key={item.id}
                  onClick={(e) => {
                    if (item.submenu) {
                      handleOpenNavMenu(e);
                    } else {
                      navigate(item.link);
                    }
                  }}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.1),
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Language Button */}
          <LangBtn />

          {/* User Menu */}
          <Box sx={{ ml: 2 }}>
            {isLoggedIn ? (
              <>
                <Button
                  variant="text"
                  disableGutters
                  onClick={handleOpenUserMenu}
                  sx={{ color: 'white' }}
                >
                  {localStorage.getItem('firstname')}
                </Button>
                <Menu
                  disableGutters
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate('/profile')} disableGutters>
                    Профиль
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => navigate('/new-admin-page')}>
                      Админ панель
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    Выйти
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                  }
                }}
              >
                Войти
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        <List>
          {renderDrawerItems}
        </List>
      </Drawer>

      {/* Desktop Menu */}
      <Menu
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {renderNavItems}
      </Menu>
    </AppBar>
  );
}

export default memo(HeaderOptimized);
