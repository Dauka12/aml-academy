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
import ImportanceSectionNew from '../components/ImportanceSectionNew.tsx';
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
    navigate('/education');
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
        />

        {/* Content Container - для остального контента */}
        <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>

          {/* Participation Section */}
          <ParticipationSection />

          {/* Certificates Section */}
          <CertificatesSection itemVariants={itemVariants} />

          {/* Why Important Section */}
          <ImportanceSectionNew />

          {/* Social Links Section */}
          <SocialLinksSection />

          {/* Statistics Section */}
          <StatisticsSection studentCount={studentCount} loading={loading} />

          {/* Action Buttons Section */}
          <ActionButtonsSection
            onNavigateToTest={handleNavigateToTest}
            onNavigateToImprove={handleNavigateToImprove}
          />

          {/* Contacts Section */}
          <ContactsSection />
        </Container>

        <FloatingRegistrationButton />
        <LanguageToggle />
      </MotionPaper>
    </Box>
  );
};

export default LandingPage;