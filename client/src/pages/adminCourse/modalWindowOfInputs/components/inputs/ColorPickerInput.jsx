import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
    Box,
    Button,
    Paper,
    Popover,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

// Simple color picker component with hex input and color display
const ColorPickerInput = ({ input, values, handleChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'color-popover' : undefined;
    const currentColor = values[input.name] || '#000000';

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>{input.label}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: currentColor,
                        borderRadius: 1,
                        border: '1px solid #e0e0e0',
                        cursor: 'pointer'
                    }}
                    onClick={handleClick}
                />

                <TextField
                    size="small"
                    value={currentColor}
                    onChange={(e) => handleChange(input.name, e.target.value, 'color')}
                    sx={{ width: 120 }}
                />

                <Button
                    variant="outlined"
                    startIcon={<ColorLensIcon />}
                    onClick={handleClick}
                    size="small"
                >
                    Выбрать цвет
                </Button>
            </Box>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper elevation={3} sx={{ p: 1 }}>
                    <Box sx={{
                        width: 220,
                        height: 200,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(10, 1fr)',
                        gap: 0.5
                    }}>
                        {[
                            '#ff0000', '#ff4500', '#ff8c00', '#ffd700', '#ffff00', '#adff2f', '#32cd32', '#008000', '#00fa9a', '#00ffff',
                            '#1e90ff', '#0000ff', '#00008b', '#483d8b', '#800080', '#8b008b', '#ff00ff', '#ff1493', '#c71585', '#d2691e',
                            '#8b4513', '#a0522d', '#cd853f', '#deb887', '#f5deb3', '#ffffff', '#fffafa', '#f5f5dc', '#dcdcdc', '#d3d3d3',
                            '#c0c0c0', '#a9a9a9', '#808080', '#696969', '#000000', '#2f4f4f', '#708090', '#778899', '#4682b4', '#5f9ea0'
                        ].map(color => (
                            <Box
                                key={color}
                                sx={{
                                    width: 20,
                                    height: 20,
                                    bgcolor: color,
                                    border: currentColor === color ? '2px solid #000' : '1px solid #ccc',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        border: '2px solid #000',
                                    }
                                }}
                                onClick={() => {
                                    handleChange(input.name, color, 'color');
                                    handleClose();
                                }}
                            />
                        ))}
                    </Box>
                </Paper>
            </Popover>
        </Box>
    );
};

export default ColorPickerInput;
