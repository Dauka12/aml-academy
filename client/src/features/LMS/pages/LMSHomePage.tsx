import React from "react";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AdvantagesSection from "../components/AdvantagesSection";
import FooterSection from "../components/FooterSection";

const LMSHomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToAuth = () => {
    navigate("/lms/login");
  };
  const handleGoToRegister = () => {
    navigate("/lms/login?register=1");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header onLogin={handleGoToAuth} />
      <Container maxWidth="md">
        <HeroSection onLogin={handleGoToAuth} onRegister={handleGoToRegister} />
      </Container>
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <AdvantagesSection />
      </Container>
      <FooterSection />
    </Box>
  );
};

export default LMSHomePage;
