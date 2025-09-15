import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Typography,
  useTheme
} from '@mui/material';

// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

interface HeroSectionProps {
  onNavigateToTest: () => void;
  onNavigateToPractice: () => void;
  onNavigateToImprove: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToTest,
  onNavigateToPractice,
  onNavigateToImprove
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{
      textAlign: 'center',
      pt: { xs: 2, sm: 3 },
      pb: { xs: 3, sm: 4 },
      position: 'relative'
    }}>
      <Typography
        variant="h2"
        component="h1"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: 'transparent',
          mt: { xs: 5, sm: 2 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          fontSize: { xs: '1.3rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
          lineHeight: { xs: 1.2, sm: 1.3 },
          px: { xs: 1, sm: 0 }
        }}
      >
        {t('finiq.title')}
      </Typography>

      <MotionTypography
        variant="h4"
        fontWeight="bold"
        color="primary"
        sx={{
          mb: 4,
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' },
          textAlign: 'center'
        }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        (FinIQ 2025)
      </MotionTypography>

      <MotionTypography
        variant="h6"
        sx={{
          mb: 4,
          color: 'text.secondary',
          maxWidth: '800px',
          mx: 'auto',
          lineHeight: 1.6,
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' },
          textAlign: { xs: 'left', sm: 'center' },
          px: { xs: 1, sm: 0 }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        {t('finiq.subtitle')}
      </MotionTypography>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          gap: { xs: 2, sm: 2 },
          mt: 4,
          mb: 6,
          flexWrap: 'wrap',
          px: { xs: 1, sm: 0 }
        }}
      >
        <MotionButton
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<TrendingUpIcon />}
          onClick={onNavigateToImprove}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            borderRadius: 3,
            px: { xs: 2, sm: 3 },
            py: 1.5,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            width: { xs: '100%', sm: 'auto' },
            minWidth: { sm: '180px' }
          }}
        >
          {t('finiq.improveKnowledge')}
        </MotionButton>
        <MotionButton
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AssignmentIcon />}
          onClick={onNavigateToTest}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            borderRadius: 3,
            px: { xs: 2, sm: 3 },
            py: 1.5,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            width: { xs: '100%', sm: 'auto' },
            minWidth: { sm: '180px' }
          }}
        >
          {t('finiq.startTest')}
        </MotionButton>
      </Box>
    </Box>
  );
};

export default HeroSection;