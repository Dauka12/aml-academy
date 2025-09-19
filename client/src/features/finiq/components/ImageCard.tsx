import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';

const MotionCard = motion(Card);

interface ImageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  imageUrl,
  category
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MotionCard
        sx={{
          cursor: 'pointer',
          borderRadius: { xs: 2, sm: 3 },
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          }
        }}
        onClick={handleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image with overlay */}
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '75%', // 4:3 aspect ratio for images
          background: `url(${imageUrl}) center/cover`,
          backgroundColor: '#f5f5f5'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1
            }
          }}>
            <Box sx={{
              width: { xs: 48, sm: 64 },
              height: { xs: 48, sm: 64 },
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <ImageIcon sx={{ 
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: '#1976d2'
              }} />
            </Box>
          </Box>
          
          {/* Category badge */}
          <Box sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {category}
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ 
          flexGrow: 1,
          p: { xs: 1.5, sm: 2 },
          '&:last-child': { paddingBottom: { xs: 1.5, sm: 2 } }
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              fontWeight: 600,
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </MotionCard>

      {/* Image Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            margin: isMobile ? 0 : 2,
            borderRadius: isMobile ? 0 : 2,
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                background: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{
              position: 'relative',
              width: '100%',
              minHeight: { xs: '60vh', sm: '70vh' },
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={imageUrl}
                alt={title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
            
            {/* Image info */}
            <Box sx={{ p: { xs: 2, sm: 3 }, background: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mr: 2
                }}>
                  {category}
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default ImageCard;