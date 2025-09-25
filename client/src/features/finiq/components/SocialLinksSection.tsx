import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';

const MotionBox = motion(Box);

const SocialLinksSection: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram АФМ',
      icon: <InstagramIcon sx={{ fontSize: '2rem' }} />,
      url: 'https://www.instagram.com/afm_rk?igsh=dXhrMnhldXZxamp6',
      color: '#E4405F',
      description: 'Следите за новостями в Instagram'
    },
    {
      name: 'Telegram АФМ',
      icon: <TelegramIcon sx={{ fontSize: '2rem' }} />,
      url: 'https://t.me/afm_gov_kz',
      color: '#0088cc',
      description: 'Подписывайтесь на Telegram канал'
    }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      sx={{ 
        py: { xs: 6, sm: 8 }, 
        background: '#1a237e',
        color: 'white',
        borderRadius: '8px',
        mb: { xs: 4, sm: 6 }
      }}
    >
      <Container maxWidth="lg">

        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: { xs: 3, sm: 4 }
        }}>
          {socialLinks.map((link, index) => (
            <Box sx={{ 
              width: { xs: '100%', sm: '300px', md: '280px' },
              maxWidth: '400px'
            }} key={index}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Paper
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }
                  }}
                  onClick={() => handleLinkClick(link.url)}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: link.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      mb: 2,
                      color: 'white',
                      boxShadow: `0 4px 20px ${link.color}40`
                    }}
                  >
                    {link.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.3rem' },
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#2c3e50'
                    }}
                  >
                    {link.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      mb: 2
                    }}
                  >
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background: link.color,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': {
                        background: `${link.color}dd`
                      }
                    }}
                  >
                    ⟶
                  </Button>
                </Paper>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </MotionBox>
  );
};

export default SocialLinksSection;