import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import './Lectors.scss';

function Lectors({ lectors }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <Box
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
        >
            <Grid container spacing={3}>
                {lectors.map((lector, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            component={motion.div}
                            variants={item}
                            whileHover={{ 
                                y: -5, 
                                boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)' 
                            }}
                            sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                p: 2
                            }}
                            elevation={2}
                        >
                            <Avatar
                                src={lector.img}
                                alt={lector.name}
                                sx={{ 
                                    width: 95, 
                                    height: 100,
                                    borderRadius: 1, 
                                    mr: 2 
                                }}
                                variant="rounded"
                            />
                            <Box>
                                <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                                    {lector.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {lector.text}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Lectors;