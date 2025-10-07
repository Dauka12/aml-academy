import DownloadIcon from '@mui/icons-material/Download';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import type { AlertColor } from '@mui/material/Alert';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllRegions, type Region } from '../api/regionsApi.ts';
import {
    exportTopStudentsByRegionExcel,
    getTopStudentsByRegion
} from '../api/statisticsApi.ts';
import type { RegionCategoryTopStudents, RegionTopStudent } from '../types/exam.ts';

interface RegionTopStudentsTabProps {
    onNotify: (message: string, severity?: AlertColor) => void;
}

const combineStudentName = (student: RegionTopStudent) => {
    return [student.lastname, student.firstname, student.middlename]
        .filter(Boolean)
        .join(' ');
};

const RegionTopStudentsTab: React.FC<RegionTopStudentsTabProps> = ({ onNotify }) => {
    const { t, i18n } = useTranslation();
    const [regions, setRegions] = useState<Region[]>([]);
    const [regionsLoading, setRegionsLoading] = useState<boolean>(false);
    const [selectedRegionId, setSelectedRegionId] = useState<number | ''>('');
    const [statistics, setStatistics] = useState<RegionCategoryTopStudents[]>([]);
    const [statisticsLoading, setStatisticsLoading] = useState<boolean>(false);
    const [downloading, setDownloading] = useState<boolean>(false);

    const localeField = useMemo(() => {
        if (i18n.language?.startsWith('kz')) {
            return 'nameKaz' as const;
        }
        if (i18n.language?.startsWith('en')) {
            return 'nameRus' as const; // временно используем русский, пока нет отдельных переводов
        }
        return 'nameRus' as const;
    }, [i18n.language]);

    useEffect(() => {
        const loadRegions = async () => {
            setRegionsLoading(true);
            try {
                const data = await getAllRegions();
                setRegions(data);
            } catch (error: any) {
                onNotify(error.message || t('manager.regionStatsRegionsError'), 'error');
            } finally {
                setRegionsLoading(false);
            }
        };

        loadRegions();
    }, [onNotify, t]);

    const fetchStatistics = useCallback(async (regionId: number) => {
        setStatisticsLoading(true);
        try {
            const data = await getTopStudentsByRegion(regionId);
            setStatistics(data);
            if (!data.length) {
                onNotify(t('manager.regionStatsNoData'), 'info');
            }
        } catch (error: any) {
            onNotify(error.message || t('manager.regionStatsFetchError'), 'error');
            setStatistics([]);
        } finally {
            setStatisticsLoading(false);
        }
    }, [onNotify, t]);

    const handleRegionChange = async (event: SelectChangeEvent<number | ''>) => {
        const value = event.target.value;
        if (value === '') {
            setSelectedRegionId('');
            setStatistics([]);
            return;
        }

        const numericValue = Number(value);
        setSelectedRegionId(numericValue);
        await fetchStatistics(numericValue);
    };

    const handleDownload = async () => {
        if (!selectedRegionId) {
            onNotify(t('manager.regionStatsSelectRegionFirst'), 'info');
            return;
        }
        setDownloading(true);
        try {
            const { blob, filename } = await exportTopStudentsByRegionExcel(selectedRegionId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || `region-${selectedRegionId}-top-students.xlsx`;
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.remove();
            onNotify(t('manager.regionStatsDownloadSuccess'), 'success');
        } catch (error: any) {
            onNotify(error.message || t('manager.regionStatsDownloadError'), 'error');
        } finally {
            setDownloading(false);
        }
    };

    const renderTableBody = (students: RegionTopStudent[]) => {
        if (!students.length) {
            return (
                <TableRow>
                    <TableCell colSpan={4} align="center">
                        {t('manager.regionStatsNoStudents')}
                    </TableCell>
                </TableRow>
            );
        }

        return students.map((student) => (
            <TableRow key={student.studentId}>
                <TableCell>{student.rank}</TableCell>
                <TableCell>{combineStudentName(student)}</TableCell>
                <TableCell>{student.organization || t('manager.regionStatsNoOrganization')}</TableCell>
                <TableCell>{student.score}</TableCell>
            </TableRow>
        ));
    };

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(18, 32, 63, 0.04)'
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth disabled={regionsLoading}>
                            <InputLabel id="region-select-label">
                                {regionsLoading
                                    ? t('manager.regionStatsRegionsLoading')
                                    : t('manager.regionSelectLabel')}
                            </InputLabel>
                            <Select<number | ''>
                                labelId="region-select-label"
                                label={t('manager.regionSelectLabel')}
                                value={selectedRegionId}
                                onChange={handleRegionChange}
                            >
                                <MenuItem value="">
                                    <em>{t('manager.regionSelectPlaceholder')}</em>
                                </MenuItem>
                                {regions.map((region) => (
                                    <MenuItem key={region.id} value={region.id}>
                                        {region[localeField]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={!downloading && <DownloadIcon />}
                            onClick={handleDownload}
                            disabled={downloading || !selectedRegionId}
                        >
                            {downloading ? <CircularProgress size={24} color="inherit" /> : t('manager.regionStatsDownloadExcel')}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                            {t('manager.regionStatsHint')}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box mt={4}>
                {statisticsLoading ? (
                    <Box display="flex" justifyContent="center" py={6}>
                        <CircularProgress />
                    </Box>
                ) : !selectedRegionId ? (
                    <Typography variant="subtitle1" color="text.secondary" align="center">
                        {t('manager.regionStatsSelectRegionPrompt')}
                    </Typography>
                ) : !statistics.length ? (
                    <Typography variant="subtitle1" color="text.secondary" align="center">
                        {t('manager.regionStatsNoData')}
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {statistics.map((category) => (
                            <Grid item xs={12} md={6} key={category.categoryId}>
                                <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                                    <Box
                                        sx={{
                                            background: 'linear-gradient(135deg, #1A2751 0%, #13203f 100%)',
                                            color: 'white',
                                            p: 2
                                        }}
                                    >
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {i18n.language?.startsWith('kz')
                                                ? category.categoryNameKaz
                                                : category.categoryNameRus}
                                        </Typography>
                                    </Box>
                                    <TableContainer>
                                        <Table size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>{t('manager.regionStatsRank')}</TableCell>
                                                    <TableCell>{t('manager.regionStatsStudent')}</TableCell>
                                                    <TableCell>{t('manager.regionStatsOrganization')}</TableCell>
                                                    <TableCell>{t('manager.regionStatsScore')}</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>{renderTableBody(category.topStudents)}</TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default RegionTopStudentsTab;
