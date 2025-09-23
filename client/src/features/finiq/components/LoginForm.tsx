import { EmojiEvents as TrophyIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Add this import
import { useNavigate } from 'react-router-dom';
import { useOlympiadDispatch, useOlympiadSelector } from '../hooks/useOlympiadStore';
import { RootState } from '../store';
import { clearAuthError, loginUser } from '../store/slices/authSlice.ts';
import CustomAlert from './CustomAlert';

const MotionPaper = motion(Paper);

const LoginForm: React.FC = () => {
  const { t } = useTranslation(); // Add translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useOlympiadDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useOlympiadSelector((state: RootState) => state.auth);

  // Redirect on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/finiq/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Show error alert when error state changes
  useEffect(() => {
    if (error) {
      setShowError(true);
      // Auto hide after 6 seconds
      const timer = setTimeout(() => {
        setShowError(false);
        dispatch(clearAuthError());
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Handle error alert close
  const handleCloseError = () => {
    setShowError(false);
    dispatch(clearAuthError());
  };

  // Clear errors when inputs change
  useEffect(() => {
    if (email) setEmailError('');
    if (password) setPasswordError('');
  }, [email, password]);

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate Email
    if (!email.trim()) {
      setEmailError(t('login.errors.emailRequired'));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t('login.errors.emailFormat'));
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError(t('login.errors.passwordRequired'));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  const handleGoToRegistration = () => {
    navigate('/finiq/registration');
  };

  return (
    <div>
      {showError && error && (
        <CustomAlert
          message="Неверно введен пароль или Email. Проверьте правильность указания пароля и Email. Обратите внимание на язык и регистр вводимых знаков."
          severity="error"
          onClose={handleCloseError}
        />
      )}

      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          maxWidth: isMobile ? 350 : 500,
          width: '100%',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          mx: isMobile ? 1 : 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: isMobile ? 2 : 4
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TrophyIcon
              sx={{
                fontSize: isMobile ? 40 : 60,
                color: '#f5b207',
                mb: isMobile ? 1 : 2
              }}
            />
          </motion.div>
          <Typography 
            component="h1" 
            variant={isMobile ? "h6" : "h4"} 
            sx={{ 
              fontWeight: 700, 
              color: '#1A2751',
              textAlign: 'center',
              mb: 1 
            }}
          >
            {t('login.title')}
          </Typography>
          <Typography 
            variant={isMobile ? "body2" : "subtitle1"} 
            sx={{ 
              color: 'text.secondary', 
              textAlign: 'center',
              maxWidth: '95%'
            }}
          >
            {t('login.subtitle')}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box mb={isMobile ? 2 : 2.5}>
            <TextField
              label={t('login.fields.email')}
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              disabled={loading}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: isMobile ? '48px' : 'auto',
                }
              }}
            />
          </Box>

          <Box mb={isMobile ? 2 : 3}>
            <TextField
              label={t('login.fields.password')}
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: isMobile ? '48px' : 'auto',
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              mt: 1
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#1A2751',
                  '&:hover': {
                    bgcolor: '#13203f',
                  },
                  px: 2,
                  py: 1.2,
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  width: '100%',
                  minHeight: '44px'
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? t('login.buttons.loggingIn') : t('login.buttons.login')}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1
              }}
            >
              <Button
                variant="outlined"
                onClick={handleGoToRegistration}
                disabled={loading}
                sx={{
                  borderColor: '#1A2751',
                  color: '#1A2751',
                  bgcolor: 'transparent',
                  '&:hover': {
                    borderColor: '#1A2751',
                    backgroundColor: 'rgba(26, 39, 81, 0.04)',
                  },
                  px: 2,
                  py: 1.2,
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                  width: '100%',
                  minHeight: '44px'
                }}
              >
                {t('login.buttons.register') || 'Регистрация'}
              </Button>
            </motion.div>
          </Box>
        </form>
      </MotionPaper>
    </div>
  );
};

export default LoginForm;