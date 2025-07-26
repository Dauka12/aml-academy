import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Webinar } from '../../types/webinar';
import { useWebinarTranslations } from '../../utils/translationsContext';
import { convertDateFromArray, formatDateTime } from '../../utils/webinarHelpers';
import './WebinarTable.scss';

interface WebinarTableProps {
  webinars: Webinar[];
  isLoading: boolean;
  error: string | null;
  isUserView: boolean;
  viewMode: string;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const WebinarTable: React.FC<WebinarTableProps> = ({
  webinars,
  isLoading,
  error,
  isUserView,
  viewMode,
  onEdit,
  onView,
  onDelete
}) => {
  const { t } = useWebinarTranslations();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  if (webinars.length === 0) {
    return (
      <div className="empty-state">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
          </path>
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t('noWebinarsFound')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('noWebinarsDescription')}
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="webinar-table-container">
        <div className="webinar-table">
          <table>
            <thead>
              <tr>
                <th>{t('title')}</th>
                <th>{t('startDate')}</th>
                <th>{t('statusActive')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {webinars.map(webinar => (
                  <motion.tr
                    key={webinar.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="webinar-title">{webinar.title}</td>
                    <td>{formatDateTime(webinar.startDate)}</td>
                    <td>
                      <span className={`status-badge ${webinar.isActive ? 'active' : 'inactive'}`}>
                        {webinar.isActive ? t('statusActive') : t('inactive')}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => onView(webinar.id)}
                          className="view-button"
                        >
                          {t('view')}
                        </button>

                        {!isUserView && (
                          <>
                            <button
                              onClick={() => onEdit(webinar.id)}
                              className="edit-button"
                            >
                              {t('edit')}
                            </button>

                            <button
                              onClick={() => onDelete(webinar.id)}
                              className="delete-button"
                            >
                              {t('delete')}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
      <AnimatePresence>
        {webinars.map((webinar) => (
          <motion.div
            key={webinar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="webinar-card"
          >
            {/* Image */}
            <div className="webinar-card__image-container">
              {webinar.imageUrl ? (
                <img
                  src={webinar.imageUrl}
                  alt={webinar.title}
                  className="webinar-card__image"
                />
              ) : (
                <div className="webinar-card__image-placeholder">
                  <span>{webinar.title.substring(0, 2).toUpperCase()}</span>
                </div>
              )}

              {/* Status Badge */}
              <div className="webinar-card__badge">
                {convertDateFromArray(webinar.startDate) > new Date() ? t('upcoming') : t('past')}
              </div>
            </div>

            {/* Content */}
            <div className="webinar-card__content">
              <h3 className="webinar-card__title">{webinar.title}</h3>

              <div className="webinar-card__date">
                <svg className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
                <span>{formatDateTime(webinar.startDate)}</span>
              </div>

              <div className="webinar-card__status">
                <svg className={`w-4 h-4 ${webinar.isActive ? 'text-green-500' : 'text-red-500'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>{webinar.isActive ? t('statusActive') : t('inactive')}</span>
              </div>

              <div className="webinar-card__actions">
                <button
                  onClick={() => onView(webinar.id)}
                  className="view-button"
                >
                  {t('view')}
                </button>

                {!isUserView && (
                  <>
                    <button
                      onClick={() => onEdit(webinar.id)}
                      className="edit-button"
                    >
                      {t('edit')}
                    </button>

                    <button
                      onClick={() => onDelete(webinar.id)}
                      className="delete-button"
                    >
                      {t('delete')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WebinarTable;
