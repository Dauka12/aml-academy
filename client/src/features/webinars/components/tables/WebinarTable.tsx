import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Webinar } from '../../types/webinar';
import { formatDateTime, isWebinarPast } from '../../utils/webinarHelpers';


interface WebinarTableProps {
  webinars: Webinar[];
  onEdit: (webinar: Webinar) => void;
  onViewSignups: (webinar: Webinar) => void;
  onDelete: (webinar: Webinar) => void;
}

const WebinarTable: React.FC<WebinarTableProps> = ({ 
  webinars, 
  onEdit, 
  onViewSignups, 
  onDelete 
}) => {
  const { t } = useTranslation('webinars');
  
  if (webinars.length === 0) {
    return (
      <div className="empty-message">
        {t('noWebinarsFound')}
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="table-responsive"
    >
      <table className="webinar-manager-table">
        <thead>
          <tr>
            <th>{t('title')}</th>
            <th>{t('startDate')}</th>
            <th>{t('status')}</th>
            <th>{t('participants')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {webinars.map((webinar) => {
            const isPast = isWebinarPast(webinar);
            
            return (
              <tr key={webinar.id}>
                <td className="webinar-title">{webinar.title}</td>
                <td>{formatDateTime(webinar.startDate)}</td>
                <td>
                  <span className={`status-badge ${isPast ? 'past' : webinar.isActive ? 'active' : 'inactive'}`}>
                    {isPast 
                      ? t('past')
                      : webinar.isActive 
                        ? t('statusActive') 
                        : t('inactive')}
                  </span>
                </td>
                <td>{webinar.signupsCount || 0}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button edit-button"
                      onClick={() => onEdit(webinar)}
                    >
                      {t('edit')}
                    </button>
                    <button 
                      className="action-button view-button"
                      onClick={() => onViewSignups(webinar)}
                    >
                      {t('viewSignups')}
                    </button>
                    <button 
                      className="action-button delete-button"
                      onClick={() => onDelete(webinar)}
                    >
                      {t('delete')}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
};

export default WebinarTable;
