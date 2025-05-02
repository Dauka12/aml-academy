import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import DeleteButton from '../DeleteButton';

const ItemsTextInput = ({ input, values, handleInputChange, handleAddToList }) => {
    const handleRemoveItem = (index) => {
        const updatedItems = [...values.items];
        updatedItems.splice(index, 1);

        // Update the array directly
        handleInputChange(null, updatedItems, 'items');
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                {input.label}
            </Typography>

            {values.items?.map((item, index) => (
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
                        value={item.text || ''}
                        onChange={(e) => handleInputChange(index, e.target.value, 'items_text')}
                        variant="outlined"
                        size="small"
                    />
                    <DeleteButton onClick={() => handleRemoveItem(index)} />
                </Box>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('items_text')}
                sx={{ mt: 1 }}
                size="small"
            >
                Добавить элемент
            </Button>
        </Box>
    );
};

export default ItemsTextInput;
