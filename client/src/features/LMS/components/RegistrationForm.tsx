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
import { useNavigate } from "react-router-dom";
import { useLMSAuthStore } from "../store/authStore";
import { getAllCategories } from "../api/examApi";
import { TestCategory } from "../types/testCategory";
import { RegisterStudentRequest } from "../types/student";

const MotionPaper = motion(Paper);

interface FormErrors {
  firstname?: string;
  lastname?: string;
  middlename?: string;
  iin?: string;
  phone?: string;
  university?: string;
  email?: string;
  password?: string;
  studyYear?: number;
  confirmPassword?: string;
  categoryId?: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, error, isAuthenticated, user, login, register, clearError } =
    useLMSAuthStore();

  const [categories, setCategories] = useState<TestCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [formData, setFormData] = useState<
    RegisterStudentRequest & { confirmPassword: string }
  >({
    firstname: "",
    lastname: "",
    middlename: "",
    iin: "",
    phone: "",
    studyYear: 1,
    university: "",
    email: "",
    password: "",
    confirmPassword: "",
    categoryId: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [translatedError, setTranslatedError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate("/lms/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const fetchedCategories = await getAllCategories();
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : []
        );
        if (Array.isArray(fetchedCategories) && fetchedCategories.length > 0) {
          setFormData((prev) => ({
            ...prev,
            categoryId: fetchedCategories[0].id,
          }));
        }
      } catch (error) {
        setCategories([]);
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (error === "Student with this IIN already exists") {
      setTranslatedError("Студент с таким ИИН уже существует в системе");
    } else if (error) {
      setTranslatedError("Ошибка при регистрации");
    } else {
      setTranslatedError(null);
    }
  }, [error]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "Введите имя";
    if (!formData.lastname.trim()) newErrors.lastname = "Введите фамилию";
    if (!formData.iin.trim()) newErrors.iin = "Введите ИИН";
    else if (!/^\d{12}$/.test(formData.iin))
      newErrors.iin = "ИИН должен содержать 12 цифр";

    if (!formData.phone.trim()) newErrors.phone = "Введите телефон";
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Телефон должен содержать от 10 до 15 цифр";

    if (!formData.university.trim())
      newErrors.university = "Введите университет";

    if (!formData.email.trim()) newErrors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Некорректный email";

    if (!formData.password) newErrors.password = "Введите пароль";
    else if (formData.password.length < 6)
      newErrors.password = "Пароль должен быть не менее 6 символов";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Подтвердите пароль";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    if (!formData.categoryId) newErrors.categoryId = "Выберите категорию";

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

  const handleSelectChange = (
    e: SelectChangeEvent<number>,
    child: React.ReactNode
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setTranslatedError(null);
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmSubmit = () => {
    const { confirmPassword, ...registerData } = formData;
    register(registerData);
  };

  const selectedCategoryName =
    Array.isArray(categories) && categories.length > 0
      ? categories.find((cat) => cat.id === formData.categoryId)?.nameRus || ""
      : "";

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      sx={{
        p: isMobile ? 3 : 4,
        maxWidth: 800,
        width: "100%",
        bgcolor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 2,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        mx: isMobile ? 2 : 0,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={isMobile ? 3 : 4}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <EmojiEventsIcon
            sx={{
              fontSize: isMobile ? 50 : 60,
              color: "#f5b207",
              mb: 2,
            }}
          />
        </motion.div>
        <Typography
          component="h1"
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: 700,
            color: "#1A2751",
            textAlign: "center",
            mb: 1,
          }}
        >
          Регистрация
        </Typography>
        <Typography
          variant={isMobile ? "body2" : "subtitle1"}
          sx={{
            color: "text.secondary",
            textAlign: "center",
            maxWidth: "95%",
          }}
        >
          Пожалуйста, заполните форму для регистрации
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Фамилия"
              name="lastname"
              variant="outlined"
              value={formData.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Имя"
              name="firstname"
              variant="outlined"
              value={formData.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
              helperText={errors.firstname}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Отчество"
              name="middlename"
              variant="outlined"
              value={formData.middlename}
              onChange={handleChange}
              error={!!errors.middlename}
              helperText={errors.middlename}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ИИН"
              name="iin"
              variant="outlined"
              value={formData.iin}
              onChange={handleChange}
              error={!!errors.iin}
              helperText={errors.iin}
              disabled={loading}
              inputProps={{ maxLength: 12 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Телефон"
              name="phone"
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              disabled={loading}
              placeholder="+7 (XXX) XXX-XX-XX"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              error={!!errors.studyYear}
              disabled={loading}
            >
              <InputLabel id="studyYear-label">Курс</InputLabel>
              <Select
                labelId="studyYear-label"
                id="studyYear"
                name="studyYear"
                value={formData.studyYear}
                onChange={handleSelectChange}
                label="Курс"
              >
                {[1, 2, 3, 4].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.studyYear && (
                <FormHelperText>{errors.studyYear}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Университет"
              name="university"
              variant="outlined"
              value={formData.university}
              onChange={handleChange}
              error={!!errors.university}
              helperText={errors.university}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Подтвердите пароль"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
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
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={!!errors.categoryId}
              disabled={loading || loadingCategories}
            >
              <InputLabel id="category-label">Категория</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleSelectChange}
                label="Категория"
              >
                {loadingCategories ? (
                  <MenuItem value={0} disabled>
                    Загрузка...
                  </MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.nameRus}
                    </MenuItem>
                  ))
                )}
              </Select>
              {errors.categoryId && (
                <FormHelperText>{errors.categoryId}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        {(error || translatedError) && (
          <Box mt={2}>
            <FormHelperText error>{translatedError || error}</FormHelperText>
          </Box>
        )}

        <Box
          mt={4}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/lms/login")}
            disabled={loading}
            sx={{
              borderColor: "#1A2751",
              color: "#1A2751",
              "&:hover": {
                borderColor: "#1A2751",
                backgroundColor: "rgba(26, 39, 81, 0.04)",
              },
              px: 4,
              py: 1,
            }}
          >
            Уже есть аккаунт?
          </Button>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: "#1A2751",
                "&:hover": {
                  bgcolor: "#13203f",
                },
                px: 4,
                py: 1,
              }}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              {loading
                ? "Регистрируем..."
                : isAuthenticated
                ? "Успешно!"
                : "Зарегистрироваться"}
            </Button>
          </motion.div>
        </Box>
      </form>
    </MotionPaper>
  );
};

export default RegistrationForm;
