import React from "react";
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";

const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Настройки
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Уведомления
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Email-уведомления"
          />
          <FormControlLabel
            control={<Switch />}
            label="Push-уведомления в браузере"
          />
        </FormGroup>
        <Button variant="contained" sx={{ mt: 3 }}>
          Сохранить изменения
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;
