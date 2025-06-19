import React from "react";
import { Box, Container, Typography } from "@mui/material";

const FooterSection: React.FC = () => (
  <Box sx={{ bgcolor: "#1e2a55", color: "#fff", py: 4, mt: "auto" }}>
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        LMS Academy © {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" sx={{ mt: { xs: 2, sm: 0 } }}>
        Контакты: info@lms-academy.kz
      </Typography>
    </Container>
  </Box>
);

export default FooterSection;
