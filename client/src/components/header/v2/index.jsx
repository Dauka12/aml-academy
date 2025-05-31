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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext';
import navbar_items from '../navbar_items';
import LangBtn from './lang-btn';
import logo from './logo.svg';
import './style.scss';

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [navMenus, setNavMenus] = useState({});
  const isLoggedIn = localStorage.getItem('firstname') ? true : false;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Check if we're on the home page for transparent header
  const isHomePage = location.pathname === '/';
  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenNavMenu = (event, navItem) => {
    setAnchorElNav(event.currentTarget);
    setNavMenus(prev => ({ ...prev, [navItem]: true }));
  };

  const handleCloseNavMenu = (navItem) => {
    setNavMenus(prev => ({ ...prev, [navItem]: false }));
  };

  const handleUserMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (route) => {
    navigate(route);
    setAnchorElNav(null);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('role');
    
    setIsLoggedIn(false);
    navigate('/login');
  };

  const getInitials = () => {
    const firstName = localStorage.getItem('firstname') || '';
    const lastName = localStorage.getItem('lastname') || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  return (
    <AppBar 
      position="fixed" 
      elevation={scrolled ? 4 : 0} 
      className={scrolled ? 'scrolled' : ''}
      sx={{ 
        bgcolor: isHomePage 
          ? (scrolled ? 'rgba(26, 39, 81, 0.95)' : 'transparent')
          : 'rgba(26, 39, 81, 0.95)', 
        color: '#fff',
        py: scrolled ? 0.5 : 1,
        transition: 'all 0.3s ease-in-out',
        backdropFilter: (scrolled || !isHomePage) ? 'blur(8px)' : 'none',
        boxShadow: (scrolled || !isHomePage) ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
        top: isHomePage ? (scrolled ? 0 : { xs: '10px', md: '20px' }) : 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mr: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => navigate('/')}
          >
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
                width: scrolled ? 40 : 50, 
                height: scrolled ? 40 : 50,
                transition: 'all 0.3s ease-in-out'
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 2, 
                display: { xs: 'none', sm: 'block' }, 
                maxWidth: 200, 
                lineHeight: 1.2,
                fontSize: scrolled ? '0.8rem' : '0.9rem',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {t("academy of financial monitoring")}
            </Typography>
          </Box>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', maxWidth: 900 }}>
            {navbar_items.map((item) => (
              <Box key={item.name} sx={{ position: 'relative' }}>
                <Button
                  onClick={(e) => item.subItems ? handleOpenNavMenu(e, item.name) : handleNavigate(item.route)}
                  className="nav-button"
                  sx={{ 
                    color: '#fff', 
                    textTransform: 'none', 
                    fontSize: scrolled ? '1rem' : '1.125rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: '0%',
                      height: '2px',
                      backgroundColor: '#fff',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)'
                    },
                    '&:hover::after': {
                      width: '70%'
                    }
                  }}
                >
                  {t(item.name)}
                </Button>
                {item.subItems && (
                  <Popover
                    id={`${item.name}-menu`}
                    open={Boolean(navMenus[item.name])}
                    anchorEl={anchorElNav}
                    onClose={() => handleCloseNavMenu(item.name)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{
                      '& .MuiPaper-root': {
                        bgcolor: alpha('#5c5c5c', 0.9),
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                        overflow: 'hidden',
                        animation: 'fadeIn 0.3s ease-out',
                        '@keyframes fadeIn': {
                          '0%': { opacity: 0, transform: 'translateY(-10px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' }
                        }
                      }
                    }}
                  >
                    {item.subItems.map((subItem) => (
                      <MenuItem 
                        key={subItem.name} 
                        onClick={() => {
                          handleNavigate(subItem.route);
                          handleCloseNavMenu(item.name);
                        }}
                        sx={{ 
                          minWidth: 200, 
                          color: '#fff',
                          transition: 'all 0.2s ease',
                          borderLeft: '3px solid transparent',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.15)',
                            borderLeft: '3px solid #fff',
                            paddingLeft: '20px'
                          } 
                        }}
                      >
                        <Typography>{t(subItem.name)}</Typography>
                      </MenuItem>
                    ))}
                  </Popover>
                )}
              </Box>
            ))}
          </Box>

          {/* Actions section: Language, Login/User */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box>
              <LangBtn />
            </Box>

            {isLoggedIn ? (
              <Box>
                <IconButton 
                  onClick={handleUserMenuOpen}
                  sx={{ 
                    bgcolor: '#889fda',
                    border: '4px solid #1F3C88',
                    borderRadius: '50%',
                    width: 35,
                    height: 35,
                    p: 0,
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 0 15px rgba(31, 60, 136, 0.6)'
                    }
                  }}
                >
                  <Typography variant="body2">{getInitials()}</Typography>
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleUserMenuClose}
                  sx={{
                    '& .MuiPaper-root': {
                      bgcolor: 'rgba(168, 168, 168, 0.85)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      minWidth: '220px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      animation: 'fadeIn 0.3s ease-out',
                      '@keyframes fadeIn': {
                        '0%': { opacity: 0, transform: 'translateY(-10px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }
                  }}
                >
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <IconButton 
                      sx={{ 
                        bgcolor: '#889fda',
                        border: '3px solid #1F3C88',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        p: 0,
                        color: '#fff',
                        mr: 2
                      }}
                    >
                      <Typography variant="body2">{getInitials()}</Typography>
                    </IconButton>
                    <Typography sx={{ fontWeight: 'medium' }}>
                      {localStorage.getItem('firstname')} {localStorage.getItem('lastname')}
                    </Typography>
                  </Box>
                  
                  <MenuItem onClick={() => navigate('/profile')} sx={{ 
                    py: 1.5, 
                    transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                  }}>
                    {t('profile')}
                  </MenuItem>
                  <MenuItem onClick={() => {
                    localStorage.removeItem('firstname');
                    localStorage.removeItem('lastname');
                    navigate('/login');
                  }} sx={{ 
                    py: 1.5,
                    transition: 'all 0.2s ease',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                  }}>
                    {t('logout')}
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button 
                onClick={() => navigate('/login')}
                variant="contained"
                sx={{ 
                  bgcolor: '#0D0D0D',
                  borderRadius: '10px',
                  color: '#fff',
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: '#292929',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
                  }
                }}
              >
                {t('signin')}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        SlideProps={{ 
          timeout: { enter: 400, exit: 300 }
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            bgcolor: 'rgba(26, 39, 81, 0.95)',
            backdropFilter: 'blur(10px)',
            color: '#fff'
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <img src={logo} alt="Logo" style={{ width: 40, height: 40 }} />
            <Typography variant="body2" sx={{ ml: 1.5, fontWeight: 500 }}>
              {t("academy of financial monitoring")}
            </Typography>
          </Box>
          
          <List>
            {navbar_items.map((item) => (
              item.subItems ? (
                <Box key={item.name} sx={{ mb: 1 }}>
                  <ListItem 
                    disablePadding 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemButton sx={{ py: 1.5 }}>
                      <ListItemText 
                        primary={t(item.name)} 
                        primaryTypographyProps={{ 
                          fontWeight: 500,
                          fontSize: '1.1rem'
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <List disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem.name} disablePadding sx={{ pl: 2 }}>
                        <ListItemButton 
                          sx={{ 
                            py: 1.2,
                            borderLeft: '2px solid rgba(255,255,255,0.2)',
                            ml: 1,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderLeft: '2px solid white',
                              bgcolor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                          onClick={() => handleNavigate(subItem.route)}
                        >
                          <ListItemText primary={t(subItem.name)} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <ListItem 
                  key={item.name} 
                  disablePadding
                  sx={{ 
                    mb: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <ListItemButton 
                    sx={{ py: 1.5 }}
                    onClick={() => handleNavigate(item.route)}
                  >
                    <ListItemText 
                      primary={t(item.name)} 
                      primaryTypographyProps={{ 
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            ))}
          </List>
          
          <Box sx={{ 
            mt: 'auto', 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            pt: 3
          }}>
            <LangBtn />
            {isLoggedIn ? (
              <IconButton 
                onClick={handleUserMenuOpen}
                sx={{ 
                  bgcolor: '#889fda',
                  border: '3px solid #1F3C88',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  p: 0,
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 0 15px rgba(31, 60, 136, 0.6)'
                  }
                }}
              >
                <Typography variant="body2">{getInitials()}</Typography>
              </IconButton>
            ) : (
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')}
                sx={{ 
                  bgcolor: '#1F3C88',
                  textTransform: 'none',
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: '#162a5e',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
                  }
                }}
              >
                {t('signin')}
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
