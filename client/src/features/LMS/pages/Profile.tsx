import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import { useLMSAuthStore } from "../store/authStore";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useLMSAuthStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    // password: "", // убрано
    // role: user?.role || "", // убираем роль из формы
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      // password: "", // убрано
      // role: user?.role || "",
    });
    setError("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        id: user.id,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        // password: form.password, // убрано
        // role: form.role, // не отправляем роль
      };
      // Получаем токен из localStorage
      const jwtToken = localStorage.getItem("lmsToken"); // или другое имя, если у тебя другое

      await axios.patch("/api/lms/profile", payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      // Обновляем user в сторе и localStorage
      const updatedUser = { ...user, ...form };
      // if (!form.password) delete updatedUser.password; // убрано
      localStorage.setItem("lmsUser", JSON.stringify(updatedUser));
      window.location.reload(); // или вызвать set({user: updatedUser}) если есть такой метод
    } catch (e: any) {
      setError(e.response?.data?.message || "Ошибка при обновлении профиля");
    } finally {
      setLoading(false);
    }
  };

  console.log("user", user);

  if (!user) {
    return (
      <Box>
        <Typography>Пользователь не найден</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Личный кабинет
      </Typography>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3 }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {user.firstname} {user.lastname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.role}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Контактная информация
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleOpen}>
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать профиль</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Имя"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Фамилия"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          {/*
          <TextField
            margin="dense"
            label="Пароль (оставьте пустым, если не меняете)"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          */}
          {/*
          <TextField
            margin="dense"
            label="Роль"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            disabled
          />
          */}
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={loading} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
