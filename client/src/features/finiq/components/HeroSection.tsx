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




const MotionTypography = motion(Typography);

interface HeroSectionProps {
  onNavigateToTest: () => void;
  onNavigateToPractice: () => void;
  onNavigateToImprove: () => void;
  /** Optional slot to render organizers logos inside the hero */
  organizersSlot?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToTest,
  onNavigateToPractice,
  onNavigateToImprove,
  organizersSlot
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
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      px: { xs: 1.5, sm: 4 },
      py: { xs: 2, sm: 6 },
      overflow: 'hidden'
    }}>
      {/* Background Video */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center'
          }}
        >
          <source src="/landing_page.webm" type="video/webm" />
        </video>
      </Box>
      
      {/* Blue overlay for better text readability */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.7) 0%, rgba(63, 81, 181, 0.6) 50%, rgba(10, 26, 58, 0.8) 100%)',
        zIndex: -1
      }} />
      
      {/* Navigation Menu */}
      <Box sx={{
        position: 'absolute',
        top: { xs: '0.2vh', sm: '0.8vh' },
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 4 },
        zIndex: 2
      }}>
        <Box sx={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: { xs: '15px', sm: '20px' },
          px: { xs: 1.5, sm: 3 },
          py: { xs: 0.8, sm: 1 },
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          maxWidth: { xs: '95%', sm: 'auto' },
          mx: 'auto'
        }}>
          <Box sx={{
            display: 'flex',
            gap: { xs: 1.5, sm: 3 },
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#81c784',
                  transform: 'translateY(-1px)'
                }
              }}
              onClick={() => {
                const element = document.getElementById('about-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('finiq.navigation.about')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#81c784',
                  transform: 'translateY(-1px)'
                }
              }}
              onClick={() => {
                const element = document.getElementById('organizers-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('finiq.navigation.organizers')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#81c784',
                  transform: 'translateY(-1px)'
                }
              }}
              onClick={() => {
                const element = document.getElementById('education-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('finiq.navigation.education')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#81c784',
                  transform: 'translateY(-1px)'
                }
              }}
              onClick={() => {
                const element = document.getElementById('contacts-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('finiq.navigation.contacts')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Основной контент */}
      <Box sx={{ 
        zIndex: 1, 
        mt: { xs: '0.6vh', sm: '1vh' }, 
        px: { xs: 0.5, sm: 2 },
        width: '100%',
        maxWidth: '1200px'
      }}>
        {/* Organizers logos (slot injected from LandingPage) — right under header */}
        {organizersSlot && (
          <Box id="organizers-section" sx={{ mb: { xs: 0.8, sm: 1.2 } }}>
            {organizersSlot}
          </Box>
        )}
        <MotionTypography
          variant="h1"
          fontWeight="bold"
          sx={{
            mb: { xs: 1, sm: 1.7 },
            color: 'white',
            fontSize: { xs: '1.4rem', sm: '2.2rem', md: '3rem', lg: '3.8rem' },
            lineHeight: { xs: 1.1, sm: 1.2 },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.3px', sm: '1px' }
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
            mb: { xs: 1, sm: 2 },
            color: 'white',
            fontSize: { xs: '1.4rem', sm: '2.2rem', md: '3rem', lg: '3.8rem' },
            lineHeight: { xs: 1.1, sm: 1.2 },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.3px', sm: '1px' }
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
            mb: { xs: 2, sm: 4 },
            color: '#81c784',
            fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.3rem', lg: '2.8rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.3px', sm: '1px' }
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
            mb: { xs: 2.5, sm: 4 },
            color: 'rgba(255,255,255,0.9)',
            maxWidth: { xs: '100%', sm: '800px' },
            mx: 'auto',
            lineHeight: { xs: 1.4, sm: 1.6 },
            fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem', lg: '1.4rem' },
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
            mb: { xs: 3, sm: 6 },
            color: '#ffeb3b',
            fontSize: { xs: '1rem', sm: '1.4rem', md: '1.8rem', lg: '2rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.2px', sm: '0.5px' }
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {t('finiq.period')}
        </MotionTypography>

        {/* Partners Section Title */}
        <MotionTypography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb: { xs: 2.5, sm: 4 },
            color: 'white',
            fontSize: { xs: '1.1rem', sm: '1.6rem', md: '2rem', lg: '2.4rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: { xs: '0.2px', sm: '0.5px' }
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {lang === 'ru' ? 'Партнеры проекта' : 'Жоба серіктестері'}
        </MotionTypography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2.5, sm: 4 },
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: { xs: '100%', sm: '900px' },
          mx: 'auto',
          mt: { xs: 1.5, sm: 3 },
          px: { xs: 1, sm: 0 }
        }}>
          {/* ЗАҢ МЕН ТӘРТІП Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <Box
              onClick={() => handleOpen('law')}
              sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(15px)',
                borderRadius: { xs: '15px', sm: '20px' },
                p: { xs: 2.5, sm: 4 },
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                minHeight: { xs: '120px', sm: '140px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  background: 'rgba(255,255,255,0.15)',
                  boxShadow: '0 16px 50px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  color: '#64b5f6',
                  fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: { xs: 1.2, sm: 1.3 }
                }}
              >
                ЗАҢ МЕН ТӘРТІП
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                  lineHeight: { xs: 1.4, sm: 1.5 },
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {lang === 'ru' ? 'Программа укрепления законности и порядка' : 'Заңдылық пен тәртіпті нығайту бағдарламасы'}
              </Typography>
            </Box>
          </motion.div>

          {/* АДАЛ АЗАМАТ Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <Box
              onClick={() => handleOpen('adal')}
              sx={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(15px)',
                borderRadius: { xs: '15px', sm: '20px' },
                p: { xs: 2.5, sm: 4 },
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                minHeight: { xs: '120px', sm: '140px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  background: 'rgba(255,255,255,0.15)',
                  boxShadow: '0 16px 50px rgba(0,0,0,0.2)'
                }
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  color: '#81c784',
                  fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: { xs: 1.2, sm: 1.3 }
                }}
              >
                АДАЛ АЗАМАТ
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '0.85rem', sm: '1rem' },
                  lineHeight: { xs: 1.4, sm: 1.5 },
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {lang === 'ru' ? 'Программа развития честности и справедливости' : 'Адалдық пен әділеттілікті дамыту бағдарламасы'}
              </Typography>
            </Box>
          </motion.div>
        </Box>

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