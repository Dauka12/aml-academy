import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Button,
  Typography
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const MotionButton = motion(Button);
const MotionBox = motion(Box);

interface ActionButtonsSectionProps {
  onNavigateToTest: () => void;
  onNavigateToImprove: () => void;
}

const ActionButtonsSection: React.FC<ActionButtonsSectionProps> = ({
  onNavigateToTest,
  onNavigateToImprove
}) => {
  const { t } = useTranslation();
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{ py: { xs: 6, sm: 8 }}}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5 } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 2,
              color: '#1a237e'
            }}
          >
            {t('finiq.actionButtons.readyToTest')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.1rem' },
              color: '#666',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            {t('finiq.actionButtons.chooseMethod')}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: { xs: 3, sm: 4 },
            flexWrap: 'wrap',
            maxWidth: { xs: '100%', sm: '700px' },
            mx: 'auto'
          }}
        >
          <MotionButton
            variant="outlined"
            size="large"
            startIcon={<TrendingUpIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
            onClick={onNavigateToImprove}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              px: { xs: 3, sm: 4 },
              py: { xs: 2, sm: 2.5 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(26, 35, 126, 0.15)',
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '280px' },
              borderColor: '#1a237e',
              color: '#1a237e',
              background: 'white',
              border: '2px solid #1a237e',
              '&:hover': {
                borderColor: '#0d47a1',
                color: '#0d47a1',
                background: 'rgba(26, 35, 126, 0.05)',
                boxShadow: '0 6px 20px rgba(26, 35, 126, 0.25)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            {t('finiq.actionButtons.improveKnowledge')}
          </MotionButton>
          
          <MotionButton
            variant="contained"
            size="large"
            startIcon={<AssignmentIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
            onClick={onNavigateToTest}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              px: { xs: 3, sm: 4 },
              py: { xs: 2, sm: 2.5 },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(26, 35, 126, 0.3)',
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '280px' },
              background: '#1a237e',
              color: 'white',
              '&:hover': {
                background: '#0d47a1',
                boxShadow: '0 6px 20px rgba(26, 35, 126, 0.4)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            {t('finiq.actionButtons.goToTest')}
          </MotionButton>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default ActionButtonsSection;