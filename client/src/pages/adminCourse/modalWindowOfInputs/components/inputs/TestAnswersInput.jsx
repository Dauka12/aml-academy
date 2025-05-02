import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const TestAnswersInput = ({ values, setValues }) => {
    const handleAddOption = () => {
        setValues(prev => ({
            ...prev,
            options: [...prev.options, 'Новый вариант ответа']
        }));
    };

    const handleOptionChange = (index, value) => {
        setValues(prevValues => {
            const updatedOptions = [...prevValues.options];
            updatedOptions[index] = value;

            // If this option was in correctOptions, update its value there too
            const correctIndex = prevValues.correctOptions.indexOf(prevValues.options[index]);
            let updatedCorrectOptions = [...prevValues.correctOptions];

            if (correctIndex !== -1) {
                updatedCorrectOptions[correctIndex] = value;
            }

            return {
                ...prevValues,
                options: updatedOptions,
                correctOptions: updatedCorrectOptions
            };
        });
    };

    const handleCorrectOptionChange = (index, isChecked) => {
        setValues(prevValues => {
            const optionValue = prevValues.options[index];
            let updatedCorrectOptions = [...prevValues.correctOptions];

            if (isChecked) {
                // Add to correct options if not already there
                if (!updatedCorrectOptions.includes(optionValue)) {
                    updatedCorrectOptions.push(optionValue);
                }
            } else {
                // Remove from correct options
                updatedCorrectOptions = updatedCorrectOptions.filter(option => option !== optionValue);
            }

            return {
                ...prevValues,
                correctOptions: updatedCorrectOptions
            };
        });
    };

    const handleRemoveOption = (index) => {
        setValues(prevValues => {
            const optionToRemove = prevValues.options[index];
            const updatedOptions = prevValues.options.filter((_, idx) => idx !== index);
            const updatedCorrectOptions = prevValues.correctOptions.filter(option => option !== optionToRemove);

            return {
                ...prevValues,
                options: updatedOptions,
                correctOptions: updatedCorrectOptions
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Варианты ответов
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                {values.options?.map((option, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            py: 1,
                            '&:last-child': { pb: 1 }
                        }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={2}
                                size="small"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.correctOptions?.includes(option)}
                                            onChange={(e) => handleCorrectOptionChange(index, e.target.checked)}
                                            size="small"
                                        />
                                    }
                                    label="Правильный"
                                    labelPlacement="top"
                                    sx={{ mx: 0, mb: 0 }}
                                />

                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveOption(index)}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddOption}
            >
                Добавить вариант ответа
            </Button>
        </Box>
    );
};

export default TestAnswersInput;
