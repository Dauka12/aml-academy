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
    LinearProgress,
    Fade,
    Alert,
    Stack,
  } from "@mui/material";
  import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
  import ReplayIcon from "@mui/icons-material/Replay";
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
    const [currentQuestion, setCurrentQuestion] = useState(0);

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

    const handleChange = (qId: number, optionId: number) => {
      setAnswers((prev) => ({ ...prev, [qId]: optionId }));
    };

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("lmsToken");
        const res = await axios.post(
          `/api/lms/lms-quizzes/${quizId}/submit`,
          answers,
          { headers: { Authorization: token ? `Bearer ${token}` : undefined } }
        );
        setResult(res.data);
        setSubmitted(true);
      } catch (err) {
        setError("Ошибка при отправке ответов.");
      }
    };

    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    };

    const handlePrev = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion((prev) => prev - 1);
      }
    };

    if (loading)
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress size={48} />
        </Box>
      );

    if (error)
      return (
        <Fade in>
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        </Fade>
      );

    if (submitted && result)
      return (
        <Fade in>
          <Paper
            sx={{ p: 4, mb: 3, maxWidth: 500, mx: "auto", textAlign: "center" }}
          >
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 60, mb: 2 }}
            />
            <Typography variant="h5" sx={{ mb: 2 }}>
              Поздравляем!
            </Typography>
            <Typography fontSize={20} sx={{ mb: 2 }}>
              Ваш результат: <b>{result.user_score}</b> из{" "}
              <b>{result.total_score}</b>
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ReplayIcon />}
              sx={{ mt: 2 }}
              onClick={() => {
                setSubmitted(false);
                setResult(null);
                setAnswers({});
                setCurrentQuestion(0);
              }}
            >
              Пройти ещё раз
            </Button>
          </Paper>
        </Fade>
      );

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const q = questions[currentQuestion];

    return (
      <Fade in>
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            mb: 3,
            maxWidth: 600,
            mx: "auto",
            borderRadius: 4,
            boxShadow: 4,
            background: "#f9fafb",  
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ fontWeight: 700}}>
        Вопрос {currentQuestion + 1} / {questions.length}
      </Typography>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 2,
                background: "#fff",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                {q.text}
              </Typography>
              <RadioGroup
                value={answers[q.id] || ""}
                onChange={(_, value) => handleChange(q.id, Number(value))}
              >
                {q.options.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    value={opt.id}
                    control={
                      <Radio
                        sx={{
                          color: "#2ee59d",
                          "&.Mui-checked": { color: "#193a7a" },
                        }}
                      />
                    }
                    label={opt.text}
                    sx={{
                      borderRadius: 2,
                      px: 1,
                      background:
                        answers[q.id] === opt.id ? "#e3fcec" : "transparent",
                      transition: "background 0.2s",
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
              >
                Предыдущий
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={answers[q.id] === undefined}
                >
                  Следующий
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Отправить
                </Button>
              )}
            </Box>
          </Stack>
        </Paper>
      </Fade>
    );
  };

  export default Quiz;
