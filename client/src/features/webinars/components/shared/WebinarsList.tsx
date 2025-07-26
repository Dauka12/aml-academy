import React from 'react';
import { Webinar } from '../../types/webinar';
import WebinarCard from '../cards/WebinarCard';
import './WebinarsList.scss';

interface WebinarsListProps {
  webinars: Webinar[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const WebinarsList: React.FC<WebinarsListProps> = ({ 
  webinars, 
  isLoading = false, 
  emptyMessage = 'No webinars found' 
}) => {
  if (isLoading) {
    return (
      <div className="webinars-list__loading">
        <div className="loading-spinner"></div>
        <p>Loading webinars...</p>
      </div>
    );
  }

  if (webinars.length === 0) {
    return (
      <div className="webinars-list__empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="webinars-list">
      {webinars.map((webinar) => (
        <div className="webinars-list__item" key={webinar.id}>
          <WebinarCard webinar={webinar} />
        </div>
      ))}
    </div>
  );
};

export default WebinarsList;
