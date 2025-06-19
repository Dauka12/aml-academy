import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import FooterSection from "../components/FooterSection";
import { useLocation } from "react-router-dom";

const LMSAuthPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isRegister = params.get("register") === "1";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuthForm initialRegisterMode={isRegister} />
      </Box>
      <FooterSection />
    </Box>
  );
};

export default LMSAuthPage;
