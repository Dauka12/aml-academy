import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const DefaultInput = ({ input, values, handleChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{input.label}</Typography>
      <TextField
        fullWidth
        size="small"
        type={input.type}
        value={values[input.name] || ''}
        onChange={(e) => handleChange(input.name, e.target.value, input.type)}
        variant="outlined"
        multiline={input.type === 'textarea'}
        minRows={input.type === 'textarea' ? 3 : 1}
      />
    </Box>
  );
};

export default DefaultInput;
