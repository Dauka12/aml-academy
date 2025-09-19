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
      title: t('finiq.education.videos.financialSecurity.title', 'Основы финансовой безопасности'),
      description: t('finiq.education.videos.financialSecurity.description', 'Изучите базовые принципы защиты от финансового мошенничества'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "12:34",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.financialSecurity.title', 'Қаржылық қауіпсіздік негіздері'),
      description: t('finiq.education.videos.financialSecurity.description', 'Қаржылық алаяқтықтан қорғанудың негізгі принциптерін үйреніңіз'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "12:34",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.pyramids.title', 'Как распознать финансовые пирамиды'),
      description: t('finiq.education.videos.pyramids.description', 'Признаки финансовых пирамид и способы их избежать'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "8:45",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.pyramids.title', 'Қаржылық пирамидаларды қалай тану керек'),
      description: t('finiq.education.videos.pyramids.description', 'Қаржылық пирамидалардың белгілері және оларды болдырмау жолдары'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "8:45",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.bankingSecurity.title', 'Безопасность банковских операций'),
      description: t('finiq.education.videos.bankingSecurity.description', 'Как безопасно пользоваться банковскими услугами и картами'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "15:22",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.bankingSecurity.title', 'Банк операцияларының қауіпсіздігі'),
      description: t('finiq.education.videos.bankingSecurity.description', 'Банк қызметтері мен карталарын қауіпсіз пайдалану жолдары'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "15:22",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.phoneScams.title', 'Защита от телефонного мошенничества'),
      description: t('finiq.education.videos.phoneScams.description', 'Как не стать жертвой телефонных мошенников'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "10:18",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.phoneScams.title', 'Телефон алаяқтығынан қорғану'),
      description: t('finiq.education.videos.phoneScams.description', 'Телефон алаяқтарының құрбаны болмау жолдары'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "10:18",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.internetSecurity.title', 'Интернет-безопасность в финансах'),
      description: t('finiq.education.videos.internetSecurity.description', 'Защита финансовых данных в интернете'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "13:56",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.internetSecurity.title', 'Қаржылық интернет қауіпсіздігі'),
      description: t('finiq.education.videos.internetSecurity.description', 'Интернеттегі қаржылық деректерді қорғау'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "13:56",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.budgetPlanning.title', 'Планирование личного бюджета'),
      description: t('finiq.education.videos.budgetPlanning.description', 'Основы планирования и управления личными финансами'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "18:34",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.budgetPlanning.title', 'Жеке бюджетті жоспарлау'),
      description: t('finiq.education.videos.budgetPlanning.description', 'Жеке қаржыны жоспарлау және басқару негіздері'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "18:34",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.credits.title', 'Кредиты и займы: что нужно знать'),
      description: t('finiq.education.videos.credits.description', 'Как правильно выбирать кредиты и избегать долговых ловушек'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "14:27",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.credits.title', 'Кредиттер мен қарыздар: білу керектері'),
      description: t('finiq.education.videos.credits.description', 'Кредиттерді дұрыс таңдау және қарыз тұзақтарынан аулақ болу'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "14:27",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.investments.title', 'Инвестиции для начинающих'),
      description: t('finiq.education.videos.investments.description', 'Базовые знания об инвестициях и рисках'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "16:43",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.investments.title', 'Бастаушыларға арналған инвестициялар'),
      description: t('finiq.education.videos.investments.description', 'Инвестициялар мен тәуекелдер туралы негізгі білім'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "16:43",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.insurance.title', 'Страхование: виды и особенности'),
      description: t('finiq.education.videos.insurance.description', 'Как выбрать подходящую страховку'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "11:15",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.insurance.title', 'Сақтандыру: түрлері мен ерекшеліктері'),
      description: t('finiq.education.videos.insurance.description', 'Қолайлы сақтандыруды қалай таңдау керек'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "11:15",
      lang: "kz"
    },
    {
      title: t('finiq.education.videos.crypto.title', 'Цифровые валюты и криптомошенничество'),
      description: t('finiq.education.videos.crypto.description', 'Что нужно знать о криптовалютах и как избежать обмана'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "20:08",
      lang: "ru"
    },
    {
      title: t('finiq.education.videos.crypto.title', 'Цифрлық валюталар және криптоалаяқтық'),
      description: t('finiq.education.videos.crypto.description', 'Криптовалюталар туралы білу керектері және алдамшылықтан аулақ болу'),
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "20:08",
      lang: "kz"
    }
  ];

  // Данные изображений с переводами
  const allImageData = [
    {
      title: t('finiq.education.materials.fraudSigns.title', 'Инфографика: Признаки мошенничества'),
      description: t('finiq.education.materials.fraudSigns.description', 'Визуальное руководство по выявлению мошеннических схем'),
      imageUrl: "https://via.placeholder.com/400x300/2196F3/white?text=Инфографика+1",
      category: t('finiq.education.categories.infographic', 'Инфографика'),
      lang: "ru"
    },
    {
      title: t('finiq.education.materials.fraudSigns.title', 'Инфографика: Алаяқтық белгілері'),
      description: t('finiq.education.materials.fraudSigns.description', 'Алаяқтық схемаларын анықтау бойынша көрнекі нұсқаулық'),
      imageUrl: "https://via.placeholder.com/400x300/2196F3/white?text=Инфографика+1",
      category: t('finiq.education.categories.infographic', 'Инфографика'),
      lang: "kz"
    },
    {
      title: t('finiq.education.materials.pyramidsScheme.title', 'Схема: Как работают финансовые пирамиды'),
      description: t('finiq.education.materials.pyramidsScheme.description', 'Наглядная схема построения финансовых пирамид'),
      imageUrl: "https://via.placeholder.com/400x300/4CAF50/white?text=Схема+1",
      category: t('finiq.education.categories.scheme', 'Схема'),
      lang: "ru"
    },
    {
      title: t('finiq.education.materials.pyramidsScheme.title', 'Схема: Қаржылық пирамидалар қалай жұмыс істейді'),
      description: t('finiq.education.materials.pyramidsScheme.description', 'Қаржылық пирамидаларды құрудың көрнекі схемасы'),
      imageUrl: "https://via.placeholder.com/400x300/4CAF50/white?text=Схема+1",
      category: t('finiq.education.categories.scheme', 'Схема'),
      lang: "kz"
    },
    {
      title: t('finiq.education.materials.cardChecklist.title', 'Чек-лист: Проверка банковской карты'),
      description: t('finiq.education.materials.cardChecklist.description', 'Пошаговое руководство по безопасному использованию карт'),
      imageUrl: "https://via.placeholder.com/400x300/FF9800/white?text=Чек-лист+1",
      category: t('finiq.education.categories.checklist', 'Чек-лист'),
      lang: "ru"
    },
    {
      title: t('finiq.education.materials.cardChecklist.title', 'Чек-лист: Банк картасын тексеру'),
      description: t('finiq.education.materials.cardChecklist.description', 'Карталарды қауіпсіз пайдалану бойынша қадамдық нұсқаулық'),
      imageUrl: "https://via.placeholder.com/400x300/FF9800/white?text=Чек-лист+1",
      category: t('finiq.education.categories.checklist', 'Чек-лист'),
      lang: "kz"
    },
    {
      title: t('finiq.education.materials.phoneSafety.title', 'Памятка: Телефонная безопасность'),
      description: t('finiq.education.materials.phoneSafety.description', 'Что делать при подозрительных звонках'),
      imageUrl: "https://via.placeholder.com/400x300/1976d2/white?text=Памятка+1",
      category: t('finiq.education.categories.memo', 'Памятка'),
      lang: "ru"
    },
    {
      title: t('finiq.education.materials.phoneSafety.title', 'Ескертпе: Телефон қауіпсіздігі'),
      description: t('finiq.education.materials.phoneSafety.description', 'Күдікті қоңыраулар кезінде не істеу керек'),
      imageUrl: "https://via.placeholder.com/400x300/1976d2/white?text=Памятка+1",
      category: t('finiq.education.categories.memo', 'Ескертпе'),
      lang: "kz"
    },
    {
      title: t('finiq.education.materials.budgetInfographic.title', 'Инфографика: Планирование бюджета'),
      description: t('finiq.education.materials.budgetInfographic.description', 'Визуальное руководство по управлению личными финансами'),
      imageUrl: "https://via.placeholder.com/400x300/F44336/white?text=Инфографика+2",
      category: t('finiq.education.categories.infographic', 'Инфографика'),
      lang: "ru"
    },
    {
      title: t('finiq.education.materials.budgetInfographic.title', 'Инфографика: Бюджетті жоспарлау'),
      description: t('finiq.education.materials.budgetInfographic.description', 'Жеке қаржыны басқару бойынша көрнекі нұсқаулық'),
      imageUrl: "https://via.placeholder.com/400x300/F44336/white?text=Инфографика+2",
      category: t('finiq.education.categories.infographic', 'Инфографика'),
      lang: "kz"
    },
    {
      title: t('finiq.education.materials.bankingComparison.title', 'Таблица: Сравнение банковских продуктов'),
      description: t('finiq.education.materials.bankingComparison.description', 'Сравнительная таблица различных финансовых продуктов'),
      imageUrl: "https://via.placeholder.com/400x300/607D8B/white?text=Таблица+1",
      category: t('finiq.education.categories.table', 'Таблица'),
      lang: "ru"
    },
    {
      title: t('finiq.education.materials.bankingComparison.title', 'Кесте: Банк өнімдерін салыстыру'),
      description: t('finiq.education.materials.bankingComparison.description', 'Әртүрлі қаржылық өнімдерді салыстыру кестесі'),
      imageUrl: "https://via.placeholder.com/400x300/607D8B/white?text=Таблица+1",
      category: t('finiq.education.categories.table', 'Кесте'),
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