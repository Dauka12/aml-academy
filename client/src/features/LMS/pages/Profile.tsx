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

const Profile: React.FC = () => {
  const { user } = useLMSAuthStore();

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
              src="https://i.pravatar.cc/150?img=3"
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {user.firstname} {user.lastname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Студент
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
          <Button variant="contained" sx={{ mt: 3 }}>
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
