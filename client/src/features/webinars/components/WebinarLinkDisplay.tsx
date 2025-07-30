import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Alert,
  Paper
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import webinarApi from '../api/webinarApi';

interface WebinarLinkDisplayProps {
  webinarId: number;
  webinarLink: string;
  webinarTitle: string;
}

const WebinarLinkDisplay: React.FC<WebinarLinkDisplayProps> = ({
  webinarId,
  webinarLink,
  webinarTitle
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [canViewLink, setCanViewLink] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверяем статус пользователя
  const isLoggedIn = Boolean(localStorage.getItem('jwtToken'));

  const checkLinkAccess = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isLoggedIn) {
        // Для зарегистрированных пользователей проверяем, записаны ли они на вебинар
        try {
          const response = await webinarApi.canViewLink(webinarId, '');
          setIsRegistered(response.isRegistered);
          setCanViewLink(response.isRegistered);
        } catch (error) {
          // Если API не поддерживает проверку для авторизованных пользователей,
          // показываем ссылку (обратная совместимость)
          setCanViewLink(true);
          setIsRegistered(true);
        }
      } else {
        // Для неавторизованных пользователей ссылка недоступна
        setCanViewLink(false);
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Error checking link access:', error);
      setCanViewLink(false);
    } finally {
      setLoading(false);
    }
  }, [webinarId, isLoggedIn]);

  useEffect(() => {
    checkLinkAccess();
  }, [webinarId, checkLinkAccess]);

  const handleRegisterRedirect = () => {
    navigate('/registration');
  };

  if (loading) {
    return null;
  }

  // Если пользователь не авторизован, показываем сообщение о регистрации
  if (!isLoggedIn) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t('webinar.joinLink')}
        </Typography>
        
        {/* Кнопка с градиентом поверх неё */}
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            disabled
            fullWidth
            sx={{ 
              opacity: 0.7,
              cursor: 'not-allowed',
              '&.Mui-disabled': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                opacity: 0.7
              }
            }}
          >
            {t('webinar.showWebinarLink')}
          </Button>
          
          {/* Градиент поверх кнопки */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 100%)',
              borderRadius: 1,
              pointerEvents: 'none'
            }}
          />
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
              {t('webinar.registrationRequiredForLink')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('webinar.registrationRequiredDescription')}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={handleRegisterRedirect}
            >
              {t('webinar.registerNow')}
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  // Если пользователь авторизован но не зарегистрирован на вебинар
  if (!canViewLink || !isRegistered) {
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t('webinar.joinLink')}
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('webinar.webinarRegistrationRequired')}
          </Typography>
          <Typography variant="body2">
            {t('webinar.webinarRegistrationRequiredDescription')}
          </Typography>
        </Alert>
      </Box>
    );
  }

  // Если пользователь авторизован и зарегистрирован - показываем ссылку
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t('webinar.joinLink')}
      </Typography>
      
      <Paper
        component="a"
        href={webinarLink}
        target="_blank"
        rel="noopener"
        sx={{
          display: 'block',
          p: 2,
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          borderRadius: 1,
          textDecoration: 'none',
          mb: 2,
          '&:hover': {
            bgcolor: 'primary.main',
          }
        }}
      >
        {webinarLink}
      </Paper>

      <Alert severity="success" sx={{ mb: 2 }}>
        <Typography variant="body2">
          {t('webinar.registeredUserLinkAccess')}
        </Typography>
      </Alert>
    </Box>
  );
};

export default WebinarLinkDisplay;
