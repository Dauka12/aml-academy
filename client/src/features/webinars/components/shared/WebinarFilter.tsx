import React, { useState } from 'react';
import './WebinarFilter.scss';

interface WebinarFilterProps {
  onFilterChange: (filters: WebinarFilterState) => void;
  showActiveFilter?: boolean;
}

interface WebinarFilterState {
  search: string;
  showUpcoming: boolean;
  showPast: boolean;
  sortBy: 'date' | 'title' | 'popularity';
  sortDirection: 'asc' | 'desc';
}

const initialFilterState: WebinarFilterState = {
  search: '',
  showUpcoming: true,
  showPast: false,
  sortBy: 'date',
  sortDirection: 'desc',
};

const WebinarFilter: React.FC<WebinarFilterProps> = ({ 
  onFilterChange, 
  showActiveFilter = true 
}) => {
  const [filters, setFilters] = useState<WebinarFilterState>(initialFilterState);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newFilters = { ...filters, [name]: checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sortBy: 'date' | 'title' | 'popularity';
    let sortDirection: 'asc' | 'desc';

    switch (value) {
      case 'date-desc':
        sortBy = 'date';
        sortDirection = 'desc';
        break;
      case 'date-asc':
        sortBy = 'date';
        sortDirection = 'asc';
        break;
      case 'title-asc':
        sortBy = 'title';
        sortDirection = 'asc';
        break;
      case 'title-desc':
        sortBy = 'title';
        sortDirection = 'desc';
        break;
      case 'popularity':
        sortBy = 'popularity';
        sortDirection = 'desc';
        break;
      default:
        sortBy = 'date';
        sortDirection = 'desc';
    }

    const newFilters = { ...filters, sortBy, sortDirection };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters(initialFilterState);
    onFilterChange(initialFilterState);
  };

  return (
    <div className="webinar-filter">
      <div className="webinar-filter__search">
        <input
          type="text"
          placeholder="Search webinars..."
          value={filters.search}
          onChange={handleSearchChange}
          className="webinar-filter__search-input"
        />
      </div>
      
      <div className="webinar-filter__options">
        <div className="webinar-filter__group">
          <label className="webinar-filter__checkbox">
            <input
              type="checkbox"
              name="showUpcoming"
              checked={filters.showUpcoming}
              onChange={handleCheckboxChange}
            />
            <span>Upcoming</span>
          </label>
          
          <label className="webinar-filter__checkbox">
            <input
              type="checkbox"
              name="showPast"
              checked={filters.showPast}
              onChange={handleCheckboxChange}
            />
            <span>Past</span>
          </label>
        </div>
        
        <div className="webinar-filter__group">
          <select
            className="webinar-filter__sort"
            value={`${filters.sortBy}-${filters.sortDirection}`}
            onChange={handleSortChange}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>
        
        <button 
          className="webinar-filter__reset" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WebinarFilter;
