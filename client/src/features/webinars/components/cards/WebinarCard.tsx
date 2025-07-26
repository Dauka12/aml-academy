import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Webinar } from '../../types/webinar';
import { convertDateFromArray, formatDateTime, formatsignupsCount } from '../../utils/webinarHelpers';
import './WebinarCard.scss';

interface WebinarCardProps {
  webinar: Webinar;
  showDetails?: boolean;
}

const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, showDetails = true }) => {
  const isUpcoming = convertDateFromArray(webinar.startDate) > new Date();
  const imageRef = useRef<HTMLImageElement>(null);
  const leftBlurRef = useRef<HTMLDivElement>(null);
  const rightBlurRef = useRef<HTMLDivElement>(null);

  // Set background image for blur effects when image is loaded
  useEffect(() => {
    if (webinar.imageUrl && imageRef.current) {
      // Store reference to current DOM element in a variable
      const currentImageRef = imageRef.current;
      
      const handleImageLoad = () => {
        const imageUrl = webinar.imageUrl;
        if (leftBlurRef.current && rightBlurRef.current) {
          leftBlurRef.current.style.backgroundImage = `url(${imageUrl})`;
          rightBlurRef.current.style.backgroundImage = `url(${imageUrl})`;
        }
      };
      
      const handleImageError = () => {
        // If image fails to load, apply a fallback style
        if (leftBlurRef.current && rightBlurRef.current) {
          // Use a gradient instead
          const fallbackColor = '#f0f0f0';
          leftBlurRef.current.style.backgroundImage = `none`;
          leftBlurRef.current.style.backgroundColor = fallbackColor;
          rightBlurRef.current.style.backgroundImage = `none`;
          rightBlurRef.current.style.backgroundColor = fallbackColor;
          
          // Also handle the main image
          if (currentImageRef) {
            currentImageRef.style.display = 'none';
            // Potentially show a placeholder
            const wrapper = currentImageRef.parentElement;
            if (wrapper) {
              const placeholder = document.createElement('div');
              placeholder.className = 'webinar-card__image-placeholder';
              placeholder.innerHTML = `<span>${webinar.title.substring(0, 2).toUpperCase()}</span>`;
              wrapper.appendChild(placeholder);
            }
          }
        }
      };

      currentImageRef.addEventListener('load', handleImageLoad);
      currentImageRef.addEventListener('error', handleImageError);
      
      // If image is already loaded (from cache)
      if (currentImageRef.complete && currentImageRef.naturalWidth !== 0) {
        handleImageLoad();
      }
      
      return () => {
        // Use the stored reference in cleanup
        currentImageRef.removeEventListener('load', handleImageLoad);
        currentImageRef.removeEventListener('error', handleImageError);
      };
    }
  }, [webinar.imageUrl, webinar.title]);

  return (
    <div className="webinar-card">
      <div className="webinar-card__image-container">
        {webinar.imageUrl ? (
          <div className="webinar-card__image-wrapper">
            <img 
              ref={imageRef}
              src={webinar.imageUrl} 
              alt={webinar.title} 
              className="webinar-card__image" 
            />
            <div ref={leftBlurRef} className="webinar-card__image-blur-left"></div>
            <div ref={rightBlurRef} className="webinar-card__image-blur-right"></div>
          </div>
        ) : (
          <div className="webinar-card__image-placeholder">
            <span>{webinar.title.substring(0, 2).toUpperCase()}</span>
          </div>
        )}
        {isUpcoming && <div className="webinar-card__badge">Upcoming</div>}
      </div>
      
      <div className="webinar-card__content">
        <h3 className="webinar-card__title">{webinar.title}</h3>
        
        <div className="webinar-card__date">
          <i className="fa fa-calendar"></i>
          <span>{formatDateTime(webinar.startDate)}</span>
        </div>
        
        {webinar.signupsCount !== undefined && (
          <div className="webinar-card__signup-count">
            <i className="fa fa-users"></i>
            <span>{formatsignupsCount(webinar)}</span>
          </div>
        )}
        
        {webinar.description && showDetails && (
          <p className="webinar-card__description">
            {webinar.description.length > 120
              ? `${webinar.description.substring(0, 120)}...`
              : webinar.description}
          </p>
        )}
        
        <div className="webinar-card__footer">
          <Link 
            to={`/webinars/${webinar.id}`} 
            className="webinar-card__link"
          >
            View Details
          </Link>
          
          {webinar.link && isUpcoming && (
            <a 
              href={webinar.link}
              target="_blank"
              rel="noopener noreferrer"
              className="webinar-card__join-btn"
            >
              Join Webinar
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebinarCard;
