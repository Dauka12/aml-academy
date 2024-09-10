import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // Импорт локали русского языка
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React, { useState } from 'react';

// Подключаем плагин локализации
dayjs.extend(localizedFormat);
dayjs.locale('ru'); // Применение русской локали

function CustomCalendar() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedType, setSelectedType] = useState('');
    const [courseTypes, setCourseTypes] = useState({
        course: false,
        webinar: false,
        module: false,
    });
    const [formats, setFormats] = useState({
        online: false,
        offline: false,
        distance: false,
    });

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleCourseTypeChange = (event) => {
        setCourseTypes({
            ...courseTypes,
            [event.target.name]: event.target.checked,
        });
    };

    const handleFormatChange = (event) => {
        setFormats({
            ...formats,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <Paper
                elevation={3}
                style={{
                    padding: '20px',
                    backgroundColor: '#F7F7F7',
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Выберите дату
                </Typography>

                <Grid container justifyContent="center"  spacing={2}>
                    <Grid item>
                        <DatePicker
                            label="Выбрать дату"
                            value={selectedDate}
                            onChange={handleDateChange}
                            sx={{}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginTop: '20px' }}>
                    <Typography variant="subtitle1">Вид субъекта финансового мониторинга</Typography>
                    <Select
                        fullWidth
                        value={selectedType}
                        onChange={handleTypeChange}
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Выбрать</em>
                        </MenuItem>
                        <MenuItem value="type1">Тип 1</MenuItem>
                        <MenuItem value="type2">Тип 2</MenuItem>
                    </Select>

                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        Вид обучения
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={courseTypes.course}
                                    onChange={handleCourseTypeChange}
                                    name="course"
                                />
                            }
                            label="Курс"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={courseTypes.webinar}
                                    onChange={handleCourseTypeChange}
                                    name="webinar"
                                />
                            }
                            label="Бесплатный вебинар"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={courseTypes.module}
                                    onChange={handleCourseTypeChange}
                                    name="module"
                                />
                            }
                            label="Модуль"
                        />
                    </FormGroup>

                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        Формат обучения
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formats.online}
                                    onChange={handleFormatChange}
                                    name="online"
                                />
                            }
                            label="Онлайн"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formats.offline}
                                    onChange={handleFormatChange}
                                    name="offline"
                                />
                            }
                            label="Офлайн"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formats.distance}
                                    onChange={handleFormatChange}
                                    name="distance"
                                />
                            }
                            label="Дистанционное обучение"
                        />
                    </FormGroup>

                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={6}>
                            <Button variant="contained" sx={{backgroundColor:'#1F3C88'}} fullWidth>
                                Применить
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" sx={{color:'#1F3C88', borderColor:'#1F3C88'}} fullWidth>
                                Очистить
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </LocalizationProvider>
    );
}

export default CustomCalendar;
