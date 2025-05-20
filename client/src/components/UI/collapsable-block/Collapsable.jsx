import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import './Collapsable.scss';

function Collapsable({ title, children }) {
    const [isOpen, setOpen] = useState(false);

    return (
        <Accordion
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            expanded={isOpen}
            onChange={() => setOpen(!isOpen)}
            sx={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                '&:before': {
                    display: 'none',
                },
                mb: 2
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon 
                        component={motion.svg}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                }
                aria-controls="panel-content"
                id="panel-header"
                sx={{ 
                    py: 2,
                    cursor: 'pointer',
                    '&.Mui-expanded': {
                        minHeight: 'auto'
                    }
                }}
            >
                <Typography 
                    variant="subtitle1" 
                    fontWeight={420}
                    component={motion.p}
                    whileHover={{ scale: 1.01 }}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            
            <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <AnimatePresence>
                    {isOpen && (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            sx={{ overflow: 'hidden' }}
                        >
                            {typeof children === 'string' ? (
                                <Typography variant="body1">
                                    {children}
                                </Typography>
                            ) : (
                                children
                            )}
                        </Box>
                    )}
                </AnimatePresence>
            </AccordionDetails>
        </Accordion>
    );
}

export default Collapsable;