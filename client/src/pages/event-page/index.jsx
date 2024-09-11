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
    const [loading1, setLoading1] = useState(true);
    const { id } = useParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [data, setData] = useState(null);
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;
    const [date, setDate] = useState();

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getUncomingEvents`);
                setUncomingEvents(response.data);
                setLoading(false);
                const date1 = new Date(uncomingEvents[1].startDate);
                const formattedDate = date1.toLocaleDateString("ru-RU", {
                    day: '2-digit',
                    month: '2-digit',
                });
                const date2 = new Date(uncomingEvents[1].endDate);
                const formattedDate1 = date2.toLocaleDateString("ru-RU", {
                    day: '2-digit',
                    month: '2-digit',
                });
                setDate(`${formattedDate} - ${formattedDate1}`);
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
                setLoading1(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (loading || loading1) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                Loading...
            </div>
        );
    } else {
        return (
            <>
                <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '50px' }}>
                    <Header dark={true} style={{ zIndex: 1000 }} />

                    {/* Display the event information */}
                    <BlurredCard
                        backgroundImage={data.coverImage}
                        logoSrc={data.logoImage}
                        title={currentLanguage === 'ru' ? data.ru_name : data.kz_name}
                        date={`${new Date(data.startDate).toLocaleDateString()} - ${new Date(data.endDate).toLocaleDateString()}`}
                        location={data.location}
                        description={currentLanguage === 'ru' ? data.ru_description : data.kz_description}
                    />

                    <div style={{ minHeight: '250px', marginTop: '50px', display: 'flex' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                backgroundColor: '#F7F7F7',
                                borderRadius: '8px',
                            }}
                        >
                            {/* Tabs (menu) */}
                            <Tabs
                                orientation="vertical"
                                value={selectedTab}
                                onChange={handleTabChange}
                                sx={{
                                    backgroundColor: '#F7F7F7',
                                    padding: '10px',
                                    borderRadius: '8px 0 0 8px',
                                    minWidth: '200px',
                                }}
                            >
                                <Tab
                                    label={t("О мероприятии")}
                                    sx={{ textAlign: 'left', color: '#000', fontFamily: 'Roboto' }}
                                />
                                <Tab
                                    label={t('Программа')}
                                    sx={{ textAlign: 'left', color: '#000', fontFamily: 'Roboto' }}
                                />
                                <Tab
                                    label={t('Спикеры')}
                                    sx={{ textAlign: 'left', color: '#000', fontFamily: 'Roboto' }}
                                />
                                <Tab
                                    label={t('Заявка')}
                                    sx={{ textAlign: 'left', color: '#000', fontFamily: 'Roboto' }}
                                />
                            </Tabs>

                            {/* Tab content */}
                            <Box sx={{ p: 3, width: '100%', backgroundColor: '#F7F7F7', color: '#000' }}>
                                {selectedTab === 0 && (
                                    <Typography sx={{ fontFamily: 'Roboto' }}>
                                        <strong><span>{currentLanguage === 'ru' ? data.ru_name : data.kz_name}</span></strong> <br />
                                        {currentLanguage === 'ru' ? data.ru_description : data.kz_description} <br />
                                        <strong>{t("Местоположение:")} </strong> {data.location} <br />
                                        <strong>{t("Дата начала:")} </strong> {new Date(data.startDate).toLocaleDateString()} <br />
                                        <strong>{t("Дата Окончания:")} </strong> {new Date(data.endDate).toLocaleDateString()}
                                    </Typography>
                                )}

                                {selectedTab === 1 && data.program && (
                                    <Box>
                                        {data.program.map((item, index) => (
                                            <Typography key={index} sx={{ marginBottom: 2, fontFamily: 'Roboto' }}>
                                                <strong>{currentLanguage === 'ru' ? item.ru_name : item.kz_name}</strong> {item.time}
                                            </Typography>
                                        ))}
                                    </Box>
                                )}

                                {selectedTab === 2 && data.speakers && (
                                    <Box>
                                        {data.speakers.map((speaker, index) => (
                                            <Box key={index} sx={{ display: 'flex', marginBottom: 2 }}>
                                                <img
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    style={{ width: '100px', marginRight: '20px', borderRadius: '8px' }}
                                                />
                                                <Typography sx={{ fontFamily: 'Roboto' }}>
                                                    <strong>{t("Имя:")} </strong> {speaker.name} <br />
                                                    <strong>{t("Должность:")} </strong> {currentLanguage === 'ru' ? speaker.ru_position : speaker.kz_position}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                                {selectedTab === 3 && (
                                    <Typography sx={{ fontFamily: 'Roboto' }}>Application Content</Typography>
                                )}
                            </Box>
                        </Box>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default EventPage;
