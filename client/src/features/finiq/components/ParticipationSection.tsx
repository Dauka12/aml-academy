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
  ListItemText,
  Grid
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import {
  School as TeacherIcon,
  Groups as StudentsIcon,
  Elderly as SeniorsIcon,
  WorkspacePremium as ExpertIcon
} from '@mui/icons-material';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const ParticipationSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{ py: { xs: 6, sm: 8 } }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, sm: 6 }
        }}>
          {/* Кто может участвовать */}
          <Box sx={{ flex: { xs: '1', md: '1' } }}>
            <MotionPaper
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                height: '100%',
                background: '#1a237e',
                color: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonIcon sx={{ fontSize: '2rem', mr: 2 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.4rem', sm: '1.8rem' },
                    fontWeight: 'bold'
                  }}
                >
                  {t('finiq.whoCanParticipate')}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  lineHeight: 1.6,
                  opacity: 0.95,
                  mb: 4
                }}
              >
                {t('finiq.participation.anyone')}
              </Typography>
              
              {/* Participant Categories */}
              <Grid container spacing={2}>
                {[
                  {
                    titleKey: 'finiq.participants.teachers.title',
                    icon: <TeacherIcon sx={{ fontSize: '1.5rem', color: 'white' }} />,
                    descriptionKey: 'finiq.participants.teachers.description'
                  },
                  {
                    titleKey: 'finiq.participants.students.title',
                    icon: <StudentsIcon sx={{ fontSize: '1.5rem', color: 'white' }} />,
                    descriptionKey: 'finiq.participants.students.description'
                  },
                  {
                    titleKey: 'finiq.participants.seniors.title',
                    icon: <SeniorsIcon sx={{ fontSize: '1.5rem', color: 'white' }} />,
                    descriptionKey: 'finiq.participants.seniors.description'
                  },
                  {
                    titleKey: 'finiq.participants.experts.title',
                    icon: <ExpertIcon sx={{ fontSize: '1.5rem', color: 'white' }} />,
                    descriptionKey: 'finiq.participants.experts.description'
                  }
                ].map((participant, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ mr: 2, mt: 0.5 }}>
                        {participant.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                            color: 'white',
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                          }}
                        >
                          {t(participant.titleKey)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: { xs: '0.75rem', sm: '0.85rem' },
                            lineHeight: 1.4
                          }}
                        >
                          {t(participant.descriptionKey)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </MotionPaper>
          </Box>

          {/* Как участвовать */}
          <Box sx={{ flex: { xs: '1', md: '1' } }}>
            <MotionPaper
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                height: '100%',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ComputerIcon sx={{ fontSize: '2rem', mr: 2, color: '#1976d2' }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.4rem', sm: '1.8rem' },
                    fontWeight: 'bold',
                    color: '#2c3e50'
                  }}
                >
                  {t('finiq.participation.howToParticipate')}
                </Typography>
              </Box>
              <List sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        {t('finiq.participation.steps.registration')}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TimerIcon sx={{ color: '#ff9800' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        {t('finiq.participation.steps.questions')}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <EmojiEventsIcon sx={{ color: '#ffd700' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        {t('finiq.participation.steps.diploma')}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <SchoolIcon sx={{ color: '#2196f3' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        {t('finiq.participation.steps.certificate')}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </MotionPaper>
          </Box>
        </Box>

        {/* Награды */}
        <MotionBox
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          sx={{ mt: { xs: 4, sm: 6 } }}
        >
          <Paper
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              background: '#e3f2fd',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
                fontWeight: 'bold',
                mb: 2,
                color: '#2c3e50',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {t('finiq.participation.rewards.regionTitle')}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 600,
                color: '#2c3e50'
              }}
            >
              {t('finiq.participation.rewards.regionDescription')}
            </Typography>
          </Paper>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default ParticipationSection;