import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LMSHomePage from "./pages/LMSHomePage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import UserCourses from "./pages/UserCourses";
import Community from "./pages/Community";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import LMSLayout from "./components/LMSLayout";

const LMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LMSHomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<LMSLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-courses" element={<UserCourses />} />
        <Route path="/community" element={<Community />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default LMSRoutes;
