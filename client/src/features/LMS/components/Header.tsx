import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/lms");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#1e2a55", // синий как на скрине
        borderBottom: "1px solid #1e2a55",
        zIndex: 1100,
      }}
      component={motion.div}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: 72,
            px: 2,
          }}
        >
          {/* Логотип и название */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={handleLogoClick}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: "#0ea5e9", // можно заменить на логотип
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                LMS
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#ffffff", // белый как на скрине
                fontSize: { xs: 20, sm: 24 },
                letterSpacing: 0.5,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Academy
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={onLogin}
            sx={{
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: 14,
              textTransform: "none",
              px: 3,
              py: 1,
              color: "#ffffff",
              borderColor: "#ffffff55",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#334155",
                borderColor: "#ffffffaa",
              },
            }}
          >
            Войти
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
