import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useWebinarManager from '../hooks/useWebinarManager';
import WebinarLayout from '../components/layout/WebinarLayout';
import WebinarRegistrationModal from '../components/modals/WebinarRegistrationModal';
import WebinarParticipantsModal from '../components/modals/WebinarParticipantsModal';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  People as PeopleIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import './WebinarDetails.scss';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const WebinarDetails: React.FC = () => {
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
  const [participantsModalOpen, setParticipantsModalOpen] = useState(false);
  
  useEffect(() => {
    if (webinarId) {
      fetchWebinar(webinarId);
    }
  }, [webinarId, fetchWebinar]);
  
  // Helper function to convert array date format to Date object
  const convertDateFromArray = (dateArray: any): Date => {
    if (Array.isArray(dateArray)) {
      // Convert from array format [year, month, day, hour, minute]
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
    }
    return new Date(dateArray);
  };
  
  const handleRegisterClick = () => {
    setRegistrationModalOpen(true);
  };
  
  const handleModalClose = () => {
    setRegistrationModalOpen(false);
  };
  
  const handleRegistrationSuccess = () => {
    setRegistrationModalOpen(false);
    setRegistrationSuccess(true);
    
    // Refresh webinar data to update signup count
    if (webinarId) {
      fetchWebinar(webinarId);
    }
  };
  
  const handleShowParticipants = () => {
    setParticipantsModalOpen(true);
  };
  
  const handleCloseParticipantsModal = () => {
    setParticipantsModalOpen(false);
  };
  
  return (
    <WebinarLayout title={currentWebinar?.title || t('webinar.webinarDetails')}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error || !currentWebinar ? (
          <Box sx={{ mb: 3 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error || t('webinar.webinarNotFound')}
            </Alert>
            <Button 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/webinars')}
            >
              {t('webinar.backToWebinars')}
            </Button>
          </Box>
        ) : (
          <>
            {/* Webinar Header */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Paper sx={{ p: 3, mb: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Button 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/webinars')}
                    sx={{ mb: 2 }}
                  >
                    {t('webinar.backToWebinars')}
                  </Button>
                  
                  <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    {currentWebinar.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        {convertDateFromArray(currentWebinar.startDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ClockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        {convertDateFromArray(currentWebinar.startDate).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                    
                    {currentWebinar.signupsCount !== undefined && (
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                            }
                          }
                        }}
                        onClick={handleShowParticipants}
                      >
                        <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body1">
                          {currentWebinar.signupsCount} {t('webinar.participants')}
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Status chip */}
                    {convertDateFromArray(currentWebinar.startDate) < new Date() ? (
                      <Chip 
                        label={t('webinar.past')} 
                        color="default"
                        sx={{ bgcolor: '#f8d7da', color: '#721c24' }}
                      />
                    ) : (
                      <Chip 
                        label={t('webinar.upcoming')} 
                        color="primary" 
                      />
                    )}
                  </Box>
                  
                  {/* Register button */}
                  {convertDateFromArray(currentWebinar.startDate) > new Date() && !registrationSuccess && (
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="large"
                      onClick={handleRegisterClick}
                      sx={{ mt: 1 }}
                    >
                      {t('webinar.registerForWebinar')}
                    </Button>
                  )}
                  
                  {registrationSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      {t('webinar.registrationSuccessMessage')}
                    </Alert>
                  )}
                </Box>
              </Paper>
            </motion.div>
            
            {/* Webinar Content */}
            <Grid container spacing={4}>
              {/* Image Column */}
              <Grid item xs={12} md={5}>
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <Paper sx={{ overflow: 'hidden', borderRadius: 2, position: 'relative' }}>
                    {currentWebinar.imageUrl ? (
                      <Box 
                        component="img"
                        src={currentWebinar.imageUrl} 
                        alt={currentWebinar.title} 
                        sx={{ 
                          width: '100%', 
                          height: 'auto', 
                          maxHeight: 400,
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Box sx={{ 
                        height: 300, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'grey.200'
                      }}>
                        <Typography variant="h1" sx={{ color: 'grey.400' }}>📹</Typography>
                      </Box>
                    )}
                    
                    {convertDateFromArray(currentWebinar.startDate) < new Date() && (
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            color: 'white', 
                            fontWeight: 'bold',
                            p: 2,
                            bgcolor: 'rgba(0,0,0,0.6)',
                            borderRadius: 1
                          }}
                        >
                          {t('webinar.past')}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </motion.div>
              </Grid>
              
              {/* Content Column */}
              <Grid item xs={12} md={7}>
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <Paper sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                      {t('webinar.description')}
                    </Typography>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
                      {currentWebinar.description || t('webinar.noDescription')}
                    </Typography>
                    
                    {currentWebinar.link && (
                      <>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {t('webinar.joinLink')}
                        </Typography>
                        
                        <Box 
                          component="a" 
                          href={currentWebinar.link}
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
                          {currentWebinar.link}
                        </Box>
                      </>
                    )}
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
            
            {/* Participants Section */}
            {currentWebinar?.participantsFullNames && currentWebinar.participantsFullNames.length > 0 && (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <Paper sx={{ p: 3, mt: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {t('webinar.participants')} ({currentWebinar.participantsFullNames.length})
                  </Typography>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    {currentWebinar.participantsFullNames.slice(0, 5).map((name, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                            <PersonIcon />
                          </Avatar>
                          <Typography variant="body1">{name}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  
                  {currentWebinar.participantsFullNames.length > 5 && (
                    <Button 
                      variant="text" 
                      color="primary" 
                      startIcon={<GroupIcon />}
                      onClick={handleShowParticipants}
                      sx={{ mt: 2 }}
                    >
                      {t('webinar.viewAllParticipants')}
                    </Button>
                  )}
                </Paper>
              </motion.div>
            )}
            
            {/* Registration Modal */}
            {currentWebinar && (
              <WebinarRegistrationModal
                webinar={currentWebinar}
                open={registrationModalOpen}
                onClose={handleModalClose}
                onSuccess={handleRegistrationSuccess}
              />
            )}
            
            {/* Participants Modal */}
            {currentWebinar && (
              <WebinarParticipantsModal
                webinar={currentWebinar}
                open={participantsModalOpen}
                onClose={handleCloseParticipantsModal}
              />
            )}
          </>
        )}
      </Container>
    </WebinarLayout>
  );
};

export default WebinarDetails;


