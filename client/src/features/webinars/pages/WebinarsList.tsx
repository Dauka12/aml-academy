import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useWebinarManager from '../hooks/useWebinarManager';
import WebinarLayout from '../components/layout/WebinarLayout';
import './WebinarsList.scss';
import { convertDateFromArray } from '../utils/webinarHelpers';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const WebinarsList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { webinars, loading, error } = useWebinarManager();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWebinars, setFilteredWebinars] = useState(webinars);
    const [sortOption, setSortOption] = useState('date-desc');
    
    // Filter and sort webinars
    useEffect(() => {
        if (!webinars) return;
        
        let result = [...webinars];
        
        // Filter by search query
        if (searchQuery) {
            const lowercaseQuery = searchQuery.toLowerCase();
            result = result.filter(webinar => 
                webinar.title.toLowerCase().includes(lowercaseQuery) ||
                (webinar.description && webinar.description.toLowerCase().includes(lowercaseQuery))
            );
        }
        
        // Sort by selected option
        switch (sortOption) {
            case 'date-asc':
                result.sort((a, b) => convertDateFromArray(a.startDate).getTime() - convertDateFromArray(b.startDate).getTime());
                break;
            case 'date-desc':
                result.sort((a, b) => convertDateFromArray(b.startDate).getTime() - convertDateFromArray(a.startDate).getTime());
                break;
            case 'title-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }
        
        setFilteredWebinars(result);
    }, [webinars, searchQuery, sortOption]);
    
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <WebinarLayout title={t('webinar.allWebinars')} description={t('webinar.allWebinars') + ' - AML Academy'}>
            <div className="webinars-list-page">
                <div className="container">
                    <div className="page-header">
                        <button 
                            className="back-button"
                            onClick={() => navigate('/webinars')}
                        >
                            &larr; {t('webinar.backToWebinars')}
                        </button>
                        
                        <h1>{t('webinar.allWebinars')}</h1>
                    
                    <div className="filters-row">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder={t('webinar.searchPlaceholder')}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        
                        <div className="sort-dropdown">
                            <select value={sortOption} onChange={handleSortChange}>
                                <option value="date-desc">{t('webinar.sortNewest')}</option>
                                <option value="date-asc">{t('webinar.sortOldest')}</option>
                                <option value="title-asc">{t('webinar.sortTitleAZ')}</option>
                                <option value="title-desc">{t('webinar.sortTitleZA')}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="webinars-content">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading"></div>
                        </div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : filteredWebinars.length === 0 ? (
                        <div className="no-results">
                            <p>{searchQuery ? t('webinar.noSearchResults') : t('webinar.noWebinars')}</p>
                        </div>
                    ) : (
                        <motion.div 
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="webinars-grid"
                        >
                            {filteredWebinars.map(webinar => {
                                const startDate = convertDateFromArray(webinar.startDate);
                                const isPast = startDate < new Date();
                                
                                return (
                                    <motion.div 
                                        key={webinar.id}
                                        variants={fadeInUp}
                                        className={`webinar-card ${isPast ? 'past' : ''}`}
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
                                            
                                            {isPast && (
                                                <div className="past-badge">
                                                    <span>{t('webinar.past')}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="content">
                                            <h3>{webinar.title}</h3>
                                            
                                            <div className="meta">
                                                <div className="date">
                                                    <span className="icon">📅</span>
                                                    <span>{startDate.toLocaleDateString()}</span>
                                                </div>
                                                
                                                <div className="time">
                                                    <span className="icon">⏰</span>
                                                    <span>
                                                        {startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {webinar.description && (
                                                <p className="description">
                                                    {webinar.description.length > 100
                                                        ? webinar.description.substring(0, 100) + '...'
                                                        : webinar.description
                                                    }
                                                </p>
                                            )}
                                            
                                            <div className="footer">
                                                <span className="participants">
                                                    <span className="icon">👥</span>
                                                    <span>{webinar.signupsCount || 0} {t('webinar.participants')}</span>
                                                </span>
                                                
                                                <Link 
                                                    to={`/webinars/details/${webinar.id}`}
                                                    className="view-button"
                                                >
                                                    {t('webinar.viewDetails')}
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </div>
            </div>
        </WebinarLayout>
    );
};

export default WebinarsList;
