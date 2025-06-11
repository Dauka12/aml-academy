import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// Component for handling simple array inputs where values are separated by commas
const ArrayInput = ({ name, label, value, onChange, helperText }) => {
  // Handle different formats of the input value - could be strings, objects, or mixed
  const formatArrayToString = (arrayValue) => {
    if (!Array.isArray(arrayValue)) return '';
    
    return arrayValue.map(item => {
      // If item is an object with a 'tab' or 'tabName' property (from existing structures)
      if (item && typeof item === 'object') {
        return item.tabName || item.tab || JSON.stringify(item);
      }
      // Otherwise, just return the item as a string
      return String(item);
    }).join(', ');
  };

  // Convert array to comma-separated string for editing
  const [inputValue, setInputValue] = useState(formatArrayToString(value));

  // Update component state when external value changes
  useEffect(() => {
    setInputValue(formatArrayToString(value));
  }, [value]);

  // Handle input change and convert back to array
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Convert the comma-separated string to an array, trim each item
    const arrayValue = newValue
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    onChange(arrayValue);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        name={name}
        value={inputValue}
        onChange={handleChange}
        variant="outlined"
        helperText={helperText || 'Введите значения через запятую (например: Раздел 1, Раздел 2, Раздел 3)'}
        placeholder="Значение 1, Значение 2, Значение 3..."
      />
    </Box>
  );
};

export default ArrayInput;
