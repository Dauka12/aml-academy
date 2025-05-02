import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    IconButton,
    Paper,
    Tooltip,
    Typography
} from '@mui/material';
import React from 'react';

const ComponentItem = ({
    component,
    index,
    componentMap,
    onMoveUp,
    onMoveDown,
    onEdit,
    onDelete
}) => {
    const isConfigured = component.values !== null;

    if (!isConfigured) {
        return (
            <Paper
                variant="outlined"
                sx={{
                    p: 1.5,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: 'divider',
                    bgcolor: 'background.neutral'
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {component.name} (не настроен)
                </Typography>
                <Tooltip title="Настроить">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(index)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Paper>
        );
    }

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                mb: 1,
                position: 'relative',
                transition: 'all 0.2s',
                '&:hover': {
                    boxShadow: 3,
                    '& .action-buttons': {
                        opacity: 1,
                    }
                }
            }}
        >
            <Box>
                {componentMap[component.name] &&
                    React.createElement(componentMap[component.name], {
                        ...component.values,
                        key: index
                    })
                }
            </Box>

            <Box
                className="action-buttons"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1,
                    p: 0.5
                }}
            >
                <Tooltip title="Переместить вверх">
                    <IconButton
                        size="small"
                        onClick={() => onMoveUp(index)}
                        disabled={index === 0}
                        sx={{ color: index === 0 ? 'text.disabled' : 'primary.main' }}
                    >
                        <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Переместить вниз">
                    <IconButton
                        size="small"
                        onClick={() => onMoveDown(index)}
                        disabled={index === -1} // This would be the last index
                        sx={{ color: index === -1 ? 'text.disabled' : 'primary.main' }}
                    >
                        <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Редактировать">
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(index)}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Удалить">
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(index)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Paper>
    );
};

export default ComponentItem;
