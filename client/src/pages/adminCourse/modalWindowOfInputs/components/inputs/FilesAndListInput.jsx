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

const FilesAndListInput = ({ input, values, setValues, fileToBase64 }) => {
    const handleAddItem = () => {
        setValues(prev => ({
            ...prev,
            [input.name]: [...(prev[input.name] || []), ''],
            list: [...(prev.list || []), 'Новый элемент']
        }));
    };

    const handleRemoveItem = (index) => {
        setValues(prev => {
            const updatedIcons = [...prev[input.name]];
            const updatedList = [...prev.list];

            updatedIcons.splice(index, 1);
            updatedList.splice(index, 1);

            return {
                ...prev,
                [input.name]: updatedIcons,
                list: updatedList
            };
        });
    };

    const handleTextChange = (index, value) => {
        setValues(prev => {
            const updatedList = [...prev.list];
            updatedList[index] = value;

            return {
                ...prev,
                list: updatedList
            };
        });
    };

    const handleFileChange = (index, file) => {
        if (file) {
            fileToBase64(file, (base64String) => {
                setValues(prev => {
                    const updatedIcons = [...prev[input.name]];
                    updatedIcons[index] = base64String;

                    return {
                        ...prev,
                        [input.name]: updatedIcons
                    };
                });
            });
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                {input.label || "Список с иконками"}
            </Typography>

            {(values.list || []).map((text, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={4}>
                                <Box
                                    sx={{
                                        border: '1px dashed',
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    {values[input.name]?.[index] ? (
                                        <Box
                                            component="img"
                                            src={values[input.name][index]}
                                            alt="Item icon"
                                            sx={{
                                                maxWidth: '100%',
                                                maxHeight: '80px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    ) : (
                                        <ImageIcon color="action" sx={{ fontSize: 40 }} />
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
                                            onChange={(e) => handleFileChange(index, e.target.files[0])}
                                        />
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={7}>
                                <TextField
                                    fullWidth
                                    label="Текст"
                                    value={text || ''}
                                    onChange={(e) => handleTextChange(index, e.target.value)}
                                    size="small"
                                    multiline
                                    rows={2}
                                />
                            </Grid>

                            <Grid item xs={12} sm={1}>
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

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddItem}
            >
                Добавить элемент
            </Button>
        </Box>
    );
};

export default FilesAndListInput;
