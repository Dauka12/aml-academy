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
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Instructor = {
  instructor_id: number;
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
  experience_years: number;
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
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3e9f7 100%)",
        py: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        color="primary.main"
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
                boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
                p: 2,
                transition: "0.2s",
                "&:hover": {
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                  transform: "translateY(-4px) scale(1.03)",
                },
                minHeight: 340,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                  <Avatar
                    alt={`${inst.firstname} ${inst.lastname}`}
                    src={`https://i.pravatar.cc/150?img=${inst.instructor_id}`}
                    sx={{ width: 64, height: 64, boxShadow: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                      {inst.firstname} {inst.lastname}
                    </Typography>
                    <Chip
                      icon={<SchoolIcon />}
                      label={`${inst.firstname} ${inst.lastname}`}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Email: {inst.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Опыт: {inst.experience_years} лет
                    </Typography>
                  </Box>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 48 }}
                >
                  {inst.bio}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating
                    value={4.8}
                    precision={0.1}
                    readOnly
                    icon={<StarIcon fontSize="inherit" color="primary" />}
                    emptyIcon={<StarIcon fontSize="inherit" color="disabled" />}
                  />
                  <Typography variant="body2" color="text.secondary">
                    4.8
                  </Typography>
                </Stack>
              </CardContent>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 3,
                  fontWeight: 700,
                  px: 3,
                  background:
                    "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                  boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
                  transition: "0.2s",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)",
                    boxShadow: "0 4px 16px 0 rgba(37,99,235,0.18)",
                  },
                  mt: 2,
                }}
                onClick={() =>
                  navigate(`/lms/instructors/${inst.instructor_id}`)
                }
              >
                Подробнее
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Instructors;
