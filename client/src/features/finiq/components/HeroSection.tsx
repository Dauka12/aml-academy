import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  Typography
} from '@mui/material';

// Icons
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


import afmLogo from '../assets/images/afm_logo.png';
import amlAcademyLogo from '../assets/images/aml_academy_logo.png';
import halykBankLogo from '../assets/images/halyk_bank_logo.jpeg';
import karizsizKogamLogo from '../assets/images/karizsiz_kogam_logo.jpg';
import landingBackground from '../assets/images/landing_page_background.png';

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

interface HeroSectionProps {
  onNavigateToTest: () => void;
  onNavigateToPractice: () => void;
  onNavigateToImprove: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToTest,
  onNavigateToPractice,
  onNavigateToImprove
}) => {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #0a1a3a 0%, #1a2751 50%, #2a3761 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      px: { xs: 2, sm: 4 },
      py: { xs: 4, sm: 6 },
      backgroundImage: 'url(' + landingBackground + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 26, 58, 0.7)',
        zIndex: 0
      }
    }}>
      {/* Логотипы партнеров в верхней части */}
      <Box sx={{ 
        position: 'absolute', 
        top: '8vh',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: { xs: 1.5, sm: 2.5 },
        px: { xs: 1, sm: 4 },
        zIndex: 1
      }}>
        {/* Логотип АФМ */}
        <Box sx={{
          width: { xs: '45px', sm: '55px' },
          height: { xs: '45px', sm: '55px' },
          borderRadius: { xs: '8px', sm: '10px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <Box 
            component="img" 
            src={afmLogo} 
            alt="АФМ" 
            sx={{ 
              width: '85%',
              height: '85%',
              objectFit: 'contain'
            }} 
          />
        </Box>

        {/* Логотип АМЛ Академия */}
        <Box sx={{
          width: { xs: '45px', sm: '55px' },
          height: { xs: '45px', sm: '55px' },
          borderRadius: { xs: '8px', sm: '10px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <Box 
            component="img" 
            src={amlAcademyLogo} 
            alt="АМЛ Академия" 
            sx={{ 
              width: '85%',
              height: '85%',
              objectFit: 'contain'
            }} 
          />
        </Box>

        {/* Логотип Халык банк */}
        <Box sx={{
          width: { xs: '45px', sm: '55px' },
          height: { xs: '45px', sm: '55px' },
          borderRadius: { xs: '8px', sm: '10px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <Box 
            component="img" 
            src={halykBankLogo} 
            alt="Халык банк" 
            sx={{ 
              width: '85%',
              height: '85%',
              objectFit: 'contain'
            }} 
          />
        </Box>

        {/* Логотип Қарызсыз қоғам */}
        <Box sx={{
          width: { xs: '45px', sm: '55px' },
          height: { xs: '45px', sm: '55px' },
          borderRadius: { xs: '8px', sm: '10px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <Box 
            component="img" 
            src={karizsizKogamLogo} 
            alt="Қарызсыз қоғам" 
            sx={{ 
              width: '85%',
              height: '85%',
              objectFit: 'contain'
            }} 
          />
        </Box>

        {/* Дополнительные партнеры - адаптивное расположение */}
        <Box sx={{ 
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mt: 2,
          width: '100%'
        }}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '12px',
            px: 2,
            py: 1,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '0.7rem',
              textAlign: 'center',
              lineHeight: 1.3,
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.5px'
            }}>
              АДАЛ АЗАМАТ
            </Typography>
          </Box>

          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '12px',
            px: 2,
            py: 1,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '0.7rem',
              textAlign: 'center',
              lineHeight: 1.3,
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.5px'
            }}>
              ЗАҢ МЕН ТӘРТІП
            </Typography>
          </Box>
        </Box>

        {/* Дополнительные партнеры для десктопа - в одну строку с логотипами */}
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 2,
          ml: 2
        }}>
          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '15px',
            px: 2.5,
            py: 1.2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '0.75rem',
              textAlign: 'center',
              lineHeight: 1.3,
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.5px'
            }}>
              АДАЛ АЗАМАТ
            </Typography>
          </Box>

          <Box sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '15px',
            px: 2.5,
            py: 1.2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '0.75rem',
              textAlign: 'center',
              lineHeight: 1.3,
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.5px'
            }}>
              ЗАҢ МЕН ТӘРТІП
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Основной контент */}
      <Box sx={{ zIndex: 1, mt: { xs: '18vh', sm: '12vh' }, px: { xs: 1, sm: 2 } }}>
        <MotionTypography
          variant="h1"
          fontWeight="bold"
          sx={{
            mb: { xs: 1.5, sm: 1.7 },
            color: 'white',
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '3rem', lg: '3.8rem' },
            lineHeight: { xs: 1.1, sm: 1.2 },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.5px', sm: '1px' }
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          РЕСПУБЛИКАНСКИЙ
        </MotionTypography>

        <MotionTypography
          variant="h1"
          fontWeight="bold"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            color: 'white',
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '3rem', lg: '3.8rem' },
            lineHeight: { xs: 1.1, sm: 1.2 },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.5px', sm: '1px' }
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          ДИКТАНТ
        </MotionTypography>

        <MotionTypography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: { xs: 1.5, sm: 2 },
            color: '#64b5f6',
            fontSize: { xs: '1.1rem', sm: '1.6rem', md: '2.1rem', lg: '2.6rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.3px', sm: '0.8px' }
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          ПО ФИНАНСОВОЙ БЕЗОПАСНОСТИ
        </MotionTypography>

        <MotionTypography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: { xs: 3, sm: 4 },
            color: '#81c784',
            fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.3rem', lg: '2.8rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.5px', sm: '1px' }
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          FinIQ 2025
        </MotionTypography>

        <MotionTypography
          variant="h5"
          sx={{
            mb: { xs: 3, sm: 4 },
            color: 'rgba(255,255,255,0.9)',
            maxWidth: { xs: '100%', sm: '800px' },
            mx: 'auto',
            lineHeight: { xs: 1.4, sm: 1.6 },
            fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem', lg: '1.4rem' },
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            px: { xs: 0.5, sm: 0 },
            textAlign: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          это 20 вопросов, которые покажут насколько хорошо ты умеешь распознавать финансовые мошеннические схемы и защитить себя от них
        </MotionTypography>

        <MotionTypography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb: { xs: 4, sm: 6 },
            color: '#ffeb3b',
            fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.8rem', lg: '2rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.3px', sm: '0.5px' }
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          с 1 по 15 октября 2025 года
        </MotionTypography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            gap: { xs: 2.5, sm: 3 },
            mt: { xs: 3, sm: 4 },
            flexWrap: 'wrap',
            px: { xs: 0, sm: 0 },
            maxWidth: { xs: '100%', sm: '600px' },
            mx: 'auto'
          }}
        >
          <MotionButton
            variant="outlined"
            size="large"
            startIcon={<TrendingUpIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
            onClick={onNavigateToImprove}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              px: { xs: 2.5, sm: 4 },
              py: { xs: 1.8, sm: 2 },
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '220px' },
              borderColor: 'rgba(255,255,255,0.8)',
              color: 'white',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255,255,255,0.3)',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.25)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            ПРОКАЧАТЬ СВОИ ЗНАНИЯ
          </MotionButton>
          
          <MotionButton
            variant="contained"
            size="large"
            startIcon={<AssignmentIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />}
            onClick={onNavigateToTest}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              px: { xs: 2.5, sm: 4 },
              py: { xs: 1.8, sm: 2 },
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
              width: { xs: '100%', sm: 'auto' },
              minWidth: { sm: '220px' },
              background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
              color: 'white',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #43a047 30%, #5cb85c 90%)',
                boxShadow: '0 6px 25px rgba(76, 175, 80, 0.5)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            ПЕРЕЙТИ К ДИКТАНТУ
          </MotionButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;