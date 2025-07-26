import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useWebinarManager from '../hooks/useWebinarManager';
import { Webinar } from '../types/webinar';
import WebinarLayout from '../components/layout/WebinarLayout';
import WebinarList from '../components/WebinarList';
import EnhancedWebinarCard from '../components/EnhancedWebinarCard';
import WebinarRegistrationModal from '../components/modals/WebinarRegistrationModal';
import './WebinarLanding.scss';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  TextField,
  Button,
  Chip,
  CardActions,
  Skeleton,
  Paper,
  InputAdornment,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  FilterList as FilterIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon
} from '@mui/icons-material';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Helper function to convert array date format to Date object
const convertDateFromArray = (dateArray: any): Date => {
  if (Array.isArray(dateArray)) {
    // Convert from array format [year, month, day, hour, minute]
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
  }
  return new Date(dateArray);
};

const WebinarLanding: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { webinars, loading, error } = useWebinarManager();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWebinars, setFilteredWebinars] = useState<Webinar[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('upcoming');
  
  useEffect(() => {
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      setFilteredWebinars(
        webinars.filter(webinar => 
          webinar.title.toLowerCase().includes(lowercaseQuery) ||
          (webinar.description && webinar.description.toLowerCase().includes(lowercaseQuery))
        )
      );
    } else {
      setFilteredWebinars(webinars);
    }
  }, [searchQuery, webinars]);
  
  const upcomingWebinars = filteredWebinars.filter(webinar => {
    const startDate = convertDateFromArray(webinar.startDate);
    return startDate > new Date();
  }).sort((a, b) => {
    const dateA = convertDateFromArray(a.startDate).getTime();
    const dateB = convertDateFromArray(b.startDate).getTime();
    return dateA - dateB;
  });
  
  const pastWebinars = filteredWebinars.filter(webinar => {
    const startDate = convertDateFromArray(webinar.startDate);
    return startDate <= new Date();
  }).sort((a, b) => {
    const dateA = convertDateFromArray(a.startDate).getTime();
    const dateB = convertDateFromArray(b.startDate).getTime();
    return dateB - dateA;
  });
  
  const featuredWebinar = upcomingWebinars[0];
  
  // Handle registration modal
  const handleRegisterClick = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setRegistrationModalOpen(true);
  };
  
  const handleRegistrationSuccess = () => {
    setRegistrationModalOpen(false);
    // Optional: Show success message or refresh data
  };

  console.log('Webinars from backend:', webinars);

  return (
    <WebinarLayout title={t('webinar.webinars')} description={t('webinar.pageDescription')}>
      <Box sx={{ width: '100%' }}>
        
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Filter & View Controls */}
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder={t('webinar.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('grid')}
                    size="small"
                    startIcon={<GridViewIcon />}
                  >
                    {t('webinar.grid')}
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    size="small"
                    startIcon={<ListViewIcon />}
                  >
                    {t('webinar.list')}
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel id="sort-select-label">{t('webinar.sortBy')}</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    value={sortOption}
                    label={t('webinar.sortBy')}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <MenuItem value="upcoming">{t('webinar.upcoming')}</MenuItem>
                    <MenuItem value="past">{t('webinar.past')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
          
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rectangular" height={160} sx={{ borderRadius: '8px 8px 0 0' }} />
                  <Box sx={{ p: 2 }}>
                    <Skeleton height={32} width="80%" />
                    <Skeleton height={20} width="60%" sx={{ mt: 1 }} />
                    <Skeleton height={60} sx={{ mt: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Skeleton height={24} width={80} />
                      <Skeleton height={24} width={100} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Paper sx={{ p: 3, bgcolor: '#ffebee', color: '#c62828' }}>
              <Typography>{error}</Typography>
            </Paper>
          ) : (
            <>
              
              {/* Upcoming Webinars */}
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {t('webinar.upcomingWebinars')}
                  </Typography>
                  
                  
                </Box>
                
                {viewMode === 'grid' ? (
                  <Grid container spacing={3}>
                    {upcomingWebinars.slice(0, 3).map((webinar) => (
                      <Grid item xs={12} sm={6} md={4} key={webinar.id}>
                        <EnhancedWebinarCard 
                          webinar={webinar} 
                          onRegisterClick={handleRegisterClick}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <WebinarList 
                    webinars={upcomingWebinars.slice(0, 3)} 
                    loading={loading} 
                  />
                )}
                
                {upcomingWebinars.length === 0 && (
                  <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      {t('webinar.noUpcomingWebinars')}
                    </Typography>
                  </Paper>
                )}
              </Box>
              
              {/* Past Webinars */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {t('webinar.pastWebinars')}
                  </Typography>
                </Box>
                
                {viewMode === 'grid' ? (
                  <Grid container spacing={3}>
                    {pastWebinars.slice(0, 3).map((webinar) => (
                      <Grid item xs={12} sm={6} md={4} key={webinar.id}>
                        <EnhancedWebinarCard 
                          webinar={webinar} 
                          onRegisterClick={handleRegisterClick}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <WebinarList 
                    webinars={pastWebinars.slice(0, 3)} 
                    loading={loading} 
                  />
                )}
                
                {pastWebinars.length === 0 && (
                  <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      {t('webinar.noPastWebinars')}
                    </Typography>
                  </Paper>
                )}
              </Box>
              
              {/* Registration Modal */}
              {selectedWebinar && (
                <WebinarRegistrationModal
                  webinar={selectedWebinar}
                  open={registrationModalOpen}
                  onClose={() => setRegistrationModalOpen(false)}
                  onSuccess={handleRegistrationSuccess}
                />
              )}
            </>
          )}
        </Container>
      </Box>
    </WebinarLayout>
  );
};

export default WebinarLanding;
