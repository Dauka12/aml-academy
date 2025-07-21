import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Button,
  Rating,
  Tooltip,
  Paper,
  Divider,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Instructor = {
  instructor_id: number;
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
  experience_years: number;
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const Instructors: React.FC = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/lms/instructors")
      .then((res) => setInstructors(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        color="#1e2a55"
        sx={{ mb: 4, textAlign: "center", letterSpacing: 1 }}
      >
        Преподаватели
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {instructors.map((inst) => (
          <Grid item xs={12} sm={6} md={4} key={inst.instructor_id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.05)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 4, flexGrow: 1 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: stringToColor(
                      `${inst.firstname} ${inst.lastname}`
                    ),
                    mb: 2,
                    mx: "auto",
                    fontSize: "2rem",
                  }}
                  alt={`${inst.firstname} ${inst.lastname}`}
                />
                <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                  {inst.firstname} {inst.lastname}
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={2}>
                  Преподаватель
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 40 }}
                >
                  {inst.bio || "Специалист в области финансового мониторинга."}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Stack
                  spacing={1.5}
                  sx={{
                    alignItems: "flex-start",
                    display: "inline-flex",
                    textAlign: "left",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <EmailOutlinedIcon color="action" />
                    <Typography variant="body2">{inst.email}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <AccessTimeIcon color="action" />
                    <Typography variant="body2">
                      Опыт: {inst.experience_years} лет
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <StarIcon color="action" />
                    <Typography variant="body2">Рейтинг: 4.8</Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 3,
                    fontWeight: 700,
                    background:
                      "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                    boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
                    transition: "0.2s",
                    "&:hover": {
                      boxShadow: "0 4px 16px 0 rgba(37,99,235,0.18)",
                    },
                  }}
                  onClick={() =>
                    navigate(`/lms/instructors/${inst.instructor_id}`)
                  }
                >
                  Подробнее
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Instructors;
