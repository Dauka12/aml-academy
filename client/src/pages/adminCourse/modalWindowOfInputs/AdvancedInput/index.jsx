import SaveIcon from '@mui/icons-material/Save';
import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import componentMap_level_2 from '../../../AdminPage_v2/constructor/ComponentMap_level_2';
import Modal from '../ModalWindowInput';
import ComponentItem from './ComponentItem';
import ComponentPalette from './ComponentPalette';
import { advancedInputTheme } from './theme';

const AdvancedInput = ({ handleSave, content }) => {
  const [componentHistory, setComponentHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [componentIndex, setComponentIndex] = useState(0);

  // Add a new component to the history
  const handleChooseComponent = (chosenComponent) => {
    setComponentHistory(prev => [
      ...prev,
      {
        component: chosenComponent.component,
        inputs: chosenComponent.inputs,
        name: chosenComponent.name,
        values: null
      }
    ]);
  };

  // Move a component up in the list
  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedHistory = [...componentHistory];
      [updatedHistory[index], updatedHistory[index - 1]] = 
        [updatedHistory[index - 1], updatedHistory[index]];
      setComponentHistory(updatedHistory);
    }
  };

  // Move a component down in the list
  const handleMoveDown = (index) => {
    if (index < componentHistory.length - 1) {
      const updatedHistory = [...componentHistory];
      [updatedHistory[index], updatedHistory[index + 1]] = 
        [updatedHistory[index + 1], updatedHistory[index]];
      setComponentHistory(updatedHistory);
    }
  };

  // Open edit modal for a component
  const handleEdit = (index) => {
    setInputs(componentHistory[index].inputs);
    setComponentIndex(index);
    setOpenModal(true);
  };

  // Delete a component
  const handleDelete = (index) => {
    setComponentHistory(prev => 
      prev.filter((_, idx) => idx !== index)
    );
  };

  // Update component values after editing
  const handleSubmitEdit = (values) => {
    setComponentHistory(prev => {
      const updated = [...prev];
      updated[componentIndex] = {
        ...updated[componentIndex],
        values: values
      };
      return updated;
    });
  };

  // Initialize with provided content
  useEffect(() => {
    if (content && content.length > 0) {
      setComponentHistory(content);
    }
  }, [content]);

  return (
    <ThemeProvider theme={advancedInputTheme}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        {openModal && (
          <Modal
            onClose={() => setOpenModal(false)}
            onSubmit={({ inputs, values }) => {
              handleSubmitEdit(values);
              setOpenModal(false);
            }}
            inputs={inputs}
            exValues={componentHistory[componentIndex].values}
          />
        )}

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          Содержимое
        </Typography>

        <Box sx={{ mb: 3 }}>
          {componentHistory.length === 0 ? (
            <Box sx={{ 
              p: 2, 
              textAlign: 'center', 
              bgcolor: 'background.neutral',
              borderRadius: 1,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">
                Добавьте компоненты из палитры ниже
              </Typography>
            </Box>
          ) : (
            componentHistory.map((component, index) => (
              <ComponentItem
                key={index}
                component={component}
                index={index}
                componentMap={componentMap_level_2}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <ComponentPalette onSelectComponent={handleChooseComponent} />
          
          <IconButton 
            color="primary"
            onClick={() => handleSave(componentHistory)}
            sx={{ 
              bgcolor: 'primary.lighter',
              '&:hover': {
                bgcolor: 'primary.light',
              }
            }}
          >
            <SaveIcon />
          </IconButton>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default AdvancedInput;