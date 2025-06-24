import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm.tsx";

const Login: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetStatus, setResetStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPasswordOpen = () => {
    setOpenForgotPassword(true);
    setResetStatus({});
  };

  const handleForgotPasswordClose = () => {
    setOpenForgotPassword(false);
    setEmail("");
    setPassword("");
    setResetStatus({});
  };

  const handleForgotPasswordSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axios.post("/lms/forgot-password", {
        email,
        password,
      });
      setResetStatus({
        success: true,
        message:
          "Инструкции по сбросу пароля были отправлены на вашу электронную почту.",
      });
    } catch (error: any) {
      setResetStatus({
        success: false,
        message:
          error.response?.data?.message ||
          "Не удалось сбросить пароль. Пожалуйста, проверьте введенные данные и попробуйте снова.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          py: 5,
          backgroundImage: "linear-gradient(135deg, #1A2751 0%, #13203f 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle, transparent 20%, #1A2751 80%)",
            opacity: 0.6,
            zIndex: 1, // Explicitly set a low z-index for the background
          }}
        />

        <Box sx={{ position: "relative", zIndex: 10 }}></Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginForm />
          <Button
            sx={{ mt: 2, color: "#fff", textDecoration: "underline" }}
            onClick={handleForgotPasswordOpen}
          >
            Забыли пароль?
          </Button>
        </Box>

        {/* Forgot Password Dialog */}
        <Dialog
          open={openForgotPassword}
          onClose={handleForgotPasswordClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Сброс пароля</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              Пожалуйста, введите ваш email и новый пароль для сброса
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Новый пароль"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {resetStatus.message && (
              <Alert
                severity={resetStatus.success ? "success" : "error"}
                sx={{ mt: 2 }}
              >
                {resetStatus.message}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleForgotPasswordClose}>Отмена</Button>
            <Button
              onClick={handleForgotPasswordSubmit}
              disabled={isSubmitting}
              variant="contained"
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Сбросить"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Login;
