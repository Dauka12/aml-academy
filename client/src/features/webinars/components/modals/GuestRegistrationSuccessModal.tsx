import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Box,
  Paper
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Login as LoginIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

interface GuestRegistrationSuccessModalProps {
  open: boolean;
  onClose: () => void;
  webinarTitle: string;
  webinarLink?: string;
  showLink?: boolean;
}

const GuestRegistrationSuccessModal: React.FC<GuestRegistrationSuccessModalProps> = ({
  open,
  onClose,
  webinarTitle,
  webinarLink,
  showLink = false
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [linkRevealed, setLinkRevealed] = useState(showLink);

  const handleRegisterRedirect = () => {
    navigate('/registration');
    onClose();
  };

  const handleRevealLink = () => {
    setLinkRevealed(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h5">
            {t('webinar.registrationSuccess')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" gutterBottom>
          {webinarTitle}
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body1">
            {t('webinar.registrationSuccessMessage')}
          </Typography>
        </Alert>

        {webinarLink && (
          <Box>
            {!linkRevealed ? (
              <Box>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WarningIcon sx={{ mr: 1, fontSize: 20 }} />
                      {t('webinar.guestLinkWarning')}
                    </Typography>
                  </Box>
                </Alert>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<LoginIcon />}
                    onClick={handleRegisterRedirect}
                    sx={{ flex: 1 }}
                  >
                    {t('webinar.registerForPermanentAccess')}
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<VisibilityIcon />}
                    onClick={handleRevealLink}
                    sx={{ flex: 1 }}
                  >
                    {t('webinar.showWebinarLink')}
                  </Button>
                </Box>
              </Box>
            ) : (
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

                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    {t('webinar.guestLinkWarningShown')}
                  </Typography>
                </Alert>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={handleRegisterRedirect}
                  fullWidth
                >
                  {t('webinar.registerNow')}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant={linkRevealed ? "contained" : "text"}>
          {linkRevealed ? t('webinar.close') : t('webinar.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestRegistrationSuccessModal;
