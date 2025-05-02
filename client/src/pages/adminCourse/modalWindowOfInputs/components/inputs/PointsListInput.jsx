import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const PointsListInput = ({ values, setValues }) => {
    const handleAddPoint = () => {
        setValues(prev => {
            const lastPointId = prev.points?.length > 0
                ? prev.points[prev.points.length - 1].id
                : 0;

            return {
                ...prev,
                points: [
                    ...(prev.points || []),
                    {
                        id: lastPointId + 1,
                        x: 0,
                        y: 0,
                        name: `Точка ${(prev.points?.length || 0) + 1}`
                    }
                ],
                list: [
                    ...(prev.list || []),
                    ['Текст']
                ]
            };
        });
    };

    const handleRemovePoint = (index) => {
        setValues(prev => {
            const updatedPoints = [...prev.points];
            const updatedList = [...prev.list];

            updatedPoints.splice(index, 1);
            updatedList.splice(index, 1);

            return {
                ...prev,
                points: updatedPoints,
                list: updatedList
            };
        });
    };

    const handlePointChange = (index, field, value) => {
        setValues(prev => {
            const updatedPoints = [...prev.points];

            if (field === 'x' || field === 'y') {
                updatedPoints[index][field] = parseInt(value, 10) || 0;
            } else {
                updatedPoints[index][field] = value;
            }

            return {
                ...prev,
                points: updatedPoints
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Расположение точек
            </Typography>

            {values.points?.map((point, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle2" fontWeight={500}>
                                    Точка {index + 1}
                                </Typography>
                            </Box>

                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemovePoint(index)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Координата X"
                                    value={point.x}
                                    onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                                    size="small"
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Координата Y"
                                    value={point.y}
                                    onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                                    size="small"
                                    InputProps={{
                                        inputProps: { min: 0 }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Название точки"
                                    value={point.name}
                                    onChange={(e) => handlePointChange(index, 'name', e.target.value)}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPoint}
            >
                Добавить точку
            </Button>
        </Box>
    );
};

export default PointsListInput;
