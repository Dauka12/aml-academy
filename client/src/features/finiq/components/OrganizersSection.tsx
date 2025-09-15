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
import afmLogo from '../assets/images/afm_logo.png';
import amlAcademyLogo from '../assets/images/aml_academy_logo.png';
import halykLogo from '../assets/images/halyk_bank_logo.jpeg';
import qarizsyzLogo from '../assets/images/karizsiz_kogam_logo.jpg';
const MotionCard = motion(Card);

const OrganizersSection: React.FC = () => {
  const { t } = useTranslation();



  const organizers: { name: string; image: string; alt: string }[] = [
    { name: 'АФМ РК', image: afmLogo, alt: 'Агентство по финансовому мониторингу Республики Казахстан' },
    { name: 'AML academy', image: amlAcademyLogo, alt: 'AML Academy' },
    { name: 'Халык банк', image: halykLogo, alt: 'Halyk Bank' },
    { name: 'Qarizsyz Qogam', image: qarizsyzLogo, alt: 'Qarizsyz Qogam' }
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
                  minWidth: { xs: '140px', sm: '160px', md: '170px' },
                  p: 2,
                  borderRadius: 3
                }}
              >
                <Box
                  component="img"
                  src={org.image}
                  alt={org.alt}
                  loading="lazy"
                  sx={{
                    width: { xs: 130, sm: 140, md: 150 },
                    height: { xs: 130, sm: 140, md: 150 },
                    mb: 2,
                    objectFit: 'contain',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 4,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 4px rgba(26,39,81,0.08)',
                    padding: 1.5
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    textAlign: 'center',
                    lineHeight: 1.2,
                    color: '#143560'
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

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: { xs: 2, sm: 3 } 
          }}>
            {[
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