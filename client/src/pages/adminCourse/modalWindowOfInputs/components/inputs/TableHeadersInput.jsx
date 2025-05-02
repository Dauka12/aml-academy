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

const TableHeadersInput = ({
    values,
    handleHeaderChange,
    handleInputChangeArrayInObject,
    handleAddColumn,
    handleAddToTable,
    handleRemoveColumn,
    handleRemoveRow
}) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Таблица
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {values.columns.map((column, index) => (
                                <TableCell key={index} sx={{ bgcolor: 'background.neutral' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={column}
                                            onChange={(e) => handleHeaderChange(index, e.target.value)}
                                            variant="outlined"
                                            sx={{ fontSize: '13px' }}
                                        />
                                        {handleRemoveColumn && (
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => handleRemoveColumn(index)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>
                                </TableCell>
                            ))}
                            <TableCell sx={{ width: 50 }}>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={handleAddColumn}
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={cell}
                                            onChange={(e) => handleInputChangeArrayInObject(cellIndex, e.target.value, rowIndex, 'simpleTable')}
                                            variant="outlined"
                                            multiline
                                            sx={{ fontSize: '13px' }}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {handleRemoveRow && (
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemoveRow(rowIndex)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToTable('data')}
            >
                Добавить строку
            </Button>
        </Box>
    );
};

export default TableHeadersInput;
