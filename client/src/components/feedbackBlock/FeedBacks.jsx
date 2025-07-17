import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Box, Grid, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState, useRef } from 'react';

import './FeedBacks.scss';
import './FeedbacksAnimations.css';

function FeedBacks({ feedBacks }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const [showFeedBacks, setShowFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [direction, setDirection] = useState(0);
    const carouselRef = useRef(null);

    // Определяем количество элементов на странице в зависимости от размера экрана
    const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3;

    // Обработка пагинации
    useEffect(() => {
        if (!feedBacks || feedBacks.length === 0) return;
        
        const _maxPage = Math.ceil(feedBacks.length / itemsPerPage);
        setMaxPage(_maxPage);
        
        if (page > _maxPage) {
            setPage(1);
        }
    }, [feedBacks, itemsPerPage, page]);

    useEffect(() => {
        if (!feedBacks || feedBacks.length === 0) return;
        
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const _showFeedBacks = feedBacks.slice(startIndex, endIndex);
        
        setShowFeedbacks(_showFeedBacks);
    }, [feedBacks, page, itemsPerPage]);

    // Навигация с клавиатуры
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!carouselRef.current?.contains(document.activeElement)) return;
            
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    handleNext();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [page, maxPage]);

    const handleNext = useCallback(() => {
        if (page < maxPage) {
            setDirection(1);
            setPage(page + 1);
        }
    }, [page, maxPage]);

    const handlePrevious = useCallback(() => {
        if (page > 1) {
            setDirection(-1);
            setPage(page - 1);
        }
    }, [page]);

    const handlePageClick = useCallback((newPage) => {
        setDirection(newPage > page ? 1 : -1);
        setPage(newPage);
    }, [page]);

    if (!feedBacks || feedBacks.length === 0) {
        return (
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
    }

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

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
            ref={carouselRef}
            sx={{ 
                position: 'relative',
                '&:focus-within': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: '2px'
                }
            }}
            role="region"
            aria-label="Отзывы студентов"
            tabIndex={0}
        >
            {/* Skip Links для доступности */}
            <Box 
                sx={{ 
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: { xs: 220, sm: 200, md: 200 }
                }}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        style={{ 
                            position: 'absolute',
                            width: '100%',
                            top: 0,
                            left: 0
                        }}
                    >
                        <Grid 
                            container 
                            spacing={2}
                            component={motion.div}
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {showFeedBacks.map((feedBack, index) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={itemsPerPage === 1 ? 12 : 6} 
                                    md={itemsPerPage === 3 ? 4 : itemsPerPage === 2 ? 6 : 12} 
                                    key={`${page}-${index}`}
                                >
                                    <Paper
                                        component={motion.div}
                                        variants={item}
                                        whileHover={{ 
                                            y: -8, 
                                            boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.15)',
                                            transition: { duration: 0.2 }
                                        }}                        sx={{ 
                            p: 3, 
                            height: { xs: 180, sm: 200 },
                            display: 'flex', 
                            flexDirection: 'column',
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            position: 'relative'
                        }}
                                        elevation={3}
                                        role="article"
                                        aria-label={`Отзыв от ${feedBack.user ? `${feedBack.user.firstname} ${feedBack.user.lastname}` : 'Анонимного пользователя'}`}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar 
                                                sx={{ 
                                                    width: { xs: 50, sm: 60 }, 
                                                    height: { xs: 50, sm: 60 }, 
                                                    bgcolor: 'primary.main', 
                                                    color: 'white', 
                                                    mr: 2,
                                                    fontSize: { xs: '1rem', sm: '1.2rem' },
                                                    fontWeight: 600,
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                                }}
                                            >
                                                {feedBack.user ? `${feedBack.user.firstname.substring(0, 1)}${feedBack.user.lastname.substring(0, 1)}` : 'А'}
                                            </Avatar>
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography 
                                                    variant="subtitle1" 
                                                    fontWeight={600}
                                                    sx={{ 
                                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                                        lineHeight: 1.2,
                                                        color: 'text.primary'
                                                    }}
                                                    noWrap
                                                >
                                                    {feedBack.user ? `${feedBack.user.firstname} ${feedBack.user.lastname}` : 'Анонимный пользователь'}
                                                </Typography>
                                                {feedBack.user?.patronymic && (
                                                    <Typography 
                                                        variant="caption" 
                                                        color="text.secondary"
                                                        sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}
                                                    >
                                                        {feedBack.user.patronymic}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                flex: 1,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: { xs: 4, sm: 5 },
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: 1.4,
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    WebkitLineClamp: 'unset',
                                                    display: 'block',
                                                    overflow: 'visible',
                                                    maxHeight: 'none'
                                                }
                                            }}
                                            component={motion.div}
                                            whileHover={{
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <Tooltip 
                                                title={feedBack.comment} 
                                                placement="top"
                                                arrow
                                                componentsProps={{
                                                    tooltip: {
                                                        sx: {
                                                            maxWidth: 400,
                                                            fontSize: '0.85rem',
                                                            lineHeight: 1.4,
                                                            padding: 2
                                                        }
                                                    }
                                                }}
                                            >
                                                <span>
                                                    {feedBack.comment}
                                                </span>
                                            </Tooltip>
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </AnimatePresence>
            </Box>

            {maxPage > 1 && (
                <Stack 
                    id="feedback-navigation"
                    direction="row" 
                    spacing={1} 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{ mt: 4 }}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Кнопка "Назад" */}
                    <IconButton 
                        disabled={page === 1}
                        onClick={handlePrevious}
                        component={motion.button}
                        whileHover={{ scale: page === 1 ? 1 : 1.1 }}
                        whileTap={{ scale: page === 1 ? 1 : 0.9 }}
                        sx={{ 
                            bgcolor: 'background.paper',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover:not(:disabled)': {
                                bgcolor: 'action.hover'
                            },
                            '&:disabled': {
                                opacity: 0.5
                            }
                        }}
                        aria-label="Предыдущая страница"
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    
                    {/* Пагинация */}
                    <Box 
                        sx={{ display: 'flex', gap: 0.5 }}
                        role="tablist"
                        aria-label="Навигация по отзывам"
                    >
                        {[...Array(maxPage)].map((_, i) => (
                            <IconButton 
                                key={i}
                                onClick={() => handlePageClick(i + 1)}
                                component={motion.button}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                sx={{ 
                                    width: 40,
                                    height: 40,
                                    bgcolor: i + 1 === page ? 'primary.main' : 'background.paper',
                                    color: i + 1 === page ? 'white' : 'text.primary',
                                    border: `1px solid ${i + 1 === page ? 'transparent' : theme.palette.divider}`,
                                    '&:hover': {
                                        bgcolor: i + 1 === page ? 'primary.dark' : 'action.hover',
                                    },
                                    fontSize: '0.9rem',
                                    fontWeight: i + 1 === page ? 600 : 400
                                }}
                                role="tab"
                                aria-selected={i + 1 === page}
                                aria-label={`Страница ${i + 1} из ${maxPage}`}
                            >
                                {i + 1}
                            </IconButton>
                        ))}
                    </Box>
                    
                    {/* Кнопка "Вперед" */}
                    <IconButton 
                        disabled={page === maxPage}
                        onClick={handleNext}
                        component={motion.button}
                        whileHover={{ scale: page === maxPage ? 1 : 1.1 }}
                        whileTap={{ scale: page === maxPage ? 1 : 0.9 }}
                        sx={{ 
                            bgcolor: 'background.paper',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover:not(:disabled)': {
                                bgcolor: 'action.hover'
                            },
                            '&:disabled': {
                                opacity: 0.5
                            }
                        }}
                        aria-label="Следующая страница"
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                </Stack>
            )}
        </Box>
    );
}
export default FeedBacks;