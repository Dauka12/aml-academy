import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import basicCourse from "../../../assets/icons/mdi_world-wide-web.svg";
import deepCourse from "../../../assets/icons/simple-icons_progress.svg";
import proCourse from "../../../assets/icons/subway_book.svg";
import CourseBox from "../components/CourseBox";

const AboutUsSection = () => {
  const { t } = useTranslation();  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation variants
  const headlineVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: "easeOut" 
      }
    }
  };

  const coursesContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.6,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const courseItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Scroll button animation
  const scrollButtonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.3,
        duration: 0.5, 
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.2
      }
    }
  };
  const scrollToNextSection = () => {
    const secondSection = document.querySelector('.second-section');
    if (secondSection) {
      secondSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Box 
      component="section" 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'transparent',
        // Add gradient overlay over video background
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(6, 28, 69, 0.8) 0%, rgba(26, 39, 81, 0.85) 100%)',
          zIndex: 1,        },
        justifyContent: 'center',
        overflow: 'hidden',
        pt: { xs: 0, md: 0 },
      }}
    >
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "VideoObject",
              "name": "Задний фон",
              "description": "Задний фон",
              "thumbnailUrl": "https://www.amlacdemy.kz/static/media/image.png",
              "uploadDate": "2024-07-14T08:57:20Z",
              "contentUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4",
              "embedUrl": "https://www.amlacdemy.kz/static/media/ssssssss.78b66217f6905b1add0c.mp4"
            }
          `}
        </script>
      </Helmet>      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          zIndex: 2, // Убеждаемся, что контент выше фонового overlay
          // Position content lower on the page - increased from 15vh to 20vh
          mt: { xs: '25vh', sm: '22vh', md: '20vh' }, 
          mb: { xs: 0, sm: 0 },
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headlineVariants}
          style={{ width: '100%', textAlign: 'center' }}
        >          <Typography 
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem' },
              fontWeight: 800,
              color: '#fff',
              textAlign: 'center',
              mb: { xs: 1.5, md: 3 },
              textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)',
              letterSpacing: '-0.5px',
              position: 'relative',
              // Добавляем backdrop для лучшей читаемости
              padding: '20px',
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            AML ACADEMY
          </Typography>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.875rem' },
              fontWeight: 700,
              textAlign: 'center',
              maxWidth: { xs: '95%', sm: 500 },
              mx: 'auto',
              mb: { xs: 4, md: 6 },
              color: '#a2f9ff',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              animation: 'glow 3s ease-in-out infinite alternate',
              '@keyframes glow': {
                '0%': { textShadow: '0 0 5px rgba(162, 249, 255, 0.5)' },
                '100%': { textShadow: '0 0 20px rgba(162, 249, 255, 0.8), 0 0 30px rgba(162, 249, 255, 0.6)' }
              }
            }}
          >
            {t("our courses")}
          </Typography>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={coursesContainerVariants}
          style={{ width: '100%' }}
        >
          <Box
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: { xs: 3, sm: 3.5 }, // Increased gap on mobile
              justifyContent: 'center', 
              alignItems: { xs: 'center', sm: 'stretch' },
              width: '100%',
              mb: { xs: 5, md: 8 },
              px: { xs: 2, sm: 0 } // Add horizontal padding on mobile
            }}
          >
            <motion.div variants={courseItemVariants} style={{ width: isMobile ? '100%' : 'auto' }}>
              <CourseBox link="/olympiad" imgSrc={deepCourse} text={t('it')} />
            </motion.div>
            <motion.div variants={courseItemVariants} style={{ width: isMobile ? '100%' : 'auto' }}>
              <CourseBox link="/courses" imgSrc={basicCourse} text={t('training')} />
            </motion.div>
            <motion.div variants={courseItemVariants} style={{ width: isMobile ? '100%' : 'auto' }}>
              <CourseBox link="/ready-made-solutions" imgSrc={proCourse} text={t('ric')} />
            </motion.div>
          </Box>
        </motion.div>
        
        {/* Scroll down button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={scrollButtonVariants}
        >          <Button 
            onClick={scrollToNextSection}
            sx={{ 
              mt: { xs: 2, md: 4 },
              mb: { xs: 4, md: 0 },
              color: 'white',
              borderRadius: '50%',
              minWidth: 'unset',
              width: 60,
              height: 60,
              border: '2px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderColor: 'rgba(255,255,255,0.7)',
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              },
              // Add pulsing animation
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.4)',
                },
                '70%': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)',
                },
                '100%': {
                  transform: 'scale(1)',
                  boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
                },
              },
            }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
