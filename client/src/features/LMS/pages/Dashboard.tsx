import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import ProfileDrawer from "../components/ProfileDrawer";
import { useLMSAuthStore } from "../store/authStore";

const drawerWidth = 240;

const navItems = [
  { text: "Главная", icon: <HomeIcon />, path: "/lms/dashboard" },
  { text: "Все курсы", icon: <SchoolIcon />, path: "/lms/courses" },
  { text: "Мои курсы", icon: <BookIcon />, path: "/lms/my-courses" },
  {
    text: "Сертификаты",
    icon: <CardMembershipIcon />,
    path: "/lms/certificates",
  },
  { text: "Новости", icon: <NewspaperIcon />, path: "/lms/news" },
];

const stats = [
  { label: "Мои курсы", value: 8, color: "#2563eb" },
  { label: "Уведомления", value: 3, color: "#ff9800" },
  { label: "Завершено", value: 5, color: "#43a047" },
];

const activities = [
  { time: "10:30", text: "Вы прошли тест по курсу 'Основы AML'" },
  { time: "09:15", text: "Добавлен новый курс 'Финансовый мониторинг'" },
  { time: "Вчера", text: "Вы записались на курс 'KYC-процедуры'" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const { user: authUser, isAuthenticated, logout } = useLMSAuthStore();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/lms/login");
    }
  }, [isAuthenticated, navigate]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);
  const handleLogout = () => {
    logout();
    navigate("/lms");
  };

  if (!authUser) {
    return null; // или компонент загрузки
  }

  const user = {
    name: `${authUser.firstname} ${authUser.lastname}`,
    role: "Студент",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ py: 3, justifyContent: "center" }}></Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, mt: 2 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor:
                location.pathname === item.path ? "#e7f0fd" : "transparent",
              "&:hover": { bgcolor: "#f4f7fe" },
              transition: "background 0.2s",
              px: 2,
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? "#2563eb" : "#7b91b6",
                minWidth: 38,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 700 : 500,
                fontSize: 16,
                color: location.pathname === item.path ? "#2563eb" : "#293550",
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ mt: "auto" }} />
      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            mt: 2,
            mx: 2,
            color: "#e53e3e",
            "&:hover": { bgcolor: "#ffeaea" },
          }}
        >
          <ListItemIcon sx={{ color: "#e53e3e" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Выйти" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f4f7fe",
      }}
    >
      {/* Header */}
      <Header user={user} onProfileClick={handleProfileOpen} />
      <Box sx={{ display: "flex", flex: 1, marginTop: "90px" }}>
        {/* Навбар */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            zIndex: 1100,
          }}
          aria-label="sidebar"
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  background: "#fff",
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  background: "#fff",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        {/* Контент */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Статистика */}
          <Grid container spacing={3} mb={3}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={4} key={stat.label}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    bgcolor: "#fff",
                    boxShadow: "0 2px 12px 0 rgba(37,99,235,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: 130,
                    transition: "transform 0.18s",
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.03)",
                      boxShadow: "0 4px 24px 0 rgba(37,99,235,0.10)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color={stat.color}
                    sx={{ letterSpacing: 0.4, mb: 1.2, fontSize: 15 }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="h3" fontWeight={800} color="#223067">
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Последние активности */}
          <Box>
            <Typography variant="h6" fontWeight={700} mb={2} color="#223067">
              Последние активности
            </Typography>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: "0 2px 12px 0 rgba(37,99,235,0.06)",
                p: 3,
                minHeight: 120,
              }}
            >
              {activities.map((activity, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: idx !== activities.length - 1 ? 2 : 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="#7b91b6"
                    sx={{ minWidth: 70, fontWeight: 600, fontSize: 14 }}
                  >
                    {activity.time}
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 2, color: "#293550" }}>
                    {activity.text}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Box>
          {/* Профильная боковая панель */}
          <ProfileDrawer
            open={profileOpen}
            onClose={handleProfileClose}
            user={user}
            onLogout={handleLogout}
          />
        </Box>
      </Box>
      {/* Кнопка меню на мобиле */}
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 12,
            zIndex: 1201,
            background: "#2563eb",
            color: "#fff",
            boxShadow: "0 4px 16px 0 rgba(37,99,235,0.15)",
            "&:hover": { background: "#1749b1" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default Dashboard;
