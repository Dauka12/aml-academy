// src/components/NewsComponent.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import base_url from '../../../../settings/base_url';
import i18n from '../../../../settings/i18n';
import NewsModal from '../news-modal';

const NewsComponent = ({ news }) => {
    const [newsData, setNewsData] = useState([]);
    const [newsModalData, setNewsModalData] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/course/getAllNewsByLang/${currentLanguage === 'kz' ? 'kz' : currentLanguage === 'eng' ? 'eng' : 'ru'}`);
                setNewsData(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [currentLanguage]);

    const truncateName = (name) => {
        if (!name) return '';
        return name.length > 60 ? name.slice(0, 60) + '...' : name;
    };

    const lang = (number) => {
        if (!newsData || !newsData[number]) return '';
        
        return currentLanguage === 'ru' ? newsData[number]?.name :
               currentLanguage === 'kz' ? newsData[number]?.name :
               currentLanguage === 'eng' ? newsData[number]?.name : null;
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewsModalData(null);
    };

    const handleSelectNews = (index) => {
        if (index) navigate(`/news-page/${index}`);
    };

    // Loading states
    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    // Check if there are enough news items
    if (!newsData || newsData.length < 6) return (
        <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-lg">Загрузка новостей...</div>
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString();
    };    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 font-sans">            {/* Заголовок */}
            <h1 className="text-center text-4xl font-bold mb-16 text-[#1c3b82] relative">
                {t('news')}
                <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#1c3b82]"></span>
            </h1>

            {/* Сетка новостей */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Левая колонка */}
                <div className="md:col-span-3 space-y-6">
                    {/* Текстовая новость */}                    <div
                        onClick={() => handleSelectNews(newsData[4]?.id)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-[200px]"
                    >
                        <div className="bg-[#E6EFFF] text-[#1c3b82] px-4 py-1 text-sm inline-block self-start ml-5 mt-5 rounded-md font-medium">
                            {t('news')}
                        </div>
                        <div className="px-5 py-4 flex flex-col justify-between flex-grow">
                            <p className="text-gray-800 line-clamp-3 text-sm mb-auto">{truncateName(lang(4))}</p>
                            <p className="text-gray-400 text-sm mt-3">{formatDate(newsData[4]?.date)}</p>
                        </div>
                    </div>

                    {/* Новость с изображением */}                    <div
                        onClick={() => handleSelectNews(newsData[2]?.id)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                        <div className="relative h-[200px]">
                            <img
                                className="w-full h-full object-cover rounded-t-lg"
                                src={newsData[2]?.image}
                                alt={newsData[2]?.title || 'Новость'}
                            />
                        </div>
                        <div className="px-5 py-4 flex flex-col justify-between h-[80px]">
                            <p className="text-gray-800 line-clamp-2 text-sm">{truncateName(lang(2))}</p>
                            <p className="text-gray-400 text-sm mt-2">{formatDate(newsData[2]?.date)}</p>
                        </div>
                    </div>
                </div>

                {/* Центральная колонка */}
                <div className="md:col-span-6 space-y-6">                    {/* Большая новость с изображением */}
                    <div
                        onClick={() => handleSelectNews(newsData[0]?.id)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                        <div className="relative h-[300px]">
                            <img
                                className="w-full h-full object-cover rounded-t-lg"
                                src={newsData[0]?.image}
                                alt={newsData[0]?.title || 'Главная новость'}
                            />
                        </div>
                        <div className="px-5 py-4 flex flex-col justify-between h-[80px]">
                            <p className="text-gray-800 line-clamp-2 text-sm">{truncateName(lang(0))}</p>
                            <p className="text-gray-400 text-sm mt-2">{formatDate(newsData[0]?.date)}</p>
                        </div>
                    </div>

                    {/* Большая текстовая новость */}
                    <div
                        onClick={() => handleSelectNews(newsData[5]?.id)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer h-[120px] flex flex-col p-5"
                    >
                        <p className="text-gray-800 flex-grow line-clamp-2 text-sm">{truncateName(lang(5))}</p>
                        <p className="text-gray-400 text-sm mt-2">{formatDate(newsData[5]?.date)}</p>
                    </div>
                </div>

                {/* Правая колонка */}
                <div className="md:col-span-3 space-y-6">                    {/* Текстовая новость */}                    <div
                        onClick={() => handleSelectNews(newsData[1]?.id)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-[200px]"
                    >
                        <div className="bg-[#E6EFFF] text-[#1c3b82] px-4 py-1 text-sm inline-block self-start ml-5 mt-5 rounded-md font-medium">
                            {t('news')}
                        </div>
                        <div className="px-5 py-4 flex flex-col justify-between flex-grow">
                            <p className="text-gray-800 line-clamp-3 text-sm mb-auto">{truncateName(lang(1))}</p>
                            <p className="text-gray-400 text-sm mt-3">{formatDate(newsData[1]?.date)}</p>
                        </div>
                    </div>

                    {/* Новость с изображением */}
                    <div
                        onClick={() => handleSelectNews(newsData[3]?.id)}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                        <div className="relative h-[200px]">
                            <img
                                className="w-full h-full object-cover rounded-t-lg"
                                src={newsData[3]?.image}
                                alt={newsData[3]?.title || 'Новость'}
                            />
                        </div>
                        <div className="px-5 py-4 flex flex-col justify-between h-[80px]">
                            <p className="text-gray-800 line-clamp-2 text-sm">{truncateName(lang(3))}</p>
                            <p className="text-gray-400 text-sm mt-2">{formatDate(newsData[3]?.date)}</p>
                        </div>
                    </div>
                </div>
            </div>            {/* Кнопка "Все новости" */}
            <div className="flex justify-center mt-12">                <button
                    onClick={() => navigate("/all-news")}
                    className="px-8 py-3 border border-[#1c3b82] rounded-md text-[#1c3b82] hover:bg-[#1c3b82] hover:text-white transition-all duration-300 font-medium"
                >
                    {t('all news')}
                </button>
            </div>

            {/* Модальное окно с новостью */}
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
