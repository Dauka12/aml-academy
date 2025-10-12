import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Paper
} from '@mui/material';

// API
import { getStudentCount } from '../api/statisticsApi';

// Components
import FloatingRegistrationButton from '../components/FloatingRegistrationButton.tsx';
import LanguageToggle from '../components/LanguageToggle.tsx';
import ParticipationSection from '../components/ParticipationSection.tsx';
import SocialLinksSection from '../components/SocialLinksSection.tsx';
import OrganizersSection from '../components/OrganizersSection.tsx';
// import ImportanceSection from '../components/ImportanceSection.tsx';
import ActionButtonsSection from '../components/ActionButtonsSection.tsx';
import {
  HeroSection,
  CertificatesSection,
  StatisticsSection,
  ContactsSection
} from '../components';



const MotionPaper = motion(Paper);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);


  const fetchStatistics = async () => {
    try {
      const data = await getStudentCount();
      const total = Object.values(data).reduce((sum, count) => sum + count, 0);
      setStudentCount(total);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // вызываем сразу при монтировании
    fetchStatistics();

    // создаем интервал каждые 2 секунды
    const interval = setInterval(() => {
      fetchStatistics();
    }, 3000);

    // очищаем интервал при размонтировании
    return () => clearInterval(interval);
  }, []);

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

  const handleNavigateToPractice = () => {
    // НЕ переходим на другую страницу — пользователь остаётся на лендинге
  };

  const handleNavigateToImprove = () => {
    navigate('/finiq/education');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MotionPaper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        elevation={0}
        sx={{
          borderRadius: 0,
          overflow: 'hidden',
          background: 'transparent'
        }}
      >
        {/* Header Section - Full Screen */}
        <HeroSection
          onNavigateToTest={handleNavigateToTest}
          onNavigateToPractice={handleNavigateToPractice}
          onNavigateToImprove={handleNavigateToImprove}
          organizersSlot={
            <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
              <OrganizersSection logosOnly />
            </Box>
          }
        />

        {/* Content Container - для остального контента */}
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>

          {/* Participation Section - О проекте */}
          <Box id="about-section">
            <ParticipationSection />
          </Box>

          {/* Certificates Section */}
          <CertificatesSection itemVariants={itemVariants} />

          {/* Organizers Section moved into Hero */}

          {/* Why Important Section
          <ImportanceSection /> */}

          {/* Social Links Section */}
          <SocialLinksSection />

          {/* Statistics Section */}
          <StatisticsSection studentCount={studentCount} loading={loading} />

          {/* Action Buttons Section - Обучение */}
          <Box id="education-section">
            <ActionButtonsSection
              onNavigateToTest={handleNavigateToTest}
              onNavigateToImprove={handleNavigateToImprove}
            />
          </Box>

          {/* Contacts Section */}
          <Box id="contacts-section">
            <ContactsSection />
          </Box>
        </Container>

        <FloatingRegistrationButton />
        <LanguageToggle />
      </MotionPaper>
    </Box>
  );
};

export default LandingPage;