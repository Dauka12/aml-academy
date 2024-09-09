import React from 'react';
import calendarIcon from '../Card/calendar.svg';
import locationIcon from '../Card/location.svg';
import './style.scss';

const BlurredCard = ({ backgroundImage, logoSrc, title, date, location, description }) => {
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
                    <span>Ближайшие мероприятия</span>
                    <h3 className="blurred-card__title">{title}</h3>
                    <div className="blurred-card__details">
                        <div className="blurred-card__date">
                            <img src={calendarIcon} alt="calendarIcon" />{date}
                        </div>
                        <div className="blurred-card__location">
                            <img src={locationIcon} alt="locationIcon" /> {location}
                        </div>
                        <p className="blurred-card__description">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlurredCard;
