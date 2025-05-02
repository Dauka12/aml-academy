import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

const FileInput = ({ input, values, handleChange }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            handleChange(input.name, file, input.type);
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                {input.label}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    borderStyle: 'dashed',
                    borderColor: 'divider',
                }}
            >
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    color="primary"
                >
                    Выберите файл
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>

                <Typography variant="body2" color="text.secondary">
                    {fileName || 'Файл не выбран'}
                </Typography>

                {values[input.name] && (
                    <Box sx={{ mt: 2, maxWidth: '100%', maxHeight: 200, overflow: 'hidden' }}>
                        <img
                            src={values[input.name]}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default FileInput;
