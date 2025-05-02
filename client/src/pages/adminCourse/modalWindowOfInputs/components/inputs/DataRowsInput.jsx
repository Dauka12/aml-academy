import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Grid } from '@mui/joy';
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const DataRowsInput = ({ values, setValues }) => {
    const handleAddRegularRow = () => {
        if (!values.columns || values.columns.length === 0) {
            return;
        }

        const newRow = values.columns.reduce((acc, column) => {
            acc[column] = '';
            return acc;
        }, {});

        setValues(prev => ({
            ...prev,
            data_row: [...(prev.data_row || []), newRow]
        }));
    };

    const handleAddSpanRow = () => {
        if (!values.columns || values.columns.length === 0) {
            return;
        }

        const newRow = {
            colSpan: 3,
            [values.columns[0]]: ''
        };

        setValues(prev => ({
            ...prev,
            data_row: [...(prev.data_row || []), newRow]
        }));
    };

    const handleCellChange = (rowIndex, columnKey, value) => {
        setValues(prev => {
            const updatedRows = [...prev.data_row];
            updatedRows[rowIndex][columnKey] = value;
            return {
                ...prev,
                data_row: updatedRows
            };
        });
    };

    const handleRemoveRow = (rowIndex) => {
        setValues(prev => {
            const updatedRows = [...prev.data_row];
            updatedRows.splice(rowIndex, 1);
            return {
                ...prev,
                data_row: updatedRows
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Строки данных
            </Typography>

            {values.data_row?.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Перед тем как добавить ряд, добавьте и заполните все колонки
                </Typography>
            )}

            {values.data_row?.map((row, rowIndex) => (
                <Card key={rowIndex} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={500}>
                                {row.colSpan ? "Строка с объединенными ячейками" : "Строка"} #{rowIndex + 1}
                            </Typography>

                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveRow(rowIndex)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Grid container spacing={2}>
                            {row.colSpan ? (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={values.columns[0]}
                                        multiline
                                        rows={2}
                                        value={row[values.columns[0]] || ''}
                                        onChange={(e) => handleCellChange(rowIndex, values.columns[0], e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                            ) : (
                                values.columns?.map(column => (
                                    <Grid item xs={12} sm={6} md={4} key={column}>
                                        <TextField
                                            fullWidth
                                            label={column}
                                            value={row[column] || ''}
                                            onChange={(e) => handleCellChange(rowIndex, column, e.target.value)}
                                            size="small"
                                            multiline
                                            rows={2}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddRegularRow}
                    disabled={!values.columns || values.columns.length === 0}
                >
                    Добавить обычную строку
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<ViewColumnIcon />}
                    onClick={handleAddSpanRow}
                    disabled={!values.columns || values.columns.length === 0}
                >
                    Добавить объединенную строку
                </Button>
            </Box>
        </Box>
    );
};

export default DataRowsInput;
