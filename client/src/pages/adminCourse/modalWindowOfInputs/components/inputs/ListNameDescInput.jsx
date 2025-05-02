import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import DeleteButton from '../DeleteButton';

const ListNameDescInput = ({
    input,
    values,
    handleInputChange,
    handleInputChangeArrayInObject,
    handleAddToList
}) => {
    const [expandedItems, setExpandedItems] = React.useState({});

    const toggleExpand = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleRemoveGroup = (index) => {
        const updatedList = [...values.list];
        updatedList.splice(index, 1);

        handleInputChange(null, updatedList, 'list');
    };

    const handleRemoveItem = (itemIndex, groupIndex) => {
        const updatedList = [...values.list];
        const updatedItems = [...updatedList[groupIndex].items];

        updatedItems.splice(itemIndex, 1);
        updatedList[groupIndex].items = updatedItems;

        handleInputChange(null, updatedList, 'list');
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                {input.label}
            </Typography>

            {values.list?.map((group, groupIndex) => (
                <Card
                    key={groupIndex}
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    <CardHeader
                        title={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TextField
                                    label="Название"
                                    value={group.name || ''}
                                    onChange={(e) => handleInputChange(groupIndex, e.target.value, 'listName')}
                                    size="small"
                                    fullWidth
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => toggleExpand(groupIndex)}
                                >
                                    {expandedItems[groupIndex] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                                <DeleteButton onClick={() => handleRemoveGroup(groupIndex)} />
                            </Box>
                        }
                        sx={{ pb: 0 }}
                    />

                    <CardContent sx={{ pt: 1 }}>
                        <TextField
                            label="Описание"
                            value={group.description || ''}
                            onChange={(e) => handleInputChange(groupIndex, e.target.value, 'listDescription')}
                            multiline
                            minRows={2}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        {expandedItems[groupIndex] && (
                            <>
                                <Divider sx={{ my: 2 }} />

                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Элементы списка
                                </Typography>

                                <List dense>
                                    {group.items?.map((item, itemIndex) => (
                                        <ListItem
                                            key={itemIndex}
                                            secondaryAction={
                                                <DeleteButton onClick={() => handleRemoveItem(itemIndex, groupIndex)} />
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    <TextField
                                                        fullWidth
                                                        value={item || ''}
                                                        onChange={(e) => handleInputChangeArrayInObject(itemIndex, e.target.value, groupIndex, 'listItems')}
                                                        size="small"
                                                        variant="standard"
                                                    />
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                <Button
                                    startIcon={<AddIcon />}
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleAddToList('dropDownListItems', groupIndex)}
                                    sx={{ mt: 1 }}
                                >
                                    Добавить элемент
                                </Button>
                            </>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleAddToList('listNameDescroptionItems')}
            >
                Добавить группу
            </Button>
        </Box>
    );
};

export default ListNameDescInput;
