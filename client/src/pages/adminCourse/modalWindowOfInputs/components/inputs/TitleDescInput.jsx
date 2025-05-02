import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

const TitleDescInput = ({ input, values, handleInputChange, handleAddToList }) => {
    const itemsList = values[input.name] || [];

    const handleRemoveItem = (index) => {
        const updatedList = [...itemsList];
        updatedList.splice(index, 1);
        
        // Update the array directly using the null + array pattern from handleInputChange
        handleInputChange(null, updatedList, input.name);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                {itemsList.map((item, index) => (
                    <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={11}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Заголовок"
                                            value={item.title || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value, 'title')}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={7}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Описание"
                                            value={item.description || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value, 'description')}
                                            variant="outlined"
                                            multiline
                                            minRows={1}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
            </Box>

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('title_desx_list', input.name)}
            >
                Добавить элемент
            </Button>
        </Box>
    );
};

export default TitleDescInput;
