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
import CourseDetails from "./pages/CourseDetails";
import Instructors from "./pages/Instructors";
import CourseDetailPage from "./pages/CourseDetailPage";
import QuizPage from "./pages/QuizPage";
import QuizResultsPage from "./pages/QuizResultsPage";

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
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/lms/my-courses/:userCourseId" element={<CourseDetailPage />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/courses/:userCourseId" element={<CourseDetailPage />} />
        <Route path="/lms-quizzes/:quizId" element={<QuizPage />} />
        <Route path="/lms-quizzes/:quizId/results" element={<QuizResultsPage />} />
      </Route>
    </Routes>
  );
};

export default LMSRoutes;
