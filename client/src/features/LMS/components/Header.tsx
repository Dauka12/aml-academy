import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

interface HeaderProps {
  onLogin?: () => void;
  user?: { name: string; role: string; avatar: string };
}

const Header: React.FC<HeaderProps> = ({ onLogin, user }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/lms/dashboard");
  };
  const handleProfileClick = () => {
    navigate("/lms/profile");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#1e2a55",
        borderBottom: "1px solid #1e2a55",
        zIndex: 1200,
        minHeight: 80,
      }}
      component={motion.div}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 90,
          px: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
        >
          <Box
            component="img"
            src={logo}
            alt="Академия финансового мониторинга"
            sx={{
              width: 60,
              height: 60,
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
        {/* Если user есть — показываем профиль справа */}
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "background 0.2s",
              borderRadius: 3,
              px: 2,
              py: 1,
              "&:hover": {
                background: "rgba(51,65,85,0.12)",
              },
            }}
            onClick={handleProfileClick}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 60,
                height: 60,
                mr: 1.5,
                boxShadow: "0 2px 8px 0 rgba(30,42,85,0.10)",
              }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={700} color="#fff" fontSize={18}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="#fff" fontSize={15}>
                {user.role}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={onLogin}
            sx={{
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: 16,
              textTransform: "none",
              px: 4,
              py: 1.5,
              color: "#fff",
              background: "linear-gradient(90deg, #334155 60%, #1e2a55 100%)",
              boxShadow: "0 2px 8px 0 rgba(30,42,85,0.10)",
              transition: "0.3s",
              "&:hover": {
                background: "#23336a",
                boxShadow: "0 4px 16px 0 rgba(30,42,85,0.18)",
              },
            }}
          >
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
