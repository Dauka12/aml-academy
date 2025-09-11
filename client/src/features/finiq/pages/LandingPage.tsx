import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
  useTheme,
  CircularProgress,
  Collapse,
  IconButton
} from '@mui/material';

// Icons
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CertificateIcon from '@mui/icons-material/CardMembership';
import CloseIcon from '@mui/icons-material/Close';
import ComputerIcon from '@mui/icons-material/Computer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletIcon from '@mui/icons-material/Tablet';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// API
import { getStudentCount } from '../api/statisticsApi';

// Components
import FloatingRegistrationButton from '../components/FloatingRegistrationButton.tsx';
import LanguageToggle from '../components/LanguageToggle.tsx';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);
const MotionButton = motion(Button);

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState<string>('');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStudentCount();
        // Суммируем все значения в объекте
        const total = Object.values(data).reduce((sum, count) => sum + count, 0);
        setStudentCount(total);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleNavigateToTest = () => {
    navigate('/finiq/test');
  };

  const handleNavigateToPractice = () => {
    navigate('/finiq/practice');
  };

  const handleNavigateToImprove = () => {
    navigate('/finiq/improve-knowledge');
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
      <MotionPaper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          background: 'transparent'
        }}
      >
        {/* Header Section */}
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              lineHeight: { xs: 1.2, sm: 1.3 },
              px: { xs: 1, sm: 0 }
            }}
          >
            {t('finiq.title', 'РЕСПУБЛИКАНСКИЙ ДИКТАНТ ПО ФИНАНСОВОЙ БЕЗОПАСНОСТИ')}
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
            {t('finiq.subtitle', 'Это – проверка и повышение уровня финансовой грамотности каждого, получение новых полезных навыков и закрепление финансовой безопасности в повседневной жизни.')}
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
              color="primary"
              size="large"
              startIcon={<QuizIcon />}
              onClick={handleNavigateToPractice}
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
              {t('finiq.practice', 'ПОТРЕНИРОВАТЬСЯ')}
            </MotionButton>
            <MotionButton
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<TrendingUpIcon />}
              onClick={handleNavigateToImprove}
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
              {t('finiq.improveKnowledge', 'ПРОКАЧАТЬ СВОИ ЗНАНИЯ')}
            </MotionButton>
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AssignmentIcon />}
              onClick={handleNavigateToTest}
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
              {t('finiq.startTest', 'ПЕРЕЙТИ К ДИКТАНТУ')}
            </MotionButton>
          </Box>
        </Box>

        {/* Date Banner */}
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
              {t('finiq.period', 'Республиканский диктант по финансовой безопасности (FinIQ 2025) пройдет в Казахстане в период с 1 по 15 октября')}
            </Typography>
          </CardContent>
        </MotionCard>

        {/* Who Can Participate Section */}
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
            {t('finiq.whoCanParticipate', 'Кто может участвовать?')}
          </Typography>

          <MotionGrid
            container
            spacing={3}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: <GroupIcon fontSize="large" />,
                text: t('finiq.participation.anyone', 'принять участие в Диктанте может любой желающий, независимо от возраста и уровня образования.')
              },
              {
                icon: <SmartphoneIcon fontSize="large" />,
                text: t('finiq.participation.online', 'Диктант проводится онлайн, что дает возможность из любой точки мира через смартфон, планшет или иной гаджет стать участником и внести свой вклад в финансовую безопасность страны.')
              },
              {
                icon: <CertificateIcon fontSize="large" />,
                text: t('finiq.participation.certificate', 'по итогам Диктанта каждый участник получает именной цифровой сертификат.')
              },
              {
                icon: <EmojiEventsIcon fontSize="large" />,
                text: t('finiq.participation.prizes', 'участники набравшие наибольший балл за короткое время будут награждены нашим партнером Halyk Bank.')
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <MotionCard
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    p: { xs: 1, sm: 2 },
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { sm: '180px' }
                  }}
                >
                  <CardContent sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    height: '100%',
                    p: { xs: 2, sm: 3 },
                    '&:last-child': { pb: { xs: 2, sm: 3 } }
                  }}>
                    <Box sx={{
                      color: theme.palette.primary.main,
                      flexShrink: 0,
                      mt: 0.5
                    }}>
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.6,
                        textAlign: 'left',
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}
                    >
                      {item.text}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </MotionGrid>
        </Box>

        {/* About Test Section */}
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
              {t('finiq.testDescription', '– это 20 интересных вопросов по финбезопасности в интернете (фишинг, мошенничество), защите персональных данных, инвестициям и мошенническим схемам')}
            </Typography>
          </CardContent>
        </MotionCard>

        {/* Certificates Section */}
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
              px: { xs: 2, sm: 0 }
            }}
          >
            {t('finiq.certificates', 'Сертификаты')}
          </Typography>

          <Box sx={{ px: { xs: 2, sm: 0 } }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid item xs={12} sm={6}>
                <MotionCard
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    height: { xs: '280px', sm: 'auto' },
                    minHeight: { sm: '300px' },
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'primary.light',
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { sm: '180px' },
                    '&:hover': {
                      transform: { xs: 'none', sm: 'scale(1.02)' }
                    }
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flex: 1,
                    height: '100%'
                  }}>
                    <SchoolIcon sx={{ 
                      fontSize: { xs: 50, sm: 60, md: 70 }, 
                      color: 'primary.main',
                      mb: 2
                    }} />
                    <Typography 
                      variant="h5" 
                      fontWeight="bold" 
                      gutterBottom 
                      sx={{ 
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                        mb: 2
                      }}
                    >
                      {t('finiq.participantCertificate', 'Сертификат участника')}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.5
                      }}
                    >
                      {t('finiq.participantDescription', 'Участники набравшие от 0 до 89 баллов получают сертификат')}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>

              <Grid item xs={12} sm={6}>
                <MotionCard
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    height: { xs: '280px', sm: 'auto' },
                    minHeight: { sm: '300px' },
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'warning.main',
                    background: 'linear-gradient(135deg, rgba(255,193,7,0.1) 0%, rgba(255,152,0,0.1) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { sm: '180px' }
                  }}
                >
                  <CardContent sx={{ 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flex: 1,
                    height: '100%'
                  }}>
                    <VerifiedIcon sx={{ 
                      fontSize: { xs: 50, sm: 60, md: 70 }, 
                      color: 'warning.main',
                      mb: 2
                    }} />
                    <Typography 
                      variant="h5" 
                      fontWeight="bold" 
                      gutterBottom 
                      sx={{ 
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                        mb: 2
                      }}
                    >
                      {t('finiq.winnerDiploma', 'Диплом Победителя')}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.5
                      }}
                    >
                      {t('finiq.winnerDescription', 'Участники набравшие от 90 баллов и более получают диплом победителя')}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Organizers Section */}
        <Box sx={{ mb: 6, px: { xs: 1, sm: 0 } }}>
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

          <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
            {[
              { name: 'АФМ', color: 'primary' },
              { name: 'АМЛ Академия', color: 'primary' },
              { name: 'Халык банк', color: 'primary' }
            ].map((org, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    height: { xs: 140, sm: 160, md: 180 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid',
                    borderColor: 'primary.light',
                    transition: 'all 0.3s ease',
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { sm: '180px' },
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%'
                  }}>
                    {/* Placeholder for logo */}
                    <Box
                      sx={{
                        width: { xs: 70, sm: 90, md: 100 },
                        height: { xs: 45, sm: 55, md: 60 },
                        bgcolor: 'primary.light',
                        borderRadius: 1,
                        mb: { xs: 1, sm: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                        fontWeight: 'bold'
                      }}
                    >
                      LOGO
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                        textAlign: 'center',
                        lineHeight: 1.2
                      }}
                    >
                      {org.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            sx={{
              textAlign: { xs: 'left', sm: 'center' },
              mb: 3,
              mt: 4,
              color: '#1A2751',
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
            }}
          >
            {t('finiq.underAegis', 'ПОД ЭГИДОЙ:')}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'flex-start', sm: 'center' }, 
            flexWrap: 'wrap', 
            gap: { xs: 1.5, sm: 2 } 
          }}>
            <Chip
              label={t('finiq.constitution30', '30-летие Конституции РК')}
              variant="outlined"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 },
                height: { xs: '32px', sm: '40px' }
              }}
            />
            <Chip
              label="АДАЛ АЗАМАТ"
              variant="outlined"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 },
                height: { xs: '32px', sm: '40px' }
              }}
            />
            <Chip
              label="ЗАҢ МЕН ТӘРТІП"
              variant="outlined"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 },
                height: { xs: '32px', sm: '40px' }
              }}
            />
          </Box>
        </Box>

        {/* Statistics Section */}
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
              {t('finiq.statistics', 'Статистика')}
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
              {t('finiq.participantCount', 'Количество участников')}
            </Typography>
          </CardContent>
        </MotionCard>

        {/* Why Important Section */}
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
            {t('finiq.whyImportant', 'Почему важна финансовая грамотность и безопасность?')}
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
                {t('finiq.importance.intro', 'В современном мире финансовая грамотность является одной из ключевых компетенций. Умение правильно управлять своими доходами и расходами, принимать обоснованные финансовые решения, защищать себя от мошенничества и финансовых рисков — важный навык, который влияет на благосостояние как отдельных граждан, так и всей страны.')}
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
                {t('finiq.importance.consequences', 'Недостаток финансовых знаний может привести к серьёзным последствиям: от неэффективного управления собственным бюджетом до попадания в долговые ловушки или становления жертвой финансового мошенничества.')}
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
                {t('finiq.skills.title', 'Финансово грамотный гражданин умеет:')}
              </Typography>

              <Box sx={{ pl: { xs: 1, sm: 2 } }}>
                {[
                  t('finiq.skills.budget', 'планировать бюджет и копить сбережения'),
                  t('finiq.skills.services', 'безопасно пользоваться банковскими и цифровыми услугами'),
                  t('finiq.skills.understanding', 'понимать условия кредитов и инвестиций'),
                  t('finiq.skills.recognition', 'распознавать финансовые мошеннические схемы'),
                  t('finiq.skills.decisions', 'принимать обоснованные финансовые решения в повседневной жизни')
                ].map((skill, index) => (
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
                {t('finiq.importance.conclusion', 'И самое главное, повышая свою финансовую грамотность, вы не только защищаете свои средства, но и вносите вклад в устойчивое экономическое развитие страны.')}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Final Message */}
        <MotionCard
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          sx={{
            mb: 6,
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
              {t('finiq.finalMessage', 'Мы надеемся, что проект оправдает свою образовательную миссию, способствует росту финансового интеллекта и знаний в области самозащиты в сфере финансов через массовой просветительское мероприятие, положив начало ежегодному проведению мероприятия с расширение масштабов охвата.')}
            </Typography>
          </CardContent>
        </MotionCard>

        {/* Contacts Section */}
        <Box sx={{ mb: 4, px: { xs: 1, sm: 0 } }}>
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
            {t('finiq.contacts', 'КОНТАКТЫ ДЛЯ ОТЗЫВОВ И СВЯЗИ')}
          </Typography>

          <Card 
            elevation={3} 
            sx={{ 
              borderRadius: 2, 
              maxWidth: '700px', 
              mx: 'auto',
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '180px' },
              background: 'linear-gradient(135deg, rgba(26, 39, 81, 0.02) 0%, rgba(26, 39, 81, 0.05) 100%)'
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              {/* Email Contacts */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="primary.main"
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <EmailIcon />
                  Email:
                </Typography>
                
                {['a.bazarbaeva@afm.gov.kz', 'n.abuzharova@afm.gov.kz'].map((email, index) => (
                  <Box 
                    key={index}
                    onClick={() => handleCopyToClipboard(email)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      mb: 1,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      bgcolor: 'white',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.light',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Typography 
                      variant="body1"
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: 'text.primary',
                        fontWeight: 500
                      }}
                    >
                      {email}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {copiedText === email && (
                        <Typography 
                          variant="caption" 
                          color="success.main"
                          sx={{ fontSize: '0.75rem' }}
                        >
                          Скопировано!
                        </Typography>
                      )}
                      <ContentCopyIcon 
                        sx={{ 
                          fontSize: { xs: '18px', sm: '20px' },
                          color: copiedText === email ? 'success.main' : 'action.secondary'
                        }} 
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Address */}
              <Box>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="primary.main"
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LocationOnIcon />
                  {t('finiq.address', 'Адрес')}:
                </Typography>
                
                <Box 
                  onClick={() => handleCopyToClipboard('Астана, ул. Бейбітшілік, д.10')}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    bgcolor: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.light',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography 
                    variant="body1"
                    sx={{ 
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      color: 'text.primary',
                      fontWeight: 500
                    }}
                  >
                    {t('finiq.astanaAddress', 'Астана, ул. Бейбітшілік, д.10')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {copiedText === 'Астана, ул. Бейбітшілік, д.10' && (
                      <Typography 
                        variant="caption" 
                        color="success.main"
                        sx={{ fontSize: '0.75rem' }}
                      >
                        Скопировано!
                      </Typography>
                    )}
                    <ContentCopyIcon 
                      sx={{ 
                        fontSize: { xs: '18px', sm: '20px' },
                        color: copiedText === 'Астана, ул. Бейбітшілік, д.10' ? 'success.main' : 'action.secondary'
                      }} 
                    />
                  </Box>
                </Box>
              </Box>

              {/* Hint */}
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  mt: 2,
                  display: 'block',
                  textAlign: 'center',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }}
              >
                Нажмите на контакт, чтобы скопировать в буфер обмена
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <FloatingRegistrationButton />
        <LanguageToggle />
      </MotionPaper>
    </Container>
  );
};

export default LandingPage;