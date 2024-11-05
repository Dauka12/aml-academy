import React from 'react';
import { useTranslation } from 'react-i18next';
import calendarIcon from './assets/calendar.svg';
import locationIcon from './assets/location.svg';
import './style.scss';

const BlurredCard = ({ backgroundImage, logoSrc, title, date, location, description }) => {
    const { t } = useTranslation()
    const truncatedDescription = description?.length > 250
        ? description.substring(0, 250) + '...'
        : description;
    
        const currentDate = new Date();    // Current date
        const { i18n } = useTranslation();
        const currentLanguage = i18n.language;
    
        // Calculate the difference in years
        const timeDifference = date - currentDate;
        const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
        const isComingSoon = timeDifference > oneYearInMilliseconds;
    
        // Format the date if it's within a year; otherwise, show "Скоро"
        const formattedDate = isComingSoon
            ? currentLanguage === 'kz' ? 'Жуырда ...' : 'Скоро ...'
            : date.toLocaleDateString("ru-RU", {
                day: '2-digit',   // Двузначный день
                month: '2-digit', // Двузначный месяц
                year: '2-digit'   // Четырехзначный год
            });
    return (
        <div className="blurred-card">
            <div className="blurred-card__background">
                <img src={backgroundImage} alt="background" className="blurred-card__bg-image" />
            </div>
            <div className="blurred-card__content">
                <div className="blurred-card__logo">
                    <img src={logoSrc} alt="logo" className="blurred-card__logo-image" />
                </div>
                <div className="blurred-card__text">
                    <div style={{ backgroundColor: '#fff', width: '80%', borderEndEndRadius: '10px', borderTopRightRadius: '10px', padding: '15px' }}>
                        <span>{t("Ближайшие мероприятия")}</span>
                        <h3 className="blurred-card__title">{title}</h3>
                        <div className="blurred-card__details">
                            <div className="blurred-card__date">
                                <img src={calendarIcon} alt="calendarIcon" />{formattedDate}
                            </div>
                            <div className="blurred-card__location">
                                <img src={locationIcon} alt="locationIcon" /> {location}
                            </div>
                            <p className="blurred-card__description">{truncatedDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlurredCard;
