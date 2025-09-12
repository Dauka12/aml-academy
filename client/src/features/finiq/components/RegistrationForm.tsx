import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Stack,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../api/examApi.ts';
import { getAllRegions, Region } from '../api/regionsApi.ts';
import { useOlympiadDispatch, useOlympiadSelector } from '../hooks/useOlympiadStore.ts';
import { registerStudentThunk } from '../store/slices/registrationSlice.ts';
import { RegisterStudentRequest } from '../types/student.ts';
import { TestCategory } from '../types/testCategory.ts';
import { ConfirmationModal } from './ConfirmationModal.tsx';

const MotionPaper = motion(Paper);

interface FormErrors {
    firstname?: string;
    lastname?: string;
    middlename?: string;
    iin?: string;
    phone?: string;
    organization?: string; // переименовал university в organization
    email?: string;
    password?: string;
    studyYear?: number;
    confirmPassword?: string;
    categoryId?: string;
    regionId?: string; // добавил regionId
}

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useOlympiadDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t, i18n } = useTranslation();
    const { isLoading, success, error, specificError } = useOlympiadSelector((state) => state.registration);

    const [categories, setCategories] = useState<TestCategory[]>([]);
    const [regions, setRegions] = useState<Region[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingRegions, setLoadingRegions] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const [formData, setFormData] = useState<RegisterStudentRequest & { confirmPassword: string }>({
        firstname: '',
        lastname: '',
        middlename: '',
        iin: '',
        phone: '',
        studyYear: 1,
        organization: '', // переименовал university в organization
        email: '',
        password: '',
        confirmPassword: '',
        categoryId: 0,
        regionId: 0 // добавил regionId
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [translatedError, setTranslatedError] = useState<string | null>(null);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/finiq/login');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoadingCategories(true);
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories);
                if (fetchedCategories.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        categoryId: fetchedCategories[0].id
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchRegions = async () => {
            try {
                setLoadingRegions(true);
                const fetchedRegions = await getAllRegions();
                setRegions(fetchedRegions);
                if (fetchedRegions.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        regionId: fetchedRegions[0].id
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch regions:', error);
            } finally {
                setLoadingRegions(false);
            }
        };

        fetchCategories();
        fetchRegions();
    }, [t]);

    useEffect(() => {
        if (specificError === 'Student with this IIN already exists') {
            setTranslatedError('Студент с таким ИИН уже существует в системе');
        } else if (specificError) {
            setTranslatedError('Ошибка при регистрации');
        } else {
            setTranslatedError(null);
        }
    }, [specificError]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstname.trim()) newErrors.firstname = t('registration.errors.firstnameRequired');
        if (!formData.lastname.trim()) newErrors.lastname = t('registration.errors.lastnameRequired');
        if (!formData.iin.trim()) newErrors.iin = t('registration.errors.iinRequired');
        else if (!/^\d{12}$/.test(formData.iin)) newErrors.iin = t('registration.errors.iinFormat');

        if (!formData.phone.trim()) newErrors.phone = t('registration.errors.phoneRequired');
        else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, '')))
            newErrors.phone = t('registration.errors.phoneFormat');

        if (!formData.organization.trim()) {
            newErrors.organization = formData.categoryId === 6
                ? t('registration.errors.schoolRequired')
                : t('registration.errors.organizationRequired');
        }

        if (!formData.email.trim()) newErrors.email = t('registration.errors.emailRequired');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = t('registration.errors.emailFormat');

        if (!formData.password) newErrors.password = t('registration.errors.passwordRequired');
        else if (formData.password.length < 6)
            newErrors.password = t('registration.errors.passwordLength');

        if (!formData.confirmPassword) newErrors.confirmPassword = t('registration.errors.confirmPasswordRequired');
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = t('registration.errors.passwordsMatch');

        if (!formData.categoryId) newErrors.categoryId = t('registration.errors.categoryRequired');
        if (!formData.regionId) newErrors.regionId = t('registration.errors.regionRequired');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name as keyof FormErrors]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<number>, child: React.ReactNode) => {
        const { name, value } = e.target;
        if (name) {
            setFormData({
                ...formData,
                [name]: Number(value),
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setTranslatedError(null);
            setConfirmModalOpen(true);
        }
    };

    const handleConfirmSubmit = () => {
        const { confirmPassword, ...registerData } = formData;
        dispatch(registerStudentThunk(registerData));
    };

    const selectedCategoryName = categories.find(cat => cat.id === formData.categoryId)
        ? i18n.language === 'kz'
            ? categories.find(cat => cat.id === formData.categoryId)?.nameKaz
            : categories.find(cat => cat.id === formData.categoryId)?.nameRus
        : '';

    const selectedRegionName = regions.find(region => region.id === formData.regionId)
        ? i18n.language === 'kz'
            ? regions.find(region => region.id === formData.regionId)?.nameKaz
            : regions.find(region => region.id === formData.regionId)?.nameRus
        : '';

    return (
        <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={3}
            sx={{
                p: isMobile ? 3 : 4,
                maxWidth: 800,
                width: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                mx: isMobile ? 2 : 0,
                position: 'relative', // Добавить
                zIndex: 1, // Добавить
            }}

        >
            <Box display="flex" flexDirection="column" alignItems="center" mb={isMobile ? 3 : 4}>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <EmojiEventsIcon sx={{
                        fontSize: isMobile ? 50 : 60,
                        color: '#f5b207',
                        mb: 2
                    }} />
                </motion.div>
                <Typography
                    component="h1"
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                        fontWeight: 700,
                        color: '#1A2751',
                        textAlign: 'center',
                        mb: 1
                    }}
                >
                    {t('registration.title')}
                </Typography>
                <Typography
                    variant={isMobile ? "body2" : "subtitle1"}
                    sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        maxWidth: '95%'
                    }}
                >
                    {t('registration.subtitle')}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Stack spacing={isMobile ? 2 : 3}>
                    {/* Первая строка: Фамилия и Имя */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={isMobile ? 2 : 3}>
                        <TextField
                            fullWidth
                            label={t('registration.fields.lastname')}
                            name="lastname"
                            variant="outlined"
                            value={formData.lastname}
                            onChange={handleChange}
                            error={!!errors.lastname}
                            helperText={errors.lastname}
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label={t('registration.fields.firstname')}
                            name="firstname"
                            variant="outlined"
                            value={formData.firstname}
                            onChange={handleChange}
                            error={!!errors.firstname}
                            helperText={errors.firstname}
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                        />
                    </Stack>

                    {/* Вторая строка: Отчество и ИИН */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={isMobile ? 2 : 3}>
                        <TextField
                            fullWidth
                            label={t('registration.fields.middlename')}
                            name="middlename"
                            variant="outlined"
                            value={formData.middlename}
                            onChange={handleChange}
                            error={!!errors.middlename}
                            helperText={errors.middlename}
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label={t('registration.fields.iin')}
                            name="iin"
                            variant="outlined"
                            value={formData.iin}
                            onChange={handleChange}
                            error={!!errors.iin}
                            helperText={errors.iin}
                            disabled={isLoading}
                            inputProps={{ maxLength: 12 }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                        />
                    </Stack>

                    {/* Третья строка: Телефон и Регион */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={isMobile ? 2 : 3}>
                        <TextField
                            fullWidth
                            label={t('registration.fields.phone')}
                            name="phone"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            disabled={isLoading}
                            placeholder="+7 (XXX) XXX-XX-XX"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                        />
                        <FormControl fullWidth error={!!errors.regionId} disabled={isLoading || loadingRegions}>
                            <InputLabel id="region-label">{t('registration.fields.region')}</InputLabel>
                            <Select
                                labelId="region-label"
                                id="region"
                                name="regionId"
                                value={formData.regionId}
                                onChange={handleSelectChange}
                                label={t('registration.fields.region')}
                                sx={{
                                    height: isMobile ? '56px' : 'auto',
                                }}
                            >
                                {loadingRegions ? (
                                    <MenuItem value={0} disabled>{t('registration.loading')}</MenuItem>
                                ) : (
                                    regions.map((region) => (
                                        <MenuItem key={region.id} value={region.id}>
                                            {i18n.language === 'kz' ? region.nameKaz : region.nameRus}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {errors.regionId && (
                                <FormHelperText>{errors.regionId}</FormHelperText>
                            )}
                        </FormControl>
                    </Stack>

                    {/* Четвертая строка: Организация/Школа */}
                    <TextField
                        fullWidth
                        label={formData.categoryId === 6 ? t('registration.fields.school') : t('registration.fields.organization')}
                        name="organization"
                        variant="outlined"
                        value={formData.organization}
                        onChange={handleChange}
                        error={!!errors.organization}
                        helperText={errors.organization}
                        disabled={isLoading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: isMobile ? '56px' : 'auto',
                            }
                        }}
                    />

                    {/* Пятая строка: Email */}
                    <TextField
                        fullWidth
                        label={t('registration.fields.email')}
                        name="email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={isLoading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: isMobile ? '56px' : 'auto',
                            }
                        }}
                    />

                    {/* Шестая строка: Пароль и Подтверждение пароля */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={isMobile ? 2 : 3}>
                        <TextField
                            fullWidth
                            label={t('registration.fields.password')}
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label={t('registration.fields.confirmPassword')}
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            disabled={isLoading}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: isMobile ? '56px' : 'auto',
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>

                    {/* Седьмая строка: Категория и Класс (если школьник) */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={isMobile ? 2 : 3}>
                        <FormControl fullWidth error={!!errors.categoryId} disabled={isLoading || loadingCategories}>
                            <InputLabel id="category-label">{t('registration.fields.category')}</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleSelectChange}
                                label={t('registration.fields.category')}
                                sx={{
                                    height: isMobile ? '56px' : 'auto',
                                }}
                            >
                                {loadingCategories ? (
                                    <MenuItem value={0} disabled>{t('registration.loading')}</MenuItem>
                                ) : (
                                    categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {i18n.language === 'kz' ? category.nameRus : category.nameKaz}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                            {errors.categoryId && (
                                <FormHelperText>{errors.categoryId}</FormHelperText>
                            )}
                        </FormControl>
                        {formData.categoryId === 6 && (
                            <FormControl fullWidth error={!!errors.studyYear} disabled={isLoading}>
                                <InputLabel id="studyYear-label">{t('registration.fields.studyYear')}</InputLabel>
                                <Select
                                    labelId="studyYear-label"
                                    id="studyYear"
                                    name="studyYear"
                                    value={formData.studyYear}
                                    onChange={handleSelectChange}
                                    label={t('registration.fields.studyYear')}
                                    sx={{
                                        height: isMobile ? '56px' : 'auto',
                                    }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.studyYear && (
                                    <FormHelperText>{errors.studyYear}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    </Stack>
                </Stack>

                {(error || translatedError) && (
                    <Box mt={2}>
                        <FormHelperText error>{translatedError || error}</FormHelperText>
                    </Box>
                )}

                <Box
                    mt={4}
                    display="flex"
                    justifyContent={{ xs: 'center', sm: 'space-between' }}
                    alignItems="center"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    gap={2}
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/finiq/login')}
                        disabled={isLoading}
                        sx={{
                            borderColor: '#1A2751',
                            color: '#1A2751',
                            '&:hover': {
                                borderColor: '#1A2751',
                                backgroundColor: 'rgba(26, 39, 81, 0.04)',
                            },
                            px: 4,
                            py: 1.5,
                            width: { xs: '100%', sm: 'auto' },
                            maxWidth: { xs: '300px', sm: 'none' },
                        }}
                    >
                        {t('registration.buttons.haveAccount')}
                    </Button>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            width: isMobile ? '100%' : 'auto',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                bgcolor: '#1A2751',
                                '&:hover': {
                                    bgcolor: '#13203f',
                                },
                                px: 4,
                                py: 1.5,
                                width: { xs: '100%', sm: 'auto' },
                                maxWidth: { xs: '300px', sm: 'none' },
                            }}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isLoading ? t('registration.buttons.registering') :
                                success ? t('registration.buttons.registerSuccess') :
                                    t('registration.buttons.register')}
                        </Button>
                    </motion.div>
                </Box>
            </form>

            <ConfirmationModal
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleConfirmSubmit}
                formData={{ ...formData, regionName: selectedRegionName }}
                loading={isLoading}
                categoryName={selectedCategoryName}
                specificError={specificError}
            />
        </MotionPaper>
    );
};

export default RegistrationForm;