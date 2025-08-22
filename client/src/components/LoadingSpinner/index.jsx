import { Box } from '@mui/material';
import { memo } from 'react';

const LoadingSpinner = memo(() => (
  <Box sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #061c45 0%, #1A2751 50%, #2A3F6B 100%)',
    zIndex: 9999
  }}>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    }}>
      {/* Анимированный спиннер */}
      <Box sx={{
        width: '60px',
        height: '60px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }} />
      
      {/* Текст загрузки */}
      <Box sx={{
        color: 'white',
        fontSize: '1rem',
        fontWeight: 500,
        opacity: 0.9,
        animation: 'pulse 2s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 0.5 }
        }
      }}>
        Загрузка...
      </Box>
      
      {/* Прогресс бар */}
      <Box sx={{
        width: '200px',
        height: '2px',
        background: 'rgba(255,255,255,0.3)',
        borderRadius: '1px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Box sx={{
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          animation: 'loading 1.5s ease-in-out infinite',
          '@keyframes loading': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(300%)' }
          }
        }} />
      </Box>
    </Box>
  </Box>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
