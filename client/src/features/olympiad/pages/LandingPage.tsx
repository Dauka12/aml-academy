import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventIcon from '@mui/icons-material/Event';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import GavelIcon from '@mui/icons-material/Gavel';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Import the image
import { useNavigate } from 'react-router';
import olympImage from '../assets/images/olymp.jpg';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);
const MotionImg = motion.img;
const MotionCard = motion(Card);
const MotionGrid = motion(Grid);
const MotionButton = motion(Button);

// Text content for the modals
const instructionText = `ИНСТРУКЦИЯ
для участников Национальной олимпиады по финансовой безопасности,
проводимой на базе Академии финансового мониторинга «AML ACADEMY».

1. Национальная олимпиада направлена на повышение информационной, финансовой, правовой грамотности и культурного уровня молодежи (далее – Олимпиада). 
2. Желающие принять участие в Олимпиаде должны в обязательном порядке пройти регистрацию на специальной странице официального сайта Академии финансового мониторинга «AML ACADEMY», (далее – Академия) «Национальная олимпиада по финансовой безопасности»: https://www.amlacademy.kz/.
3. После регистрации участнику Олимпиады на указанный адрес электронной почты поступит письмо от Организационного Комитета (далее – Оргкомитет) с указанием персонального логина, пароля и ссылки для прохождения тестирования (в онлайн формате). 
4. Олимпиада состоит из трех этапов:
- Онлайн тестирование; 
- Написание эссе в оффлайн формате на площадке территориальных департаментов Агентства для отбора 20 финалистов;
- Финальный отбор 10 победителей посредством интеллектуальной игры и турнира по фиджитал-шахматам в г. Астана.
5. 1-й этап – тестирование.  
\tКоличество тестовых вопросов на 1 участника - 50 вопросов. Время проведения тестирования – 100 минут.  Время начала тестирования – 10 часов 00 минут. Время завершения тестирования – 11 часов 40 минут. Допускается погрешность во времени начала и завершения тестирования на 5 минут, с учетом установленного времени проведения тестирования. Тестирование состоится 5 апреля 2025 года с 10 часов 00 минут до 11 часов 40 минут. 
Результат тестирования в баллах участник получает после ввода ответов и их электронной проверки. Проходной балл тестирования составляет – 50 баллов (один правильный ответ равен 0,5 балла). 
Работы участников 1-го этапа проверяются программно-аппаратным способом и апелляции не подлежат.
Важно! Для участия в тестировании необходимо подключение со стационарного компьютера или ноутбука, имеющего доступ к информационно-телекоммуникационной сети Интернет. 
Результаты 1-го этапа будут размещены на сайте: https://www.amlacademy.kz/.
6. 2-й этап – эссе. 
Лица, прошедшие 1-й этап, допускаются к написанию эссе.  
Написание эссе состоится 10 апреля 2025 года с 10 часов 00 минут до 11 часов 20 минут.
Местом проведения 2-го этапа определены площадки территориальных департаментов Агентства.
Вход участников на площадку организатора олимпиады осуществляется заблаговременно до начала 2-го этапа за 30 минут. 
Подробные требования и порядок написания эссе изложены в Положении и Регламенте.  
Важно! Для участия в написании эссе при себе необходимо иметь документ, удостоверяющий личность (удостоверение личности либо паспорт). 
Во время написания эссе запрещается использование технических устройств, такие устройства подлежат изъятию.  
7. Заявление на апелляцию принимается на сайте Академии: https://www.amlacademy.kz/.
Срок подачи заявления на апелляцию: в течение 2-х рабочих дней после объявления результатов 2-го тура. 
8. Результаты апелляции размещаются на сайте Академии. 
9. Финальный этап состоится из 10 победителей посредством интеллектуальной игры и турнира по фиджитал-шахматам в г. Астана.
10. Победители будут определены из числа участников, набравших самые высокие баллы. 
11. Список победителей Олимпиады будет размещен на сайте Академии. 

* Внимание! Даты и время могут быть скорректированы по техническим причинам, независящим от Организационного комитета. Все участники будут информированы об изменениях не позднее чем за 24 часа. 


Организационный комитет`;

const regulationText = `Приложение 

Регламент по написанию Эссе (для участников Национальной олимпиады по финансовой безопасности) 

Эссе – это сочинение небольшого объема, свободно выражающее индивидуальные впечатления и размышления по поводу услышанного, прочитанного, просмотренного. Цель работы – раскрыть предложенную тему путем приведения каких-либо аргументов. Эссе не может содержать много идей. Оно отражает только один вариант размышлений и развивает его. 
При написании эссе старайтесь отвечать четко на поставленный вопрос и не отклоняйтесь от темы. Эссе - строго индивидуальная работа и не терпит соавторства.  
Время написания эссе – 80 минут. 

Оформление материалов эссе 
Объем эссе – до 2-3 страниц машинописного текста в редакторе «Блокнот». Шрифт: Times New Roman, кегль - 14, интервал – 1,5. 
Все поля по 20 мм. Вверху слева указывается фамилия, имя, отчество автора эссе. Далее, через один интервал - название эссе жирным шрифтом. Затем, через один пропущенный интервал располагается текст.  

Написание эссе 
Подготовка к написанию эссе. При выборе вопроса по какой-либо тематике, прежде чем составлять план Вашего ответа, убедитесь в том, что Вы внимательно прочитали и правильно поняли его, поскольку он может быть интерпретирован по-разному, а чтобы его осветить существует несколько подходов: следовательно, Вам необходимо будет выбрать вариант подхода, которому Вы будете следовать, а также иметь возможность обосновать Ваш выбор. При этом содержание вопроса может охватывать широкий спектр проблем, требующих привлечения большого объема литературы. 
В этом случае следует освещать только определенные аспекты этого вопроса. У Вас не возникнет никаких проблем, если Вы не будете выходить за рамки очерченного круга, а Ваш выбор будет вполне обоснован, и Вы сможете подкрепить его соответствующими доказательствами. Заголовок эссе может не находится в прямой зависимости от темы. 
Кроме отражения содержания работы он может являться отправной точкой в размышлениях автора. Прежде чем приступить к написанию эссе, проанализируйте имеющуюся у Вас информацию, а затем составьте тезисный план.  
Структура эссе: вступление, основная часть (развитие темы), заключение. 
Вступление 
Актуальность, суть и обоснование выбранной темы.  
Должно включать краткое изложение Вашего понимания и подход к ответу на данный вопрос. Полезно осветить то, что Вы предполагаете сделать в работе, и то, что в Ваше эссе не войдет, а также дать краткие определения ключевых терминов. При этом постарайтесь свести к минимуму число определений. 

Основная часть 
Данная часть предполагает развитие Вашей логической аргументации и анализа, а также обоснование их, исходя из имеющихся данных, других аргументов и позиций по этому вопросу. Предлагаемая Вами аргументация (или анализ) должна быть структурирована. В основной части Вы должны логически обосновать, используя данные или строгие рассуждения, Вашу аргументацию или анализ. Не ссылайтесь на работы, которые не читали сами. Небрежное оперирование данными, включая чрезмерное обобщение, снижает оценку. Следует избегать повторений. 
Необходимо писать коротко, четко и ясно. 
Обращается внимание на: 
- структурное выделение разделов и подразделов работы; 
- логичность изложения материала;  
- обоснованность выводов автора;  
- оригинальность и новизну выводов автора; 
- отсутствие лишнего материала, не имеющего отношение к работе;  
- способность построить и доказать Вашу позицию по определенным проблемам на основе приобретенных Вами знаний; 
- аргументированное раскрытие темы на основе собранного материала. 
Заключение 
В данном блоке отражается оценивается наличие необходимых выводов по теме, а также указание на дальнейшие направления развития темы.`;

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [regulationOpen, setRegulationOpen] = useState(false);
  const navigate = useNavigate();

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

  // Function to download text as Word document
  const downloadAsWord = (text: string, filename: string) => {
    // Creating a blob with the text content and mimetype for Word
    const blob = new Blob([text], { type: 'application/msword' });
    saveAs(blob, `${filename}.docx`);
  };

  // Component for dialog with enhanced styling
  const DocumentDialog = ({
    open,
    onClose,
    title,
    content,
    downloadFilename
  }: {
    open: boolean;
    onClose: () => void;
    title: string;
    content: string;
    downloadFilename: string;
  }) => {
    // Function to render formatted content with better styling
    const renderFormattedContent = (text: string) => {
      // Split content by lines to process headings and lists
      const lines = text.split('\n');

      return lines.map((line, index) => {
        // Handle headings (lines that are all uppercase or start with number followed by dot)
        if (line.toUpperCase() === line && line.trim().length > 0 && !/^\d+\./.test(line)) {
          return (
            <Typography
              key={index}
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                mt: index > 0 ? 3 : 0
              }}
            >
              {line}
            </Typography>
          );
        }

        // Handle list items (lines starting with number + dot or dash)
        else if (/^\d+\./.test(line)) {
          return (
            <Box key={index} sx={{ display: 'flex', mb: 1, pl: 2 }}>
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                {line.split('.')[0]}.
              </Typography>
              <Typography>{line.substring(line.indexOf('.') + 1)}</Typography>
            </Box>
          );
        }
        else if (/^-\s/.test(line)) {
          return (
            <Typography
              key={index}
              paragraph
              sx={{ pl: 3, display: 'flex', alignItems: 'center' }}
            >
              <Box
                component="span"
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  mr: 1,
                  display: 'inline-block'
                }}
              />
              {line.substring(1)}
            </Typography>
          );
        }

        // Regular paragraphs
        else if (line.trim() !== '') {
          return (
            <Typography
              key={index}
              paragraph
              sx={{
                mb: 2,
                textAlign: 'justify',
                lineHeight: 1.6
              }}
            >
              {line}
            </Typography>
          );
        }

        // Empty lines become small spacers
        return <Box key={index} sx={{ height: '0.5rem' }} />;
      });
    };

    // Download the Word document from assets
    const handleDownload = () => {
      try {
        const filePath = `${window.location.origin}/assets/files/${downloadFilename}.docx`;
        console.log(filePath);
        

        // First try to download the file from the server
        fetch(filePath)
          .then(response => {
            if (response.ok) {
              // File exists, proceed with download
              const link = document.createElement('a');
              link.href = filePath;
              link.download = `${downloadFilename}.docx`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              // If file not found, fall back to creating it from text content
              console.log("File not found, creating from text content");
              const blob = new Blob([content], { type: 'application/msword' });
              saveAs(blob, `${downloadFilename}.docx`);
            }
          })
          .catch(error => {
            console.error("Error downloading file:", error);
            // Fall back to creating from text content
            const blob = new Blob([content], { type: 'application/msword' });
            saveAs(blob, `${downloadFilename}.docx`);
          });
      } catch (error) {
        console.error("Error in download handler:", error);
        const blob = new Blob([content], { type: 'application/msword' });
        saveAs(blob, `${downloadFilename}.docx`);
      }
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{
          elevation: 5,
          sx: {
            borderRadius: 2,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 4, py: 3, bgcolor: '#fcfcfc' }}>
          <Box sx={{ maxWidth: '850px', mx: 'auto' }}>
            {renderFormattedContent(content)}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', p: 2, bgcolor: '#f9f9f9' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={handleDownload}
            sx={{
              borderRadius: 1.5,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            Скачать документ
          </Button>
          <Button onClick={onClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
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
              Перед участием в Олимпиаде участники должны в обязательном порядке пройти <b style={{fontWeight:'600', cursor:'pointer', color:'blue'}} onClick={()=>{
                navigate("/olympiad/registration")
              }}>регистрацию</b>.
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
              mx: 5,
              fontWeight: 'medium'
            }}
          >
            Прием заявок будет открыт с 09:00 часов 20 марта до 14:00 часов 4 апреля 2025 года на сайте Академии финансового мониторинга «AML&nbsp;ACADEMY».
          </Typography>

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
              Инструкция
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
              Регламент
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

        {/* Dialog components */}
        <DocumentDialog
          open={instructionOpen}
          onClose={() => setInstructionOpen(false)}
          title="Инструкция"
          content={instructionText}
          downloadFilename="Инструкция_Олимпиада"
        />

        <DocumentDialog
          open={regulationOpen}
          onClose={() => setRegulationOpen(false)}
          title="Регламент"
          content={regulationText}
          downloadFilename="Регламент_Эссе"
        />
      </MotionPaper>
    </Container>
  );
};

export default LandingPage;