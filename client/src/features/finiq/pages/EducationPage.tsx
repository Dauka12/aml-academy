import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoCard from '../components/VideoCard';
import ImageCard from '../components/ImageCard';
import LanguageToggle from '../components/LanguageToggle';

const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

const EducationPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Данные видео с переводами
  const allVideoData = [
    {
      title: t('Про обнал'),
      description: t(''),
      thumbnail: "https://almaty.tv/cache/imagine/1200/news_photo/1600147155_news_b.jpeg",
      videoUrl: "https://amlacademy.kz/aml/finiq/ru/video/Copy of Данияр Спарта, про обнал.mp4",
      duration: "01:27",
      lang: "ru"
    },
    {
      title: t('Легких денег не бывает'),
      description: t(''),
      thumbnail: "https://realtribune.ru/img/uploads/2020/10/fb867e5ea-1280x720.jpg",
      videoUrl: "https://amlacademy.kz/aml/finiq/ru/video/VID_20250612_111723_595.mp4",
      duration: "01:05",
      lang: "ru"
    },
    {
      title: t('Қаржылық пирамида туралы'),
      description: t(''),
      thumbnail: "https://egemen.kz/media/2020/03/11/piramida.jpg",
      videoUrl: "https://amlacademy.kz/aml/finiq/ru/video/Видео Улытау.mp4",
      duration: "10:18",
      lang: "kz"
    },
    {
      title: t('Алаяқтық туралы'),
      description: t(''),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://amlacademy.kz/aml/finiq/ru/video/ДЭР KZ qr 2!.mp4",
      duration: "8:45",
      lang: "kz"
    },
    {
      title: t('Сақ бол!'),
      description: t(''),
      thumbnail: "https://f.azh.kz/news/104/457/627566a327f5ed1a5.jpg",
      videoUrl: "https://amlacademy.kz/aml/finiq/ru/video/02 АФМ Мошенники КАЗ.mp4",
      duration: "00:44",
      lang: "kz"
    },
    {
      title: t('Отмывание денег'),
      description: t(''),
      thumbnail: "https://storage.pravo.ru/image/83/41710.png?v=1569309583",
      videoUrl: "https://amlacademy.kz/aml/finiq/ru/video/Опасность отмывания денег в крипте.mp4",
      duration: "15:22",
      lang: "ru"
    }
  ];

  // Данные изображений с переводами
  const allImageData = [
    {
      title: t('Инфографика: Признаки мошенничества'),
      description: t(''),
      imageUrl: "https://amlacademy.kz/aml/finiq/ru/images/инфографика_rus.jpeg",
      category: t(''),
      lang: "ru"
    },
    {
      title: t('Инфографика: Алаяқтық белгілері'),
      description: t(''),
      imageUrl: "https://amlacademy.kz/aml/finiq/kz/images/инфографика_kaz.jpeg",
      category: t(''),
      lang: "kz"
    },
    {
      title: t('Схема: Как работают финансовые пирамиды'),
      description: t(''),
      imageUrl: "https://amlacademy.kz/aml/finiq/ru/images/image1_rus.jpeg",
      category: t(''),
      lang: "ru"
    },
    {
      title: t('Схема: Қаржылық пирамидалар қалай жұмыс істейді'),
      description: t('Қаржылық пирамидаларды құрудың көрнекі схемасы'),
      imageUrl: "https://amlacademy.kz/aml/finiq/kz/images/image1_kaz.jpeg",
      category: t(''),
      lang: "kz"
    },
    {
      title: t('Чек-лист: Проверка банковской карты'),
      description: t(''),
      imageUrl: "https://amlacademy.kz/aml/finiq/ru/images/image2_rus.jpeg",
      category: t(''),
      lang: "ru"
    },
    {
      title: t('Чек-лист: Банк картасын тексеру'),
      description: t('Карталарды қауіпсіз пайдалану бойынша қадамдық нұсқаулық'),
      imageUrl: "https://amlacademy.kz/aml/finiq/kz/images/image2_kaz.jpeg",
      category: t(''),
      lang: "kz"
    }
  ];

  // Получаем текущий язык и фильтруем данные
  const currentLanguage = i18n.language || 'ru';
  const videoData = allVideoData.filter(video => video.lang === currentLanguage);
  const imageData = allImageData.filter(image => image.lang === currentLanguage);

  const handleBackToHome = () => {
    navigate('/finiq');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#f5f7fa',
      py: { xs: 4, sm: 6 }
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <MotionBox
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: { xs: 4, sm: 6 } }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToHome}
            sx={{
              mb: 3,
              color: '#1976d2',
              fontWeight: 600,
              '&:hover': {
                background: 'rgba(25, 118, 210, 0.08)'
              }
            }}
          >
            {t('finiq.education.backToHome')}
          </Button>

          <Paper sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: '#1a237e',
            color: 'white',
            textAlign: 'center'
          }}>
            <MotionTypography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 'bold',
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('finiq.education.pageTitle')}
            </MotionTypography>
            <MotionTypography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem' },
                opacity: 0.9,
                maxWidth: '800px',
                mx: 'auto'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t('finiq.education.pageDescription')}
            </MotionTypography>
          </Paper>
        </MotionBox>

        {/* Video Section */}
        <MotionBox
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          sx={{ mb: { xs: 6, sm: 8 } }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 'bold',
              color: '#2c3e50',
              textAlign: 'center'
            }}
          >
            {t('finiq.education.videoSection')}
          </Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3 },
            justifyContent: 'center'
          }}>
            {videoData.map((video, index) => (
              <Box sx={{
                width: { xs: '100%', sm: '300px', md: '280px', lg: '250px' },
                maxWidth: '320px',
                minHeight: '330px',
                display: 'flex',
                flexDirection: 'column'
              }} key={index}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <VideoCard {...video} />
                </motion.div>
              </Box>
            ))}
          </Box>
        </MotionBox>

        {/* Images Section */}
        <MotionBox
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontWeight: 'bold',
              color: '#2c3e50',
              textAlign: 'center'
            }}
          >
            {t('finiq.education.materialsSection')}
          </Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3 },
            justifyContent: 'center'
          }}>
            {imageData.map((image, index) => (
              <Box sx={{
                width: { xs: '100%', sm: '300px', md: '280px', lg: '250px' },
                maxWidth: '320px',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column'
              }} key={index}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <ImageCard {...image} />
                </motion.div>
              </Box>
            ))}
          </Box>
        </MotionBox>
      </Container>

      <LanguageToggle />
    </Box>
  );
};

export default EducationPage;