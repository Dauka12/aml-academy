import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const NumberInput = ({ input, values, handleChange }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <TextField
                type="number"
                fullWidth
                size="small"
                value={values[input.name] || 18}
                onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                variant="outlined"
                InputProps={{
                    inputProps: { min: 0 }
                }}
            />
        </Box>
    );
};

export default NumberInput;
