import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Box, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import './FeedBacks.scss';

function FeedBacks({ feedBacks }) {
    const [showFeedBacks, setShowFeedbacks] = useState([
        { 
            img: '',
            name: '', 
            text: ''
        }
    ]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        if (!feedBacks) return;
        let _maxPage = Math.ceil(feedBacks?.length / 3);
        setMaxPage(_maxPage);

        let _showFeedBacks = [feedBacks[page * 3 - 3], feedBacks[page * 3 - 2], feedBacks[page * 3 - 1]]

        setShowFeedbacks(_showFeedBacks);
    }, [feedBacks])

    useEffect(() => {
        if (!feedBacks) return;
        let _showFeedBacks = [feedBacks[page * 3 - 3], feedBacks[page * 3 - 2], feedBacks[page * 3 - 1]]

        setShowFeedbacks(_showFeedBacks);
    }, [page])

    if (feedBacks === undefined || feedBacks === null || feedBacks?.length === 0) return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            sx={{ textAlign: 'center', py: 4 }}
        >
            <Typography variant="h5" color="text.secondary">
                Нет отзывов
            </Typography>
        </Box>
    );

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
        <>
        <Box 
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
        >
            <Grid container spacing={2}>
                {showFeedBacks ? showFeedBacks.map((feedBack, index) => {
                    if (!feedBack) return null;

                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper
                                component={motion.div}
                                variants={item}
                                whileHover={{ y: -5, boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)' }}
                                sx={{ 
                                    p: 2, 
                                    height: 177, 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    bgcolor: '#e9e9e9'
                                }}
                                elevation={2}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ width: 60, height: 60, bgcolor: 'white', color: 'text.primary', mr: 2, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                        {feedBack.user ? feedBack.user.firstname.substring(0, 1) : ''}
                                        {feedBack.user ? feedBack.user.lastname.substring(0, 1) : ''}
                                    </Avatar>
                                    <Typography variant="subtitle1" fontWeight={500}>
                                        {feedBack.user ? `${feedBack.user.firstname} ${feedBack.user.lastname} ${feedBack.user.patronymic || ''}` : ''}
                                    </Typography>
                                </Box>
                                <Typography variant="body2">
                                    {feedBack.comment}
                                </Typography>
                            </Paper>
                        </Grid>
                    )
                }) : null}
            </Grid>
        </Box>

        {maxPage > 1 && (
            <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="center" 
                sx={{ mt: 4 }}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <IconButton 
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                
                {[...Array(maxPage)].map((_, i) => (
                    <IconButton 
                        key={i}
                        color={i+1 === page ? "primary" : "default"}
                        onClick={() => setPage(i+1)}
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{ 
                            bgcolor: i+1 === page ? 'primary.main' : 'secondary.main',
                            color: i+1 === page ? 'white' : 'text.primary',
                            '&:hover': {
                                bgcolor: i+1 === page ? 'primary.dark' : 'secondary.dark',
                            }
                        }}
                    >
                        {i+1}
                    </IconButton>
                ))}
                
                <IconButton 
                    disabled={page === maxPage}
                    onClick={() => setPage(p => Math.min(maxPage, p + 1))}
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Stack>
        )}
        </>
    );
}

export default FeedBacks;