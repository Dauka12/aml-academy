import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';

const CourseInfoFields = ({ 
    title, setTitle,
    audience, setAudience,
    lang, setLang,
    category, setCategory,
    price, setPrice,
    academicHours, setAcademicHours,
    typeofstudy, setTypeOfStudy,
    formErrors
}) => {
    return (
        <>
            <Typography 
                variant="h5" 
                component="h2" 
                color="primary.main"
                fontWeight={500}
                gutterBottom
            >
                Название курса
            </Typography>
            
            <TextField
                fullWidth
                label="Введите название курса"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!formErrors.title}
                helperText={formErrors.title}
                margin="normal"
                sx={{ mb: 3 }}
            />
            
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!formErrors.audience}>
                        <InputLabel>Аудитория (Тип Субъекта)</InputLabel>
                        <Select
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                            label="Аудитория (Тип Субъекта)"
                        >
                            <MenuItem value="">--Выберите тип субъекта--</MenuItem>
                            <MenuItem value="Государственные органы-регуляторы">Государственные органы-регуляторы</MenuItem>
                            <MenuItem value="Субъект финансового мониторнга">Субъект финансового мониторнга</MenuItem>
                            <MenuItem value="Правоохранительные">Правоохранительные органы</MenuItem>
                            <MenuItem value="Общественное объединение">Общественное объединение</MenuItem>
                            <MenuItem value="Для всех субъектов">Для всех субъектов</MenuItem>
                        </Select>
                        {formErrors.audience && <FormHelperText>{formErrors.audience}</FormHelperText>}
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!formErrors.lang}>
                        <InputLabel>Язык курса</InputLabel>
                        <Select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            label="Язык курса"
                        >
                            <MenuItem value="">--Выберите язык курса--</MenuItem>
                            <MenuItem value="ru">Русский</MenuItem>
                            <MenuItem value="en">Английский</MenuItem>
                            <MenuItem value="kz">Казахский</MenuItem>
                        </Select>
                        {formErrors.lang && <FormHelperText>{formErrors.lang}</FormHelperText>}
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!formErrors.category}>
                        <InputLabel>Категория</InputLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Категория"
                        >
                            <MenuItem value="">--Выберите категорию--</MenuItem>
                            <MenuItem value={1}>AML Academy</MenuItem>
                        </Select>
                        {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
                    </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Цена"
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={!!formErrors.price}
                        helperText={formErrors.price}
                        inputProps={{ min: 0 }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Академические часы"
                        type="number"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    ч.
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        value={academicHours}
                        onChange={(e) => setAcademicHours(Math.max(0, parseInt(e.target.value) || 0))}
                        error={!!formErrors.academicHours}
                        helperText={formErrors.academicHours}
                        inputProps={{ min: 1 }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!formErrors.typeofstudy}>
                        <InputLabel>Тип обучения</InputLabel>
                        <Select
                            value={typeofstudy}
                            onChange={(e) => setTypeOfStudy(e.target.value)}
                            label="Тип обучения"
                        >
                            <MenuItem value="дистанционное">Дистанционное</MenuItem>
                            <MenuItem value="онлайн">Онлайн</MenuItem>
                        </Select>
                        {formErrors.typeofstudy && <FormHelperText>{formErrors.typeofstudy}</FormHelperText>}
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};

export default CourseInfoFields;
