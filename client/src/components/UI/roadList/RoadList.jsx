import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Icon, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

import './RoadList.scss';

function RoadList({ items }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <Box
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
            sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 6
            }}
        >
            {items.map((el, index) => {
                const showArrow = index !== 0;

                return (
                    <React.Fragment key={index}>
                        {showArrow && (
                            <motion.div variants={item}>
                                <Icon 
                                    component={ArrowForwardIcon} 
                                    sx={{ color: 'primary.main', fontSize: 30 }} 
                                />
                            </motion.div>
                        )}
                        
                        <Paper
                            component={motion.div}
                            variants={item}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)' 
                            }}
                            sx={{ 
                                width: 160, 
                                height: 131, 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: '#e9e9e9',
                                textAlign: 'center',
                                p: 2
                            }}
                            elevation={2}
                        >
                            {typeof el === 'string' ? (
                                <Typography variant="body1" fontWeight={500}>
                                    {el}
                                </Typography>
                            ) : (
                                el
                            )}
                        </Paper>
                    </React.Fragment>
                );
            })}
        </Box>
    );
}

export default RoadList;