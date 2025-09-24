import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const ImportanceSection: React.FC = () => {
  const { t } = useTranslation();
  
  const skills = [
    {
      icon: <AccountBalanceWalletIcon sx={{ color: '#4caf50' }} />,
      text: t('finiq.importance.skills.budget')
    },
    {
      icon: <SecurityIcon sx={{ color: '#2196f3' }} />,
      text: t('finiq.importance.skills.banking')
    },
    {
      icon: <TrendingUpIcon sx={{ color: '#ff9800' }} />,
      text: t('finiq.importance.skills.investments')
    },
    {
      icon: <VisibilityIcon sx={{ color: '#f44336' }} />,
      text: t('finiq.importance.skills.fraud')
    },
    {
      icon: <EmojiObjectsIcon sx={{ color: '#9c27b0' }} />,
      text: t('finiq.importance.skills.decisions')
    }
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{ py: { xs: 6, sm: 8 }, background: '#fff' }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 3,
              color: '#1a237e'
            }}
          >
            {t('finiq.importance.title')}
          </Typography>
        </MotionBox>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 4, sm: 6 }
        }}>
          {/* Основной текст */}
          <Box sx={{ flex: { xs: '1', lg: '2' } }}>
            <MotionPaper
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                height: '100%'
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.7,
                  mb: 3,
                  color: '#2c3e50'
                }}
              >
                {t('finiq.importance.description.first')}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.7,
                  mb: 3,
                  color: '#2c3e50'
                }}
              >
                {t('finiq.importance.description.second')}
              </Typography>

            </MotionPaper>
          </Box>

          {/* Навыки */}
          <Box sx={{ flex: { xs: '1', lg: '1' } }}>
            <MotionPaper
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                background: '#1a237e',
                color: 'white',
                height: '100%'
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.3rem', sm: '1.5rem' },
                  fontWeight: 'bold',
                  mb: 3,
                  textAlign: 'center'
                }}
              >
                {t('finiq.importance.skillsTitle')}
              </Typography>

              <List sx={{ py: 0 }}>
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {skill.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                              lineHeight: 1.4,
                              color: 'rgba(255,255,255,0.95)'
                            }}
                          >
                            {skill.text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.7,
                  color: '#2c3e50',
                  fontWeight: 600,
                  background: '#f8f9fa',
                  p: 3,
                  borderRadius: 2,
                  borderLeft: '4px solid #4caf50'
                }}
              >
                {t('finiq.importance.conclusion')}
              </Typography>
            </MotionPaper>
          </Box>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default ImportanceSection;