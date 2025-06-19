import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import base_url from "../../../settings/base_url";
import { BuilderNavbar } from "../builderNavbar/BuilderNavbar";

// MUI Components
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";

// MUI Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArchiveIcon from "@mui/icons-material/Archive";
import FolderIcon from "@mui/icons-material/Folder";

// Components
import AddToCourse from "./add-to-course";
import Confirm from "./confirm";
import CourseBlock from "./courseBlock";
import CourseBlockSkeleton from "./courseBlock/CourseBlockSkeleton";
import EventAdminPage from "./event-admin-page";
import NewsList from "./news-list";
import RequestTable from "./requests-to-course";
import StatsPage from "./stats-page";
import VebinarArchivePage from "./vebinar-archive-page";
import VebinarPage from "./vebinar-page";
import Purchases from "./purchases/purchases";

const EditCatalog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [deletingCourse, setDeletingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    course_id: 0,
    course_name: "",
  });
  const [selectedPage, setSelectedPage] = useState("draftPage");
  const [requestData, setRequestData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const fetchDataCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(base_url + "/api/aml/course/editcatalog");
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      showNotification("Ошибка при загрузке курсов", "error");
    }
  }, []);

  useEffect(() => {
    if (selectedPage === "draftPage") {
      fetchDataCourses();
    }
  }, [fetchDataCourses, selectedPage]);

  useEffect(() => {
    axios.get(base_url + "/api/aml/course/getRequest").then((res) => {
      setRequestData(res.data);
    });
  }, []);

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/api/aml/course/getAllNews`,
          {
            params: {
              type: "news",
            },
          }
        );
        setNewsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showNotification("Ошибка при загрузке новостей", "error");
      }
    };
    if (selectedPage === "newsPage") {
      fetchData();
    }
  }, [selectedPage, count]);

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          base_url + "/api/aml/course/getRequest"
        );
        setRequestData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showNotification("Ошибка при загрузке заявок", "error");
      }
    };
    if (selectedPage === "requestPage") {
      fetchData();
    }
  }, [selectedPage]);

  const closeModal = () => {
    setDeletingCourse(false);
  };

  const token = localStorage.getItem("jwtToken");

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/api/aml/course/deleteNews`, {
        headers: {
          Authorizaton: "Bearer " + token,
        },
        params: {
          id: id,
        },
      })
      .then(() => {
        setCount(count + 1);
        showNotification("Новость успешно удалена");
      })
      .catch((error) => {
        console.error(error);
        showNotification("Ошибка при удалении новости", "error");
      });
  };

  const deleteCourse = (course_id) => {
    axios
      .post(base_url + "/api/aml/course/deleteCourse", null, {
        params: {
          id: course_id,
        },
      })
      .then((res) => {
        setCourses(res.data.body);
        setDeletingCourse(false); // Close modal after deletion
        showNotification("Курс успешно удален");
      })
      .catch((error) => {
        console.error(error);
        showNotification("Ошибка при удалении курса", "error");
      });
  };

  const setCourse = (course_id, course_name) => {
    setSelectedCourse({ course_id, course_name });
  };

  const publishCourse = (course_id) => {
    axios
      .post(base_url + "/api/aml/course/publishCourse", null, {
        params: {
          id: course_id,
        },
      })
      .then((res) => {
        showNotification("Курс успешно опубликован");
        fetchDataCourses();
      })
      .catch((error) => {
        console.error(error);
        showNotification("Ошибка при публикации курса", "error");
      });
  };

  const getPageTitle = () => {
    switch (selectedPage) {
      case "draftPage":
        return "Архив курсов";
      case "coursesPage":
        return "Курсы";
      case "newsPage":
        return "Новости";
      case "requestPage":
        return "Заявки на курсы";
      case "VebinarArchivePage":
        return "Архив Вебинаров";
      case "VebinarPage":
        return "Активные Вебинары";
      case "EventPage":
        return "Мероприятия";
      case "StatsPage":
        return "Статистика по сайту";
      case "purchasesPage":
        return "Покупки";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    if (selectedPage === "newsPage") return "Добавить новость";
    if (selectedPage === "requestPage") return null;
    if (selectedPage === "EventPage") return "Создать мероприятие";
    return "Создать курс";
  };

  const handleNavigate = () => {
    if (selectedPage === "newsPage") return navigate("/create-news");
    if (selectedPage === "requestPage") return;
    if (selectedPage === "EventPage") return navigate("/create-event");
    return navigate("/new-admin-page");
  };

  return (
    <Box>
      <BuilderNavbar />
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 130px)",
          overflow: "hidden",
        }}
      >
        {deletingCourse && (
          <Confirm
            course_title={selectedCourse.course_name}
            course_id={selectedCourse.course_id}
            closeModal={closeModal}
            deleteCourse={deleteCourse}
          />
        )}

        <Paper
          elevation={3}
          sx={{
            width: 280,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" color="primary">
            Админ панель
          </Typography>

          <List sx={{ py: 2 }}>
            <ListItem
              button
              selected={selectedPage === "draftPage"}
              onClick={() => setSelectedPage("draftPage")}
              sx={{
                opacity: selectedPage === "draftPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Архив курсов" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "coursesPage"}
              onClick={() => setSelectedPage("coursesPage")}
              sx={{
                opacity: selectedPage === "coursesPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Курсы" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "newsPage"}
              onClick={() => setSelectedPage("newsPage")}
              sx={{
                opacity: selectedPage === "newsPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Новости" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "requestPage"}
              onClick={() => setSelectedPage("requestPage")}
              sx={{
                opacity: selectedPage === "requestPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Заявки" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "VebinarArchivePage"}
              onClick={() => setSelectedPage("VebinarArchivePage")}
              sx={{
                opacity: selectedPage === "VebinarArchivePage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Архив Вебинаров" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "VebinarPage"}
              onClick={() => setSelectedPage("VebinarPage")}
              sx={{
                opacity: selectedPage === "VebinarPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Активные Вебинары" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "EventPage"}
              onClick={() => setSelectedPage("EventPage")}
              sx={{
                opacity: selectedPage === "EventPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Мероприятия" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "StatsPage"}
              onClick={() => setSelectedPage("StatsPage")}
              sx={{
                opacity: selectedPage === "StatsPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Статистика по сайту" />
            </ListItem>

            <ListItem
              button
              selected={selectedPage === "purchasesPage"}
              onClick={() => setSelectedPage("purchasesPage")}
              sx={{
                opacity: selectedPage === "purchasesPage" ? 1 : 0.5,
                "&.Mui-selected": { bgcolor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Покупки" />
            </ListItem>
          </List>

          {getButtonText() && (
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleNavigate}
              sx={{
                bgcolor: "#374761",
                py: 1.5,
                mt: 3,
                borderRadius: 1,
                "&:hover": {
                  bgcolor: "#374761a9",
                },
              }}
            >
              {getButtonText()}
            </Button>
          )}
        </Paper>

        <Box
          sx={{
            flex: 1,
            p: 5,
            overflowY: "auto",
            maxHeight: "calc(100vh - 130px)",
            color: "#374761",
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 500 }}>
              {getPageTitle()}
            </Typography>

            {selectedPage === "StatsPage" ? (
              <StatsPage />
            ) : (
              <Grid container spacing={3}>
                {isLoading ? (
                  [...new Array(12)].map((_, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <CourseBlockSkeleton />
                    </Grid>
                  ))
                ) : selectedPage === "draftPage" ||
                  selectedPage === "coursesPage" ? (
                  courses
                    .filter((x) => x.draft === (selectedPage === "draftPage"))
                    .map((x, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <CourseBlock
                          x={x}
                          index={index}
                          setDeletingCourse={setDeletingCourse}
                          setCourse={setCourse}
                          publishCourse={publishCourse}
                        />
                      </Grid>
                    ))
                ) : selectedPage === "newsPage" ? (
                  <Grid item xs={12}>
                    <NewsList newsData={newsData} handleDelete={handleDelete} />
                  </Grid>
                ) : selectedPage === "requestPage" ? (
                  <Grid item xs={12}>
                    <RequestTable requestData={requestData} />
                  </Grid>
                ) : selectedPage === "VebinarArchivePage" ? (
                  <Grid item xs={12}>
                    <VebinarArchivePage />
                  </Grid>
                ) : selectedPage === "EventPage" ? (
                  <Grid item xs={12}>
                    <EventAdminPage />
                  </Grid>
                ) : selectedPage === "purchasesPage" ? (
                  <Grid item xs={12}>
                    <Purchases />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <VebinarPage />
                  </Grid>
                )}
              </Grid>
            )}

            {(selectedPage === "draftPage" ||
              selectedPage === "coursesPage") && (
              <Box sx={{ mt: 4 }}>
                <AddToCourse />
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default EditCatalog;
