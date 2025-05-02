import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import DeleteButton from '../DeleteButton';

const ListInput = ({ name, label, values, handleInputChange, handleAddToList }) => {
    const handleRemoveItem = (index) => {
        const updatedList = [...values[name]];
        updatedList.splice(index, 1);

        // Use handleInputChange to update the entire array directly
        // This ensures immediate UI update
        handleInputChange(null, updatedList, name);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                {label}
            </Typography>

            {values[name]?.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        gap: 1
                    }}
                >
                    <TextField
                        fullWidth
                        value={item}
                        onChange={(e) => handleInputChange(index, e.target.value, name)}
                        variant="outlined"
                        size="small"
                    />
                    <DeleteButton onClick={() => handleRemoveItem(index)} />
                </Box>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList(name)}
                sx={{ mt: 1 }}
                size="small"
            >
                Добавить элемент
            </Button>
        </Box>
    );
};

export default ListInput;
