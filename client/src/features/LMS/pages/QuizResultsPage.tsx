import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Ожидаем, что результат передан через state
  const { user_score, total_score } = location.state || {};

  if (user_score === undefined) {
    return <Typography>Нет данных о результате.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5">Результат</Typography>
      <Typography>Ваши баллы: {user_score} из {total_score}</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
        Назад к курсу
      </Button>
    </Box>
  );
};

export default QuizResultsPage;