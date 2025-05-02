import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

const TableInput = ({ 
  name, 
  label, 
  values, 
  handleInputChangeTable1, 
  handleAddToTable,
  handleRemoveFromTable 
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>{label}</Typography>
      {values[name]?.map((row, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TextField
            size="small"
            value={row.first || ''}
            onChange={(e) => handleInputChangeTable1(index, e.target.value, 'first')}
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            value={row.second || ''}
            onChange={(e) => handleInputChangeTable1(index, e.target.value, 'second')}
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <IconButton 
            color="error" 
            onClick={() => handleRemoveFromTable(name, index)}
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
          onClick={() => handleAddToTable(name)}
        >
          Добавить
        </Button>
      </Box>
    </Box>
  );
};

export default TableInput;
