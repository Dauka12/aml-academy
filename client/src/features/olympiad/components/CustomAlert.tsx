import { Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface CustomAlertProps {
    message: string;
    severity?: 'error' | 'warning' | 'info' | 'success';
    onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
    message,
    severity = 'error',
    onClose
}) => {
    // Color based on severity
    const getBgColor = () => {
        switch (severity) {
            case 'error': return '#FEE2E2';
            case 'warning': return '#FEF3C7';
            case 'info': return '#E0F2FE';
            case 'success': return '#D1FAE5';
            default: return '#FEE2E2';
        }
    };

    const getTextColor = () => {
        switch (severity) {
            case 'error': return '#B91C1C';
            case 'warning': return '#92400E';
            case 'info': return '#0369A1';
            case 'success': return '#065F46';
            default: return '#B91C1C';
        }
    };

    const getBorderColor = () => {
        switch (severity) {
            case 'error': return '#F87171';
            case 'warning': return '#FBBF24';
            case 'info': return '#38BDF8';
            case 'success': return '#34D399';
            default: return '#F87171';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                top: '20px',
                zIndex: 10000,
                width: '100%',
                maxWidth: '515px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: getBgColor(),
                    color: getTextColor(),
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${getBorderColor()}`,
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={500}>
                        {message}
                    </Typography>
                </Box>
                {onClose && (
                    <IconButton
                        size="small"
                        onClick={onClose}
                        sx={{ color: getTextColor(), ml: 1 }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
        </motion.div>
    );
};

export default CustomAlert;
