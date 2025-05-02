import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

const RowsInput = ({ name, label, values, handleInputChangeTable1, handleAddToTable, handleRemoveFromTable }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {label}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                {values[name].map((row, index) => (
                    <Grid container key={index} spacing={2} alignItems="center">
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                size="small"
                                value={row.first || ''}
                                onChange={(e) => handleInputChangeTable1(index, e.target.value, 'first')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                size="small"
                                value={row.second || ''}
                                onChange={(e) => handleInputChangeTable1(index, e.target.value, 'second')}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            {handleRemoveFromTable && (
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveFromTable(name, index)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Box>

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToTable(name)}
            >
                Добавить
            </Button>
        </Box>
    );
};

export default RowsInput;
