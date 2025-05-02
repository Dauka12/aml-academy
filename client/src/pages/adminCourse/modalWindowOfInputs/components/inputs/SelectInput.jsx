import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

const SelectInput = ({ input, values, setValues }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <FormControl fullWidth size="small">
                <Select
                    value={values[input.name] || 'center'}
                    onChange={(e) => {
                        setValues(prev => ({
                            ...prev,
                            ['alignment']: e.target.value
                        }));
                    }}
                    sx={{
                        fontSize: '13px',
                        fontFamily: '"Ubuntu", sans-serif',
                    }}
                >
                    <MenuItem value={'center'}>Центр</MenuItem>
                    <MenuItem value={'left'}>Налево</MenuItem>
                    <MenuItem value={'right'}>Направо</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectInput;
