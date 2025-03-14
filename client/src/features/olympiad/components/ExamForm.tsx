import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createExamThunk } from '../store/slices/examSlice.ts';
import { ExamCreateRequest } from '../types/exam.ts';

const ExamForm: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.exam);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState<ExamCreateRequest>({
        nameRus: '',
        nameKaz: '',
        typeRus: '',
        typeKaz: '',
        startTime: new Date().toISOString(),
        durationInMinutes: 60,
        questions: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData(prev => ({ ...prev, startTime: date.toISOString() }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createExamThunk(formData));
        setSubmitted(true);
    };

    useEffect(() => {
        if (submitted && !loading && !error) {
            setFormData({
                nameRus: '',
                nameKaz: '',
                typeRus: '',
                typeKaz: '',
                startTime: new Date().toISOString(),
                durationInMinutes: 60,
                questions: []
            });
            setSubmitted(false);
        }
    }, [loading, error, submitted]);

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Создать экзамен
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Название (Рус)"
                            name="nameRus"
                            value={formData.nameRus}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Название (Каз)"
                            name="nameKaz"
                            value={formData.nameKaz}
                            onChange={handleChange}
                            fullWidth
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="type-rus-label">Тип (Рус)</InputLabel>
                            <Select
                                labelId="type-rus-label"
                                name="typeRus"
                                value={formData.typeRus}
                                onChange={handleTypeChange}
                                label="Тип (Рус)"
                                required
                            >
                                <MenuItem value="Тест">Тест</MenuItem>
                                <MenuItem value="Экзамен">Экзамен</MenuItem>
                                <MenuItem value="Промежуточный контроль">Промежуточный контроль</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="type-kaz-label">Тип (Каз)</InputLabel>
                            <Select
                                labelId="type-kaz-label"
                                name="typeKaz"
                                value={formData.typeKaz}
                                onChange={handleTypeChange}
                                label="Тип (Каз)"
                                required
                            >
                                <MenuItem value="Тест">Тест</MenuItem>
                                <MenuItem value="Емтихан">Емтихан</MenuItem>
                                <MenuItem value="Аралық бақылау">Аралық бақылау</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                            <DateTimePicker
                                label="Время начала"
                                value={new Date(formData.startTime || '')}
                                onChange={handleDateChange}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        variant: "outlined"
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Длительность (мин)"
                            name="durationInMinutes"
                            value={formData.durationInMinutes}
                            onChange={(e) => setFormData(prev => ({ ...prev, durationInMinutes: parseInt(e.target.value) || 0 }))}
                            fullWidth
                            required
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 1 }}
                        />
                    </Grid>

                    {error && (
                        <Grid item xs={12}>
                            <Alert severity="error">{error}</Alert>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Создание...' : 'Создать экзамен'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default ExamForm;