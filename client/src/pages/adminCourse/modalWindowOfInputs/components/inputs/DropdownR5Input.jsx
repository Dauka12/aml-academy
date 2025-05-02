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
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const DropdownR5Input = ({ values, setValues, fileToBase64 }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleAddGroup = () => {
        setValues(prev => ({
            ...prev,
            headers: [
                ...(prev.headers || []),
                { name: `Группа ${(prev.headers?.length || 0) + 1}`, icon: null }
            ]
        }));
    };

    const handleRemoveGroup = (index) => {
        setValues(prev => {
            const updatedHeaders = [...prev.headers];
            updatedHeaders.splice(index, 1);
            return {
                ...prev,
                headers: updatedHeaders
            };
        });
    };

    const handleGroupNameChange = (index, value) => {
        setValues(prev => {
            const updatedHeaders = [...prev.headers];
            updatedHeaders[index].name = value;
            return {
                ...prev,
                headers: updatedHeaders
            };
        });
    };

    const handleGroupIconChange = (index, file) => {
        if (file) {
            fileToBase64(file, (base64String) => {
                setValues(prev => {
                    const updatedHeaders = [...prev.headers];
                    updatedHeaders[index].icon = base64String;
                    return {
                        ...prev,
                        headers: updatedHeaders
                    };
                });
            });
        }
    };

    const handleAddItem = () => {
        setValues(prev => ({
            ...prev,
            items: [
                ...(prev.items || []),
                { title: `Элемент ${(prev.items?.length || 0) + 1}`, text: '' }
            ]
        }));
    };

    const handleRemoveItem = (index) => {
        setValues(prev => {
            const updatedItems = [...prev.items];
            updatedItems.splice(index, 1);
            return {
                ...prev,
                items: updatedItems
            };
        });
    };

    const handleItemTitleChange = (index, value) => {
        setValues(prev => {
            const updatedItems = [...prev.items];
            updatedItems[index].title = value;
            return {
                ...prev,
                items: updatedItems
            };
        });
    };

    const handleItemTextChange = (index, value) => {
        setValues(prev => {
            const updatedItems = [...prev.items];
            updatedItems[index].text = value;
            return {
                ...prev,
                items: updatedItems
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                sx={{ mb: 2 }}
            >
                <Tab label="Группы" />
                <Tab label="Элементы" />
            </Tabs>

            {activeTab === 0 && (
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                        Группы
                    </Typography>

                    {values.headers?.map((header, index) => (
                        <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="subtitle2" fontWeight={500}>
                                        Группа {index + 1}
                                    </Typography>

                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveGroup(index)}
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
                                                gap: 1,
                                                height: '100%',
                                                justifyContent: 'center',
                                                minHeight: 100
                                            }}
                                        >
                                            {header.icon ? (
                                                <Box
                                                    component="img"
                                                    src={header.icon}
                                                    alt="Group icon"
                                                    sx={{
                                                        maxWidth: '100%',
                                                        maxHeight: '60px',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            ) : (
                                                <ImageIcon color="action" />
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
                                                    onChange={(e) => handleGroupIconChange(index, e.target.files[0])}
                                                />
                                            </Button>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            fullWidth
                                            label="Название группы"
                                            value={header.name || ''}
                                            onChange={(e) => handleGroupNameChange(index, e.target.value)}
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddGroup}
                    >
                        Добавить группу
                    </Button>
                </Box>
            )}

            {activeTab === 1 && (
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                        Элементы списка
                    </Typography>

                    {values.items?.map((item, index) => (
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

                                <TextField
                                    fullWidth
                                    label="Название элемента"
                                    value={item.title || ''}
                                    onChange={(e) => handleItemTitleChange(index, e.target.value)}
                                    size="small"
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    fullWidth
                                    label="Описание/определение"
                                    value={item.text || ''}
                                    onChange={(e) => handleItemTextChange(index, e.target.value)}
                                    size="small"
                                    multiline
                                    rows={3}
                                />
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
            )}
        </Box>
    );
};

export default DropdownR5Input;
