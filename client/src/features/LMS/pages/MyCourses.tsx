import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
} from "@mui/material";

const myCourses = [
  {
    title: "Основы AML",
    progress: 75,
  },
  {
    title: "KYC-процедуры",
    progress: 40,
  },
];

const MyCourses: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Мои курсы
      </Typography>
      <Grid container spacing={3}>
        {myCourses.map((course, index) => (
          <Grid item xs={12} md={6} key={index}>
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
                <Button variant="contained" sx={{ mt: 2 }}>
                  Продолжить
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyCourses;
