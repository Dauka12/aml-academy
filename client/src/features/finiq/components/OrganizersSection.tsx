import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid } from '@mui/material';

// Import logos from assets
import afm_logo from '../assets/images/afm_logo.png';
import amlAcademyLogo from '../assets/images/aml_academy_logo.png';
import halykBankLogo from '../assets/images/halykak.svg';
import karizsizKogamLogo from '../assets/images/karizsiz_kogam_logo.jpg';
import zanLogo from '../assets/images/zan.png';

const MotionBox = motion(Box);

type OrganizersSectionProps = {
  /** When true, render compact logos-only grid (no title/name/description/background). */
  logosOnly?: boolean;
};

const OrganizersSection: React.FC<OrganizersSectionProps> = ({ logosOnly = false }) => {
  const organizers = [
    { name: 'АМЛ Академия', logo: amlAcademyLogo, description: 'Образовательная платформа по финансовой безопасности' },
    { name: 'АФМ', logo: afm_logo, description: 'Агентство Республики Казахстан по финансовому мониторингу' },   
    { name: 'ZAN', logo: zanLogo, description: 'Цифровая экосистема Казахстана' },
    { name: 'Халык банк', logo: halykBankLogo, description: 'Крупнейший банк Казахстана' },
    { name: 'Қарызсыз қоғам', logo: karizsizKogamLogo, description: 'Общественное объединение' },
  ];

  if (logosOnly) {
    // Compact, transparent, only logos (for dark hero background)
    return (
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 1.5, sm: 3, md: 4 },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            mx: 'auto',
            maxWidth: '980px'
          }}
        >
          {organizers.map((o, idx) => (
            <MotionBox
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              <Box
                sx={{
                  width: { xs: 60, sm: 78, md: 100 },
                  height: { xs: 60, sm: 78, md: 100 },
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease', 
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                <Box 
                  component="img" 
                  src={o.logo} 
                  alt={o.name} 
                  sx={{ 
                    width: o.name === 'Халык банк' ? '100%' : o.name === 'ZAN' ? '90%' : '100%', 
                    height: o.name === 'Халык банк' ? '95%' : o.name === 'ZAN' ? '85%' : '70%', 
                    objectFit: 'contain' 
                  }} 
                />
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{ py: { xs: 6, sm: 8, md: 12 }, backgroundColor: '#f5f5f5', position: 'relative' }}
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
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' },
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
              sx={{ color: '#666', maxWidth: '600px', mx: 'auto', fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, lineHeight: 1.6, mb: { xs: 4, sm: 6 } }}
            >
              Ведущие организации и партнеры проекта FinIQ 2025
            </Typography>
          </MotionBox>

          {/* Main Organizers Grid */}
          <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center" sx={{ mb: { xs: 6, sm: 8 }, maxWidth: '1100px', mx: 'auto' }}>
            {organizers.map((organizer, index) => (
              <Grid item xs={6} sm={6} md={2.4 as any} key={index}>
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
                      p: { xs: 2, sm: 3 },
                      textAlign: 'center',
                      height: { xs: '240px', sm: '280px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      border: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                      '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.12)', transform: 'translateY(-2px)' }
                    }}
                  >
                    {/* Logo Container */}
                    <Box
                      sx={{
                        width: { xs: 80, sm: 100 },
                        height: { xs: 80, sm: 100 },
                        borderRadius: 2,
                        backgroundColor: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 1, sm: 2 },
                        border: '1px solid #e9ecef'
                      }}
                    >
                      <Box 
                        component="img" 
                        src={organizer.logo} 
                        alt={organizer.name} 
                        sx={{ 
                          width: organizer.name === 'Халык банк' ? { xs: '80px', sm: '100px' } : organizer.name === 'ZAN' ? { xs: '76px', sm: '95px' } : { xs: '64px', sm: '80px' }, 
                          height: organizer.name === 'Халык банк' ? { xs: '80px', sm: '100px' } : organizer.name === 'ZAN' ? { xs: '76px', sm: '95px' } : { xs: '64px', sm: '80px' }, 
                          objectFit: 'contain' 
                        }} 
                      />
                    </Box>

                    {/* Name */}
                    <Typography variant="h6" sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' }, fontWeight: 600, mb: { xs: 0.5, sm: 1 }, color: '#333', textAlign: 'center' }}>
                      {organizer.name}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.75rem', sm: '0.85rem' }, lineHeight: 1.4, textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center' }}>
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