import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react';

const DndQuestionsInput = ({ input, values, handleInputChange, handleAddToList }) => {
    const handleRemoveQuestion = (index) => {
        const updatedQuestions = [...values.questions];
        updatedQuestions.splice(index, 1);

        // Note: This assumes you have a setValues function available
        // If not, adjust this to match your state management approach
        // setValues({ ...values, questions: updatedQuestions });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                {values.questions?.map((question, index) => (
                    <Grid container key={index} spacing={2} alignItems="center">
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                size="small"
                                value={question.answer || ''}
                                onChange={(e) => handleInputChange(index, e.target.value, input.type)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth size="small">
                                <Select
                                    value={question.side}
                                    onChange={(e) => handleInputChange(index, e.target.value, 'select_dnd')}
                                >
                                    <MenuItem value={0}>{values.leftAnswer}</MenuItem>
                                    <MenuItem value={1}>{values.rightAnswer}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveQuestion(index)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Box>

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('dnd_questions')}
            >
                Добавить вопрос
            </Button>
        </Box>
    );
};

export default DndQuestionsInput;
