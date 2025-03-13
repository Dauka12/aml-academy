import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import {
  Avatar,
  Box,
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
import React from 'react';

// Import the image
import olympImage from '../assets/images/olymp.jpg';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionImg = motion.img;
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);

const LandingPage: React.FC = () => {
  const theme = useTheme();

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
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
            Национальная олимпиада по финансовой безопасности 2025
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
              overflow: 'hidden',
              
            }}
          >
            <MotionImg
              src={olympImage}
              alt="Национальная олимпиада по финансовой безопасности"
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
              Агентство Республики Казахстан по финансовому мониторингу, Академия финансового мониторинга «AML ACADEMY», Академия правоохранительных органов при Генеральной прокуратуре Республики Казахстан, Карагандинский университет им. Е.А. Букетова, Университет «Туран», проводит Национальную олимпиаду по финансовой безопасности 2025 года.
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              Олимпиада призвана повысить финансово-правовую грамотность молодежи, показать современные тренды финансовой безопасности, научит противостоять рискам и угрозам в финансовой сфере.
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              В Олимпиаде могут принять участие студенты 2-3 курса и магистранты 1-го курса научно-педагогического направления, обучающиеся по образовательным программам юриспруденция, экономика, международные отношения, информационная безопасность.
            </Typography>

            <Typography variant="body1" paragraph fontWeight="medium" color="primary.dark" sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              Перед участием в Олимпиаде участники должны в обязательном порядке пройти <a href="/olympiad/registration">регистрацию</a>.
            </Typography>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7 }}>
              Олимпиада проводится в онлайн и оффлайн форматах на казахском, русском языках (на усмотрение участников), взимание платы за участие в ней не предусмотрено.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2 }}>
              Олимпиада состоит из трех этапов:
            </Typography>

            <Box sx={{ pl: 2 }}>
              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box component="span" sx={{ mr: 1 }}>1.</Box>
                Онлайн тестирование;
              </Typography>

              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box component="span" sx={{ mr: 1 }}>2.</Box>
                Написание эссе в оффлайн формате на площадке территориальных департаментов Агентства для отбора 20 финалистов;
              </Typography>

              <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box component="span" sx={{ mr: 1 }}>3.</Box>
                Финальный отбор 10 победителей посредством интеллектуальной игры и турнира по фиджитал-шахматам в г. Астана.
              </Typography>
            </Box>

            <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7, mt: 2 }}>
              Победители Олимпиады направляются от Республики Казахстан на Международную олимпиаду по финансовой безопасности в Российскую Федерацию с 30 сентября по 4 октября 2025 года в г. Красноярск.
            </Typography>
          </CardContent>
        </Card>

        {/* Registration timeline */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 'bold',
              color: '#1A2751'
            }}
          >
            Ключевые даты
          </Typography>

          <Timeline position="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">20 марта - 4 апреля 2025</Typography>
                  <Typography>Регистрация участников</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">5 апреля 2025</Typography>
                  <Typography>Проведение 1-го этапа (тестирование)</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">7 апреля 2025</Typography>
                  <Typography>Результаты 1-го этапа</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">10 апреля 2025</Typography>
                  <Typography>Проведение 2-го этапа (эссе)</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">18 апреля 2025</Typography>
                  <Typography>Результаты 2-го этапа</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">19 апреля 2025</Typography>
                  <Typography>Апелляция</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EventIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">5 мая 2025</Typography>
                  <Typography>Проведение 3-го этапа</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <EmojiEventsIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2" component="span" color="primary">6 мая 2025</Typography>
                  <Typography>Подведение итогов Олимпиады</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 'medium'
            }}
          >
            Прием заявок будет открыт с 09:00 часов 20 марта до 14:00 часов 4 апреля 2025 года на сайте Академии финансового мониторинга «AML ACADEMY».
          </Typography>

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
            Дополнительная информация
          </Typography>

          <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 3 }}>
            Дополнительная информация по Олимпиаде размещена на сайтах:
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
            Контактная информация
          </MotionTypography>

          <MotionTypography
            variant="body1"
            sx={{ mb: 3, fontWeight: 500, textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ответственные лица:
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
                title: "Академия правоохранительных органов",
                name: "Муратжан Зарина Какимжановна",
                position: "старший преподаватель Кафедры общеюридических дисциплин",
                phone: "+7 777 022 2251",
                email: "7340208@prokuror.gov.kz"
              },
              {
                title: "Карагандинский университет",
                name: "Кусаинова Лариса Канатовна",
                position: "заведующий Кафедрой уголовного права",
                phone: "+7 702 779 7673",
                email: "klarisa_777@mail.ru"
              },
              {
                title: "Университет «Туран»",
                name: "Селезнева Ирина Владимировна",
                position: "заведующий Кафедрой «Финансы»",
                phone: "+7 701 555 6067",
                email: "i.selezneva@turan-edu.kz"
              },
              {
                title: "AML ACADEMY",
                name: "Кусаинов Дархан Шыныбекович",
                position: "ведущий эксперт центра обучения",
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
      </MotionPaper>
    </Container>
  );
};

export default LandingPage;