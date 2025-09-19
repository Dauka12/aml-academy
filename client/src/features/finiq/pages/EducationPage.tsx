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

const MotionTypography = motion(Typography);
const MotionBox = motion(Box);

// Заглушки для видео (можно заменить на реальные данные)
const videoData = [
  {
    title: "Основы финансовой безопасности",
    description: "Изучите базовые принципы защиты от финансового мошенничества",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "12:34"
  },
  {
    title: "Как распознать финансовые пирамиды",
    description: "Признаки финансовых пирамид и способы их избежать",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "8:45"
  },
  {
    title: "Безопасность банковских операций",
    description: "Как безопасно пользоваться банковскими услугами и картами",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "15:22"
  },
  {
    title: "Защита от телефонного мошенничества",
    description: "Как не стать жертвой телефонных мошенников",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "10:18"
  },
  {
    title: "Интернет-безопасность в финансах",
    description: "Защита финансовых данных в интернете",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "13:56"
  },
  {
    title: "Планирование личного бюджета",
    description: "Основы планирования и управления личными финансами",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "18:34"
  },
  {
    title: "Кредиты и займы: что нужно знать",
    description: "Как правильно выбирать кредиты и избегать долговых ловушек",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "14:27"
  },
  {
    title: "Инвестиции для начинающих",
    description: "Базовые знания об инвестициях и рисках",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "16:43"
  },
  {
    title: "Страхование: виды и особенности",
    description: "Как выбрать подходящую страховку",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "11:15"
  },
  {
    title: "Цифровые валюты и криптомошенничество",
    description: "Что нужно знать о криптовалютах и как избежать обмана",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "20:08"
  }
];

// Заглушки для изображений (можно заменить на реальные данные)
const imageData = [
  {
    title: "Инфографика: Признаки мошенничества",
    description: "Визуальное руководство по выявлению мошеннических схем",
    imageUrl: "https://via.placeholder.com/400x300/2196F3/white?text=Инфографика+1",
    category: "Инфографика"
  },
  {
    title: "Схема: Как работают финансовые пирамиды",
    description: "Наглядная схема построения финансовых пирамид",
    imageUrl: "https://via.placeholder.com/400x300/4CAF50/white?text=Схема+1",
    category: "Схема"
  },
  {
    title: "Чек-лист: Проверка банковской карты",
    description: "Пошаговое руководство по безопасному использованию карт",
    imageUrl: "https://via.placeholder.com/400x300/FF9800/white?text=Чек-лист+1",
    category: "Чек-лист"
  },
  {
    title: "Памятка: Телефонная безопасность",
    description: "Что делать при подозрительных звонках",
    imageUrl: "https://via.placeholder.com/400x300/1976d2/white?text=Памятка+1",
    category: "Памятка"
  },
  {
    title: "Инфографика: Планирование бюджета",
    description: "Визуальное руководство по управлению личными финансами",
    imageUrl: "https://via.placeholder.com/400x300/F44336/white?text=Инфографика+2",
    category: "Инфографика"
  },
  {
    title: "Таблица: Сравнение банковских продуктов",
    description: "Сравнительная таблица различных финансовых продуктов",
    imageUrl: "https://via.placeholder.com/400x300/607D8B/white?text=Таблица+1",
    category: "Таблица"
  }
];

const EducationPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackToHome = () => {
    navigate('/');
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
                maxWidth: '320px'
              }} key={index}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
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
                maxWidth: '320px'
              }} key={index}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <ImageCard {...image} />
                </motion.div>
              </Box>
            ))}
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default EducationPage;