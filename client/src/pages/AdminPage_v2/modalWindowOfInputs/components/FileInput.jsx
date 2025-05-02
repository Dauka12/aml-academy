import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

const FileInput = ({ input, values, handleChange }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      handleChange(input.name, file, input.type);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{input.label}</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Выбрать файл
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {fileName || 'Файл не выбран'}
        </Typography>
      </Box>

      {values[input.name] && (
        <Box sx={{ mt: 2, maxWidth: 300, maxHeight: 200, overflow: 'hidden' }}>
          <img 
            src={values[input.name]} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FileInput;
