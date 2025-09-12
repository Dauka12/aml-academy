import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography
} from '@mui/material';

const MotionCard = motion(Card);

const TestDescription: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MotionCard
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.7 }}
      sx={{
        mb: 6,
        borderRadius: 2,
        background: 'rgba(245, 247, 250, 0.9)',
        width: { xs: '100%', sm: 'auto' },
        minWidth: { sm: '180px' }
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 4 }, textAlign: { xs: 'left', sm: 'center' } }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{
            mb: 3,
            color: '#1A2751',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' }
          }}
        >
          {t('finiq.testTitle', 'Диктант (FinIQ 2025)')}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
            textAlign: 'left'
          }}
        >
          {t('finiq.testDescription')}
        </Typography>
      </CardContent>
    </MotionCard>
  );
};

export default TestDescription;