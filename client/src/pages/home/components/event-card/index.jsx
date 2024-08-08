import React from 'react';
import { useNavigate } from 'react-router';
import './style.css';

const EventCard = ({ event, type }) => {
    const cardClass = type === 'main' ? 'cards main-card' : 'cards secondary-card';
    const navigate = useNavigate();
    function handleNavigate() {
        navigate('/vebinars#top')
    }
    return (
        <div className={`${cardClass} hover-card`}>
            <img className="event-image" src={event.image} alt={event.title} />
            <div className="overlay">
                <div className="text-container">
                    <p className="event-date">{event.date}</p>
                    <h3 className="event-title">{event.title}</h3>
                </div>
                <button className="details-button hover-button" onClick={handleNavigate}>Подробнее</button>
            </div>
        </div>
    );
}

export default EventCard;
