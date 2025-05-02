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

const CarouselInput = ({ input, values, setValues, fileToBase64 }) => {
    const handleAddItem = () => {
        setValues(prev => ({
            ...prev,
            data: [
                ...prev.data || [],
                { header: '', image: '', imageText: '' }
            ]
        }));
    };

    const handleRemoveItem = (index) => {
        setValues(prev => {
            const updatedData = [...prev.data];
            updatedData.splice(index, 1);
            return {
                ...prev,
                data: updatedData
            };
        });
    };

    const handleChangeHeader = (index, value) => {
        setValues(prev => {
            const updatedData = [...prev.data];
            updatedData[index].header = value;
            return {
                ...prev,
                data: updatedData
            };
        });
    };

    const handleChangeImageText = (index, value) => {
        setValues(prev => {
            const updatedData = [...prev.data];
            updatedData[index].imageText = value;
            return {
                ...prev,
                data: updatedData
            };
        });
    };

    const handleImageUpload = (index, file) => {
        if (file) {
            fileToBase64(file, (base64String) => {
                setValues(prev => {
                    const updatedData = [...prev.data];
                    updatedData[index].image = base64String;
                    return {
                        ...prev,
                        data: updatedData
                    };
                });
            });
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                {input?.label || "Слайдер изображений"}
            </Typography>

            {values.data?.map((item, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={500}>
                                Слайд {index + 1}
                            </Typography>

                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemoveItem(index)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Box
                                    sx={{
                                        border: '1px dashed',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1,
                                        height: '100%',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {item.image ? (
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt="Slide image"
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: '150px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    ) : (
                                        <Box sx={{ color: 'text.secondary', textAlign: 'center' }}>
                                            <ImageIcon sx={{ fontSize: 40 }} />
                                            <Typography variant="caption" display="block">
                                                Изображение не выбрано
                                            </Typography>
                                        </Box>
                                    )}

                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="small"
                                        startIcon={<FileUploadIcon />}
                                    >
                                        Выбрать файл
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(index, e.target.files[0])}
                                        />
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <TextField
                                    fullWidth
                                    label="Заголовок"
                                    size="small"
                                    value={item.header || ''}
                                    onChange={(e) => handleChangeHeader(index, e.target.value)}
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Описание изображения"
                                    size="small"
                                    multiline
                                    rows={3}
                                    value={item.imageText || ''}
                                    onChange={(e) => handleChangeImageText(index, e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddItem}
                sx={{ mt: 1 }}
            >
                Добавить слайд
            </Button>
        </Box>
    );
};

export default CarouselInput;
