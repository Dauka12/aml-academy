import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const DragAndDropOptionsInput = ({ values, setValues }) => {
    const handleAnswerOptionChange = (index, value) => {
        setValues(prevValues => {
            const updatedOptions = [...prevValues.answerOptions];
            updatedOptions[index].text = value;
            return {
                ...prevValues,
                answerOptions: updatedOptions
            };
        });
    };

    const handleFieldOptionChange = (index, value) => {
        setValues(prevValues => {
            const updatedOptions = [...prevValues.fieldOptions];
            updatedOptions[index].text = value;
            return {
                ...prevValues,
                fieldOptions: updatedOptions
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Настройка перетаскивания
            </Typography>

            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight={500}>
                            Перетаскиваемые элементы
                        </Typography>
                        <CompareArrowsIcon color="action" />
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Варианты для перетаскивания
                            </Typography>

                            {values.answerOptions?.map((option, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label={`Вариант ${index + 1}`}
                                        value={option.text || ''}
                                        onChange={(e) => handleAnswerOptionChange(index, e.target.value)}
                                    />
                                </Box>
                            ))}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Области для размещения
                            </Typography>

                            {values.fieldOptions?.map((option, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label={`Область ${index + 1}`}
                                        value={option.text || ''}
                                        onChange={(e) => handleFieldOptionChange(index, e.target.value)}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </Grid>

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Правильные соответствия установлены по порядковым номерам.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DragAndDropOptionsInput;
