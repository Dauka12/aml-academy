import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    IconButton,
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

const GenericTableInput = ({
    values,
    handleHeaderChange,
    handleInputChangeArrayInObject,
    handleAddColumn,
    handleAddToTable,
    handleRemoveRow,
    handleRemoveColumn
}) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Таблица</Typography>

            <TableContainer sx={{ mb: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {values.columns?.map((column, index) => (
                                <TableCell key={index}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={column}
                                            onChange={(e) => handleHeaderChange(index, e.target.value)}
                                            variant="outlined"
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveColumn(index)}
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            ))}
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddColumn}
                                >
                                    Добавить колонку
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.data?.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={cell}
                                            onChange={(e) => handleInputChangeArrayInObject(cellIndex, e.target.value, rowIndex, 'simpleTable')}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveRow(rowIndex)}
                                        size="small"
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
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleAddToTable('data')}
            >
                Добавить строку
            </Button>
        </Box>
    );
};

export default GenericTableInput;
