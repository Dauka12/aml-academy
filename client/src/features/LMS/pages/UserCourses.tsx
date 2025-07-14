import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserCourse {
  id: number;
  title: string;
  progress: number;
  userCourseId: number;
}

const UserCourses: React.FC = () => {
  const [courses, setCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("lmsToken");
        const response = await axios.get("/api/lms/lms-courses/my-courses", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setCourses(response.data);
        console.log("мои курсы :", response.data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить ваши курсы.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Мои курсы
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course, index) => (
            <Grid item xs={12} md={6} key={course.userCourseId}>
              <Card sx={{ p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={course.progress}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >{`${course.progress}%`}</Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      navigate(`/lms/my-courses/${course.userCourseId}`)
                    }
                  >
                    Продолжить
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UserCourses;
