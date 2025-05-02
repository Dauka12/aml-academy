import { Box, Card, CardContent, Skeleton } from '@mui/material';
import React from 'react';

const CourseBlockSkeleton = () => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      borderRadius: 2,
      boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.13)'
    }}>
      <Skeleton variant="rectangular" height={230} animation="wave" />
      <CardContent>
        <Skeleton animation="wave" height={40} sx={{ mb: 1 }} />
        <Skeleton animation="wave" height={20} width="60%" />
        <Skeleton animation="wave" height={20} width="80%" sx={{ mt: 1 }} />
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton animation="wave" height={40} width={40} sx={{ borderRadius: '50%', mr: 1 }} />
        <Skeleton animation="wave" height={40} width={40} sx={{ borderRadius: '50%', mr: 1 }} />
        <Skeleton animation="wave" height={40} width={120} />
      </Box>
    </Card>
  );
};

export default CourseBlockSkeleton;