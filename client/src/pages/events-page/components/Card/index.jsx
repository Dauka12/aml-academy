import React from 'react';
import calendarIcon from './calendar.svg';
import locationIcon from './location.svg';
import './style.scss';
 
const ForumCard = ({ imageSrc, title, date, location }) => {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleDateString("ru-RU", {
        day: '2-digit',   // Двузначный день
        month: '2-digit', // Двузначный месяц
        year: '2-digit'   // Четырехзначный год
    });
    return (
        <div className="forum-card">
            <div className="forum-card__image-container">
                <img src={imageSrc} alt={title} className="forum-card__image" />
                <div className="forum-card__overlay"></div>
            </div>
            <div className="forum-card__content">
                <span>Казахстан</span>
                <h3 className="forum-card__title">{title}</h3>
                <div className="forum-card__details">
                    <div className="forum-card__date">
                    <img src={calendarIcon} alt="calendarIcon" />
                        {formattedDate}
                    </div>
                    <div className="forum-card__location">
                        <img src={locationIcon} alt="locationIcon" />

                        {location}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumCard;
