import React from 'react';
import eventImg from '../../assets/jpg/test.jpg';
import eventImg1 from '../../assets/загрузка.png';

import EventCard from '../event-card';
import SectionTitles from '../section-titles';
import './style.css';

export const mockEvents = [
    {
        id: 1,
        title: 'Презентация проекта AML Game',
        date: '22-23 июня 2024',
        image: eventImg, // Replace with actual paths to your images
    },
    {
        id: 2,
        title: 'ВСТРЕЧА НА ПЛОЩАДКЕ "СОВЕТ КОМПЛАЕНС"',
        date: '17 мая 2024',
        image: eventImg1,
    },
    {
        id: 3,
        title: 'Презентация проекта AML Game',
        date: '22-23 июня 2024',
        image: eventImg,
    },
];


const EventsComponent = () => {
    // const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/events')
    //         .then(response => {
    //             setEvents(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching events:', error);
    //         });
    // }, []);
    const events = mockEvents;

    if (events?.length < 3) return <div>Loading...</div>;

    return (
        <div style={{paddingTop:"40px"}}>
            <SectionTitles title={'Будущие мероприятия'}/>
            <div className='events-page-container'>
                <div className="events-page">
                    <div className="cards-container">
                        <EventCard event={events[0]} type="main" />
                        <div className="secondary-cards">
                            <EventCard event={events[1]} type="secondary" />
                            <EventCard event={events[2]} type="secondary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventsComponent;
