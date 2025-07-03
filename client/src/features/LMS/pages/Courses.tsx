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
} from "@mui/material";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  description: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/lms/courses");
        setCourses(response.data);
        console.log('Все курсы:', response.data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить курсы.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Все курсы
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label="Поиск по курсам" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" size="large">
              Найти
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Подробнее</Button>
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
