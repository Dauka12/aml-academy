import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import AdvancedInput from '../../AdvancedInput';

const ListWithTabsInput = ({ values, setValues }) => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleAddTab = () => {
        setValues(prev => ({
            ...prev,
            dataBtn: [...(prev.dataBtn || []), `Вкладка ${(prev.dataBtn?.length || 0) + 1}`],
            data: [...(prev.data || []), []]
        }));
    };

    const handleRemoveTab = (index) => {
        setValues(prev => {
            const updatedDataBtn = [...prev.dataBtn];
            const updatedData = [...prev.data];

            updatedDataBtn.splice(index, 1);
            updatedData.splice(index, 1);

            // Update selected tab if needed
            if (selectedTab >= updatedDataBtn.length) {
                setSelectedTab(Math.max(0, updatedDataBtn.length - 1));
            }

            return {
                ...prev,
                dataBtn: updatedDataBtn,
                data: updatedData
            };
        });
    };

    const handleTabNameChange = (index, value) => {
        setValues(prev => {
            const updatedDataBtn = [...prev.dataBtn];
            updatedDataBtn[index] = value;

            return {
                ...prev,
                dataBtn: updatedDataBtn
            };
        });
    };

    const handleTabContentChange = (index, content) => {
        setValues(prev => {
            const updatedData = [...prev.data];
            updatedData[index] = content;

            return {
                ...prev,
                data: updatedData
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Вкладки с компонентами
            </Typography>

            {values.dataBtn?.length > 0 && (
                <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 0 }}>
                        <Tabs
                            value={selectedTab}
                            onChange={(_, newValue) => setSelectedTab(newValue)}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{ borderBottom: 1, borderColor: 'divider' }}
                        >
                            {values.dataBtn?.map((tabName, index) => (
                                <Tab
                                    key={index}
                                    label={tabName || `Вкладка ${index + 1}`}
                                    sx={{ textTransform: 'none' }}
                                />
                            ))}
                        </Tabs>

                        {values.dataBtn?.map((tabName, index) => (
                            <Box
                                key={index}
                                role="tabpanel"
                                hidden={selectedTab !== index}
                                sx={{ p: 3 }}
                            >
                                {selectedTab === index && (
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                label="Название вкладки"
                                                size="small"
                                                value={tabName}
                                                onChange={(e) => handleTabNameChange(index, e.target.value)}
                                                sx={{ mr: 2 }}
                                            />

                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => handleRemoveTab(index)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Содержимое вкладки
                                        </Typography>

                                        <Box sx={{ bgcolor: 'background.neutral', p: 2, borderRadius: 1 }}>
                                            <AdvancedInput
                                                content={values.data[index] || []}
                                                handleSave={(content) => handleTabContentChange(index, content)}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            )}

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddTab}
            >
                Добавить вкладку
            </Button>
        </Box>
    );
};

export default ListWithTabsInput;
