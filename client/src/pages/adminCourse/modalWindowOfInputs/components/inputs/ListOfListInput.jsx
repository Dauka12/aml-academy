import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const ListOfListInput = ({ values, setValues }) => {
    const handleAddItemToList = (listIndex) => {
        setValues(prev => {
            const updatedList = [...prev.list];
            updatedList[listIndex] = [...updatedList[listIndex], 'Текст'];

            return {
                ...prev,
                list: updatedList
            };
        });
    };

    const handleItemChange = (listIndex, itemIndex, value) => {
        setValues(prev => {
            const updatedList = [...prev.list];
            updatedList[listIndex][itemIndex] = value;

            return {
                ...prev,
                list: updatedList
            };
        });
    };

    const handleRemoveItem = (listIndex, itemIndex) => {
        setValues(prev => {
            const updatedList = [...prev.list];
            updatedList[listIndex].splice(itemIndex, 1);

            return {
                ...prev,
                list: updatedList
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Список значений для точек
            </Typography>

            {values.list?.map((listItems, listIndex) => (
                <Card key={listIndex} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip
                                label={`Точка ${listIndex + 1}`}
                                color="primary"
                                variant="outlined"
                            />

                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                {values.points?.[listIndex]?.name || ''}
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {listItems.map((item, itemIndex) => (
                            <Box
                                key={itemIndex}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1
                                }}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={item || ''}
                                    onChange={(e) => handleItemChange(listIndex, itemIndex, e.target.value)}
                                    label={`Элемент ${itemIndex + 1}`}
                                />

                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveItem(listIndex, itemIndex)}
                                    sx={{ ml: 1 }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}

                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => handleAddItemToList(listIndex)}
                            sx={{ mt: 1 }}
                        >
                            Добавить элемент
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default ListOfListInput;
