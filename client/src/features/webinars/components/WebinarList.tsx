import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  List, 
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import { 
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  Event as EventIcon
} from '@mui/icons-material';

import { Webinar } from '../types/webinar';
import WebinarRegistrationModal from '../components/modals/WebinarRegistrationModal';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

const listItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Helper function to convert array date format to Date object
const convertDateFromArray = (dateArray: any): Date => {
  if (Array.isArray(dateArray)) {
    // Convert from array format [year, month, day, hour, minute]
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
  }
  return new Date(dateArray);
};

interface WebinarListItemProps {
  webinar: Webinar;
  onClick: (webinar: Webinar) => void;
  onRegisterClick: (webinar: Webinar) => void;
}

const WebinarListItem: React.FC<WebinarListItemProps> = ({ 
  webinar, 
  onClick,
  onRegisterClick 
}) => {
  const { t } = useTranslation();
  
  // Fix startDate format
  const startDate = convertDateFromArray(webinar.startDate);
  const isUpcoming = startDate > new Date();
  
  // Format the date nicely
  const formattedDate = startDate.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const formattedTime = startDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div variants={listItemVariant}>
      <Paper 
        elevation={1}
        sx={{ 
          mb: 2, 
          overflow: 'hidden',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: 3
          }
        }}
      >
        <ListItem 
          alignItems="flex-start" 
          sx={{ 
            px: { xs: 2, md: 3 }, 
            py: { xs: 2, md: 3 },
            cursor: 'pointer'
          }}
          onClick={() => onClick(webinar)}
        >
          <ListItemAvatar sx={{ mr: { xs: 2, md: 3 } }}>
            <Avatar 
              src={webinar.imageUrl || undefined} 
              variant="rounded"
              sx={{ 
                width: { xs: 80, sm: 100 }, 
                height: { xs: 80, sm: 100 },
                borderRadius: 1
              }}
            >
              <EventIcon fontSize="large" />
            </Avatar>
          </ListItemAvatar>
          
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, flexWrap: 'wrap' }}>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ mr: 1, fontWeight: 'medium' }}
                >
                  {webinar.title}
                </Typography>
                
                {!isUpcoming && (
                  <Chip
                    label={t('webinar.past')}
                    size="small"
                    sx={{ 
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      fontWeight: 'medium',
                      ml: 1
                    }}
                  />
                )}
              </Box>
            }
            secondary={
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {formattedDate} • {formattedTime}
                  </Typography>
                </Box>
                
                {webinar.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 1
                    }}
                  >
                    {webinar.description}
                  </Typography>
                )}
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {webinar.signupsCount || 0} {t('webinar.registered')}
                    </Typography>
                  </Box>
                  
                  {isUpcoming && (
                    <Button 
                      size="small" 
                      variant="outlined"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRegisterClick(webinar);
                      }}
                    >
                      {t('webinar.register')}
                    </Button>
                  )}
                </Box>
              </Box>
            }
          />
        </ListItem>
      </Paper>
    </motion.div>
  );
};

interface WebinarListProps {
  webinars: Webinar[];
  loading?: boolean;
  title?: string;
}

const WebinarList: React.FC<WebinarListProps> = ({ 
  webinars, 
  loading = false,
  title
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  
  const handleWebinarClick = (webinar: Webinar) => {
    navigate(`/webinars/details/${webinar.id}`);
  };
  
  const handleRegisterClick = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setRegistrationModalOpen(true);
  };
  
  const handleRegistrationSuccess = () => {
    setRegistrationModalOpen(false);
    // Optional: Show success message or refresh data
  };
  
  // If there are no webinars, show message
  if (!loading && webinars.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {t('webinar.noWebinarsAvailable')}
        </Typography>
      </Paper>
    );
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {title && (
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
        {webinars.map((webinar, index) => (
          <React.Fragment key={webinar.id}>
            <WebinarListItem 
              webinar={webinar} 
              onClick={handleWebinarClick}
              onRegisterClick={handleRegisterClick}
            />
            {index < webinars.length - 1 && (
              <Divider variant="inset" component="li" sx={{ ml: 0 }} />
            )}
          </React.Fragment>
        ))}
      </List>
      
      {selectedWebinar && (
        <WebinarRegistrationModal
          webinar={selectedWebinar}
          open={registrationModalOpen}
          onClose={() => setRegistrationModalOpen(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </motion.div>
  );
};

export default WebinarList;
