import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const TextareaInput = ({ input, values, handleChange }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <TextField
                fullWidth
                multiline
                minRows={4}
                maxRows={8}
                value={values[input.name] || ''}
                onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        fontFamily: '"Ubuntu", sans-serif',
                        fontSize: '13px',
                    },
                }}
            />
        </Box>
    );
};

export default TextareaInput;
