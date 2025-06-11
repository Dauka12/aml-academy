import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import ColorPickerInput from './ColorPickerInput';
import FormattableTextarea from './FormattableTextarea';

// Component for handling complex structured inputs
const ComplexInput = ({ name, label, value, onChange, structure }) => {
  // Get the tabs value from the parent form (for DropDownTextWithTabs component)
  const [availableTabs, setAvailableTabs] = useState([]);
  const isTabsData = name === 'tabsData';

  // Get the tabs array from the parent component's values
  useEffect(() => {
    // Try to get the tabs value from the parent component
    // This is specific to DropDownTextWithTabs where tabsData needs to sync with tabs
    const parentForm = document.querySelector('form');
    if (parentForm && isTabsData) {
      // Look for the tabs input which is a text field with comma-separated values
      const tabsInput = parentForm.querySelector('input[name="tabs"]');
      if (tabsInput) {
        const tabsValue = tabsInput.value;
        const tabsArray = tabsValue
          .split(',')
          .map(tab => tab.trim())
          .filter(tab => tab.length > 0);
        
        setAvailableTabs(tabsArray);
      }
    }
  }, [isTabsData]);

  // Initialize with empty array if no value
  const [items, setItems] = useState(Array.isArray(value) ? value : []);

  // Update local state when the external value changes
  useEffect(() => {
    if (Array.isArray(value)) {
      setItems(value);
    }
  }, [value]);

  // Add a new empty item
  const handleAddItem = () => {
    const newItem = {};
    // Initialize fields based on structure
    structure.forEach(field => {
      if (field.name === 'tabName' && availableTabs.length > 0) {
        // Default to first tab if available
        newItem[field.name] = availableTabs[0];
      } else {
        newItem[field.name] = field.type === 'color' ? '#000000' : '';
      }
    });
    
    const newItems = [...items, newItem];
    setItems(newItems);
    onChange(newItems);
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  };

  // Update a field in an item
  const handleFieldChange = (index, fieldName, newValue) => {
    // Add console log for debugging
    console.log('Field change:', fieldName, newValue, typeof newValue);
    
    const newItems = [...items];
    // Make sure we have a valid item at this index
    if (!newItems[index]) {
      newItems[index] = {};
    }
    
    newItems[index] = {
      ...newItems[index],
      [fieldName]: newValue
    };
    
    setItems(newItems);
    onChange(newItems);
  };

  // Render input field based on its type
  const renderField = (fieldStructure, itemIndex, currentValue) => {
    const { name: fieldName, label: fieldLabel, type } = fieldStructure;
    
    // Special handling for tabName field to show a dropdown of available tabs
    if (fieldName === 'tabName' && availableTabs.length > 0) {
      return (
        <FormControl key={`${itemIndex}-${fieldName}`} fullWidth margin="normal">
          <InputLabel id={`tab-select-label-${itemIndex}`}>{fieldLabel}</InputLabel>
          <Select
            labelId={`tab-select-label-${itemIndex}`}
            value={currentValue || ''}
            onChange={(e) => handleFieldChange(itemIndex, fieldName, e.target.value)}
            label={fieldLabel}
          >
            {availableTabs.map((tab, idx) => (
              <MenuItem key={idx} value={tab}>
                {tab}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    
    switch (type) {
      case 'color':
        return (
          <ColorPickerInput
            key={`${itemIndex}-${fieldName}`}
            name={fieldName}
            label={fieldLabel}
            value={currentValue || '#000000'}
            onChange={(color) => handleFieldChange(itemIndex, fieldName, color)}
          />
        );
      
      case 'formatTextarea':
        return (
          <FormattableTextarea
            key={`${itemIndex}-${fieldName}`}
            name={fieldName}
            label={fieldLabel}
            value={currentValue || ''}
            handleChange={(name, value, type) => {
              console.log('FormattableTextarea change:', name, value, type);
              // Ignore the name since we're passing our own fieldName
              handleFieldChange(itemIndex, fieldName, value);
            }}
            type="formatTextarea"
          />
        );
        
      default:
        return (
          <TextField
            key={`${itemIndex}-${fieldName}`}
            fullWidth
            margin="normal"
            label={fieldLabel}
            value={currentValue || ''}
            onChange={(e) => handleFieldChange(itemIndex, fieldName, e.target.value)}
            variant="outlined"
          />
        );
    }
  };

  return (
    <Box sx={{ mb: 3 }} component="form">
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {label}
      </Typography>
      
      {items.map((item, index) => (
        <Card key={index} sx={{ mb: 2, position: 'relative' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6">
                {`Элемент ${index + 1}`}
              </Typography>
              <IconButton 
                color="error" 
                onClick={() => handleRemoveItem(index)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {structure.map(fieldStructure => 
              renderField(fieldStructure, index, item[fieldStructure.name])
            )}
          </CardContent>
        </Card>
      ))}
      
      <Button 
        variant="contained" 
        startIcon={<AddIcon />}
        onClick={handleAddItem}
        sx={{ mt: 1 }}
      >
        Добавить элемент
      </Button>
    </Box>
  );
};

export default ComplexInput;
