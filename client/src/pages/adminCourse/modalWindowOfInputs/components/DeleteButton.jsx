import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

const DeleteButton = ({ onClick, size = 'small', tooltip = 'Удалить' }) => {
    return (
        <Tooltip title={tooltip}>
            <IconButton
                size={size}
                color="error"
                onClick={onClick}
                sx={{
                    visibility: 'visible', // Always visible
                    opacity: 0.8,
                    '&:hover': {
                        opacity: 1,
                        backgroundColor: 'rgba(211, 47, 47, 0.04)'
                    }
                }}
            >
                <DeleteOutlineIcon fontSize={size} />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteButton;
