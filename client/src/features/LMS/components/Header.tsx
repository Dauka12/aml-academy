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
import logo from "../assets/images/logo.svg";

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
            alignItems: "center",
            minHeight: 90,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleLogoClick}
          >
            <Box
              component="img"
              src={logo}
              alt="Академия финансового мониторинга"
              sx={{
                width: 44,
                height: 44,
                borderRadius: "8px",
                p: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                ml: 1.5,
                display: { xs: "none", sm: "block" },
                maxWidth: 250,
                lineHeight: 1.2,
                fontSize: "1rem",
                color: "#fff",
                fontWeight: 400,
                fontFamily: "Roboto, Arial, sans-serif",
                whiteSpace: "pre-line",
              }}
            >
              Академия финансового{`\n`}мониторинга
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
