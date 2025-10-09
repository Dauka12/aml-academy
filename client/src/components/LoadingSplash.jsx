import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSplash = ({ message = 'Loading...', small = false }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: small ? '60vh' : '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
        color: '#fff',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: small ? 420 : 540 }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: { xs: 3, sm: 4 },
            p: { xs: 3, sm: 4.5 },
            textAlign: 'center',
            boxShadow: '0 18px 50px rgba(0,0,0,0.22)',
            border: '1px solid rgba(255,255,255,0.18)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 2, sm: 3 } }}>
            <CircularProgress
              size={small ? 40 : 52}
              thickness={4.2}
              sx={{
                color: theme.palette.primary.light,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round'
                }
              }}
            />
          </Box>
          <Typography
            variant={small ? 'h6' : 'h5'}
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              mb: { xs: 1.5, sm: 2.5 }
            }}
          >
            {message}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.5,
              fontSize: { xs: '0.85rem', sm: '0.95rem' }
            }}
          >
            {small
              ? 'Almost there — preparing your content.'
              : 'We confirm your access and prepare the FinIQ experience for you.'}
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LoadingSplash;
