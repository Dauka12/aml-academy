import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

const ListInput = ({ name, label, values, handleInputChange, handleAddToList, handleRemoveFromList }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {values[name]?.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={item || ''}
              onChange={(e) => handleInputChange(index, e.target.value, name)}
              variant="outlined"
            />
            <IconButton 
              color="error" 
              onClick={() => handleRemoveFromList(name, index)}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ mt: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => handleAddToList(name)}
          >
            Добавить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ListInput;
