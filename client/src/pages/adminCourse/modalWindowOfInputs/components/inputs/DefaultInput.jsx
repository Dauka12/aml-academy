import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const DefaultInput = ({ input, values, handleChange }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <TextField
                fullWidth
                size="small"
                value={values[input.name] || ''}
                onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                variant="outlined"
                InputProps={{
                    sx: {
                        fontSize: '13px',
                        fontFamily: '"Ubuntu", sans-serif',
                    },
                }}
            />
        </Box>
    );
};

export default DefaultInput;
