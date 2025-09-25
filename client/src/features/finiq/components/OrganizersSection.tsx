import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid
} from '@mui/material';
import {
  School as TeacherIcon,
  Groups as StudentsIcon,
  Elderly as SeniorsIcon,
  WorkspacePremium as ExpertIcon
} from '@mui/icons-material';

// Import logos from assets
import afm_logo from '../assets/images/afm_logo.png';
import amlAcademyLogo from '../assets/images/aml_academy_logo.png';
import halykBankLogo from '../assets/images/halyk_bank_logo.jpeg';
import karizsizKogamLogo from '../assets/images/karizsiz_kogam_logo.jpg';

const MotionBox = motion(Box);

const OrganizersSection: React.FC = () => {
  const organizers = [
    {
      name: 'АФМ',
      logo: afm_logo,
      description: 'Агентство Республики Казахстан по финансовому мониторингу'
    },
    {
      name: 'АМЛ Академия',
      logo: amlAcademyLogo,
      description: 'Образовательная платформа по финансовой безопасности'
    },
    {
      name: 'Халык банк',
      logo: halykBankLogo,
      description: 'Крупнейший банк Казахстана'
    },
    {
      name: 'Қарызсыз қоғам',
      logo: karizsizKogamLogo,
      description: 'Общественное объединение'
    }
  ];

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{ 
          py: { xs: 8, sm: 12 }, 
          backgroundColor: '#f5f5f5',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                color: '#2196F3',
                textAlign: 'center'
              }}
            >
              Организаторы
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.6,
                mb: 6
              }}
            >
              Ведущие организации и партнеры проекта FinIQ 2025
            </Typography>
          </MotionBox>

          {/* Main Organizers Grid */}
          <Grid 
            container 
            spacing={3} 
            justifyContent="center" 
            sx={{ mb: 8, maxWidth: '900px', mx: 'auto' }}
          >
            {organizers.map((organizer, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Box
                    sx={{
                      background: 'white',
                      borderRadius: 3,
                      p: 3,
                      textAlign: 'center',
                      height: '280px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      border: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {/* Logo Container */}
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        border: '1px solid #e9ecef'
                      }}
                    >
                      <Box 
                        component="img" 
                        src={organizer.logo} 
                        alt={organizer.name}
                        sx={{ 
                          width: '80px',
                          height: '80px',
                          objectFit: 'contain'
                        }} 
                      />
                    </Box>

                    {/* Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                        textAlign: 'center'
                      }}
                    >
                      {organizer.name}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontSize: '0.85rem',
                        lineHeight: 1.4,
                        textAlign: 'center',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {organizer.description}
                    </Typography>
                  </Box>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MotionBox>
    </>
  );
};

export default OrganizersSection;