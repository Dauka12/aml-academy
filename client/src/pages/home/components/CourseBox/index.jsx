import { Box, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CourseBox = ({ link, imgSrc, text, icon }) => {
  const isExternal = /^https?:\/\//i.test(link);
  
  return (
    <Card
      component={isExternal ? 'a' : Link}
      href={isExternal ? link : undefined}
      to={!isExternal ? link : undefined}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      sx={{
        width: { xs: '92%', sm: 240, md: 260 }, // Narrower width for all screens
        height: { xs: 'auto', sm: 100 },
        minHeight: { xs: 80, sm: 100 }, // Slightly smaller on mobile
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: { xs: '8px', sm: '10px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2.5,
        py: { xs: 2.5, sm: 3 }, // Adjusted padding for mobile
        px: { xs: 3, sm: 4 },
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
        mb: { xs: 0.5, sm: 0 }, // Reduce bottom margin on mobile
        mx: { xs: 'auto', sm: 0 }, // Center on mobile
        maxWidth: { xs: '450px', sm: 'none' }, // Limit max width on mobile
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transition: 'all 0.6s ease',
        },
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.25)',
          transform: 'translateY(-5px)', // Reduced from -8px to -5px
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
          '&::before': {
            left: '100%'
          }
        }
      }}
    >
      <Box
        sx={{
          width: { xs: 42, sm: 48 }, // Slightly smaller on mobile
          height: { xs: 42, sm: 48 },
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)'
        }}
      >
        {icon ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </Box>
        ) : (
          <Box
            component="img"
            src={imgSrc}
            alt=""
            sx={{
              width: { xs: 26, sm: 30 }, // Slightly smaller on mobile
              height: { xs: 26, sm: 30 },
              filter: 'brightness(0) invert(1)',
              opacity: 0.9
            }}
          />
        )}
      </Box>

      <Typography
        sx={{
          color: '#FFF',
          fontFamily: '"Montserrat", "Inter", sans-serif',
          fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.05rem' }, // Adjusted font size for mobile
          fontWeight: 600,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          lineHeight: 1.3,
          whiteSpace: 'normal', // Allow text to wrap
          wordBreak: 'break-word',
          hyphens: 'auto',
          width: '100%',
          pr: { xs: 1, sm: 0 } // Add right padding on mobile
        }}
      >
        {text}
      </Typography>
    </Card>
  );
};

export default CourseBox;
