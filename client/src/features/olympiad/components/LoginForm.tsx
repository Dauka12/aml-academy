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
  const { t, i18n } = useTranslation(); // Add translation hook
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [iin, setIin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [iinError, setIinError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useOlympiadDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useOlympiadSelector((state: RootState) => state.auth);

  // Redirect on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/olympiad/dashboard');
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
    if (iin) setIinError('');
    if (password) setPasswordError('');
  }, [iin, password]);

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate IIN
    if (!iin.trim()) {
      setIinError(t('login.errors.iinRequired'));
      isValid = false;
    } else if (!/^\d{12}$/.test(iin)) {
      setIinError(t('login.errors.iinFormat'));
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
      dispatch(loginUser({ iin, password }));
    }
  };

  const handleGoToRegistration = () => {
    navigate('/olympiad/registration');
  };

  return (
    <div>
      {showError && error && (
        <CustomAlert
          message="Неверно введен пароль или ИИН. Проверьте правильность указания пароля и ИИН. Обратите внимание на язык и регистр вводимых знаков."
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
          p: isMobile ? 3 : 4,
          maxWidth: 450,
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          mx: isMobile ? 2 : 0,
          position: 'relative', // Added position relative
          zIndex: 10, // Added z-index to ensure it's above background elements
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TrophyIcon
              sx={{
                fontSize: isMobile ? 50 : 60,
                color: '#f5b207',
                mb: 2
              }}
            />
          </motion.div>
          <Typography variant={isMobile ? "h5" : "h4"} component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            {t('login.title')}
          </Typography>
          <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary" sx={{ textAlign: 'center' }}>
            {t('login.subtitle')}
          </Typography>
          <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary" sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}
          >
            {/* {t('login.description')} */}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box mb={2.5}>
            <TextField
              label={t('login.fields.iin')}
              variant="outlined"
              fullWidth
              value={iin}
              onChange={(e) => setIin(e.target.value)}
              error={!!iinError}
              helperText={iinError}
              inputProps={{ maxLength: 12 }}
              disabled={loading}
              autoFocus
            />
          </Box>

          <Box mb={3}>
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
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              gap: 2
            }}
          >

            <Box sx={{ order: { xs: 1, sm: 2 } }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: '#1A2751',
                    '&:hover': {
                      bgcolor: '#13203f',
                    },
                    minWidth: '120px',
                  }}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? t('login.buttons.loggingIn') : t('login.buttons.login')}
                </Button>
              </motion.div>
              
            </Box>
          </Box>
        </form>
      </MotionPaper>
    </div>
  );
};

export default LoginForm;