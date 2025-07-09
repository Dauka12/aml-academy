import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemText,
  Chip,
  Fade,
  Tooltip,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import axios from "axios";
import { enrollToCourse } from "../api/courseApi";
import Snackbar from "@mui/material/Snackbar";

interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  duration?: number;
  instructorId?: number;
}

type Instructor = {
  instructor_id: number;
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
  experience_years: number;
  // ...добавьте другие поля, если нужно
};

const mockSyllabus = [
  "Введение в AML/CFT",
  "Основные понятия и термины",
  "Законодательство и нормативные акты",
  "Практические кейсы",
  "Итоговое тестирование",
];

const mockInstructor = {
  name: "Иван Иванов",
  position: "Эксперт по финансовому мониторингу",
  experience: "10 лет опыта в сфере AML/CFT",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const mockFAQ = [
  {
    q: "Нужны ли предварительные знания?",
    a: "Нет, курс рассчитан на начинающих.",
  },
  {
    q: "Будет ли сертификат?",
    a: "Да, после успешного завершения курса вы получите сертификат.",
  },
];

const mockReviews = [
  {
    user: "Алия",
    text: "Очень полезный и структурированный курс!",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    user: "Дмитрий",
    text: "Понравились практические задания.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [instructorLoading, setInstructorLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const theme = useTheme();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/lms/courses/${id}`);
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить курс.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course?.instructorId) {
      setInstructorLoading(true);
      axios
        .get(`/api/lms/instructors/${course.instructorId}`)
        .then((res) => setInstructor(res.data))
        .catch(() => setInstructor(null))
        .finally(() => setInstructorLoading(false));
    }
  }, [course]);

  // Проверка, записан ли пользователь (можно доработать, если есть API)
  // Здесь просто для примера:
  useEffect(() => {
    axios.get(`/api/lms/courses/my-courses`).then((res) => {
      if (
        Array.isArray(res.data) &&
        res.data.some((c: any) => c.id === Number(id))
      ) {
        setEnrolled(true);
      }
    });
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ mt: 8, mx: "auto", display: "block" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!course) return <Alert severity="info">Курс не найден</Alert>;

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollToCourse(Number(id));
      setSnackbar({
        open: true,
        message: "Вы успешно записались на курс!",
        severity: "success",
      });
      setEnrolled(true);
    } catch (e: any) {
      if (e.response && e.response.status === 409) {
        setSnackbar({
          open: true,
          message: e.response.data || "Вы уже записаны на этот курс",
          severity: "error",
        });
        setEnrolled(true);
      } else if (e.response && e.response.status === 404) {
        setSnackbar({
          open: true,
          message: e.response.data || "Курс не найден",
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Ошибка при записи на курс",
          severity: "error",
        });
      }
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3e9f7 100%)",
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={4}
          sx={{
            maxWidth: 950,
            mx: "auto",
            p: { xs: 2, sm: 4, md: 6 },
            borderRadius: 5,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            background: "rgba(255,255,255,0.97)",
          }}
        >
          {/* Hero-заголовок */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 3 }}>
            <Avatar
              src={mockInstructor.avatar}
              alt={mockInstructor.name}
              sx={{ width: 72, height: 72, boxShadow: 2, mr: 2 }}
            />
            <Box>
              <Typography
                variant="h3"
                fontWeight={800}
                color="primary.main"
                gutterBottom
              >
                {course.title}
              </Typography>
              <Stack direction="row" spacing={2} mt={1}>
                <Chip
                  label={course.category || "Без категории"}
                  color="primary"
                  icon={<MenuBookOutlinedIcon />}
                  sx={{ fontWeight: 600, fontSize: 16 }}
                />
                <Chip
                  label={`Длительность: ${course.duration || "-"} мин.`}
                  color="secondary"
                  icon={<InfoOutlinedIcon />}
                  sx={{ fontWeight: 600, fontSize: 16 }}
                />
              </Stack>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />

          {/* О курсе */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <InfoOutlinedIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              О курсе
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "text.secondary", fontSize: 18 }}
          >
            {course.description}
          </Typography>

          {/* Программа курса */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1} mt={4}>
            <MenuBookOutlinedIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              Программа курса
            </Typography>
          </Stack>
          <List sx={{ mb: 3 }}>
            {mockSyllabus.map((item, idx) => (
              <ListItem key={idx} sx={{ pl: 0 }}>
                <Chip
                  label={idx + 1}
                  color="primary"
                  sx={{ mr: 2, fontWeight: 700 }}
                />
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ fontSize: 17 }}
                />
              </ListItem>
            ))}
          </List>

          {/* Преподаватель */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1} mt={4}>
            <PersonOutlineIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              Преподаватель
            </Typography>
          </Stack>
          {instructorLoading ? (
            <CircularProgress size={32} />
          ) : instructor ? (
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 3, mt: 1 }}
            >
              <Avatar
                src={`https://i.pravatar.cc/150?img=${instructor.instructor_id}`}
                alt={`${instructor.firstname} ${instructor.lastname}`}
                sx={{ width: 56, height: 56, boxShadow: 1 }}
              />
              <Box>
                <Typography fontWeight={700} fontSize={18}>
                  {instructor.firstname} {instructor.lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {instructor.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Опыт: {instructor.experience_years} лет
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {instructor.email}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography color="text.secondary">
              Информация о преподавателе не найдена
            </Typography>
          )}

          {/* FAQ */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1} mt={4}>
            <QuestionAnswerOutlinedIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              FAQ
            </Typography>
          </Stack>
          {mockFAQ.map((item, idx) => (
            <Accordion
              key={idx}
              sx={{
                mb: 1,
                borderRadius: 2,
                boxShadow: 0,
                background: "#f7faff",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Кнопка записаться */}
          <Box sx={{ mt: 5, mb: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: 20,
                fontWeight: 700,
                borderRadius: 3,
                background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                boxShadow: "0 4px 16px 0 rgba(37,99,235,0.10)",
                transition: "0.2s",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)",
                  boxShadow: "0 6px 24px 0 rgba(37,99,235,0.18)",
                },
              }}
              onClick={handleEnroll}
              disabled={enrolling || enrolled}
            >
              {enrolled
                ? "Вы уже записаны"
                : enrolling
                ? "Записываем..."
                : "Записаться на курс"}
            </Button>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={4000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              message={snackbar.message}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              ContentProps={{
                style: {
                  backgroundColor:
                    snackbar.severity === "success" ? "#43a047" : "#d32f2f",
                  color: "#fff",
                },
              }}
            />
          </Box>

          {/* Отзывы */}
          <Stack direction="row" alignItems="center" spacing={1} mb={1} mt={4}>
            <StarRateRoundedIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              Отзывы
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {mockReviews.map((review, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  background:
                    "linear-gradient(90deg, #f0f4ff 0%, #f7faff 100%)",
                  borderRadius: 3,
                  p: 2.5,
                  boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.06)",
                  maxWidth: 500,
                }}
              >
                <Tooltip title={review.user} placement="top" arrow>
                  <Avatar
                    src={review.avatar}
                    alt={review.user}
                    sx={{ width: 44, height: 44, mr: 1 }}
                  />
                </Tooltip>
                <Box>
                  <Typography fontWeight={700} fontSize={16}>
                    {review.user}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {review.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Fade>
    </Box>
  );
};

export default CourseDetails;
