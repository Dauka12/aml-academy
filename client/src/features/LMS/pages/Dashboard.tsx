import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [myCoursesCount, setMyCoursesCount] = useState<number | null>(null);
  const [completedCoursesCount, setCompletedCoursesCount] = useState<
    number | null
  >(null);
  const [upcomingCourse, setUpcomingCourse] = useState<Course | null>(null);
  const [activities, setActivities] = useState<
    { time: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("lmsToken");
        const headers = {
          Authorization: token ? `Bearer ${token}` : undefined,
        };

        const [coursesResponse, upcomingResponse] = await Promise.all([
          axios.get("/api/lms/lms-courses/my-courses", { headers }),
          axios.get("/api/lms/lms-courses/upcoming", { headers }),
        ]);

        const myCourses = Array.isArray(coursesResponse.data)
          ? coursesResponse.data
          : [];
        setMyCoursesCount(myCourses.length);
        setCompletedCoursesCount(
          myCourses.filter((c: { progress: number }) => c.progress === 100)
            .length
        );

        if (
          Array.isArray(upcomingResponse.data) &&
          upcomingResponse.data.length > 0
        ) {
          setUpcomingCourse(upcomingResponse.data[0]);
        }

        // Mock activities data for now
        setActivities([
          { time: "10:30", text: "Вы прошли тест по курсу 'Основы AML'" },
          {
            time: "09:15",
            text: "Добавлен новый курс 'Финансовый мониторинг'",
          },
          { time: "Вчера", text: "Вы записались на курс 'KYC-процедуры'" },
        ]);
      } catch (err) {
        setMyCoursesCount(0);
        setCompletedCoursesCount(0);
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      label: "Мои курсы",
      value: myCoursesCount,
      color: "#2563eb",
      icon: <SchoolIcon fontSize="large" color="primary" />,
      bg: "linear-gradient(90deg, #e3e9f7 0%, #c7d2fe 100%)",
    },
    {
      label: "Уведомления",
      value: activities.length,
      color: "#ff9800",
      icon: (
        <NotificationsActiveIcon fontSize="large" sx={{ color: "#ff9800" }} />
      ),
      bg: "linear-gradient(90deg, #fff7e6 0%, #ffe0b2 100%)",
    },
    {
      label: "Завершено",
      value: completedCoursesCount, // Placeholder
      color: "#43a047",
      icon: <CheckCircleIcon fontSize="large" sx={{ color: "#43a047" }} />,
      bg: "linear-gradient(90deg, #e8f5e9 0%, #b9f6ca 100%)",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} mb={3}>
        Добро пожаловать в LMS!
      </Typography>
      <Grid container spacing={3} mb={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
                bgcolor: stat.bg,
                boxShadow: "0 2px 12px 0 rgba(37,99,235,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 150,
                transition: "transform 0.18s",
                "&:hover": {
                  transform: "translateY(-2px) scale(1.03)",
                  boxShadow: "0 4px 24px 0 rgba(37,99,235,0.10)",
                },
              }}
            >
              <Avatar sx={{ bgcolor: "#fff", mb: 1, width: 56, height: 56 }}>
                {stat.icon}
              </Avatar>
              <Typography
                variant="body2"
                fontWeight={600}
                color={stat.color}
                sx={{ letterSpacing: 0.4, mb: 1.2, fontSize: 15 }}
              >
                {stat.label}
              </Typography>
              <Typography variant="h3" fontWeight={800} color="#223067">
                {loading && stat.value === null ? (
                  <Skeleton width={40} />
                ) : (
                  stat.value
                )}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mb={4}>
        <Typography variant="h6" fontWeight={700} mb={2} color="#223067">
          Ближайшие курсы
        </Typography>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06)",
            p: 3,
            minHeight: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <Skeleton variant="rounded" width="100%" height={80} />
          ) : upcomingCourse ? (
            <>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box>
                  <Typography fontWeight={700}>
                    {upcomingCourse.title}
                  </Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    Старт: 12 июля, 10:00
                  </Typography>
                </Box>
              </Stack>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => navigate(`/lms/content/15`)}
                sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}
              >
                Перейти
              </Button>
            </>
          ) : (
            <Typography>Нет ближайших курсов.</Typography>
          )}
        </Paper>
      </Box>

      {/* Последние активности */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={2} color="#223067">
          Последние активности
        </Typography>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06)",
            p: 3,
            minHeight: 120,
          }}
        >
          {loading ? (
            <Skeleton variant="text" width="100%" height={80} />
          ) : activities.length > 0 ? (
            activities.map((activity, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: idx !== activities.length - 1 ? 2 : 0,
                }}
              >
                <Typography
                  variant="body2"
                  color="#7b91b6"
                  sx={{ minWidth: 70, fontWeight: 600, fontSize: 14 }}
                >
                  {activity.time}
                </Typography>
                <Typography variant="body1" sx={{ ml: 2, color: "#293550" }}>
                  {activity.text}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>Нет последних активностей.</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
