// VerticalCarousel.js
import React, { useState } from 'react';
import HrCards from '../hrCards';
import './style.scss';

const VerticalCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    </div>
  );
};

export default VerticalCarousel;
