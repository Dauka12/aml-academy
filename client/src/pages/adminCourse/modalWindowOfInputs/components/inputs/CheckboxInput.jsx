import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';

const CheckboxInput = ({ input, values, handleChange }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={values[input.name] || false}
                        onChange={(e) => handleChange(input.name, e.target.checked, input.type)}
                    />
                }
                label={
                    <Typography variant="body1" sx={{ fontWeight: 400 }}>
                        {input.label}
                    </Typography>
                }
            />
        </Box>
    );
};

export default CheckboxInput;
