import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GavelIcon from '@mui/icons-material/Gavel';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import { FinalResultsTable } from '../components/FinalResultsTable';


import { Alert, Collapse, IconButton } from '@mui/material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Import the image
import { useTranslation } from 'react-i18next';
import olympImage from '../assets/images/olymp.jpg';
import { appilationResults, economicKz, economicRu, essayKz, essayText, finalResults, instructionKz, instructionText, interrelKz, interrelRu, isKz, isRu, jurisprudenceKz, jurisprudenceRu, provisionKz, provisionText, regulationKz, regulationText, results2_EK_raw, results2_IB_raw, results2_JUR_raw, results2_MO_raw } from '../assets/texts/LandingPageTexts.ts';

// Import floating components
import { useNavigate } from 'react-router';
import { DocumentDialog } from '../components/DocumentDialog.tsx';
import FloatingRegistrationButton from '../components/FloatingRegistrationButton.tsx';
import LanguageToggle from '../components/LanguageToggle.tsx';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionImg = motion.img;
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);
const MotionButton = motion(Button);



interface ParsedResult {
  "Университет": string;
  "Имя Фамилия": string;
  "Баллы": number;
}

const parseSecondStageData = (rawData: string): ParsedResult[] => {
  const lines = rawData.trim().split('\n').slice(1); // Skip header line
  const results: ParsedResult[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const words = trimmedLine.split(/\s+/);
    if (words.length < 3) {
      continue;
    }

    const scoreStr = words[words.length - 1];
    const score = parseInt(scoreStr, 10);

    if (isNaN(score)) {
      continue;
    }

    if (words.length - 1 < 2) {
      continue;
    }
    const lastName = words[words.length - 2];
    const firstName = words[words.length - 3];
    const fullName = `${firstName} ${lastName}`;

    const universityWords = words.slice(0, words.length - 3);
    const university = universityWords.join(" ");

    results.push({
      "Университет": university,
      "Имя Фамилия": fullName,
      "Баллы": score,
    });
  }
  return results;
};


const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [regulationOpen, setRegulationOpen] = useState(false);
  const [provisionOpen, setProvisionOpen] = useState(false);
  const [essayOpen, setessayOpen] = useState(false);
  const [jurisprudenceOpen, setJurisprudenceOpen] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [interrelOpen, setInterrelOpen] = useState(false);
  const [economicOpen, setEconomicOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);

  // State for second stage results dialogs
  const [isResults2Open, setIsResults2Open] = useState(false);
  const [moResults2Open, setMoResults2Open] = useState(false);
  const [ekResults2Open, setEkResults2Open] = useState(false);
  const [jurResults2Open, setJurResults2Open] = useState(false);

  // Add these state variables with the other state variables
  const [finalResultsOpen, setFinalResultsOpen] = useState(false);
  const [appilationResultsOpen, setAppilationResultsOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Update current language when i18n language change


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Announcement Alert */}
      <Collapse in={announcementOpen}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setAnnouncementOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1" component="div" fontWeight="bold" gutterBottom>
            {t('olympiad.appeal_notice.header')}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            {t('olympiad.appeal_notice.p1')}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            {t('olympiad.appeal_notice.p2')}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            {t('olympiad.appeal_notice.p3')}
          </Typography>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            {t('olympiad.appeal_notice.p4_title')}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {t('olympiad.appeal_notice.p5_item1')}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {t('olympiad.appeal_notice.p6_item2')}
          </Typography>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {t('olympiad.appeal_notice.p7_item3_intro')}
          </Typography>
          <Typography variant="body2" sx={{ ml: 3 }}>
            {t('olympiad.appeal_notice.p8_item3_email')}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mt: 1, fontWeight: 'bold', color: '#d32f2f' }}>
            {t('olympiad.appeal_notice.p9_warning')}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t('olympiad.appeal_notice.p10_regards')}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {t('olympiad.appeal_notice.p11_committee')}
          </Typography>
        </Alert>
      </Collapse>

      <MotionPaper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          background: 'transparent'
        }}
      >
        <Box sx={{
          textAlign: 'center',
          pt: 3,
          pb: 2,
          position: 'relative'
        }}>
          <MotionTypography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              mb: 7,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {t('olympiad.title')}
          </MotionTypography>

          {/* Image */}
          <MotionBox
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            sx={{
              height: 400,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              mt: 2,
              overflow: 'hidden', // Add pointer cursor for clarity
            }}
          >
            <MotionImg
              src={olympImage}
              alt={t('olympiad.title')}
              style={{
                height: '100%',
                objectFit: 'cover'
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />

          </MotionBox>
        </Box>
        <Container maxWidth="lg">
              <Box sx={{ pt: 4, pb: 8 }}>
                <FinalResultsTable />
              </Box>
            </Container>
         {/* final Results Section */}
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mt: 6, // Added margin top for separation
            mb: 3,
            fontWeight: 'bold',
            color: '#1A2751'
          }}
        >
          Финал
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mt: 4,
            mb: 4
          }}
        >
          <MotionButton
            variant="contained"
            color="primary" // Consider a different color or style to distinguish
            size="large"
            startIcon={<GavelIcon />}
            onClick={() => setFinalResultsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.resultsFinal.dialogTitle')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SecurityIcon />}
            onClick={() => setAppilationResultsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.resultsAppilation.dialogTitle')}
          </MotionButton>
        </Box>

        {/* Second Stage Results Section */}
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mt: 6, // Added margin top for separation
            mb: 3,
            fontWeight: 'bold',
            color: '#1A2751'
          }}
        >
          {t('olympiad.resultsSecondStage.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mt: 4,
            mb: 4
          }}
        >
          <MotionButton
            variant="contained"
            color="primary" // Consider a different color or style to distinguish
            size="large"
            startIcon={<GavelIcon />}
            onClick={() => setJurResults2Open(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.resultsSecondStage.buttonJUR')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SecurityIcon />}
            onClick={() => setIsResults2Open(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.resultsSecondStage.buttonIB')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PublicIcon />}
            onClick={() => setMoResults2Open(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.resultsSecondStage.buttonMO')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AccountBalanceIcon />}
            onClick={() => setEkResults2Open(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.resultsSecondStage.buttonEK')}
          </MotionButton>
        </Box>


        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 'bold',
            color: '#1A2751'
          }}
        >
          {t('olympiad.results')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            mt: 4,
            mb: 4
          }}
        >
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<GavelIcon />} // Changed to GavelIcon for law
            onClick={() => setJurisprudenceOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.Jurisprudence')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SecurityIcon />} // Changed to SecurityIcon for InfoSec
            onClick={() => setisOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.InfoSec')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PublicIcon />} // Changed to PublicIcon for International Relations
            onClick={() => setInterrelOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {t('olympiad.interral')}
          </MotionButton>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AccountBalanceIcon />} // Changed to AccountBalanceIcon for Economics
            onClick={() => setEconomicOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              borderRadius: 2,
              px: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            Экономика
          </MotionButton>

        </Box>



        <Card
          elevation={2}
          sx={{
            mb: 5,
            mx: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <CardContent sx={{ p: 4 }}>


            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              {t('olympiad.description.organizers')}
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              {t('olympiad.description.purpose')}
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              {t('olympiad.description.eligibility')}
            </Typography>

            <Typography variant="body1" paragraph fontWeight="medium" color="primary.dark" sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              {t('olympiad.description.registration')} <b style={{ fontWeight: '600', cursor: 'pointer', color: 'blue' }} onClick={() => navigate('/olympiad/registration')}>{t('olympiad.register')}</b>.
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              {t('olympiad.description.format')}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
              {t('olympiad.stages.title')}
            </Typography>

            <Box sx={{ pl: 2 }}>
              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box component="span" sx={{ mr: 1 }}>1.</Box>
                {t('olympiad.stages.first')}
              </Typography>

              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box component="span" sx={{ mr: 1 }}>2.</Box>
                {t('olympiad.stages.second')}
              </Typography>

              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box component="span" sx={{ mr: 1 }}>3.</Box>
                {t('olympiad.stages.third')}
              </Typography>
            </Box>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7, mt: 2 }}>
              {t('olympiad.description.winners')}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ mb: 5 }}>
          {/* Timeline Component */}
          <Box sx={{
            my: 5,
            px: 2,
            py: 4,
            bgcolor: 'rgba(245, 247, 250, 0.9)',
            borderRadius: 2,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              fontWeight="bold"
              color="primary.dark"
              sx={{ mb: 4 }}
            >
              {t('olympiad.dates.title', 'Новые сроки проведения олимпиады')}
            </Typography>

            <Grid container spacing={2}>
              {[
                {
                  icon: <DateRangeIcon fontSize="large" />,
                  label: t('olympiad.timeline.registration', 'Регистрация'),
                  dates: t('olympiad.months.period')
                },
                {
                  icon: <AssignmentIcon fontSize="large" />,
                  label: t('olympiad.timeline.firstStage', 'Тестирование'),
                  dates: `21 ${t('olympiad.months.april', 'апреля')}`
                },
                {
                  icon: <EditIcon fontSize="large" />,
                  label: t('olympiad.timeline.secondStage', 'Написание эссе'),
                  dates: `25 ${t('olympiad.months.april', 'апреля')}`
                },
                {
                  icon: <GavelOutlinedIcon fontSize="large" />,
                  label: t('olympiad.timeline.appeal', 'Апелляция'),
                  dates: `6-12 ${t('olympiad.months.may', 'мая')}`
                },
                {
                  icon: <EmojiEventsIcon fontSize="large" />,
                  label: t('olympiad.timeline.thirdStage', 'Финал'),
                  dates: `23 ${t('olympiad.months.may', 'мая')}`
                }
              ].map((step, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <MotionCard
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'white'
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        mb: 2,
                        boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      {step.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="medium" gutterBottom>
                      {step.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary.dark"
                      fontWeight="bold"
                    >
                      {step.dates}
                    </Typography>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Add the buttons here */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 4,
              mb: 4
            }}
          >
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DescriptionIcon />}
              onClick={() => setInstructionOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              {t('olympiad.instruction')}
            </MotionButton>
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<GavelIcon />}
              onClick={() => setRegulationOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              {t('olympiad.regulation')}
            </MotionButton>
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AssignmentIcon />}
              onClick={() => setProvisionOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              {t('olympiad.provision')}
            </MotionButton>
            <MotionButton
              variant="contained"
              color="primary"
              size="large"
              startIcon={<EditIcon />} // Используем иконку Edit для темы эссе
              onClick={() => setessayOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              Эссе
            </MotionButton>

          </Box>

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 3,
              mt: 5,
              fontWeight: 'bold',
              color: '#1A2751'
            }}
          >
            {t('olympiad.additionalInfo.title')}
          </Typography>

          <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 3 }}>
            {t('olympiad.additionalInfo.content')}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Chip
              label="sodrujestvo.org/ru"
              component="a"
              href="https://sodrujestvo.org/ru"
              target="_blank"
              clickable
              color="primary"
              variant="outlined"
            />
            <Chip
              label="rosfinolymp.ru"
              component="a"
              href="https://rosfinolymp.ru"
              target="_blank"
              clickable
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Contact Information - Enhanced section */}
        <Box sx={{ mb: 4, mx: 2 }}>
          <MotionTypography
            variant="h5"
            component="h2"
            gutterBottom
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
              color: '#1A2751'
            }}
          >
            {t('olympiad.contacts.title')}
          </MotionTypography>

          <MotionTypography
            variant="body1"
            sx={{ mb: 3, fontWeight: 500, textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('olympiad.contacts.responsiblePersons')}
          </MotionTypography>

          <MotionGrid
            container
            spacing={3}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                title: t('olympiad.contacts.organizations.lawEnforcementAcademy'),
                name: "Муратжан Зарина Какимжановна",
                position: t('olympiad.contacts.positions.seniorLecturer'),
                phone: "+7 777 022 2251",
                email: "7340208@prokuror.gov.kz"
              },
              {
                title: t('olympiad.contacts.organizations.karagandaUniversity'),
                name: "Кусаинова Лариса Канатовна",
                position: t('olympiad.contacts.positions.headCriminalLaw'),
                phone: "+7 702 779 7673",
                email: "klarisa_777@mail.ru"
              },
              {
                title: t('olympiad.contacts.organizations.turanUniversity'),
                name: "Селезнева Ирина Владимировна",
                position: t('olympiad.contacts.positions.headFinance'),
                phone: "+7 701 555 6067",
                email: "i.selezneva@turan-edu.kz"
              },
              {
                title: t('olympiad.contacts.organizations.amlAcademy'),
                name: "Кусаинов Дархан Шыныбекович",
                position: t('olympiad.contacts.positions.leadingExpert'),
                phone: "+7 701 512 6680",
                email: "kussainovd@mail.ru"
              }
            ].map((contact, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <MotionCard
                  elevation={3}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                  }}
                  sx={{
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(249,249,249,1) 100%)`
                  }}
                >
                  <CardContent sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3
                  }}>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          mr: 1.5,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          color: theme.palette.primary.dark,
                          lineHeight: 1.2,
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      >
                        {contact.title}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          mb: 0.5
                        }}
                      >
                        {contact.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}
                      >
                        {contact.position}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        '&:hover': { color: theme.palette.primary.main }
                      }}>
                        <PhoneIcon
                          fontSize="small"
                          sx={{
                            mr: 1,
                            color: theme.palette.primary.main,
                            fontSize: '1rem'
                          }}
                        />
                        <Typography
                          variant="body2"
                          component="a"
                          href={`tel:${contact.phone}`}
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': { color: theme.palette.primary.main }
                          }}
                        >
                          {contact.phone}
                        </Typography>
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                        '&:hover': { color: theme.palette.primary.main }
                      }}>
                        <EmailIcon
                          fontSize="small"
                          sx={{
                            mr: 1,
                            color: theme.palette.primary.main,
                            fontSize: '1rem'
                          }}
                        />
                        <Typography
                          variant="body2"
                          component="a"
                          href={`mailto:${contact.email}`}
                          sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            '&:hover': { color: theme.palette.primary.main }
                          }}
                        >
                          {contact.email}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </MotionGrid>
        </Box>

        {/* Dialog components */}
        <DocumentDialog
          open={instructionOpen}
          onClose={() => setInstructionOpen(false)}
          title="Инструкция"
          content={i18n.language === 'kz' ? instructionKz : instructionText}
          downloadFilename="Юриспруденция_Инструкция"
        />

        <DocumentDialog
          open={regulationOpen}
          onClose={() => setRegulationOpen(false)}
          title="Регламент"
          content={i18n.language === 'kz' ? regulationKz : regulationText}
          downloadFilename="Регламент_Эссе"
        />

        <DocumentDialog
          open={provisionOpen}
          onClose={() => setProvisionOpen(false)}
          title="Положение"
          content={i18n.language === 'kz' ? provisionKz : provisionText}
          downloadFilename="Положение"
        />
        <DocumentDialog
          open={essayOpen}
          onClose={() => setessayOpen(false)}
          title="Эссе"
          content={i18n.language === 'kz' ? essayKz : essayText}
          downloadFilename="Эссе"
        />
        <DocumentDialog
          open={jurisprudenceOpen}
          onClose={() => setJurisprudenceOpen(false)}
          title="Юриспруденция"
          content={i18n.language === 'kz' ? jurisprudenceKz : jurisprudenceRu}
          downloadFilename="Результаты_по_Юр"
          fileExtension="pdf"
        />
        <DocumentDialog
          open={isOpen}
          onClose={() => setisOpen(false)}
          title="Информационная Безопасность"
          content={i18n.language === 'kz' ? isKz : isRu}
          downloadFilename="Результаты_по_ИБ"
          fileExtension="pdf"
        />
        <DocumentDialog
          open={interrelOpen}
          onClose={() => setInterrelOpen(false)}
          title="Международные отношения"
          content={i18n.language === 'kz' ? interrelKz : interrelRu}
          downloadFilename="Результаты_по_МО"
          fileExtension="pdf"
        />
        <DocumentDialog
          open={economicOpen}
          onClose={() => setEconomicOpen(false)}
          title="Экономика"
          content={i18n.language === 'kz' ? economicKz : economicRu}
          downloadFilename="Результаты_по_Эк"
          fileExtension="pdf"
        />
        {/* Dialogs for Second Stage Results */}
        <DocumentDialog
          open={jurResults2Open}
          onClose={() => setJurResults2Open(false)}
          title={t('olympiad.resultsSecondStage.dialogTitleJUR')}
          content={t('olympiad.resultsSecondStage.dialogContent')}
          downloadFilename="Результаты_2этап_Юриспруденция"
          fileExtension="xlsx"
          excelData={parseSecondStageData(results2_JUR_raw)}
        />
        <DocumentDialog
          open={isResults2Open}
          onClose={() => setIsResults2Open(false)}
          title={t('olympiad.resultsSecondStage.dialogTitleIB')}
          content={t('olympiad.resultsSecondStage.dialogContent')}
          downloadFilename="Результаты_2этап_ИБ"
          fileExtension="xlsx"
          excelData={parseSecondStageData(results2_IB_raw)}
        />
        <DocumentDialog
          open={moResults2Open}
          onClose={() => setMoResults2Open(false)}
          title={t('olympiad.resultsSecondStage.dialogTitleMO')}
          content={t('olympiad.resultsSecondStage.dialogContent')}
          downloadFilename="Результаты_2этап_МО"
          fileExtension="xlsx"
          excelData={parseSecondStageData(results2_MO_raw)}
        />
        <DocumentDialog
          open={ekResults2Open}
          onClose={() => setEkResults2Open(false)}
          title={t('olympiad.resultsSecondStage.dialogTitleEK')}
          content={t('olympiad.resultsSecondStage.dialogContent')}
          downloadFilename="Результаты_2этап_Экономика"
          fileExtension="xlsx"
          excelData={parseSecondStageData(results2_EK_raw)}
        />
        <DocumentDialog
          open={finalResultsOpen}
          onClose={() => setFinalResultsOpen(false)}
          title={t('olympiad.resultsFinal.dialogTitle')}
          content={t('olympiad.resultsFinal.dialogContent')}
          downloadFilename="Результаты_Финал"
          fileExtension="xlsx"
          excelData={parseSecondStageData(finalResults)}
        />
        <DocumentDialog
          open={appilationResultsOpen}
          onClose={() => setAppilationResultsOpen(false)}
          title={t('olympiad.resultsAppilation.dialogTitle')}
          content={t('olympiad.resultsAppilation.dialogContent')}
          downloadFilename="Результаты_Апелляции"
          fileExtension="xlsx"
          excelData={parseSecondStageData(appilationResults)}
        />

        <FloatingRegistrationButton />
        <LanguageToggle />
      </MotionPaper>
    </Container>
  );
};

export default LandingPage;