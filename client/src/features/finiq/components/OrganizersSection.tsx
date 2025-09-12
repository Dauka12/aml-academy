import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography
} from '@mui/material';

const MotionCard = motion(Card);

const OrganizersSection: React.FC = () => {
  const { t } = useTranslation();

  const organizers = [
    { name: 'АФМ', color: 'primary' },
    { name: 'АМЛ Академия', color: 'primary' },
    { name: 'Халык банк', color: 'primary' }
  ];

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        sx={{
          textAlign: { xs: 'left', sm: 'center' },
          mb: 4,
          color: '#1A2751',
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' }
        }}
      >
        {t('finiq.organizers', 'ОРГАНИЗАТОРЫ')}
      </Typography>

      <MotionCard
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        sx={{
          mb: 4,
          borderRadius: 2,
          background: 'rgba(245, 247, 250, 0.9)',
          textAlign: 'center',
          py: { xs: 3, sm: 4 }
        }}
      >
        <CardContent>
          {/* Organizers */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: { xs: 3, sm: 4, md: 5 },
            mb: 5
          }}>
            {organizers.map((org, index) => (
              <Box 
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: { xs: '140px', sm: '160px', md: '180px' },
                  p: 2,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(26, 39, 81, 0.15)',
                    bgcolor: 'rgba(255, 255, 255, 0.8)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: { xs: 80, sm: 100, md: 120 },
                    height: { xs: 50, sm: 65, md: 75 },
                    background: 'linear-gradient(135deg, #1976d2 0%, #1A2751 100%)',
                    borderRadius: 2,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.35)'
                    }
                  }}
                >
                  LOGO
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    textAlign: 'center',
                    lineHeight: 1.2,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1A2751 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {org.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Decorative divider */}
          <Box 
            sx={{
              width: '60%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #1976d2 50%, transparent 100%)',
              mx: 'auto',
              mb: 4
            }}
          />

          {/* Under Aegis */}
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            sx={{
              mb: 3,
              color: '#1A2751',
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
              textAlign: 'center'
            }}
          >
            {t('finiq.underAegis')}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: { xs: 2, sm: 3 } 
          }}>
            {[
              t('finiq.constitution30'),
              'АДАЛ АЗАМАТ',
              'ЗАҢ МЕН ТӘРТІП'
            ].map((label, index) => (
              <Chip
                key={index}
                label={label}
                variant="outlined"
                sx={{
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 2, sm: 3 },
                  height: { xs: '36px', sm: '44px' },
                  borderRadius: 3,
                  borderColor: '#1976d2',
                  color: '#1A2751',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#1976d2',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(25, 118, 210, 0.25)'
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
      </MotionCard>
    </Box>
  );
};

export default OrganizersSection;