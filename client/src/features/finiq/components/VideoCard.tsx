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
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MotionCard = motion(Card);

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  thumbnail,
  videoUrl,
  duration
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
        {/* Thumbnail with Play Button */}
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          background: `url(${thumbnail}) center/cover`,
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
              <PlayArrowIcon sx={{ 
                fontSize: { xs: '1.5rem', sm: '2rem' },
                color: '#1976d2',
                ml: 0.5
              }} />
            </Box>
          </Box>
          
          {/* Duration badge */}
          <Box sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {duration}
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ 
          p: { xs: 1.5, sm: 2 },
          '&:last-child': { paddingBottom: { xs: 1.5, sm: 2 } }
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textAlign: 'center'
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </MotionCard>

      {/* Video Modal */}
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
              paddingTop: '56.25%', // 16:9 aspect ratio
              background: '#000'
            }}>
              <iframe
                src={videoUrl}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </Box>
            
            {/* Video info */}
            <Box sx={{ p: { xs: 2, sm: 3 }, background: '#fff' }}>
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

export default VideoCard;