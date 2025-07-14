import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Chip,
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  duration?: number;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/lms/lms-courses");
        setCourses(response.data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить курсы.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(search);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description &&
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3e9f7 100%)",
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        color="primary.main"
        sx={{ mb: 4, textAlign: "center", letterSpacing: 1 }}
      >
        Все курсы
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          maxWidth: 700,
          mx: "auto",
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Поиск по курсам"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" size="large" disabled>
              Найти
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <CircularProgress sx={{ mt: 8, mx: "auto", display: "block" }} />
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                  p: 2,
                  transition: "0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                    transform: "translateY(-4px) scale(1.03)",
                  },
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 48,
                        height: 48,
                        boxShadow: 1,
                      }}
                    >
                      <SchoolIcon fontSize="large" />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 0.5 }}
                      >
                        {course.title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          icon={<InfoOutlinedIcon />}
                          label={course.category || "Без категории"}
                          color="primary"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={
                            course.duration ? `${course.duration} мин.` : "-"
                          }
                          color="secondary"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 48 }}
                  >
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
                  <Tooltip title="Подробнее о курсе" arrow>
                    <Button
                      size="large"
                      variant="contained"
                      endIcon={<ArrowForwardIosIcon />}
                      sx={{
                        borderRadius: 3,
                        fontWeight: 700,
                        px: 3,
                        background:
                          "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                        boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
                        transition: "0.2s",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)",
                          boxShadow: "0 4px 16px 0 rgba(37,99,235,0.18)",
                        },
                      }}
                      onClick={() => navigate(`/lms/courses/${course.id}`)}
                    >
                      Подробнее
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Courses;
