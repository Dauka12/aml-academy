import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LMSHomePage from "./pages/LMSHomePage";
import Dashboard from "./pages/Dashboard";

const LMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LMSHomePage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default LMSRoutes;
