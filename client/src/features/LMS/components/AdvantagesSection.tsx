import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SchoolIcon from "@mui/icons-material/School";

const advantages = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    title: "Безопасность",
    desc: "Ваши данные и прогресс обучения надежно защищены.",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    title: "Достижения",
    desc: "Получайте сертификаты и отмечайте свои успехи.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    title: "Поддержка",
    desc: "Оперативная помощь и поддержка пользователей 24/7.",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
    title: "Современные курсы",
    desc: "Только актуальные и востребованные программы обучения.",
  },
];

const AdvantagesSection: React.FC = () => (
  <>
    <Typography
      variant="h4"
      sx={{ fontWeight: 700, color: "#1e293b", mb: 4, textAlign: "center" }}
    >
      Почему выбирают LMS Academy?
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {advantages.map((item, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 4 }}
          >
            {item.icon}
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#64748b" }}>
              {item.desc}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </>
);

export default AdvantagesSection;
