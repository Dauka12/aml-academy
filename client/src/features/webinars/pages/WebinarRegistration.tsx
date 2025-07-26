import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useWebinarManager from '../hooks/useWebinarManager';
import WebinarLayout from '../components/layout/WebinarLayout';
import { Box, Typography, Paper, CircularProgress, Container, Alert, Button } from '@mui/material';
import WebinarRegistrationModal from '../components/modals/WebinarRegistrationModal';

const WebinarRegistration: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const webinarId = Number(id);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { 
    currentWebinar, 
    loading, 
    error, 
    fetchWebinar
  } = useWebinarManager();
  
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Fetch webinar details
  useEffect(() => {
    if (webinarId) {
      fetchWebinar(webinarId);
    }
  }, [webinarId, fetchWebinar]);

  // Open modal when webinar data is available
  useEffect(() => {
    if (currentWebinar && !loading && !error) {
      setRegistrationModalOpen(true);
    }
  }, [currentWebinar, loading, error]);
  
  const handleClose = () => {
    setRegistrationModalOpen(false);
    navigate(`/webinars/details/${webinarId}`);
  };
  
  const handleSuccess = () => {
    setRegistrationModalOpen(false);
    setRegistrationSuccess(true);
  };
  
  return (
    <WebinarLayout title={t('webinar.registerForWebinar')} description="">
      <Container maxWidth="md" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : registrationSuccess ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="success" sx={{ mb: 3 }}>
              {t('webinar.registrationSuccess')}
            </Alert>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('webinar.registrationSuccessMessage')}
            </Typography>
            <Button 
              variant="contained"
              onClick={() => navigate(`/webinars/details/${webinarId}`)}
            >
              {t('webinar.viewWebinarDetails')}
            </Button>
          </Paper>
        ) : (
          <>
            {currentWebinar && (
              <WebinarRegistrationModal
                webinar={currentWebinar}
                open={registrationModalOpen}
                onClose={handleClose}
                onSuccess={handleSuccess}
              />
            )}
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6">
                {t('webinar.loading')}
              </Typography>
            </Paper>
          </>
        )}
      </Container>
    </WebinarLayout>
  );
};

export default WebinarRegistration;
