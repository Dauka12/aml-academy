import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import Elements_level_2 from '../../../AdminPage_v2/constructor/Elements_level_2';

const ComponentPalette = ({ onSelectComponent }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [category, setCategory] = useState('');

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setCategory('');
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setCategory('');
    };

    const handleSelectCategory = (cat) => {
        setCategory(cat);
    };

    const handleSelectComponent = (component) => {
        onSelectComponent(component);
        handleCloseMenu();
    };

    return (
        <>
            <Tooltip title="Добавить компонент">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddBoxIcon />}
                    onClick={handleOpenMenu}
                    size="small"
                >
                    Добавить компонент
                </Button>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    sx: {
                        maxHeight: 500,
                        width: '300px',
                        overflow: 'auto',
                    }
                }}
            >
                {category === '' ? (
                    <>
                        <Typography variant="subtitle2" sx={{ p: 1.5, pb: 0.5 }}>
                            Выберите категорию
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        {Object.keys(Elements_level_2).map((elementCategory) => (
                            <MenuItem
                                key={elementCategory}
                                onClick={() => handleSelectCategory(elementCategory)}
                                sx={{
                                    height: 42,
                                    '&:hover': { bgcolor: 'primary.lighter' }
                                }}
                            >
                                <Typography variant="body2">{elementCategory}</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <MoreVertIcon fontSize="small" color="action" />
                            </MenuItem>
                        ))}
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                            <IconButton
                                size="small"
                                onClick={() => setCategory('')}
                                sx={{ mr: 1 }}
                            >
                                <ArrowBackIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="subtitle2">
                                {category}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 1 }}>
                            {Elements_level_2[category] && Object.keys(Elements_level_2[category]).map((element) => (
                                <Chip
                                    key={element}
                                    label={element}
                                    onClick={() => handleSelectComponent(Elements_level_2[category][element])}
                                    sx={{
                                        m: 0.5,
                                        '&:hover': {
                                            bgcolor: 'primary.lighter',
                                            boxShadow: 1
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </>
                )}
            </Menu>
        </>
    );
};

export default ComponentPalette;
