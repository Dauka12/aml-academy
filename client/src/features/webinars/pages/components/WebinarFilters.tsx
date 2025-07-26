import React from 'react';
import { useWebinarTranslations } from '../../utils/translationsContext';
import './WebinarFilters.scss';

interface WebinarFiltersProps {
  activeFilter: string;
  searchQuery: string;
  viewMode: string;
  stats: {
    total: number;
    active: number;
    upcoming: number;
    past: number;
  };
  onFilterChange: (filter: string) => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: string) => void;
}

const WebinarFilters: React.FC<WebinarFiltersProps> = ({
  activeFilter,
  searchQuery,
  viewMode,
  stats,
  onFilterChange,
  onSearchChange,
  onViewModeChange
}) => {
  const { t } = useWebinarTranslations();

  const filters = [
    { key: 'all', label: t('allWebinars'), count: stats.total },
    { key: 'active', label: t('availableWebinars'), count: stats.active },
    { key: 'upcoming', label: t('upcomingWebinars'), count: stats.upcoming },
    { key: 'past', label: t('pastWebinars'), count: stats.past }
  ];

  return (
    <div className="webinar-filters">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search */}
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
              </path>
            </svg>
            <input
              type="text"
              placeholder={t('searchWebinars')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`filter-button ${
                activeFilter === filter.key ? 'filter-button--active' : ''
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`view-mode-button ${
              viewMode === 'grid' ? 'view-mode-button--active' : ''
            }`}
            aria-label={t('gridView')}
            title={t('gridView')}
          >
            <svg className="w-5 h-5" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`view-mode-button ${
              viewMode === 'list' ? 'view-mode-button--active' : ''
            }`}
            aria-label={t('listView')}
            title={t('listView')}
          >
            <svg className="w-5 h-5" 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 10h16M4 14h16M4 18h16">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebinarFilters;
