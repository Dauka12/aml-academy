import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Typography, useMediaQuery, useTheme, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Header from "../../components/header/v2";
import Footer from "../../components/footer/Footer";

// Кастомный компонент кнопки для IT решений
const ItSolutionCard = ({ link, text, icon }) => {
  return (
    <Card
      component={Link}
      to={link}
      sx={{
        width: '100%',
        minHeight: 120,
        background: 'linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 3,
        py: 3,
        px: 4,
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.08), transparent)',
          transition: 'all 0.6s ease',
        },
        '&:hover': {
          background: 'linear-gradient(135deg, #faf8f5 0%, #f0eee9 100%)',
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          '&::before': {
            left: '100%'
          }
        }
      }}
    >      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          color: '#1e293b',
          fontFamily: '"Montserrat", "Inter", sans-serif',
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
          fontWeight: 600,
          lineHeight: 1.4,
          flex: 1
        }}
      >
        {text}
      </Typography>
    </Card>
  );
};

const ItSolutions = () => {
  const { t } = useTranslation();
  const theme = useTheme();
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
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut",
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
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <>
      <Header />      <Box 
        component="section" 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg, #f9f7f4 0%, #f5f3f0 50%, #f0eee9 100%)',
          justifyContent: 'center',
          overflow: 'hidden',
          pt: { xs: 10, md: 8 },
          pb: { xs: 5, md: 8 },
        }}
      >
        <Helmet>
          <title>{t('it solutions')} - AML Academy</title>
          <meta name="description" content="IT решения от AML Academy для эффективного управления рисками и соответствия требованиям" />
        </Helmet>

        <Container 
          maxWidth="lg" 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headlineVariants}
            style={{ width: '100%', textAlign: 'center' }}
          >            <Typography 
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                color: '#1e293b',
                textAlign: 'center',
                mb: { xs: 2, md: 3 },
                letterSpacing: '-0.5px',
              }}
            >
              {t('it solutions')}
            </Typography>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
            style={{ width: '100%', textAlign: 'center' }}
          >            <Typography
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 400,
                textAlign: 'center',
                maxWidth: { xs: '95%', sm: 700 },
                mx: 'auto',
                mb: { xs: 6, md: 8 },
                color: '#64748b',
                lineHeight: 1.6,
              }}
            >
              Инновационные технологические решения для финансового мониторинга и противодействия отмыванию денег
            </Typography>
          </motion.div>
            <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            style={{ width: '100%' }}
          >            {/* Кнопки IT решений */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 4,
              alignItems: 'center',
              maxWidth: 600,
              mx: 'auto',
              px: { xs: 2, sm: 0 }
            }}>
              <motion.div 
                variants={courseItemVariants} 
                style={{ width: '100%' }}
              >                <ItSolutionCard 
                  link="/olympiad" 
                  icon={<EmojiEventsIcon sx={{ fontSize: 30, color: 'white' }} />} 
                  text="Национальная олимпиада по финансовой безопасности 2025" 
                />
              </motion.div>
                <motion.div 
                variants={courseItemVariants} 
                style={{ width: '100%' }}
              >
                <Box
                  component="a"
                  href="https://aml-system.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ textDecoration: 'none', width: '100%' }}
                >                  <Card
                    sx={{
                      width: '100%',
                      minHeight: 120,
                      background: 'linear-gradient(135deg, #ffffff 0%, #faf8f5 100%)',
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 3,
                      py: 3,
                      px: 4,
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(148, 163, 184, 0.15)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.08), transparent)',
                        transition: 'all 0.6s ease',
                      },
                      '&:hover': {
                        background: 'linear-gradient(135deg, #faf8f5 0%, #f0eee9 100%)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        '&::before': {
                          left: '100%'
                        }
                      }
                    }}
                  >                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
                      }}
                    >
                      <SearchIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>

                    <Typography
                      sx={{
                        color: '#1e293b',
                        fontFamily: '"Montserrat", "Inter", sans-serif',
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                        fontWeight: 600,
                        lineHeight: 1.4,
                        flex: 1
                      }}
                    >
                      AML Поисковик
                    </Typography>
                  </Card>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ItSolutions;
