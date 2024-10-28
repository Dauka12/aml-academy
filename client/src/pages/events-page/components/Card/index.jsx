import React from 'react';
import { useTranslation } from 'react-i18next';
import calendarIcon from './calendar.svg';
import locationIcon from './location.svg';
import './style.scss';

const ForumCard = ({ imageSrc, title, date, location }) => {
    const eventDate = new Date(date);  // Event date from the props
    const currentDate = new Date();    // Current date
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    // Calculate the difference in years
    const timeDifference = eventDate - currentDate;
    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
    const isComingSoon = timeDifference > oneYearInMilliseconds;

    // Format the date if it's within a year; otherwise, show "Скоро"
    const formattedDate = isComingSoon
        ? currentLanguage === 'kz' ? 'Жуырда ...' : 'Скоро ...'
        : eventDate.toLocaleDateString("ru-RU", {
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
