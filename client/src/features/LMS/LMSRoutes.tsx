import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LMSHomePage from "./pages/LMSHomePage";

const LMSRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LMSHomePage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<LMSHomePage />} />
    </Routes>
  );
};

export default LMSRoutes;
