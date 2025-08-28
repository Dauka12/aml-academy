import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router";

const CourseBlock = ({ x, index, setDeletingCourse, setCourse, publishCourse }) => {
    const navigate = useNavigate();
    
    // Check if course is already published (not in draft mode)
    const isPublished = !x.draft;

    return (
        <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 2,
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.13)'
        }}>
            <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    image={x.course_image}
                    alt={x.course_name}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {x.course_id}. {x.course_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    Цена: {x.course_price}₸
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Аудитория: {x.course_for_member_of_the_system}
                </Typography>
                {isPublished && (
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mt: 1, 
                            color: 'green',
                            fontWeight: 'bold' 
                        }}
                    >
                        Опубликован
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0, justifyContent: 'flex-end' }}>
                <IconButton 
                    aria-label="delete"
                    onClick={() => {
                        setDeletingCourse(true);
                        setCourse(x.course_id, x.course_name);
                    }}
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
                    onClick={() => { navigate('/new-admin-page/?id=' + x.course_id); }}
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
                {/* Only show publish button for draft courses */}
                {!isPublished && (
                    <Button
                        variant="contained"
                        startIcon={<PublishIcon />}
                        onClick={() => publishCourse(x.course_id)}
                        sx={{ 
                            bgcolor: '#374761',
                            ml: 1,
                            '&:hover': { 
                                bgcolor: '#374761b4',
                            }
                        }}
                    >
                        Опубликовать
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default CourseBlock;