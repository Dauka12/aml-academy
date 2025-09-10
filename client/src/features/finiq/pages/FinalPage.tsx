import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FinalResultsTable } from '../components/FinalResultsTable';

const FinalPage: React.FC = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 4, pb: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          fontWeight="bold"
          sx={{
            mb: 6,
            color: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #1A2751 100%)`,
          }}
        >
        </Typography>
        <FinalResultsTable />
      </Box>
    </Container>
  );
};

export default FinalPage;
