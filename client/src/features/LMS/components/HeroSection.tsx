import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

interface HeroSectionProps {
  onLogin: () => void;
  onRegister: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLogin, onRegister }) => (
  <Box sx={{ mt: 8, mb: 8 }}>
    <Stack spacing={4} alignItems="center">
      <SchoolIcon sx={{ fontSize: 64, color: "#2563eb" }} />
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          color: "#1e293b",
          textAlign: "center",
          fontSize: { xs: 28, sm: 36, md: 48 },
        }}
      >
        Добро пожаловать в{" "}
        <Box component="span" sx={{ color: "#2563eb" }}>
          LMS Academy
        </Box>
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "#475569",
          maxWidth: 600,
          mx: "auto",
          textAlign: "center",
          fontSize: { xs: 16, sm: 20 },
        }}
      >
        Ваша современная платформа для онлайн-обучения, развития и
        профессионального роста.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          size="large"
          onClick={onLogin}
          sx={{
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 18,
            px: 4,
            py: 1.5,
            background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
            "&:hover": {
              background: "linear-gradient(90deg, #2563eb, #1e40af)",
              transform: "scale(1.05)",
            },
            transition: "0.3s",
          }}
        >
          Начать обучение
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={onRegister}
          sx={{
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 18,
            px: 4,
            py: 1.5,
            color: "#2563eb",
            borderColor: "#2563eb",
            background: "#fff",
            "&:hover": {
              background: "#e0e7ff",
              borderColor: "#1e40af",
              color: "#1e40af",
            },
            transition: "0.3s",
          }}
        >
          Зарегистрироваться
        </Button>
      </Stack>
    </Stack>
  </Box>
);

export default HeroSection;
