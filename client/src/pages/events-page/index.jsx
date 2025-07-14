import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer';
import Header from "../../components/header/v2";
import base_url from "../../settings/base_url";
import ForumCard from './components/Card';
import CustomCalendar from './components/CustomCalendar';
import EventCarousel from './components/event-carousel';

function EventsPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [events, setEvents] = useState([]);
    const [uncomingEvents, setUncomingEvents] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;
    const [filters, setFilters] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getAllEvents`);
                setEvents(response.data); 
                setLoading1(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getUncomingEvents`);
                setUncomingEvents(response.data); 
                console.log(response.data); 
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredEvents = events?.filter(event => {
        const eventDate = new Date(event.startDate);
        const currentDate = new Date();  // Current date to compare with event dates
        let matchesFilters = true;

        // Filter by tab: 0 for upcoming, 1 for past events
        if (selectedTab === 0 && eventDate < currentDate) {
            matchesFilters = false; // Filter out past events in the "Upcoming" tab
        }
        if (selectedTab === 1 && eventDate >= currentDate) {
            matchesFilters = false; // Filter out future events in the "Past" tab
        }

        // Filter by date
        if (filters?.startDate && filters?.endDate) {
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);
            
            // Если дата события выходит за границы выбранного периода
            if (eventDate < start || eventDate > end) {
                matchesFilters = false;
            }
        }
        

        if (filters?.selectedType && event.typeOfStudy !== filters.selectedType) {
            matchesFilters = false;
        }

        if (filters?.courseTypes) {
            const { course, webinar, module } = filters.courseTypes;
            
            const selectedTypes = [];
            if (course) selectedTypes.push('Курс');
            if (webinar) selectedTypes.push('Бесплатный вебинар');
            if (module) selectedTypes.push('Модуль');
        
            if (selectedTypes.length > 0 && !selectedTypes.includes(event.typeOfStudy)) {
                matchesFilters = false;
            }
        }
        

        if (filters?.formats) {
            const { online, offline, distance } = filters.formats;
            
            const selectedFormats = [];
            if (online) selectedFormats.push('Онлайн');
            if (offline) selectedFormats.push('Офлайн');
            if (distance) selectedFormats.push('Дистанционное обучение');
        
            if (selectedFormats.length > 0 && !selectedFormats.includes(event.formatOfStudy)) {
                matchesFilters = false;
            }
        }
        

        return matchesFilters;
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading || loading1) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>
        )
    } else {
        return (
            <div style={{ background: 'rgb(242, 242, 242)' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '1200px' }}>
                        <Header dark={true} />
                        <Box p={3}>
                            <Typography variant="h4" gutterBottom sx={{ marginBottom: '40px' }}>
                                {t("Мероприятия")} <span className="bold">AML Academy</span>
                            </Typography>

                            <Tabs value={selectedTab} onChange={handleTabChange}>
                                <Tab sx={{ fontSize: '18px' }} label={t("Будущие мероприятия")} />
                                <Tab sx={{ fontSize: '18px' }} label={t("Прошедшие мероприятия")} />
                            </Tabs>

                            <div onClick={() => navigate(`/event/${uncomingEvents[0]?.id}`)}>
                                <EventCarousel
                                    backgroundImage={uncomingEvents[0]?.coverImage}
                                    logoSrc={uncomingEvents[0]?.logoImage}
                                    title={currentLanguage === 'ru' ? uncomingEvents[0]?.ru_name : uncomingEvents[0]?.kz_name}
                                    date={new Date(uncomingEvents[0]?.startDate)}
                                    location={uncomingEvents[0]?.location}
                                    description={currentLanguage === 'ru' ? uncomingEvents[0]?.ru_description : uncomingEvents[0]?.kz_description}
                                />
                            </div>

                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} md={3}>
                                    <CustomCalendar applyFilters={handleApplyFilters} />
                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Grid container spacing={2}>
                                        {filteredEvents?.map(event => (
                                            <Grid
                                                item
                                                sx={{ cursor: 'pointer' }}
                                                xs={12} sm={6} md={6}
                                                key={event.id}
                                                onClick={() => navigate(`/event/${event.id}`)}
                                            >
                                                <ForumCard
                                                    imageSrc={event?.coverImage}
                                                    title={currentLanguage === 'ru' ? event.ru_name : event.kz_name}
                                                    date={event.startDate}
                                                    location={event.location}
                                                />
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default EventsPage;
