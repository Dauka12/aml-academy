import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactsSection: React.FC = () => {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<string>('');

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const emails = ['a.bazarbaeva@afm.gov.kz', 'n.abuzharova@afm.gov.kz'];
  const address = 'Астана, ул. Бейбітшілік, д.10';

  return (
    <Box sx={{ mb: 4, px: { xs: 1, sm: 0 } }}>
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        sx={{
          textAlign: { xs: 'left', sm: 'center' },
          mb: 4,
          color: '#1A2751',
          fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' }
        }}
      >
        КОНТАКТЫ ДЛЯ ОТЗЫВОВ И СВЯЗИ
      </Typography>

      <Card 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          maxWidth: '700px', 
          mx: 'auto',
          width: { xs: '100%', sm: 'auto' },
          minWidth: { sm: '180px' },
          background: 'linear-gradient(135deg, rgba(26, 39, 81, 0.02) 0%, rgba(26, 39, 81, 0.05) 100%)'
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          {/* Email Contacts */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              color="primary.main"
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <EmailIcon />
              Email:
            </Typography>
            
            {emails.map((email, index) => (
              <Box 
                key={index}
                onClick={() => handleCopyToClipboard(email)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  bgcolor: 'white',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.light',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    color: 'text.primary',
                    fontWeight: 500
                  }}
                >
                  {email}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {copiedText === email && (
                    <Typography 
                      variant="caption" 
                      color="success.main"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      Скопировано!
                    </Typography>
                  )}
                  <ContentCopyIcon 
                    sx={{ 
                      fontSize: { xs: '18px', sm: '20px' },
                      color: copiedText === email ? 'success.main' : 'action.secondary'
                    }} 
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Address */}
          <Box>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              color="primary.main"
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <LocationOnIcon />
              {t('finiq.address', 'Адрес')}:
            </Typography>
            
            <Box 
              onClick={() => handleCopyToClipboard(address)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                bgcolor: 'white',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.light',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Typography 
                variant="body1"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: 'text.primary',
                  fontWeight: 500
                }}
              >
                {t('finiq.astanaAddress', address)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {copiedText === address && (
                  <Typography 
                    variant="caption" 
                    color="success.main"
                    sx={{ fontSize: '0.75rem' }}
                  >
                    Скопировано!
                  </Typography>
                )}
                <ContentCopyIcon 
                  sx={{ 
                    fontSize: { xs: '18px', sm: '20px' },
                    color: copiedText === address ? 'success.main' : 'action.secondary'
                  }} 
                />
              </Box>
            </Box>
          </Box>

          {/* Hint */}
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              mt: 2,
              display: 'block',
              textAlign: 'center',
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          >
            Нажмите на контакт, чтобы скопировать в буфер обмена
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactsSection;