import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Button,
  IconButton,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import WarningIcon from '@mui/icons-material/Warning';
import './CourseWelcomeModal.scss';

const CourseWelcomeModal = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
    // Сохраняем в localStorage, что пользователь уже видел это окно
    localStorage.setItem('courseWelcomeShown', 'true');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperComponent={Paper}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative'
        }
      }}
    >
      {/* Заголовок с иконкой */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <CelebrationIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          Поздравляем! 🎉
        </Typography>
        <Typography variant="h6" component="h3">
          Добро пожаловать в Академию финансового мониторинга
        </Typography>
        
        {/* Кнопка закрытия */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Основной контент */}
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" component="h4" fontWeight="600" gutterBottom>
            Вы приобрели дистанционный курс!
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
            Теперь у вас есть доступ к качественному образованию в области финансового мониторинга
          </Typography>
        </Box>

        {/* Информационные блоки */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          {/* Доступ на 90 дней */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <AccessTimeIcon 
              sx={{ 
                color: '#2196f3', 
                fontSize: 28, 
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography variant="h6" component="h5" fontWeight="600" gutterBottom>
                Доступ к курсу
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                <strong>90 календарных дней</strong> с момента приобретения курса
              </Typography>
            </Box>
          </Box>

          {/* Скачать сертификат */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <DownloadIcon 
              sx={{ 
                color: '#4caf50', 
                fontSize: 28, 
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography variant="h6" component="h5" fontWeight="600" gutterBottom>
                Обязательно скачайте сертификат
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Получите документ о прохождении курса до истечения срока доступа
              </Typography>
            </Box>
          </Box>

          {/* Важное предупреждение */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <WarningIcon 
              sx={{ 
                color: '#ff9800', 
                fontSize: 28, 
                mt: 0.5,
                flexShrink: 0
              }} 
            />
            <Box>
              <Typography variant="h6" component="h5" fontWeight="600" gutterBottom>
                Важно помнить
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                После <strong>90 дней</strong> доступ к материалам курса будет <strong>закрыт</strong>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Кнопка подтверждения */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleClose}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Ознакомлен
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CourseWelcomeModal;
