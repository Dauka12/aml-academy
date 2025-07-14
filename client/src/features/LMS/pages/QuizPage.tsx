import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Question {
  id: number;
  text: string;
  options: { id: number; text: string }[];
}

const QuizPage: React.FC = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    user_score: number;
    total_score: number;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      const token = localStorage.getItem("lmsToken");
      const res = await axios.get(`/api/lms/lms-quizzes/${quizId}/questions`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      setQuestions(res.data);
      setLoading(false);
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (qId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("lmsToken");
    const res = await axios.post(
      `/api/lms/lms-quizzes/${quizId}/submit`,
      { answers },
      { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
    );
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz: {quizId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        {questions.map((question) => (
          <Box key={question.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{question.text}</Typography>
            <RadioGroup
              value={answers[question.id] || ""}
              onChange={(e) =>
                handleChange(question.id, Number(e.target.value))
              }
            >
              {question.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
        <Button variant="contained" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </Paper>
    </Box>
  );
};

export default QuizPage;
