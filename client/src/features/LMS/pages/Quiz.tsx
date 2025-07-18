import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface QuizResult {
  user_score: number;
  total_score: number;
}

const Quiz = ({ quizId }: { quizId: number }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("lmsToken");
        const res = await axios.get(
          `/api/lms/lms-quizzes/${quizId}/questions`,
          {
            headers: { Authorization: token ? `Bearer ${token}` : undefined },
          }
        );
        setQuestions(res.data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить вопросы.");
      } finally {
        setLoading(false);
      }
    };
    if (quizId) fetchQuestions();
  }, [quizId]);

  const handleChange = (qId, optionId) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("lmsToken");
      const res = await axios.post(
        `/api/lms/lms-quizzes/${quizId}/submit`,
         answers ,
        { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
      );
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      setError("Ошибка при отправке ответов.");
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (submitted && result)
    return (
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Результат
        </Typography>
        <Typography>
          Ваши баллы: {result.user_score} из {result.total_score}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setSubmitted(false)}
        >
          Пройти ещё раз
        </Button>
      </Paper>
    );

  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Тест
      </Typography>
      {questions.map((q) => (
        <Box key={q.id} sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1 }}>{q.text}</Typography>
          <RadioGroup
            value={answers[q.id] || ""}
            onChange={(_, value) => handleChange(q.id, Number(value))}
          >
            {q.options.map((opt) => (
              <FormControlLabel
                key={opt.id}
                value={opt.id}
                control={<Radio />}
                label={opt.text}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={Object.keys(answers).length !== questions.length}
      >
        Отправить
      </Button>
    </Paper>
  );
};

export default Quiz;
