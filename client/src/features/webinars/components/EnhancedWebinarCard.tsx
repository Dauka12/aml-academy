import React, { useRef, useEffect } from 'react';
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
  Button,
  Tooltip
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  VideoCall as VideoCallIcon,
  Computer as ComputerIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import '../pages/WebinarLanding.scss';

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

interface EnhancedWebinarCardProps {
  webinar: Webinar;
  featured?: boolean;
  onRegisterClick?: (webinar: Webinar) => void;
}

const EnhancedWebinarCard: React.FC<EnhancedWebinarCardProps> = ({ 
  webinar, 
  featured = false,
  onRegisterClick
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // References for image blur effect
  const imageRef = useRef<HTMLImageElement>(null);
  const leftBlurRef = useRef<HTMLDivElement>(null);
  const rightBlurRef = useRef<HTMLDivElement>(null);

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

  // Set background image for blur effects when image is loaded
  useEffect(() => {
    if (webinar.imageUrl && imageRef.current) {
      // Store reference to current DOM element in a variable
      const currentImageRef = imageRef.current;
      
      const handleImageLoad = () => {
        const imageUrl = webinar.imageUrl;
        if (leftBlurRef.current && rightBlurRef.current) {
          leftBlurRef.current.style.backgroundImage = `url(${imageUrl})`;
          rightBlurRef.current.style.backgroundImage = `url(${imageUrl})`;
        }
      };

      currentImageRef.addEventListener('load', handleImageLoad);
      
      // If image is already loaded (from cache)
      if (currentImageRef.complete) {
        const imageUrl = webinar.imageUrl;
        if (leftBlurRef.current && rightBlurRef.current) {
          leftBlurRef.current.style.backgroundImage = `url(${imageUrl})`;
          rightBlurRef.current.style.backgroundImage = `url(${imageUrl})`;
        }
      }
      
      return () => {
        // Use the stored reference in cleanup
        currentImageRef.removeEventListener('load', handleImageLoad);
      };
    }
  }, [webinar.imageUrl]);
  
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
            boxShadow: 4
          },
          ...(featured && {
            border: '2px solid',
            borderColor: 'primary.main'
          })
        }}
        onClick={handleCardClick}
      >
        <Box sx={{ position: 'relative' }} className="image">
          <div className="image-wrapper">
            {webinar.imageUrl ? (
              <>
                <img 
                  ref={imageRef}
                  src={webinar.imageUrl}
                  alt={webinar.title}
                />
                <div ref={leftBlurRef} className="image-blur-left"></div>
                <div ref={rightBlurRef} className="image-blur-right"></div>
              </>
            ) : (
              <div className="placeholder-image">
                <span>{webinar.title.substring(0, 2).toUpperCase()}</span>
              </div>
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
                justifyContent: 'center',
                zIndex: 3
              }}>
                <Chip 
                  label={t('webinar.completed')} 
                  color="default" 
                  sx={{ 
                    bgcolor: 'rgba(0,0,0,0.7)', 
                    color: 'white',
                    fontWeight: 'bold'
                  }} 
                />
              </Box>
            )}
            
            {featured && (
              <Chip 
                label={t('webinar.featured')} 
                color="primary" 
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8, 
                  fontWeight: 'bold',
                  zIndex: 4
                }} 
              />
            )}
          </div>
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h3" gutterBottom noWrap sx={{ fontWeight: 'bold' }}>
            {webinar.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ClockIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {formattedTime}
            </Typography>
          </Box>
          
          {webinar.description && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                flexGrow: 1
              }}
            >
              {webinar.description}
            </Typography>
          )}
          
          {webinar.signupsCount !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PeopleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {t('webinar.participantsCount')} { webinar.signupsCount * 3 }
              </Typography>
            </Box>
          )}
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          {isUpcoming && onRegisterClick && (
            webinar.isSignedUp ? (
              <Tooltip title={t('webinar.alreadyRegistered') || "Вы уже зарегистрированы"}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5
                }}>
                  <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" fontWeight="medium">
                    {t('webinar.registered') || "Зарегистрированы"}
                  </Typography>
                </Box>
              </Tooltip>
            ) : (
              <Button 
                size="small" 
                variant="contained" 
                color="primary"
                onClick={handleRegisterClick}
              >
                {t('webinar.register')}
              </Button>
            )
          )}
          
          <Button 
            size="small" 
            endIcon={<ArrowForwardIcon />}
            sx={{ ml: 'auto' }}
          >
            {t('webinar.details')}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default EnhancedWebinarCard;
