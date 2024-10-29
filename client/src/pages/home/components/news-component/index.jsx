// src/components/NewsComponent.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import base_url from '../../../../settings/base_url';
import i18n from '../../../../settings/i18n';
import NewsModal from '../news-modal';
import './style.css';

const NewsComponent = ({ news }) => {
    const [newsData, setNewsData] = useState(news);
    const [newsModalData, setNewsModalData] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getAllNewsByLang/${currentLanguage === 'kz' ? 'kz' : currentLanguage === 'eng' ? 'eng' : 'ru'}`);
                setNewsData(response.data);
                console.log(response.data);
                console.log(currentLanguage);
                
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData().then(() => {
            console.log('News data fetched');
        });
    }, [currentLanguage]);

    const truncateName = (name) => {
        return name?.length > 60 ? name.slice(0, 60) + '...' : name;
    };

    const lang = (number) => {
        return currentLanguage === 'ru' ? newsData[number]?.name : currentLanguage === 'kz' ? newsData[number]?.name : currentLanguage === 'eng' ? newsData[number]?.name : null
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewsModalData(null);
    };

    const handleSelectNews = (index) => {
        navigate(`/news-page/${index}`);
    };

    if (loading) return <div>Loading...</div>;

    if (news?.length < 6) return <div>Loading...</div>;

    return (
        <div className="news-container">
            <h1 className="news-title">{t('news')}</h1>
            <div className="news-grid">
                <div className="column column-1">
                    <div className="news-item text-item" onClick={() => handleSelectNews(newsData[4]?.id)}>
                        <div className="news-badge">{t('news')}</div>
                        <p className='news-description'>{truncateName(lang(4))}</p>
                        <p className="news-date">{new Date(newsData[4]?.date).toLocaleDateString()}</p>
                    </div>
                    <div className="news-item image-item" onClick={() => handleSelectNews(newsData[2]?.id)}>
                        <div className='side-img-wrapper'>
                            <div
                                className="blurred-bg"
                                style={{ backgroundImage: `url(${newsData[2]?.image})` }}
                            />
                            <img className="side-img" src={newsData[2]?.image} alt={newsData[2]?.title} />
                        </div>
                        <p className='news-description'>{truncateName(lang(2))}</p>
                        <p className="news-date">{new Date(newsData[2]?.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="column column-2">
                    <div className="news-item image-item large-item" onClick={() => handleSelectNews(newsData[0]?.id)}>
                        <div className='main-img-wrapper'>
                            <div
                                className="blurred-bg"
                                style={{ backgroundImage: `url(${newsData[0]?.image})` }}
                            />
                            <img className="main-img" src={newsData[0]?.image} alt={newsData[0]?.title} />
                        </div>
                        <p className='news-description'>{truncateName(lang(0))}</p>
                        <p className="news-date">{new Date(newsData[0]?.date).toLocaleDateString()}</p>
                    </div>
                    <div className="news-item text-item large-item" onClick={() => handleSelectNews(newsData[5]?.id)}>
                        <p className='news-description'>{truncateName(lang(5))}</p>
                        <p className="news-date">{new Date(newsData[5]?.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="column column-3">
                    <div className="news-item text-item" onClick={() => handleSelectNews(newsData[1]?.id)}>
                        <div className="news-badge">{t('news')}</div>
                        <p className='news-description'>{truncateName(lang(1))}</p>
                        <p className="news-date">{new Date(newsData[1]?.date).toLocaleDateString()}</p>
                    </div>
                    <div className="news-item image-item" onClick={() => handleSelectNews(newsData[3]?.id)}>
                        <div className='side-img-wrapper'>
                            <div
                                className="blurred-bg"
                                style={{ backgroundImage: `url(${newsData[3]?.image})` }}
                            />
                            <img className="side-img" src={newsData[3]?.image} alt={newsData[3]?.title} />
                        </div>
                        <p className='news-description'>{truncateName(lang(3))}</p>
                        <p className="news-date">{new Date(newsData[3]?.date).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            <div className='button-wrapper'>
                <button className="all-news-button" onClick={() => navigate("/all-news")}>
                    {t('all news')}
                </button>
            </div>
            {newsModalData && (
                <NewsModal
                    name={newsModalData.name}
                    image={newsModalData.image}
                    description={newsModalData.description}
                    handleClose={handleCloseModal}
                    open={isModalOpen}
                />
            )}
        </div>
    );
};

export default NewsComponent;
