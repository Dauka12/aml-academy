import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

const TabsInput = ({ values, handleInputChange, handleAddToList, handleRemoveTab }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Разделы</Typography>

            {values.tabs?.map((tab, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, width: '100%' }}>
                        <Box sx={{ width: '50%' }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Таб"
                                value={tab || ''}
                                onChange={(e) => handleInputChange(index, e.target.value, 'tabs-for-glossary')}
                                variant="outlined"
                                sx={{ mb: 1 }}
                            />
                        </Box>

                        <Box sx={{ width: '50%' }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Содержимое"
                                value={values.tabsGlossary[index] || ''}
                                onChange={(e) => handleInputChange(index, e.target.value, 'tabsGlossary')}
                                variant="outlined"
                                multiline
                                minRows={1}
                            />
                        </Box>

                        <IconButton
                            color="error"
                            onClick={() => handleRemoveTab(index)}
                            size="small"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('tabs')}
            >
                Добавить раздел
            </Button>
        </Box>
    );
};

export default TabsInput;
