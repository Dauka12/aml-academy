import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Fade,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface AuthFormProps {
  initialRegisterMode?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ initialRegisterMode = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(initialRegisterMode);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        px: 3,
        py: 4,
      }}
    >
      <Fade in>
        <Stack spacing={3}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1e3a8a", mb: 1 }}
          >
            {isRegister ? "Регистрация" : "Логин"}
          </Typography>

          <TextField
            fullWidth
            label="Почта"
            placeholder="Введите почтовый адрес"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Пароль"
            placeholder="Введите пароль"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {isRegister && (
            <TextField
              fullWidth
              label="Подтвердите пароль"
              placeholder="Повторите пароль"
              type={showPassword ? "text" : "password"}
              variant="outlined"
            />
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: "999px",
              backgroundColor: "#1e3a8a",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#1e40af",
              },
            }}
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 1.5 }}>
            {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
            <Box
              component="span"
              sx={{
                color: "#1e3a8a",
                fontWeight: 500,
                cursor: "pointer",
                ml: 0.5,
              }}
              onClick={() => setIsRegister((prev) => !prev)}
            >
              {isRegister ? "Войти." : "Создать."}
            </Box>
          </Typography>
        </Stack>
      </Fade>
    </Box>
  );
};

export default AuthForm;
