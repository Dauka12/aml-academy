import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Webinar } from '../types/webinar';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  VideoCall as VideoCallIcon,
  Computer as ComputerIcon
} from '@mui/icons-material';

// Animation variants
const fadeInUp = {
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

interface WebinarCardProps {
  webinar: Webinar;
  featured?: boolean;
  onRegisterClick?: (webinar: Webinar) => void;
}

const WebinarCard: React.FC<WebinarCardProps> = ({ 
  webinar, 
  featured = false,
  onRegisterClick
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
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
  
  // Determine webinar type (online or distance)
  const isOnline = webinar.type === 'online';
  const isDistance = webinar.type === 'distance' || !webinar.type; // Default to distance if not specified
  
  const handleCardClick = () => {
    navigate(`/webinars/details/${webinar.id}`);
  };
  
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRegisterClick) {
      onRegisterClick(webinar);
    }
  };
  
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="webinar-card"
      style={{ height: '100%' }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 1,
          cursor: 'pointer',
          transition: 'all 0.3s',
          border: '1px solid',
          borderColor: 'grey.100',
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-5px)'
          },
          ...(featured && {
            border: '2px solid',
            borderColor: 'primary.main'
          })
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ position: 'relative' }}>
          {/* Type specific header */}
          {isOnline ? (
            <Box sx={{ 
              height: 120, 
              bgcolor: 'primary.main', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <VideoCallIcon sx={{ fontSize: 48, mb: 1, opacity: 0.8 }} />
              <Typography variant="subtitle1">{t('webinar.onlineWebinar')}</Typography>
            </Box>
          ) : (
            <CardMedia
              component="img"
              height={160}
              image={webinar.imageUrl || "/api/placeholder/400/160"}
              alt={webinar.title}
              sx={{ 
                objectFit: 'cover'
              }}
            />
          )}
          
          {/* Status indicators */}
          {!isUpcoming && (
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                {t('webinar.past')}
              </Typography>
            </Box>
          )}
          
          {/* Type badge */}
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Chip
              icon={isOnline ? <VideoCallIcon sx={{ color: 'green.800' }} /> : <ComputerIcon sx={{ color: 'blue.800' }} />}
              label={isOnline ? t('webinar.online') : t('webinar.distance')}
              size="small"
              sx={{ 
                bgcolor: isOnline ? 'rgba(220, 255, 220, 0.9)' : 'rgba(220, 220, 255, 0.9)',
                color: isOnline ? 'green.800' : 'blue.800',
                fontWeight: 'medium',
                backdropFilter: 'blur(4px)'
              }}
            />
          </Box>
          
          {/* Featured badge */}
          {featured && (
            <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
              <Chip
                label={t('webinar.featured')}
                size="small"
                color="secondary"
                sx={{ fontWeight: 'medium' }}
              />
            </Box>
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {webinar.title}
            </Typography>
            
            {webinar.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: 'orange.main', fontWeight: 'bold' }}>
                  {webinar.rating.toFixed(1)}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {formattedDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ClockIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {formattedTime}
              </Typography>
            </Box>
          </Box>
          
          {webinar.description && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                mb: 2
              }}
            >
              {webinar.description}
            </Typography>
          )}
          
          {webinar.speaker && (
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'medium',
                color: 'text.primary',
                mb: 1
              }}
            >
              {webinar.speaker}
            </Typography>
          )}
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'grey.100' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PeopleIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {webinar.signupsCount || 0} {t('webinar.registered')}
            </Typography>
          </Box>
          
          {isUpcoming ? (
            <Button
              size="small"
              variant="text"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={handleRegisterClick}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'transparent',
                  transform: 'translateX(4px)'
                }
              }}
            >
              {t('webinar.register')}
            </Button>
          ) : (
            <Button
              size="small"
              variant="text"
              color="inherit"
              endIcon={<ArrowForwardIcon />}
              sx={{ color: 'text.secondary' }}
            >
              {t('webinar.details')}
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default WebinarCard;
