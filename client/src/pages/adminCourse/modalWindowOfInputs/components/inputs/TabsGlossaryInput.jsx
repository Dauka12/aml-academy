import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import DeleteButton from '../DeleteButton';

const TabsGlossaryInput = ({ values, handleInputChange, handleAddToList }) => {
    // Direct handler for removing tabs
    const handleRemoveTab = (index) => {
        const updatedTabs = [...values.tabs];
        const updatedGlossary = [...values.tabsGlossary];

        // Remove items at the specified index
        updatedTabs.splice(index, 1);
        updatedGlossary.splice(index, 1);

        // Update both arrays at once
        handleInputChange(null, updatedTabs, 'tabs');
        handleInputChange(null, updatedGlossary, 'tabsGlossary');
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
                Разделы
            </Typography>

            {values.tabs.map((tabItem, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        mb: 2,
                        position: 'relative',
                        '&:hover .drag-indicator': {
                            opacity: 1
                        }
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box
                                className="drag-indicator"
                                sx={{
                                    display: 'flex',
                                    opacity: 0.3,
                                    transition: 'opacity 0.2s',
                                    mr: 1
                                }}
                            >
                                <DragIndicatorIcon color="action" />
                            </Box>

                            <TextField
                                fullWidth
                                label="Название раздела"
                                value={tabItem}
                                onChange={(e) => handleInputChange(index, e.target.value, 'tabs-for-glossary')}
                                size="small"
                                variant="outlined"
                            />

                            <Box sx={{ ml: 1 }}>
                                <DeleteButton onClick={() => handleRemoveTab(index)} />
                            </Box>
                        </Box>

                        <Divider sx={{ mt: 1, mb: 2 }} />

                        <TextField
                            fullWidth
                            label="Текст раздела"
                            multiline
                            minRows={3}
                            value={values.tabsGlossary[index] || ''}
                            onChange={(e) => handleInputChange(index, e.target.value, 'tabsGlossary')}
                            variant="outlined"
                        />
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('tabs')}
                sx={{ mt: 1 }}
            >
                Добавить раздел
            </Button>
        </Box>
    );
};

export default TabsGlossaryInput;
