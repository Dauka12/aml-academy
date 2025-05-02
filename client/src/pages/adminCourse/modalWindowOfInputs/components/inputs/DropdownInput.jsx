import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const DropdownInput = ({ values, handleInputChange, handleAddToList }) => {
    const handleRemoveTab = (tabId) => {
        // Remove tab and all associated data
        const updatedTabs = values.tabs.filter(tab => tab.id !== tabId);
        const updatedTabsData = values.tabsData.filter(data => data.tabsIndex !== tabId);

        // Update both arrays directly using the null + array pattern
        handleInputChange(null, updatedTabs, 'tabs');
        handleInputChange(null, updatedTabsData, 'tabsData');
    };

    const handleRemoveTabItem = (itemId) => {
        // Remove just one item from a tab
        const updatedTabsData = values.tabsData.filter(data => data.id !== itemId);
        
        // Update the array directly
        handleInputChange(null, updatedTabsData, 'tabsData');
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Вкладки
            </Typography>

            {values.tabs?.map((tab) => (
                <Accordion key={tab.id} sx={{ mb: 1 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            bgcolor: 'background.neutral',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TextField
                                size="small"
                                value={tab.tab || ''}
                                onChange={(e) => handleInputChange(tab.id, e.target.value, 'tabs')}
                                onClick={(e) => e.stopPropagation()}
                                variant="outlined"
                                sx={{ width: '70%' }}
                            />

                            <IconButton
                                color="error"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTab(tab.id);
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            p: 1
                        }}>
                            {values.tabsData
                                .filter(item => item.tabsIndex === tab.id)
                                .map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 2
                                        }}
                                    >
                                        <TextField
                                            size="small"
                                            label="Заголовок"
                                            value={item.header || ''}
                                            onChange={(e) => handleInputChange(item.id, e.target.value, 'tabsDataHeader')}
                                            sx={{ width: '30%' }}
                                        />

                                        <TextField
                                            size="small"
                                            label="Содержание"
                                            value={item.data || ''}
                                            onChange={(e) => handleInputChange(item.id, e.target.value, 'tabsDataData')}
                                            sx={{ flexGrow: 1 }}
                                            multiline
                                            minRows={1}
                                        />

                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => handleRemoveTabItem(item.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ))}

                            <Box sx={{ mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleAddToList('tabsData', tab.id)}
                                >
                                    Добавить элемент
                                </Button>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Divider sx={{ my: 2 }} />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('dropd')}
            >
                Добавить вкладку
            </Button>
        </Box>
    );
};

export default DropdownInput;
