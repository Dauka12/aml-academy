import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import QuizIcon from "@mui/icons-material/Quiz";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Quiz from "./Quiz";

interface Quiz {
  id: string;
  title: string;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  description?: string;
  quizzes?: Quiz[];
  // add other module fields as needed
}

interface Course {
  title: string;
  progress?: number;
  modules: Module[];
  // add other course fields as needed
}

const CourseContent = () => {
  const { userCourseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("lmsToken");
        const response = await axios.get(`/api/lms/content/${userCourseId}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        });
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить контент курса.");
      } finally {
        setLoading(false);
      }
    };
    if (userCourseId) fetchCourseContent();
  }, [userCourseId]);

  if (loading)
    return <CircularProgress sx={{ mt: 8, mx: "auto", display: "block" }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!course || !course.modules || course.modules.length === 0)
    return <Typography>Нет данных о курсе.</Typography>;

  const modules = course.modules || [];
  const currentModule = modules[activeModule] || {};

  const handleQuizClick = (quiz: Quiz) => {
    setActiveQuiz(quiz);
  };

  const handleModuleChange =
    (moduleIndex: number) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setActiveModule(moduleIndex);
        setActiveQuiz(null);
      }
    };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 320,
          background: "#0d2a5a",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 0,
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => navigate("/lms/my-courses")}
              sx={{
                color: "#2ee59d",
                fontWeight: 700,
                textTransform: "none",
                pl: 0,
                minWidth: 0,
                background: "none",
                boxShadow: "none",
                "&:hover": { background: "rgba(46,229,157,0.08)" },
              }}
            >
              Назад к курсам
            </Button>
          </Box>
          <Typography fontWeight={700} fontSize={20}>
            {course.title}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography fontSize={14}>
              Прогресс {course.progress ?? 0}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={course.progress ?? 0}
              sx={{
                height: 8,
                borderRadius: 4,
                my: 1,
                background: "#2e4fa7",
                "& .MuiLinearProgress-bar": { background: "#2ee59d" },
              }}
            />
          </Box>
        </Box>
        <Divider sx={{ background: "rgba(255,255,255,0.1)" }} />
        <List sx={{ px: 2, pt: 2 }}>
          {modules.map((module, idx) => (
            <Accordion
              key={module.id}
              expanded={activeModule === idx}
              onChange={handleModuleChange(idx)}
              sx={{
                background: "transparent",
                color: "#fff",
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
                aria-controls={`panel${idx}-content`}
                id={`panel${idx}-header`}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    margin: 0,
                  },
                }}
              >
                <Typography fontWeight={700}>{module.title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <List component="div" disablePadding>
                  {module.quizzes?.map((quiz) => (
                    <ListItem
                      key={quiz.id}
                      button={true}
                      selected={activeQuiz?.id === quiz.id}
                      onClick={() => handleQuizClick(quiz)}
                      sx={{
                        pl: 2,
                        mb: 1,
                        borderRadius: 2,
                        background:
                          activeQuiz?.id === quiz.id
                            ? "#2563eb"
                            : "transparent",
                        "&.Mui-selected": {
                          background: "#2563eb",
                          "&:hover": {
                            background: "#1d4ed8",
                          },
                        },
                        "&:hover": {
                          background:
                            activeQuiz?.id !== quiz.id
                              ? "rgba(255, 255, 255, 0.1)"
                              : "#1d4ed8",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <DescriptionIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={quiz.title}
                        primaryTypographyProps={{
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      />
                      {activeQuiz?.id === quiz.id ? (
                        <FiberManualRecordIcon
                          sx={{ color: "#fff", fontSize: 14 }}
                        />
                      ) : quiz.completed ? (
                        <CheckCircleIcon sx={{ color: "#2ee59d" }} />
                      ) : null}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {activeQuiz ? (
          <Quiz quizId={Number(activeQuiz.id)} />
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#1a388c", mb: 2 }}
            >
              {currentModule.title}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Paper sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 4 }}>
              <Typography fontWeight={700} fontSize={24} mb={2}>
                {currentModule.title}
              </Typography>
              <Typography color="text.secondary" mb={2}>
                {/* Здесь можно вывести описание модуля или инструкцию */}
                {currentModule.description}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={activeModule === 0}
                  onClick={() =>
                    setActiveModule((prev) => Math.max(prev - 1, 0))
                  }
                >
                  Предыдущий модуль
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={activeModule >= modules.length - 1}
                  onClick={() =>
                    setActiveModule((prev) =>
                      Math.min(prev + 1, modules.length - 1)
                    )
                  }
                >
                  Следующий модуль
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CourseContent;
