import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from '@mui/material';
import React from 'react';

export default function Confirm({ course_title, course_id, closeModal, deleteCourse }) {
    return (
        <Dialog
            open={true}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1,
                    width: 600,
                    maxWidth: '90vw'
                }
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ color: '#374761', fontWeight: 700, fontSize: 24 }}>
                Вы уверены что хотите удалить курс:
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography component="pre" sx={{ fontWeight: 500 }}>
                        {course_title}?
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    onClick={closeModal} 
                    sx={{ 
                        bgcolor: 'rgba(0, 0, 0, 0.103)',
                        color: '#0000007a',
                        border: '1px solid rgba(0, 0, 0, 0.13)',
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.267)',
                        }
                    }}
                >
                    НЕТ
                </Button>
                <Button 
                    onClick={() => deleteCourse(course_id)}
                    sx={{ 
                        bgcolor: '#374761',
                        color: 'white',
                        border: '1px solid #37476191',
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        '&:hover': {
                            bgcolor: '#374761b0',
                        }
                    }}
                    autoFocus
                >
                    ДА
                </Button>
            </DialogActions>
        </Dialog>
    );
}
