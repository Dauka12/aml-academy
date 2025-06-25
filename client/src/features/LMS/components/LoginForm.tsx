import {
  EmojiEvents as TrophyIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLMSAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const MotionPaper = motion(Paper);

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated, clearError } =
    useLMSAuthStore();

  // Redirect on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/lms/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Show error alert when error state changes
  useEffect(() => {
    if (error) {
      setShowError(true);
      // Auto hide after 6 seconds
      const timer = setTimeout(() => {
        setShowError(false);
        clearError();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Handle error alert close
  const handleCloseError = () => {
    setShowError(false);
    clearError();
  };

  // Clear errors when inputs change
  useEffect(() => {
    if (email) setEmailError("");
    if (password) setPasswordError("");
  }, [email, password]);

  const validateForm = (): boolean => {
    let isValid = true;
    if (!email.trim()) {
      // убираем пробелы в начале и в конце строки и проверяет, пуста ли строка
      setEmailError("Введите почту"); //  ошибка для email
      isValid = false; // флаг валидации как false
    }
    if (!password) {
      setPasswordError("Введите пароль");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await login(email, password);
    }
  };

  const handleGoToRegistration = () => {
    navigate("/lms/register");
  };

  return (
    <div>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{
          p: isMobile ? 3 : 4,
          maxWidth: 450,
          width: "100%",
          borderRadius: 2,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          mx: isMobile ? 2 : 0,
          position: "relative", // Added position relative
          zIndex: 10, // Added z-index to ensure it's above background elements
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TrophyIcon
              sx={{
                fontSize: isMobile ? 50 : 60,
                color: "#f5b207",
                mb: 2,
              }}
            />
          </motion.div>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Вход в систему
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Пожалуйста, введите почту и пароль
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            color="text.secondary"
            sx={{ textAlign: "center", color: "#1976d2", fontWeight: "bold" }}
          >
            {/* {t('login.description')} */}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box mb={2.5}>
            <TextField
              label="Почта"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              disabled={loading}
              autoFocus
              type="email"
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Пароль"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ order: { xs: 1, sm: 2 } }}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    bgcolor: "#1A2751",
                    "&:hover": {
                      bgcolor: "#13203f",
                    },
                    minWidth: "120px",
                  }}
                  startIcon={
                    loading && <CircularProgress size={20} color="inherit" />
                  }
                >
                  {loading ? "Вход..." : "Войти"}
                </Button>
              </motion.div>
            </Box>
          </Box>
        </form>

        <Button
          component={Link}
          to="/lms/register"
          fullWidth
          sx={{
            mt: 3,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Нет аккаунта? Зарегистрируйтесь
        </Button>
      </MotionPaper>
    </div>
  );
};

export default LoginForm;
