import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageIcon from '@mui/icons-material/Image';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const IconsTitleDescInput = ({ input, values, handleInputChange, handleAddToList }) => {
    const handleRemoveItem = (index) => {
        // Remove item and associated icon
        const updatedData = [...values.data];
        const updatedIcons = [...values.icons];

        updatedData.splice(index, 1);
        updatedIcons.splice(index, 1);

        // Note: This assumes you have a setValues function available
        // If not, adjust this to match your state management approach
        // setValues({ ...values, data: updatedData, icons: updatedIcons });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Блоки с иконками
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                {values.data?.map((item, index) => (
                    <Card key={index} variant="outlined">
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={3}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px dashed grey',
                                                borderRadius: 1,
                                                bgcolor: 'background.neutral'
                                            }}
                                        >
                                            {values.icons[index] ? (
                                                <Box
                                                    component="img"
                                                    src={values.icons[index]}
                                                    alt="Icon"
                                                    sx={{ maxWidth: '100%', maxHeight: '100%' }}
                                                />
                                            ) : (
                                                <ImageIcon color="disabled" />
                                            )}
                                        </Box>

                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="small"
                                            startIcon={<FileUploadIcon />}
                                        >
                                            Иконка
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => handleInputChange(index, e.target.files[0], 'icons')}
                                                accept="image/*"
                                            />
                                        </Button>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={8}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Заголовок"
                                            value={item.title || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value, 'title')}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Описание"
                                            multiline
                                            minRows={2}
                                            value={item.description || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value, 'description')}
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('icons-title-desx')}
            >
                Добавить блок
            </Button>
        </Box>
    );
};

export default IconsTitleDescInput;
