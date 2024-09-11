import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
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
        if (filters?.selectedDate) {
            const selectedDate = filters.selectedDate instanceof Date ? filters.selectedDate : new Date(filters.selectedDate);
            if (eventDate.toLocaleDateString() !== selectedDate.toLocaleDateString()) {
                matchesFilters = false;
            }
        }

        // Filter by type
        if (filters?.selectedType && event.type !== filters.selectedType) {
            matchesFilters = false;
        }

        // Filter by course types
        if (filters?.courseTypes) {
            const { course, webinar, module } = filters.courseTypes;
            if (course && event.type !== 'course') matchesFilters = false;
            if (webinar && event.type !== 'webinar') matchesFilters = false;
            if (module && event.type !== 'module') matchesFilters = false;
        }

        // Filter by format
        if (filters?.formats) {
            const { online, offline, distance } = filters.formats;
            if (online && event.format !== 'online') matchesFilters = false;
            if (offline && event.format !== 'offline') matchesFilters = false;
            if (distance && event.format !== 'distance') matchesFilters = false;
        }

        return matchesFilters;
    });

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters); // Apply the new filters
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
                                    date={`${new Date(uncomingEvents[0]?.startDate).toLocaleDateString()} - ${new Date(uncomingEvents[0]?.endDate).toLocaleDateString()}`}
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
