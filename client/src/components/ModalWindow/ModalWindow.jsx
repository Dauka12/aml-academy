import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

import './ModalWindow.scss';

function ModalWindow({ setShowModal, title, children }) {
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            y: "100vh",
            opacity: 0
        }
    };

    return (
        <AnimatePresence>
            <Dialog
                open={true}
                onClose={() => setShowModal(false)}
                PaperComponent={motion.div}
                PaperProps={{
                    variants: dropIn,
                    initial: "hidden",
                    animate: "visible",
                    exit: "exit",
                    style: {
                        maxWidth: '700px',
                        maxHeight: '90vh',
                        borderRadius: '5px',
                        padding: '25px',
                        position: 'relative'
                    }
                }}
                BackdropComponent={motion.div}
                BackdropProps={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 }
                }}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle sx={{ p: 0, mb: 2 }}>
                    <Typography 
                        variant="h5" 
                        component="div" 
                        fontWeight={700}
                        color="text.primary"
                    >
                        {title}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowModal(false)}
                        sx={{
                            position: 'absolute',
                            right: 25,
                            top: 25,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ overflow: 'auto' }}>
                        {children}
                    </Box>
                </DialogContent>
            </Dialog>
        </AnimatePresence>
    );
}

export default ModalWindow;