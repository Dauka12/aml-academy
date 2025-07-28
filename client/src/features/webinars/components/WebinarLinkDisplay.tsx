import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import {
  Warning as WarningIcon,
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
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [linkRevealed, setLinkRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверяем статус пользователя
  const isLoggedIn = Boolean(localStorage.getItem('jwtToken'));
  const guestEmail = localStorage.getItem(`guestEmail_webinar_${webinarId}`);

  useEffect(() => {
    checkLinkAccess();
  }, [webinarId]);

  const checkLinkAccess = async () => {
    try {
      setLoading(true);
      
      if (isLoggedIn) {
        // Для зарегистрированных пользователей всегда показываем ссылку
        setCanViewLink(true);
        setIsRegistered(true);
        setLinkRevealed(true);
      } else if (guestEmail) {
        // Для гостей проверяем, могут ли они просматривать ссылку
        const response = await webinarApi.canViewLink(webinarId, guestEmail);
        setCanViewLink(response.canView);
        setIsRegistered(response.isRegistered);
      } else {
        // Пользователь не записан на вебинар
        setCanViewLink(false);
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Error checking link access:', error);
      setCanViewLink(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRevealLink = () => {
    if (!isRegistered && canViewLink) {
      // Показываем предупреждение для незарегистрированных пользователей
      setShowWarningDialog(true);
    } else {
      // Для зарегистрированных пользователей просто показываем ссылку
      setLinkRevealed(true);
    }
  };

  const handleConfirmReveal = async () => {
    try {
      if (guestEmail) {
        // Отмечаем, что ссылка была просмотрена
        await webinarApi.markLinkAsViewed(webinarId, guestEmail);
      }
      setLinkRevealed(true);
      setShowWarningDialog(false);
      setCanViewLink(false); // Больше не позволяем просматривать
    } catch (error) {
      console.error('Error marking link as viewed:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registration');
  };

  if (loading) {
    return null;
  }

  if (!canViewLink && !isRegistered) {
    return null; // Не показываем ничего, если нет доступа
  }

  return (
    <Box>
      {linkRevealed ? (
        // Показываем ссылку
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

          {!isRegistered && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2">
                {t('webinar.guestLinkWarningShown')}
                <Button
                  size="small"
                  variant="text"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={handleRegisterRedirect}
                  sx={{ ml: 1 }}
                >
                  {t('webinar.registerNow')}
                </Button>
              </Typography>
            </Alert>
          )}
        </Box>
      ) : (
        // Показываем кнопку для раскрытия ссылки
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {t('webinar.joinLink')}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={handleRevealLink}
            sx={{ mb: 2 }}
          >
            {t('webinar.showWebinarLink')}
          </Button>

          {!isRegistered && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t('webinar.guestLinkWarning')}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={handleRegisterRedirect}
                >
                  {t('webinar.registerForPermanentAccess')}
                </Button>
              </Box>
            </Alert>
          )}
        </Box>
      )}

      {/* Диалог предупреждения */}
      <Dialog
        open={showWarningDialog}
        onClose={() => setShowWarningDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="warning" sx={{ mr: 1 }} />
            {t('webinar.importantNotice')}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              {t('webinar.oneTimeAccessWarning')}
            </Typography>
            <Typography variant="body2">
              {t('webinar.registerForPermanentAccessDescription')}
            </Typography>
          </Alert>
          
          <Typography variant="body1">
            {t('webinar.confirmShowLink')}
          </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setShowWarningDialog(false)}>
            {t('webinar.cancel')}
          </Button>
          <Button onClick={handleRegisterRedirect} variant="outlined">
            {t('webinar.registerFirst')}
          </Button>
          <Button onClick={handleConfirmReveal} variant="contained" color="warning">
            {t('webinar.showLinkAnyway')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WebinarLinkDisplay;
