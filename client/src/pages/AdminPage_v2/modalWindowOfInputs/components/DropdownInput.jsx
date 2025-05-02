import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';

const DropdownInput = ({
    values,
    handleInputChange,
    handleAddToList,
    handleRemoveTab,
    handleRemoveTabData
}) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Вкладки</Typography>

            {values.tabs?.map((tabObject, tabIndex) => (
                <Accordion key={tabObject.id} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                            <TextField
                                size="small"
                                value={tabObject.tab || ''}
                                onChange={(e) => handleInputChange(tabObject.id, e.target.value, 'tabs')}
                                variant="outlined"
                                sx={{ flexGrow: 1 }}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <IconButton
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveTab(tabIndex, tabObject.id);
                                }}
                                size="small"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {values.tabsData?.filter(x => x.tabsIndex === tabObject.id).map((x, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                    <TextField
                                        size="small"
                                        label="Заголовок"
                                        value={x.header || ''}
                                        onChange={(e) => handleInputChange(x.id, e.target.value, 'tabsDataHeader')}
                                        variant="outlined"
                                        sx={{ width: '30%' }}
                                    />
                                    <TextField
                                        size="small"
                                        label="Содержимое"
                                        value={x.data || ''}
                                        onChange={(e) => handleInputChange(x.id, e.target.value, 'tabsDataData')}
                                        variant="outlined"
                                        multiline
                                        minRows={1}
                                        sx={{ width: '70%' }}
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveTabData(x.id)}
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            ))}

                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={() => handleAddToList('tabsData', tabObject.id)}
                            >
                                Добавить элемент
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Divider sx={{ my: 2 }} />

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('dropd')}
            >
                Добавить вкладку
            </Button>
        </Box>
    );
};

export default DropdownInput;
