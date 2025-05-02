import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const TableDataInput = ({ values, setValues }) => {
    const handleAddRow = () => {
        setValues(prev => {
            const nextId = prev.tableData?.length > 0
                ? prev.tableData[prev.tableData.length - 1].id + 1
                : 1;

            return {
                ...prev,
                tableData: [
                    ...(prev.tableData || []),
                    {
                        id: nextId,
                        column1: `Текст ${nextId}`,
                        details: `Значение ${nextId}`
                    }
                ]
            };
        });
    };

    const handleRemoveRow = (index) => {
        setValues(prev => {
            const updatedTableData = [...prev.tableData];
            updatedTableData.splice(index, 1);

            return {
                ...prev,
                tableData: updatedTableData
            };
        });
    };

    const handleCellChange = (index, field, value) => {
        setValues(prev => {
            const updatedTableData = [...prev.tableData];
            updatedTableData[index][field] = value;

            return {
                ...prev,
                tableData: updatedTableData
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Данные таблицы
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'background.neutral' }}>
                            <TableCell sx={{ fontWeight: 500 }}>Видная часть</TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>Скрытая часть</TableCell>
                            <TableCell sx={{ width: 50 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.tableData?.map((row, index) => (
                            <TableRow key={row.id || index}>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="standard"
                                        value={row.column1 || ''}
                                        onChange={(e) => handleCellChange(index, 'column1', e.target.value)}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="standard"
                                        value={row.details || ''}
                                        onChange={(e) => handleCellChange(index, 'details', e.target.value)}
                                        InputProps={{ disableUnderline: true }}
                                        multiline
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleRemoveRow(index)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddRow}
            >
                Добавить строку
            </Button>
        </Box>
    );
};

export default TableDataInput;
