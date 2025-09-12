import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

const MotionCard = motion(Card);

const ImportanceSection: React.FC = () => {
  const { t } = useTranslation();

  const skills = [
    t('finiq.skills.budget'),
    t('finiq.skills.services'),
    t('finiq.skills.understanding'),
    t('finiq.skills.recognition'),
    t('finiq.skills.decisions')
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
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
          px: { xs: 1, sm: 0 }
        }}
      >
        {t('finiq.whyImportant')}
      </Typography>

      <Card elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="body1"
            paragraph
            sx={{
              textAlign: 'left',
              lineHeight: 1.7,
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {t('finiq.importance.intro')}
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              textAlign: 'left',
              lineHeight: 1.7,
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {t('finiq.importance.consequences')}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              mt: 3,
              textAlign: 'left',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            {t('finiq.skills.title')}
          </Typography>

          <Box sx={{ pl: { xs: 1, sm: 2 } }}>
            {skills.map((skill, index) => (
              <Typography
                key={index}
                variant="body1"
                paragraph
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 1,
                  textAlign: 'left',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                <Box component="span" sx={{ mr: 1, color: 'primary.main', fontWeight: 'bold' }}>•</Box>
                {skill}
              </Typography>
            ))}
          </Box>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'left',
              lineHeight: 1.7,
              mt: 3,
              fontWeight: 'medium',
              color: 'primary.dark',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {t('finiq.importance.conclusion')}
          </Typography>
        </CardContent>
      </Card>

      {/* Final Message */}
      <MotionCard
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        sx={{
          borderRadius: 2,
          background: 'rgba(245, 247, 250, 0.9)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              textAlign: 'left'
            }}
          >
            {t('finiq.finalMessage')}
          </Typography>
        </CardContent>
      </MotionCard>
    </Box>
  );
};

export default ImportanceSection;