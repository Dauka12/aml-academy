import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LMSHomePage = lazy(() => import("./pages/LMSHomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Courses = lazy(() => import("./pages/Courses"));
const UserCourses = lazy(() => import("./pages/UserCourses"));
const Community = lazy(() => import("./pages/Community"));
const Help = lazy(() => import("./pages/Help"));
const Settings = lazy(() => import("./pages/Settings"));
const LMSLayout = lazy(() => import("./components/LMSLayout"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Instructors = lazy(() => import("./pages/Instructors"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const QuizResultsPage = lazy(() => import("./pages/QuizResultsPage"));
const CourseContent = lazy(() => import("./pages/CourseContent"));

const LMSRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LMSHomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content/:userCourseId" element={<CourseContent />} />
        <Route element={<LMSLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/my-courses" element={<UserCourses />} />
          <Route path="/community" element={<Community />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route
            path="/lms/my-courses/:userCourseId"
            element={<CourseDetailPage />}
          />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/courses/:userCourseId" element={<CourseDetailPage />} />
          <Route
            path="/lms-quizzes/:quizId/results"
            element={<QuizResultsPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default LMSRoutes;
