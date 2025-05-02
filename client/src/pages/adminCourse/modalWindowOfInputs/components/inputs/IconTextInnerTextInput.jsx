import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ImageIcon from '@mui/icons-material/Image';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const IconTextInnerTextInput = ({ values, setValues, fileToBase64 }) => {
    const handleAddItem = () => {
        setValues(prev => ({
            ...prev,
            stages: [
                ...(prev.stages || []),
                { icon: '', text: 'Видная часть', innerText: 'Скрытая часть' }
            ]
        }));
    };

    const handleRemoveItem = (index) => {
        setValues(prev => {
            const updatedStages = [...prev.stages];
            updatedStages.splice(index, 1);

            return {
                ...prev,
                stages: updatedStages
            };
        });
    };

    const handleTextChange = (index, field, value) => {
        setValues(prev => {
            const updatedStages = [...prev.stages];
            updatedStages[index][field] = value;

            return {
                ...prev,
                stages: updatedStages
            };
        });
    };

    const handleIconChange = (index, file) => {
        if (file) {
            fileToBase64(file, (base64String) => {
                setValues(prev => {
                    const updatedStages = [...prev.stages];
                    updatedStages[index].icon = base64String;

                    return {
                        ...prev,
                        stages: updatedStages
                    };
                });
            });
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Элементы с видимой и скрытой частями
            </Typography>

            {values.stages?.map((stage, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={500}>
                                Элемент {index + 1}
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
                                    {stage.icon ? (
                                        <Box
                                            component="img"
                                            src={stage.icon}
                                            alt="Stage icon"
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
                                        Выбрать иконку
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => handleIconChange(index, e.target.files[0])}
                                        />
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <TextField
                                    fullWidth
                                    label="Видимый текст"
                                    value={stage.text || ''}
                                    onChange={(e) => handleTextChange(index, 'text', e.target.value)}
                                    size="small"
                                    sx={{ mb: 2 }}
                                />

                                <Divider sx={{ mb: 2 }} />

                                <TextField
                                    fullWidth
                                    label="Скрытый текст"
                                    value={stage.innerText || ''}
                                    onChange={(e) => handleTextChange(index, 'innerText', e.target.value)}
                                    size="small"
                                    multiline
                                    rows={3}
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
            >
                Добавить элемент
            </Button>
        </Box>
    );
};

export default IconTextInnerTextInput;
