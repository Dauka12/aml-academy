import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  useTheme
} from '@mui/material';

const MotionCard = motion(Card);

const DateBanner: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MotionCard
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      sx={{
        mb: 6,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
        color: 'white',
        textAlign: { xs: 'left', sm: 'center' },
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
        borderRadius: 2,
        width: { xs: '100%', sm: 'auto' },
        minWidth: { sm: '180px' }
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 3 } }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
            lineHeight: 1.4
          }}
        >
          {t('finiq.period')}
        </Typography>
      </CardContent>
    </MotionCard>
  );
};

export default DateBanner;