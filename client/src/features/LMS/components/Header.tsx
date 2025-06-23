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
  onProfileClick?: () => void;
}


const Header: React.FC<HeaderProps> = ({ onLogin, user, onProfileClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/lms");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#1e2a55", 
        borderBottom: "1px solid #1e2a55",
        zIndex: 1200, // выше чем Drawer
      
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
            justifyContent: "flex-start",
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
          {/* Если user есть — показываем профиль справа */}
          {user ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: "auto",
                cursor: "pointer",
              }}
              onClick={onProfileClick}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 40, height: 40, mr: 1 }}
              />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography fontWeight={600} color="#fff">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="#fff">
                  {user.role}
                </Typography>
              </Box>
            </Box>
          ) : (
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
                ml: "auto",
                "&:hover": {
                  backgroundColor: "#334155",
                  borderColor: "#ffffffaa",
                },
              }}
            >
              Войти
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
