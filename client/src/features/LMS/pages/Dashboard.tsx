import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const stats = [
  { label: "Мои курсы", value: 8, color: "#2563eb" },
  { label: "Уведомления", value: 3, color: "#ff9800" },
  { label: "Завершено", value: 5, color: "#43a047" },
];

const activities = [
  { time: "10:30", text: "Вы прошли тест по курсу 'Основы AML'" },
  { time: "09:15", text: "Добавлен новый курс 'Финансовый мониторинг'" },
  { time: "Вчера", text: "Вы записались на курс 'KYC-процедуры'" },
];

const Dashboard: React.FC = () => {
  return (
    <>
      {/* Статистика */}
      <Grid container spacing={3} mb={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                p: 3,
                bgcolor: "#fff",
                boxShadow: "0 2px 12px 0 rgba(37,99,235,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 130,
                transition: "transform 0.18s",
                "&:hover": {
                  transform: "translateY(-2px) scale(1.03)",
                  boxShadow: "0 4px 24px 0 rgba(37,99,235,0.10)",
                },
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                color={stat.color}
                sx={{ letterSpacing: 0.4, mb: 1.2, fontSize: 15 }}
              >
                {stat.label}
              </Typography>
              <Typography variant="h3" fontWeight={800} color="#223067">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

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
          {activities.map((activity, idx) => (
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
          ))}
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
