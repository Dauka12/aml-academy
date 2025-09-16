import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';

// API
import { getStudentCount } from '../api/statisticsApi';

// Components
import FloatingRegistrationButton from '../components/FloatingRegistrationButton.tsx';
import LanguageToggle from '../components/LanguageToggle.tsx';
import {
  ParticipationCards,
  HeroSection,
  DateBanner,
  TestDescription,
  CertificatesSection,
  OrganizersSection,
  StatisticsSection,
  ImportanceSection,
  ContactsSection
} from '../components';

const MotionPaper = motion(Paper);

const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

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
    navigate('/finiq/dashboard');
  };

  const attemptFileDownload = async (url: string, name: string) => {
    try {
      // Пытаемся получить blob (если CORS настроен правильно)
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Чуть позже освободим URL
      setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
    } catch (e) {
      // Fallback: просто открыть ссылку (браузер сам решит — показать / скачать)
      const a = document.createElement('a');
      a.href = encodeURI(url);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      // attribute download может быть проигнорирован, но оставим
      a.setAttribute('download', name);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleNavigateToPractice = () => {

    // НЕ переходим на другую страницу — пользователь остаётся на лендинге
  };

  const handleNavigateToImprove = () => {
    const files = [
      { url: 'https://amlacademy.kz/aml/инфографика.pdf', name: 'инфографика.pdf' },
      { url: 'https://amlacademy.kz/aml/инфографика_дроппы.pdf', name: 'инфографика_дроппы.pdf' }
    ];

    files.forEach((f, idx) => {
      setTimeout(() => attemptFileDownload(f.url, f.name), idx * 350);
    });
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
        <HeroSection
          onNavigateToTest={handleNavigateToTest}
          onNavigateToPractice={handleNavigateToPractice}
          onNavigateToImprove={handleNavigateToImprove}
        />

        {/* Date Banner */}
        <DateBanner />

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
            {t('finiq.whoCanParticipate')}
          </Typography>

          <ParticipationCards
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </Box>

        {/* About Test Section */}
        <TestDescription />

        {/* Certificates Section */}
        <CertificatesSection itemVariants={itemVariants} />

        {/* Organizers Section */}
        <OrganizersSection />

        {/* Statistics Section */}
        <StatisticsSection studentCount={studentCount} loading={loading} />

        {/* Why Important Section */}
        <ImportanceSection />

        {/* Contacts Section */}
        <ContactsSection />

        <FloatingRegistrationButton />
        <LanguageToggle />
      </MotionPaper>
    </Container>
  );
};

export default LandingPage;