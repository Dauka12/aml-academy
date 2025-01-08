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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import sfm_types from '../../../../components/data/sfm_types';

function CustomCalendar({ applyFilters }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [selectedType, setSelectedType] = useState('');
    const [courseTypes, setCourseTypes] = useState({
        course: false,
        webinar: false,
        module: false,
    });
    const { t } = useTranslation();
    const [formats, setFormats] = useState({
        online: false,
        offline: false,
        distance: false,
    });

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

    const handleApplyFilters = () => {
        applyFilters({
            startDate: startDate ? startDate.toDate() : null,
            endDate: endDate ? endDate.toDate() : null,
            selectedType,
            courseTypes,
            formats,
        });
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '8px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                    {t("Выберите дату")}
                </Typography>

                <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                        <DatePicker
                            label={"От"}
                            value={startDate}
                            onChange={(newDate) => setStartDate(newDate)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <div style={{height:'15px'}}></div>

                        <DatePicker
                            label={"До"}
                            value={endDate}
                            onChange={(newDate) => setEndDate(newDate)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginTop: '20px' }}>
                    <Typography variant="subtitle1">{t("Вид субъекта финансового мониторинга")}</Typography>
                    <Select fullWidth value={selectedType} onChange={handleTypeChange} displayEmpty>
                        <MenuItem value="">
                            <em>{t("Выбрать")}</em>
                        </MenuItem>
                        {
                            sfm_types.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))
                        }
                    </Select>

                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        {t("Вид обучения")}
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={courseTypes.course} onChange={handleCourseTypeChange} name="course" />
                            }
                            label={t("Курс")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={courseTypes.webinar} onChange={handleCourseTypeChange} name="webinar" />
                            }
                            label={t("Бесплатный вебинар")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={courseTypes.module} onChange={handleCourseTypeChange} name="module" />
                            }
                            label={t("Модуль")}
                        />
                    </FormGroup>

                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        {t("Формат обучения")}
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={formats.online} onChange={handleFormatChange} name="online" />
                            }
                            label={t("Онлайн")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formats.offline} onChange={handleFormatChange} name="offline" />
                            }
                            label={t("Офлайн")}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formats.distance} onChange={handleFormatChange} name="distance" />
                            }
                            label={t("Дистанционное обучение")}
                        />
                    </FormGroup>

                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#1F3C88' }}
                                fullWidth
                                onClick={handleApplyFilters}  // Применение фильтров при нажатии
                            >
                                {t("Применить")}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" sx={{ color: '#1F3C88', borderColor: '#1F3C88' }} fullWidth onClick={()=>{window.location.reload()}}>
                                {t("Очистить")}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </LocalizationProvider>
    );
}

export default CustomCalendar;
