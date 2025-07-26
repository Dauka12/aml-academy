import React from 'react';
import { motion } from 'framer-motion';
import { useWebinarTranslations } from '../../utils/translationsContext';
import './WebinarStatsCards.scss';

interface WebinarStatsProps {
  stats: {
    total: number;
    active: number;
    upcoming: number;
    past: number;
  };
}

const WebinarStatsCards: React.FC<WebinarStatsProps> = ({ stats }) => {
  const { t } = useWebinarTranslations();

  const statsItems = [
    { 
      label: t('totalWebinars'), 
      value: stats.total, 
      color: "blue", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      ) 
    },
    { 
      label: t('availableWebinars'), 
      value: stats.active, 
      color: "green", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ) 
    },
    { 
      label: t('upcomingWebinars'), 
      value: stats.upcoming, 
      color: "yellow", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ) 
    },
    { 
      label: t('pastWebinars'), 
      value: stats.past, 
      color: "purple", 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      ) 
    }
  ];

  return (
    <div className="webinar-stats-cards">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`stats-card stats-card--${stat.color}`}
          >
            <div className="stats-card__content">
              <div>
                <p className="stats-card__label">{stat.label}</p>
                <p className="stats-card__value">{stat.value}</p>
              </div>
              <div className="stats-card__icon">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WebinarStatsCards;
