import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  useTheme
} from '@mui/material';

// Icons
import GroupIcon from '@mui/icons-material/Group';

const MotionCard = motion(Card);

interface StatisticsSectionProps {
  studentCount: number;
  loading: boolean;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  studentCount,
  loading
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MotionCard
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      sx={{
        mb: 6,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
        color: 'white',
        textAlign: 'center',
        py: { xs: 3, sm: 4 },
        borderRadius: 2
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' } }}
        >
          {t('finiq.statistics')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3 }}>
          {loading ? (
            <CircularProgress sx={{ color: 'white' }} />
          ) : (
            <>
              <GroupIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
              >
                {studentCount.toLocaleString()}
              </Typography>
            </>
          )}
        </Box>
        <Typography
          variant="h6"
          sx={{
            mt: 1,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
          }}
        >
          {t('finiq.participantCount')}
        </Typography>
      </CardContent>
    </MotionCard>
  );
};

export default StatisticsSection;