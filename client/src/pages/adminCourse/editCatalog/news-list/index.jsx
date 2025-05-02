import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

const NewsList = ({ newsData, handleDelete }) => {
    const navigate = useNavigate();
    
    const getDate = (date) => {
        const _date = new Date(date);
        const day = String(_date.getDate()).padStart(2, '0');
        const month = String(_date.getMonth() + 1).padStart(2, '0'); 
        const year = _date.getFullYear();
        const hour = (_date.getHours() - 6);
        const minutes = _date.getMinutes();
        const formattedDate = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")},  ${day}.${month}.${year}`;
        return formattedDate;
    };
    
    return (
        <Grid container spacing={3}>
            {newsData.map((news, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                        <CardMedia
                            component="img"
                            height="230"
                            image={news.image}
                            alt={news.name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {news.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Дата: {getDate(news.date)}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
                            <IconButton 
                                aria-label="delete"
                                onClick={() => handleDelete(news.id)}
                                sx={{ 
                                    bgcolor: 'rgba(250, 9, 9, 0.671)',
                                    color: 'white',
                                    p: 1,
                                    '&:hover': { 
                                        bgcolor: 'rgba(250, 9, 9, 0.5)',
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton 
                                aria-label="edit"
                                onClick={() => navigate(`/change-news/${news.id}`)}
                                sx={{ 
                                    bgcolor: '#0051ff96',
                                    color: 'white',
                                    p: 1,
                                    ml: 1,
                                    '&:hover': { 
                                        bgcolor: '#0051ff70',
                                    }
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsList;
