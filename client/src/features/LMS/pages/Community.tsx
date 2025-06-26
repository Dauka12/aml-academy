import React from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

const Community: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Сообщество
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Обсуждения
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Что у вас на уме?"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained">Опубликовать</Button>
      </Paper>
    </Box>
  );
};

export default Community;
