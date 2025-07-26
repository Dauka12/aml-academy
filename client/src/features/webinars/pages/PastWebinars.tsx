import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useWebinarManager from '../hooks/useWebinarManager';
import WebinarLayout from '../components/layout/WebinarLayout';
import { convertDateFromArray } from '../utils/dateUtils';

const PastWebinars: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { webinars, loading, error } = useWebinarManager();
  
  // Filter for past webinars
  const pastWebinars = webinars.filter(
    webinar => convertDateFromArray(webinar.startDate) <= new Date()
  ).sort((a, b) => convertDateFromArray(b.startDate).getTime() - convertDateFromArray(a.startDate).getTime());

  return (
    <WebinarLayout title={t('webinar.pastWebinars')} description={t('webinar.pastWebinars') + ' - AML Academy'}>
      <div className="webinars-list-page">
        <div className="container">
          <div className="page-header">
            <button 
              className="back-button"
              onClick={() => navigate('/webinars')}
            >
              &larr; {t('webinar.backToWebinars')}
            </button>
            
            <h1>{t('webinar.pastWebinars')}</h1>
          </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : pastWebinars.length === 0 ? (
          <div className="no-results">
            <p>{t('webinar.noPastWebinars')}</p>
          </div>
        ) : (
          <div className="webinars-grid">
            {pastWebinars.map(webinar => (
              <div 
                key={webinar.id}
                className="webinar-card past"
                onClick={() => navigate(`/webinars/details/${webinar.id}`)}
              >
                <div className="image">
                  {webinar.imageUrl ? (
                    <img src={webinar.imageUrl} alt={webinar.title} />
                  ) : (
                    <div className="placeholder-image">
                      <span>📹</span>
                    </div>
                  )}
                  <div className="past-badge">
                    <span>{t('webinar.past')}</span>
                  </div>
                </div>
                <div className="content">
                  <h3>{webinar.title}</h3>
                  <div className="meta">
                    <div className="date">
                      <span className="icon">📅</span>
                      <span>{convertDateFromArray(webinar.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="time">
                      <span className="icon">⏰</span>
                      <span>{convertDateFromArray(webinar.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                  {webinar.description && (
                    <p className="description">
                      {webinar.description.length > 100 ? 
                        webinar.description.substring(0, 100) + '...' : 
                        webinar.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </WebinarLayout>
  );
};

export default PastWebinars;
