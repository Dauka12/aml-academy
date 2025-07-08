import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useLMSAuthStore } from "../store/authStore";


const MotionPaper = motion(Paper);

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, error, isAuthenticated, user, login, register, clearError } =
    useLMSAuthStore();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [translatedError, setTranslatedError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    // Этот хук больше не нужен, так как регистрация не приводит к аутентификации
    // if (isAuthenticated) { ... }
  }, []);

  useEffect(() => {
    if (error) {
      setTranslatedError("Ошибка при регистрации");
    } else {
      setTranslatedError(null);
    }
  }, [error]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "Введите имя";
    if (!formData.lastname.trim()) newErrors.lastname = "Введите фамилию";
    if (!formData.email.trim()) newErrors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Некорректный email";
    if (!formData.password) newErrors.password = "Введите пароль";
    else if (formData.password.length < 4)
      newErrors.password = "Пароль должен быть не менее 4 символов"; // later change
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Подтвердите пароль";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      clearError();
      const { confirmPassword, ...registerData } = formData;
      try {
        await register(registerData);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/lms/login");
        }, 2000); // Перенаправление на логин через 2 секунды
      } catch (e) {
        // Ошибка уже установлена в store, хук useEffect ее отобразит
        console.error("Registration failed", e);
      }
    }
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
          position: "relative",
          zIndex: 10,
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
            <EmojiEventsIcon
              sx={{ fontSize: isMobile ? 50 : 60, color: "#f5b207", mb: 2 }}
            />
          </motion.div>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Регистрация в LMS
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box mb={2.5}>
            <TextField
              label="Имя"
              name="firstname"
              variant="outlined"
              fullWidth
              value={formData.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              helperText={errors.firstname}
              disabled={loading}
              autoFocus
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              label="Фамилия"
              name="lastname"
              variant="outlined"
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
              disabled={loading}
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              label="E-mail"
              name="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              type="email"
            />
          </Box>
          <Box mb={2.5}>
            <TextField
              label="Пароль"
              name="password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
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
          <Box mb={3}>
            <TextField
              label="Подтвердите пароль"
              name="confirmPassword"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ fontWeight: 600, py: 1.5, fontSize: 16 }}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {loading
              ? "Регистрация..."
              : registrationSuccess
              ? "Успешно!"
              : "Зарегистрироваться"}
          </Button>
          {translatedError && !registrationSuccess && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
          {registrationSuccess && (
            <Typography
              color="success.main"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Вы успешно зарегистрированы! Перенаправляем на страницу входа...
            </Typography>
          )}
        </form>
        <Button
          component={RouterLink}
          to="/lms/login"
          fullWidth
          sx={{
            mt: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Уже есть аккаунт? Войти
        </Button>
      </MotionPaper>
    </div>
  );
};

export default RegisterForm;
