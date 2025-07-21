import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLMSAuthStore } from "../store/authStore";

const drawerWidth = 240;

const LMSLayout: React.FC = () => {
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
    return null;
  }

  const user = {
    name: `${authUser.firstname} ${authUser.lastname}`,
    role: authUser.role,
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ py: 4, justifyContent: "center" }}></Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, mt: 2 }}>
        <ListItemButton
          selected={location.pathname === "/lms/profile"}
          onClick={() => navigate("/lms/profile")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor:
              location.pathname === "/lms/profile" ? "#e7f0fd" : "transparent",
            "&:hover": { bgcolor: "#f4f7fe" },
            transition: "background 0.2s",
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === "/lms/profile" ? "#2563eb" : "#7b91b6",
              minWidth: 38,
            }}
          >
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Личный кабинет"
            primaryTypographyProps={{
              fontWeight: location.pathname === "/lms/profile" ? 700 : 500,
              fontSize: 16,
              color:
                location.pathname === "/lms/profile" ? "#2563eb" : "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={location.pathname === "/lms/dashboard"}
          onClick={() => navigate("/lms/dashboard")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor:
              location.pathname === "/lms/dashboard"
                ? "#e7f0fd"
                : "transparent",
            "&:hover": { bgcolor: "#f4f7fe" },
            transition: "background 0.2s",
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === "/lms/dashboard" ? "#2563eb" : "#7b91b6",
              minWidth: 38,
            }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Главная"
            primaryTypographyProps={{
              fontWeight: location.pathname === "/lms/dashboard" ? 700 : 500,
              fontSize: 16,
              color:
                location.pathname === "/lms/dashboard" ? "#2563eb" : "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={location.pathname === "/lms/instructors"}
          onClick={() => navigate("/lms/instructors")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor:
              location.pathname === "/lms/instructors"
                ? "#e7f0fd"
                : "transparent",
            "&:hover": { bgcolor: "#f4f7fe" },
            transition: "background 0.2s",
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === "/lms/instructors"
                  ? "#2563eb"
                  : "#7b91b6",
              minWidth: 38,
            }}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Преподаватели"
            primaryTypographyProps={{
              fontWeight: location.pathname === "/lms/instructors" ? 700 : 500,
              fontSize: 16,
              color:
                location.pathname === "/lms/instructors"
                  ? "#2563eb"
                  : "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={location.pathname === "/lms/courses"}
          onClick={() => navigate("/lms/courses")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor:
              location.pathname === "/lms/courses" ? "#e7f0fd" : "transparent",
            "&:hover": { bgcolor: "#f4f7fe" },
            transition: "background 0.2s",
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === "/lms/courses" ? "#2563eb" : "#7b91b6",
              minWidth: 38,
            }}
          >
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary="Все курсы"
            primaryTypographyProps={{
              fontWeight: location.pathname === "/lms/courses" ? 700 : 500,
              fontSize: 16,
              color:
                location.pathname === "/lms/courses" ? "#2563eb" : "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={location.pathname === "/lms/my-courses"}
          onClick={() => navigate("/lms/my-courses")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor:
              location.pathname === "/lms/my-courses"
                ? "#e7f0fd"
                : "transparent",
            "&:hover": { bgcolor: "#f4f7fe" },
            transition: "background 0.2s",
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === "/lms/my-courses" ? "#2563eb" : "#7b91b6",
              minWidth: 38,
            }}
          >
            <BookIcon />
          </ListItemIcon>
          <ListItemText
            primary="Мои курсы"
            primaryTypographyProps={{
              fontWeight: location.pathname === "/lms/my-courses" ? 700 : 500,
              fontSize: 16,
              color:
                location.pathname === "/lms/my-courses" ? "#2563eb" : "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          selected={location.pathname === "/lms/community"}
          onClick={() => navigate("/lms/community")}
          sx={{
            borderRadius: 2,
            mb: 1,
            bgcolor:
              location.pathname === "/lms/community"
                ? "#e7f0fd"
                : "transparent",
            "&:hover": { bgcolor: "#f4f7fe" },
            transition: "background 0.2s",
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === "/lms/community" ? "#2563eb" : "#7b91b6",
              minWidth: 38,
            }}
          >
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Community"
            primaryTypographyProps={{
              fontWeight: location.pathname === "/lms/community" ? 700 : 500,
              fontSize: 16,
              color:
                location.pathname === "/lms/community" ? "#2563eb" : "#293550",
            }}
          />
        </ListItemButton>
      </List>
      <Divider sx={{ mt: "auto" }} />
      <List>
        <ListItemButton
          onClick={() => navigate("/lms/help")}
          sx={{
            borderRadius: 2,
            mt: 2,
            mx: 2,
            "&:hover": { bgcolor: "#f4f7fe" },
          }}
        >
          <ListItemIcon sx={{ color: "#7b91b6" }}>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText
            primary="Помощь"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: 16,
              color: "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/lms/settings")}
          sx={{
            borderRadius: 2,
            mx: 2,
            "&:hover": { bgcolor: "#f4f7fe" },
          }}
        >
          <ListItemIcon sx={{ color: "#7b91b6" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Настройки"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: 16,
              color: "#293550",
            }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
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
      <Header user={user} />
      <Box sx={{ display: "flex", flex: 1, paddingTop: "92px" }}>
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
                  zIndex: 1201,
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
                  zIndex: 1100,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            paddingTop: "92px",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>

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

export default LMSLayout;
