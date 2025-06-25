import React from "react";
import {
  Drawer,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  onLogout?: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  open,
  onClose,
  user,
  onLogout,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 320, p: 0, boxSizing: "border-box" },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <Box sx={{ alignSelf: "flex-end", mb: 2 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 80, height: 80, mb: 2 }}
        />
        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {user.role}
        </Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        {/* больше информации о юзере */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<ExitToAppIcon />}
          onClick={onLogout}
          sx={{ mt: "auto", borderRadius: 3, fontWeight: 600 }}
          fullWidth
        >
          Выйти
        </Button>
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;
