import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  useMediaQuery,
  Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';


import afm_logo from '../assets/images/afm_logo.png';
import amlAcademyLogo from '../assets/images/aml_academy_logo.png';
import halykBankLogo from '../assets/images/halyk_bank_logo.jpeg';
import karizsizKogamLogo from '../assets/images/karizsiz_kogam_logo.jpg';
import amanatLogo from '../assets/images/amanat.svg';
import landingBackground from '../assets/images/landing_page_background.png';

const MotionTypography = motion(Typography);

interface HeroSectionProps {
  onNavigateToTest: () => void;
  onNavigateToPractice: () => void;
  onNavigateToImprove: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToTest,
  onNavigateToImprove
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Transition for mobile (bottom sheet feel)
  const Transition = React.useMemo(
    () =>
      React.forwardRef(function Transition(innerProps: any, ref: React.Ref<unknown>) {
        return <Slide direction="up" ref={ref} {...innerProps} />;
      }),
    []
  );

  // Which partner modal is open: 'adal' | 'law' | null
  const [openPartner, setOpenPartner] = React.useState<null | 'adal' | 'law'>(null);

  // Content (fallback) if i18n keys not yet added. We choose language manually.
  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'kz';

  const partnerContent: Record<string, {
    adal: { title: string; paragraphs: string[] };
    law: { title: string; paragraphs: string[] };
  }> = {
    kz: {
      law: {
        title: '«Заң мен тәртіп»',
        paragraphs: [
          '«Заң және Тәртіп» қағидаты - жаңа қоғамдық келісімнің іргетасында тұрған маңызды постулат.',
          'Мемлекет басшысы құқық қорғау органдарының басшыларымен кеңесте «Әділетті Қазақстан – Заң мен тәртіп үстемдік құратын ел» деп атап өтті.',
          'Заңды сақтау – әділеттіліктің негізі. Сонымен бірге әділетті қоғамда заң – теңдік пен тәртіптің кепілі.',
          'Құқықтық мемлекеттегі әділеттілік заңмен реттелген барлық әлеуметтік қатынастардың ортақ белгісі болады.',
          '2025 жылғы 1 сәуірде Үкіметтің №200 қаулысымен қоғамда заң идеологиясын және 2025–2030 жылдарға тәртіпті ілгерілету жөніндегі тұжырымдама бекітілді.',
          'Аталған құжаттың мақсаты - құқықтық мәдениетті қалыптастыру, азаматтардың құқықтық сана-сезімін арттыру және қоғам үшін маңызды құндылық ретінде заңды сыйлауды тәрбиелеу.',
          'Тұжырымдаманың маңызды негізі Мемлекет басшысының Ұлттық құрылтай отырысында айтқан тапсырмалары болды.'
        ]
      },
      adal: {
        title: '«Адал азамат»',
        paragraphs: [
          'Мемлекет басшысы «Адал адам – Адал азамат – Адал табыс» атты Ұлттық құрылтайдың үшінші отырысында ұлттың жаңа келбетін айқындайтын негізгі құндылықтар ретінде Қоғамға «Адал азамат» концепциясын ұсынды.',
          'Адал азамат идеясы мен тұжырымы арқылы халықтың бойында отаншылдық көзқарас, әділдік принциптері орнығып, «адал азамат» жеке категория ретінде әлеуметтік өмірдегі көптеген дүниелерге нақты өлшем бола бастайды.',
          'Қоғамда болып жатқан кез келген процестерді «адал азамат» категориясы арқылы түсініп, бағалау жалпы адалдық принциптерінің әлеуетін күшейтіп, қолданыс көкжиегін де кеңейте түседі.',
          'Сондықтан адал азамат ұғымы ең біріншіден жеке дара категория ретінде және теориялық мазмұны терең тұжырым ретінде әлеуметтік өмірдің практикалық мәніне айналып, уақыт өткен сайын өз дәрежесінде пайдаға асады.',
          '«Адал азамат» концепциясы қоғамдық қарым-қатынастарды реттеуші заң баптары сияқты адалдық ұғымына негізгі өлшем, тұғыр болатыны анық.',
          'Себебі, адал азаматтар ғана адалдық ұстанымдарына берік болып өмір сүреді, олар кешегі қара қылды қақ жарған билер сияқты айналасынан да, билік орындарынан да адалдықты талап ете бастайды.',
          'Бұл, сөзсіз, қоғамның, мемлекетіміздің адалдыққа негізделген жаңа тұрпатты болмысын қалыптастырады.'
        ]
      }
    },
    ru: {
      law: {
        title: '«Закон и порядок»',
        paragraphs: [
          'Принцип «Закон и Порядок» – важнейший постулат, лежащий в основе нового общественного согласия.',
          'Глава государства на совещании с руководителями правоохранительных органов отметил, что «Справедливый Казахстан – это страна, в которой верховенствуют Закон и порядок».',
          'Соблюдение закона – основа справедливости. В то же время, в справедливом обществе закон – гарант равноправия и порядка.',
          'Справедливость в правовом государстве является общим признаком всех социальных отношений, урегулированных законом.',
          'Концепция по продвижению идеологии законодательства и порядка в обществе на 2025–2030 годы утверждена Постановлением Правительства от 1 апреля 2025 года №200.',
          'Цель документа – формирование правовой культуры, повышение правового сознания граждан и воспитание уважения к закону как к важной ценности общества.',
          'Важным стержнем Концепции стали поручения Главы государства, данные на заседании Национального учредительного совета.'
        ]
      },
      adal: {
        title: '«Адал азамат» (Добросовестный гражданин)',
        paragraphs: [
          'Глава государства на третьем заседании Национального Курултая «Добросовестный человек – Добросовестный гражданин – Добросовестный доход» представил обществу концепцию «Адал азамат» как основу новых ценностей нации.',
          'Идея и содержание «Адал азамат» закрепляют принципы патриотизма и справедливости, служа ориентиром в социальной жизни.',
          'Понимание и оценка процессов через категорию «Адал азамат» усиливают потенциал принципов добросовестности и расширяют сферу их применения.',
          'Как самостоятельная категория и глубокая теоретическая конструкция, «Адал азамат» приобретает практическое значение в социальной жизни.',
          'Концепция становится основным критерием добросовестности, подобно нормам закона, регулирующим общественные отношения.',
          'Только добросовестные граждане последовательно привержены принципам честности и требуют честности от окружения и институтов власти.',
          'Это формирует новую модель общественного сознания государства, основанную на честности.'
        ]
      }
    }
  };

  const currentContent = partnerContent[lang];

  const handleOpen = (which: 'adal' | 'law') => setOpenPartner(which);
  const handleClose = () => setOpenPartner(null);

  
  return (
    <Box sx={{
      background: '#1a237e',
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
          width: { xs: '60px', sm: '80px' },
          height: { xs: '60px', sm: '80px' },
          borderRadius: { xs: '12px', sm: '15px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '3px solid rgba(255,255,255,0.4)'
        }}>
          <Box 
            component="img" 
            src={afm_logo} 
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
          width: { xs: '60px', sm: '80px' },
          height: { xs: '60px', sm: '80px' },
          borderRadius: { xs: '12px', sm: '15px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '3px solid rgba(255,255,255,0.4)'
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
          width: { xs: '60px', sm: '80px' },
          height: { xs: '60px', sm: '80px' },
          borderRadius: { xs: '12px', sm: '15px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '3px solid rgba(255,255,255,0.4)'
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
          width: { xs: '60px', sm: '80px' },
          height: { xs: '60px', sm: '80px' },
          borderRadius: { xs: '12px', sm: '15px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '3px solid rgba(255,255,255,0.4)'
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

        {/* Логотип Amanat */}
        <Box sx={{
          width: { xs: '60px', sm: '80px' },
          height: { xs: '60px', sm: '80px' },
          borderRadius: { xs: '12px', sm: '15px' },
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          border: '3px solid rgba(255,255,255,0.4)'
        }}>
          <Box 
            component="img" 
            src={amanatLogo} 
            alt="Amanat" 
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
          gap: 2.2,
          mt: 2.5,
          width: '100%',
          px: 1
        }}>
            <Box
              onClick={() => handleOpen('adal')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen('adal'); }}
              sx={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                borderRadius: '16px',
                px: 2.4,
                py: 1.15,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                minWidth: 120,
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transform: 'scale(1)',
                transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'scale(1.07)',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.1))',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.28)'
                }
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
            <Box
              onClick={() => handleOpen('law')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen('law'); }}
              sx={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))',
                borderRadius: '16px',
                px: 2.4,
                py: 1.15,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.25)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                minWidth: 140,
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transform: 'scale(1)',
                transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                '&:hover': {
                  transform: 'scale(1.07)',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.1))',
                  boxShadow: '0 8px 22px rgba(0,0,0,0.28)'
                }
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

        {/* Дополнительные партнеры для десктопа - в одну строку с логотипами */}
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 2,
          ml: 2
        }}>
          <Box
            onClick={() => handleOpen('adal')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen('adal'); }}
            sx={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '18px',
              px: 2.8,
              py: 1.3,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.26)',
              boxShadow: '0 5px 18px rgba(0,0,0,0.18)',
              cursor: 'pointer',
              transform: 'scale(1)',
              transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'scale(1.07)',
                background: 'rgba(255,255,255,0.18)',
                boxShadow: '0 8px 26px rgba(0,0,0,0.28)'
              }
            }}>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '0.78rem',
              textAlign: 'center',
              lineHeight: 1.35,
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.55px'
            }}>
              АДАЛ АЗАМАТ
            </Typography>
          </Box>

          <Box
            onClick={() => handleOpen('law')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen('law'); }}
            sx={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '18px',
              px: 2.8,
              py: 1.3,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.26)',
              boxShadow: '0 5px 18px rgba(0,0,0,0.18)',
              cursor: 'pointer',
              transform: 'scale(1)',
              transition: 'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'scale(1.07)',
                background: 'rgba(255,255,255,0.18)',
                boxShadow: '0 8px 26px rgba(0,0,0,0.28)'
              }
            }}>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '0.78rem',
              textAlign: 'center',
              lineHeight: 1.35,
              fontWeight: 600,
              textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              letterSpacing: '0.55px'
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
          {t('finiq.title').split(' ').slice(0, 2).join(' ')}
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
          {t('finiq.title').split(' ').slice(2).join(' ')}
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
          {t('finiq.testDescription')}
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
          {t('finiq.period')}
        </MotionTypography>

      </Box>

      <Dialog
        open={!!openPartner}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        TransitionComponent={fullScreen ? Transition as any : undefined}
        PaperProps={{
          sx: {
            background: fullScreen
              ? 'linear-gradient(175deg, rgba(10,25,54,0.96), rgba(22,52,110,0.94))'
              : 'linear-gradient(140deg, rgba(15,32,72,0.95), rgba(26,55,105,0.92))',
            color: 'white',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 10px 38px rgba(0,0,0,0.5)',
            borderRadius: fullScreen ? 0 : 3,
            position: 'relative',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{
          pr: 6,
            fontWeight: 700,
            fontSize: { xs: '1.05rem', sm: '1.35rem' },
            pt: { xs: 2, sm: 3 },
            pb: { xs: 1.5, sm: 2 },
            background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0))'
          }}>
          {openPartner === 'adal' ? currentContent.adal.title : openPartner === 'law' ? currentContent.law.title : ''}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'rgba(255,255,255,0.7)',
              '&:hover': { color: 'white' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{
          maxHeight: { xs: 'calc(100vh - 170px)', sm: '60vh' },
          px: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 },
          pb: { xs: 1, sm: 2.5 },
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.05)' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.28)', borderRadius: 3 }
        }}>
          {(openPartner === 'adal' ? currentContent.adal.paragraphs : openPartner === 'law' ? currentContent.law.paragraphs : []).map((p, idx) => (
            <Typography
              key={idx}
              variant="body1"
              sx={{
                mb: 2.2,
                fontSize: { xs: '0.86rem', sm: '0.95rem', md: '1rem' },
                lineHeight: 1.58,
                textShadow: '0 1px 2px rgba(0,0,0,0.45)',
                '&:last-of-type': { mb: 0 }
              }}
            >
              {p}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 1.5 },
          background: fullScreen ? 'linear-gradient(0deg, rgba(255,255,255,0.08), rgba(255,255,255,0))' : 'transparent'
        }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
            sx={{
              borderColor: 'rgba(255,255,255,0.4)',
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.12)'
              }
            }}
          >
            {lang === 'ru' ? 'Закрыть' : 'Жабу'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HeroSection;