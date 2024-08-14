// src/components/VerticalCarousel.jsx
import React, { useEffect, useState } from 'react';
import HrCards from '../hrCards';
import './style.scss';

const VerticalCarousel = ({ cards, handleSubmit }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState(cards[0]);

    useEffect(() => {
        setSelectedCard(cards[currentIndex]);
    }, [currentIndex, cards]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleConfirm = () => {
        const { name, correctAnswer } = selectedCard;
        handleSubmit(name, correctAnswer);  // Отправляем данные через HOC
    };

    return (
        <div className="vertical-carousel">
            <button onClick={handlePrev} disabled={currentIndex === 0}>▲</button>
            <div className="carousel-window">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`carousel-card ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'prev' : ''} ${index > currentIndex ? 'next' : ''}`}
                    >
                        <HrCards {...card} />
                    </div>
                ))}
            </div>
            <button onClick={handleNext} disabled={currentIndex === cards.length - 1}>▼</button>
            
            <div className="actions">
                <button 
                    className='blue'
                    onClick={handleConfirm}  // Вызываем handleConfirm на кнопку
                >
                    Подтвердить
                </button>
            </div>
        </div>
    );
};

export default VerticalCarousel;
