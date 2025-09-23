import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import base_url from '../../../settings/base_url';

const ContactsSection: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = useState<string>('');
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLoadingLikes, setIsLoadingLikes] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [userReaction, setUserReaction] = useState<'LIKE' | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchReaction = async () => {
      setIsLoadingLikes(true);
      try {
  const token = localStorage.getItem('olympiad_token');
        const res = await fetch(`${base_url}/api/reactions/EXAM/0`, {
          headers: {
            'Accept': '*/*',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        if (!res.ok) throw new Error('Failed to load reaction');
        const data = await res.json();
        if (cancelled) return;
        if (typeof data.likes === 'number') setLikeCount(data.likes);
        if (data.userReaction === 'LIKE') setUserReaction('LIKE');
      } catch (e) {
        if (!cancelled) console.error(e);
      } finally {
        if (!cancelled) setIsLoadingLikes(false);
      }
    };
    fetchReaction();
    return () => { cancelled = true; };
  }, [isAuthenticated]);

  const handleLike = useCallback(async () => {
    if (userReaction === 'LIKE') return;
    if (!isAuthenticated) {
      navigate('/finiq/login');
      return;
    }
    if (isSending) return;
    setIsSending(true);
    setUserReaction('LIKE');
    setLikeCount(prev => prev + 1);
    try {
  const token = localStorage.getItem('olympiad_token');
      const res = await fetch(`${base_url}/api/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ contentType: 'EXAM', contentId: 0, reactionType: 'LIKE' })
      });
      if (!res.ok) throw new Error('Failed to send like');
    } catch (e) {
      console.error(e);
      setUserReaction(null);
      setLikeCount(prev => Math.max(prev - 1, 0));
    } finally {
      setIsSending(false);
    }
  }, [userReaction, isAuthenticated, isSending, navigate]);

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
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5, mt: { xs: 1, sm: 2 } }}>
        <Tooltip
          title={userReaction === 'LIKE' ? t('finiq.like.already', 'Вы уже лайкнули') : t('finiq.like.hint', 'Поставьте лайк, если понравилось')}
          placement="top"
        >
          <Box
            onClick={handleLike}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLike(); }}
            sx={{
              position: 'relative',
              width: { xs: 190, sm: 240, md: 280 },
              height: { xs: 190, sm: 240, md: 280 },
              borderRadius: '50%',
              background: userReaction === 'LIKE'
                ? 'radial-gradient(circle at 32% 30%, #1e88e5, #0d47a1)'
                : 'radial-gradient(circle at 32% 30%, #ffffff, #dbe6f4)',
              border: '4px solid',
              borderColor: userReaction === 'LIKE' ? 'rgba(255,255,255,0.55)' : 'rgba(26,39,81,0.12)',
              boxShadow: userReaction === 'LIKE'
                ? '0 14px 46px -8px rgba(13,71,161,0.6), 0 0 0 8px rgba(13,71,161,0.18)'
                : '0 12px 40px -14px rgba(26,39,81,0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: userReaction === 'LIKE' ? 'default' : 'pointer',
              userSelect: 'none',
              transition: 'all 0.5s cubic-bezier(.19,1,.22,1)',
              overflow: 'hidden',
              '&:hover': userReaction !== 'LIKE' ? {
                transform: 'translateY(-6px) scale(1.04)',
                boxShadow: '0 18px 52px -12px rgba(26,39,81,0.55)'
              } : undefined,
              '&:active': userReaction !== 'LIKE' ? {
                transform: 'translateY(-2px) scale(0.98)'
              } : undefined
            }}
          >
            <Box sx={{ position: 'absolute', inset: 0, opacity: userReaction === 'LIKE' ? 0.3 : 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.65), transparent 70%)', transition: 'opacity 0.6s ease' }} />
            {isSending ? (
              <CircularProgress size={64} thickness={4.5} sx={{ color: userReaction === 'LIKE' ? 'white' : '#1565c0' }} />
            ) : (
              <>
                {userReaction === 'LIKE' ? (
                  <ThumbUpAltIcon sx={{ fontSize: { xs: 80, sm: 110, md: 130 }, color: 'white', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.4))' }} />
                ) : (
                  <ThumbUpOffAltIcon sx={{ fontSize: { xs: 80, sm: 110, md: 130 }, color: '#1565c0', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.3))' }} />
                )}
                <Typography
                  variant="h6"
                  sx={{
                    mt: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                    fontWeight: 700,
                    color: userReaction === 'LIKE' ? 'rgba(255,255,255,0.95)' : '#0d47a1',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                    px: 1
                  }}
                >
                  {userReaction === 'LIKE'
                    ? t('finiq.like.thanks', 'Спасибо!')
                    : t('finiq.like.prompt', 'Понравился наш диктант?')}
                </Typography>
              </>
            )}
            <Box sx={{
              position: 'absolute',
              bottom: 8,
              right: 10,
              background: userReaction === 'LIKE' ? 'rgba(255,255,255,0.28)' : 'rgba(13,71,161,0.1)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.4)',
              color: userReaction === 'LIKE' ? 'white' : '#0d47a1',
              fontSize: '0.75rem',
              fontWeight: 700,
              px: 1.1,
              py: '4px',
              borderRadius: 2,
              minWidth: 36,
              textAlign: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>{isLoadingLikes ? '…' : likeCount}</Box>
          </Box>
        </Tooltip>
        {!isAuthenticated && (
          <Typography variant="caption" sx={{ mt: 1.5, color: 'text.secondary', textAlign: 'center', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            {t('finiq.like.loginHint', 'Войдите, чтобы поставить лайк')}
          </Typography>
        )}
      </Box>
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
        {t('finiq.contacts.title')}
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
              {t('finiq.contacts.email')}:
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
                      {t('finiq.contacts.copied')}
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
              {t('finiq.contacts.address')}:
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
                {t('finiq.astanaAddress')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {copiedText === address && (
                  <Typography 
                    variant="caption" 
                    color="success.main"
                    sx={{ fontSize: '0.75rem' }}
                  >
                    {t('finiq.contacts.copied')}
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
            {t('finiq.contacts.clickToCopy')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactsSection;