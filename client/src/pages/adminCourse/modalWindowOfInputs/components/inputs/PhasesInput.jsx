import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';

const PhasesInput = ({ values, setValues }) => {
    const handleAddPhase = () => {
        setValues(prev => ({
            ...prev,
            phases: [
                ...(prev.phases || []),
                {
                    title: 'Новая фаза',
                    phases: []
                }
            ]
        }));
    };

    const handleRemovePhase = (phaseIndex) => {
        setValues(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases.splice(phaseIndex, 1);

            return {
                ...prev,
                phases: updatedPhases
            };
        });
    };

    const handlePhaseTitleChange = (phaseIndex, value) => {
        setValues(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases[phaseIndex].title = value;

            return {
                ...prev,
                phases: updatedPhases
            };
        });
    };

    const handleAddPhaseItem = (phaseIndex) => {
        setValues(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases[phaseIndex].phases.push({
                title: '',
                name: '',
                shortDescription: '',
                longDescription: ''
            });

            return {
                ...prev,
                phases: updatedPhases
            };
        });
    };

    const handleRemovePhaseItem = (phaseIndex, itemIndex) => {
        setValues(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases[phaseIndex].phases.splice(itemIndex, 1);

            return {
                ...prev,
                phases: updatedPhases
            };
        });
    };

    const handlePhaseItemChange = (phaseIndex, itemIndex, field, value) => {
        setValues(prev => {
            const updatedPhases = [...prev.phases];
            updatedPhases[phaseIndex].phases[itemIndex][field] = value;

            return {
                ...prev,
                phases: updatedPhases
            };
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                Фазы процесса
            </Typography>

            {values.phases?.map((phase, phaseIndex) => (
                <Card key={phaseIndex} variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <TextField
                                size="small"
                                label="Название фазы"
                                value={phase.title || ''}
                                onChange={(e) => handlePhaseTitleChange(phaseIndex, e.target.value)}
                                sx={{ width: '70%' }}
                            />

                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => handleRemovePhase(phaseIndex)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Этапы фазы
                        </Typography>

                        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Обозначение</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Название</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Краткое описание</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Полное описание</TableCell>
                                        <TableCell sx={{ width: 50 }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {phase.phases.map((item, itemIndex) => (
                                        <TableRow key={itemIndex}>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={item.title || ''}
                                                    onChange={(e) => handlePhaseItemChange(phaseIndex, itemIndex, 'title', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={item.name || ''}
                                                    onChange={(e) => handlePhaseItemChange(phaseIndex, itemIndex, 'name', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    multiline
                                                    value={item.shortDescription || ''}
                                                    onChange={(e) => handlePhaseItemChange(phaseIndex, itemIndex, 'shortDescription', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    multiline
                                                    rows={2}
                                                    value={item.longDescription || ''}
                                                    onChange={(e) => handlePhaseItemChange(phaseIndex, itemIndex, 'longDescription', e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleRemovePhaseItem(phaseIndex, itemIndex)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            size="small"
                            onClick={() => handleAddPhaseItem(phaseIndex)}
                        >
                            Добавить этап
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddPhase}
            >
                Добавить фазу
            </Button>
        </Box>
    );
};

export default PhasesInput;
