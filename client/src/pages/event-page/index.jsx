import { Box, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import base_url from '../../settings/base_url';
import BlurredCard from '../events-page/components/event-carousel';

const EventPage = () => {
    const [uncomingEvents, setUncomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [data, setData] = useState(null);
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getUncomingEvents`);
                setUncomingEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getEventById`, { params: { id } });
                const eventData = response.data;

                // Parse program and speakers from JSON string
                eventData.program = JSON.parse(eventData.program);
                eventData.speakers = JSON.parse(eventData.speakers);

                setData(eventData); // Set the state with parsed data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </div>
        )
    } else {
        return (
            <>
                <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '50px' }}>
                    <Header dark={true} style={{ zIndex: 1000 }} />

                    {/* Display the event information */}
                    <BlurredCard
                        backgroundImage={data.coverImage}
                        logoSrc={data.logoImage}
                        title={data.ru_name}
                        date={`Start Date: ${new Date(data.startDate).toLocaleDateString()} - End Date: ${new Date(data.endDate).toLocaleDateString()}`}
                        location={data.location}
                        description={data.ru_description}
                    />

                    <Box display="flex" sx={{ mt: '50px' }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={selectedTab}
                            onChange={handleTabChange}
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="О мероприятии" />
                            <Tab label="Программа" />
                            <Tab label="Спикеры" />
                            <Tab label="Заявка" />
                        </Tabs>

                        <Box sx={{ p: 3, width: '100%', height: '500px' }}>
                            {selectedTab === 0 && (
                                <Typography>
                                    <strong><span className="bold">{data.ru_name}</span></strong> <br />
                                    <>{data.ru_description}</> <br />
                                    <strong>Местоположение: </strong> {data.location} <br />
                                    <strong>Дата начала: </strong> {new Date(data.startDate).toLocaleDateString()} <br />
                                    <strong>Дата конца:</strong> {new Date(data.endDate).toLocaleDateString()}
                                </Typography>
                            )}

                            {selectedTab === 1 && data.program && (
                                <Box>
                                    {data.program.map((item, index) => (
                                        <Typography key={index} sx={{ marginBottom: 2 }}>
                                            <strong>Time:</strong> {item.time} <br />
                                            <strong>RU Name:</strong> {item.ru_name} <br />
                                            <strong>KZ Name:</strong> {item.kz_name}
                                        </Typography>
                                    ))}
                                </Box>
                            )}

                            {selectedTab === 2 && data.speakers && (
                                <Box>
                                    {data.speakers.map((speaker, index) => (
                                        <Box key={index} sx={{ display: 'flex', marginBottom: 2 }}>
                                            <img src={speaker.image} alt={speaker.name} style={{ width: '100px', marginRight: '20px' }} />
                                            <Typography>
                                                <strong>Name:</strong> {speaker.name} <br />
                                                <strong>Position (RU):</strong> {speaker.ru_position} <br />
                                                <strong>Position (KZ):</strong> {speaker.kz_position}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            {selectedTab === 3 && (
                                <Typography>Application Content</Typography>
                            )}
                        </Box>
                    </Box>
                </div>
                <Footer />
            </>
        );
    }
}

export default EventPage;
