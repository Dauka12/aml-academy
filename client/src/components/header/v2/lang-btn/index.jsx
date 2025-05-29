import { Box, ButtonBase, Fade, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import './style.scss';

export default function LangBtn() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const getLanguageLabel = (language) => {
    switch (language) {
      case 'kz':
        return { code: 'ҚАЗ', name: 'Қазақша' };
      case 'ru':
        return { code: 'РУС', name: 'Русский' };
      case 'eng':
        return { code: 'ENG', name: 'English' };
      default:
        return { code: 'РУС', name: 'Русский' };
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState(getLanguageLabel(i18n.language));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const changeLanguage = (language, label) => {
    setOpen(false);
    setCurrentLanguage(label);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    setCurrentLanguage(getLanguageLabel(i18n.language));
  }, [i18n.language]);

  const languages = [
    { code: 'kz', label: getLanguageLabel('kz') },
    { code: 'ru', label: getLanguageLabel('ru') },
    { code: 'eng', label: getLanguageLabel('eng') }
  ];

  return (
    <Box ref={buttonRef} sx={{ position: 'relative' }}>
      <ButtonBase
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          px: 2,
          py: 1,
          minWidth: 100,
          justifyContent: 'space-between',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          }
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 500, 
            color: 'white', 
            textTransform: 'uppercase',
            fontSize: '0.9rem'
          }}
        >
          {currentLanguage.code}
        </Typography>
        
        <IoIosArrowDown 
          style={{ 
            marginLeft: 8, 
            fontSize: 16, 
            transform: open ? 'rotate(180deg)' : 'rotate(0)', 
            transition: 'transform 0.3s ease' 
          }} 
        />
      </ButtonBase>

      <Fade in={open}>
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            mt: 1,
            right: 0,
            width: 140,
            borderRadius: 2,
            backgroundColor: 'rgba(50, 65, 100, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 5px 20px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
            overflow: 'hidden',
            zIndex: 100,
            p: 1
          }}
        >
          {languages.map((lang) => (
            <ButtonBase
              key={lang.code}
              onClick={() => changeLanguage(lang.code, lang.label)}
              sx={{
                width: '100%',
                py: 1.5,
                px: 2,
                textAlign: 'left',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                transition: 'all 0.2s ease',
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontWeight: i18n.language === lang.code ? 700 : 400,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  mb: 0.5
                }}
              >
                {lang.label.code}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem'
                }}
              >
                {lang.label.name}
              </Typography>
            </ButtonBase>
          ))}
        </Paper>
      </Fade>
    </Box>
  );
}