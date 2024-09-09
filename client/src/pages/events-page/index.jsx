import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import image from '../../assets/images/81.png';
import image2 from '../../assets/images/83.png';
import image1 from '../../assets/images/85.png';
import background from '../../assets/images/8888.jpg';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ForumCard from './components/Card';
import CustomCalendar from './components/CustomCalendar'; // Воспользуемся кастомным календарем
import EventCarousel from './components/event-carousel';
import logo from './components/event-carousel/assets/logo.svg';

// Данные событий (пример)
const events = [
    {
        id: 1,
        title: 'Презентация комитета национальной безопасности',
        date: '2024-08-18',
        location: 'Астана, Казахстан',
        imageUrl: image,
        type: 'upcoming',
    },
    {
        id: 2,
        title: 'Международный форум 2024',
        date: '2024-09-20',
        location: 'Астана, Казахстан',
        imageUrl: image1,
        type: 'upcoming',
    },
    {
        id: 3,
        title: 'Международная конференция 2023',
        date: '2023-12-15',
        location: 'Астана, Казахстан',
        imageUrl: image2,
        type: 'past',
    },
    // Добавьте больше событий
];

function EventsPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        if (selectedTab === 0) {
            return eventDate >= new Date();
        }
        return eventDate < new Date();
    });

    return (
        <div style={{ background: 'rgb(242, 242, 242)' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '1200px' }}>
                    <Header dark={true} />
                    <Box p={3}>
                        <Typography variant="h4" gutterBottom sx={{ marginBottom: '40px' }}>
                            Мероприятия AML Academy
                        </Typography>

                        <Tabs value={selectedTab} onChange={handleTabChange} left>
                            <Tab sx={{ fontSize: '18px' }} label="Будущие мероприятия" />
                            <Tab sx={{ fontSize: '18px' }} label="Прошедшие мероприятия" />
                        </Tabs>

                        <EventCarousel backgroundImage={background} logoSrc={logo} title="Презентация комитета национальной безопасности"
                            date="18-20 августа 2024"
                            location="Астана, Казахстан"
                            description="Комитет национальной безопасности Республики Казахстан — специальный государственный орган, подчиненный Президенту Республики Казахстан, осуществляющий руководство органами национальной безопасности."
                        />
                        <Grid container spacing={2} mt={2}>
                            <Grid item xs={12} md={3}>
                                <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <Grid container spacing={2}>
                                    {filteredEvents.map(event => (
                                        <Grid item xs={12} sm={6} md={6} key={event.id}>
                                            <ForumCard imageSrc={event.imageUrl} title={event.title} date={event.date} location={event.location} />
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

export default EventsPage;
