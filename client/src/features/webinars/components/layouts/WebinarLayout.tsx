import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

interface WebinarLayoutProps {
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  withPaper?: boolean;
}

const WebinarLayout: React.FC<WebinarLayoutProps> = ({
  children,
  title = 'Вебинары',
  maxWidth = false,
  withPaper = false
}) => {
  // В реальном приложении здесь бы обновлялся заголовок страницы

  return (
    <Box sx={{ py: 2 }}>
      {title && (
        <Container maxWidth={maxWidth || "lg"} sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Container>
      )}
      
      <Container maxWidth={maxWidth || "lg"}>
        {withPaper ? (
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 2,
              boxShadow: 2
            }}
          >
            {children}
          </Paper>
        ) : (
          children
        )}
      </Container>
    </Box>
  );
};

export default WebinarLayout;
