import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Quiz {
  id: number;
  title: string;
}
interface Module {
  id: number;
  title: string;
  quizzes: Quiz[];
}

const CourseDetailPage: React.FC = () => {
  const { userCourseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      const token = localStorage.getItem("lmsToken");
      const res = await axios.get(
        `/api/lms/lms-courses/${userCourseId}/modules`,
        {
          headers: { Authorization: token ? `Bearer ${token}` : undefined },
        }
      );
      setModules(res.data);
      setLoading(false);
    };
    fetchModules();
  }, [userCourseId]);

  if (loading) return <CircularProgress />;

  return (
    <Box display="flex">
      <Box width={300} mr={4}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Модули и квизы
        </Typography>
        <List>
          {modules.map((mod) => (
            <React.Fragment key={mod.id}>
              <Typography sx={{ fontWeight: 600, mt: 2 }}>
                {mod.title}
              </Typography>
              {mod.quizzes.map((quiz) => (
                <ListItemButton
                  key={quiz.id}
                  onClick={() => navigate(`/lms-quizzes/${quiz.id}`)}
                  sx={{ pl: 3 }}
                >
                  {quiz.title}
                </ListItemButton>
              ))}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Box flex={1}>
        <Typography variant="h5">Выберите квиз слева</Typography>
      </Box>
    </Box>
  );
};

export default CourseDetailPage;
