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
                                <img src={calendarIcon} alt="calendarIcon" />{date}
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
