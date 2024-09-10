import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import base_url from "../../settings/base_url";
import ForumCard from './components/Card';
import CustomCalendar from './components/CustomCalendar'; // Воспользуемся кастомным календарем
import EventCarousel from './components/event-carousel';
function EventsPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [uncomingEvents, setUncomingEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getAllEvents`);
                setEvents(response.data); // set the state with data

            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getUncomingEvents`);
                setUncomingEvents(response.data); // set the state with data
                console.log(response.data); // logs the data array
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // call the async function
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredEvents = events?.filter(event => {
        const eventDate = new Date(event.startDate);
        if (selectedTab === 0) {
            return eventDate >= new Date();
        }
        return eventDate < new Date();
    });

    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div style={{ background: 'rgb(242, 242, 242)' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '1200px' }}>
                        <Header dark={true} />
                        <Box p={3}>
                            <Typography variant="h4" gutterBottom sx={{ marginBottom: '40px' }}>
                                Мероприятия <span className="bold">AML Academy</span>
                            </Typography>

                            <Tabs value={selectedTab} onChange={handleTabChange} left>
                                <Tab sx={{ fontSize: '18px' }} label="Будущие мероприятия" />
                                <Tab sx={{ fontSize: '18px' }} label="Прошедшие мероприятия" />
                            </Tabs>

                            <EventCarousel backgroundImage={uncomingEvents[1].coverImage} logoSrc={uncomingEvents[1].logoImage} title={uncomingEvents[1].ru_name}
                                date="18-20 августа 2024"
                                location="Астана, Казахстан"
                                description={uncomingEvents[1].ru_description}
                            />
                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={12} md={3}>
                                    <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Grid container spacing={2}>
                                        {filteredEvents?.map(event => (
                                            <Grid item xs={12} sm={6} md={6} key={event.id}>
                                                <ForumCard imageSrc={event.coverImage} title={event.ru_name} date={event.startDate} location={event.location} />
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
