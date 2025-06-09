import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import LaptopIcon from '@mui/icons-material/Laptop';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdvantageCard = ({ icon: Icon, text }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-[#1c3b82] rounded-full w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] flex items-center justify-center mb-4 shadow-md transition-transform hover:scale-105">
                {React.isValidElement(Icon) ? (
                    Icon
                ) : typeof Icon === 'function' ? (
                    <Icon sx={{ color: 'white', fontSize: '60px' }} />
                ) : (
                    <img src={Icon} alt="advantage icon" className="w-16 h-16" />
                )}
            </div>
            <p className="text-[#3A3939] text-center max-w-[240px] md:max-w-[180px] text-sm md:text-base">
                {text}
            </p>
        </div>
    );
};

const AdvantagesCarousel = () => {
    const containerRef = useRef(null);
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [totalWidth, setTotalWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    // Определяем преимущества
    const advantages = [
        {
            icon: <PersonIcon sx={{ color: 'white', fontSize: '60px' }} />,
            text: t("Квалифицированные эксперты с многолетним опытом работы в сфере ПОД/ФТ")
        },
        {
            icon: <MenuBookIcon sx={{ color: 'white', fontSize: '60px' }} />,
            text: t('Тесное взаимодействие с уполномоченным органом при разработке программ обучения')
        },
        {
            icon: <GroupsIcon sx={{ color: 'white', fontSize: '60px' }} />,
            text: t('Удобный формат обучения (онлайн, оффлайн, дистанционный)')
        },
        {
            icon: <LaptopIcon sx={{ color: 'white', fontSize: '60px' }} />,
            text: t('Большой выбор обучающих программ для каждого вида субъектов финансового мониторинга')
        },
        {
            icon: <AppRegistrationIcon sx={{ color: 'white', fontSize: '60px' }} />,
            text: t('Программы разработанные в соответствии с требованиями законодательства о ПОД/ФТ')
        },
    ];

    const getSlidesToShow = (width) => {
        if (width < 640) return 1;
        if (width < 1024) return 2;
        if (width < 1280) return 3;
        return 4;
    };

    const slidesToShow = getSlidesToShow(windowWidth);
    const maxIndex = Math.max(0, advantages.length - slidesToShow);

    useEffect(() => {
        const checkSize = () => {
            const newWidth = window.innerWidth;
            setIsMobile(newWidth < 768);
            setWindowWidth(newWidth);

            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                setTotalWidth(containerWidth);

                // Определяем ширину одного элемента в зависимости от количества показываемых слайдов
                const slidesToShow = getSlidesToShow(newWidth);
                setItemWidth(containerWidth / slidesToShow);
            }
        };

        checkSize();
        window.addEventListener('resize', checkSize);

        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const next = () => {
        setCurrentIndex(prev => {
            const nextIdx = prev + 1;
            return nextIdx > maxIndex ? maxIndex : nextIdx;
        });
    };

    const prev = () => {
        setCurrentIndex(prev => {
            const prevIdx = prev - 1;
            return prevIdx < 0 ? 0 : prevIdx;
        });
    };    // Автопрокрутка на мобильных устройствах
    useEffect(() => {
        let interval;
        if (isMobile) {
            interval = setInterval(() => {
                setCurrentIndex(prev => {
                    const nextIdx = prev + 1;
                    return nextIdx > maxIndex ? 0 : nextIdx;
                });
            }, 3000);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isMobile, maxIndex, currentIndex]);

    const goToSlide = (index) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 relative">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl text-[#3A3939] font-normal mb-1 md:mb-2">
                {t('advantages')}
            </h2>
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-[#3A3939] font-semibold mb-6 md:mb-10">
                AML ACADEMY
            </h1>            <div ref={containerRef} className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (itemWidth || (totalWidth / slidesToShow))}px)`
                    }}
                >
                    {advantages.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-2 sm:px-4"
                            style={{ width: `${100 / slidesToShow}%` }}
                        >
                            <AdvantageCard icon={item.icon} text={item.text} />
                        </div>
                    ))}
                </div>                {/* Навигационные кнопки */}
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className={`absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-lg z-10 transition-all duration-300 
                        ${currentIndex === 0 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-[#1c3b82] hover:text-white hover:scale-110'
                        } 
                        ${isMobile ? 'w-9 h-9' : 'w-12 h-12'}`}
                    aria-label="Previous slide"
                >
                    <ChevronLeftIcon 
                        className={`text-[#1c3b82] ${isMobile ? 'text-xl' : 'text-3xl'} transition-colors duration-300 group-hover:text-white`} 
                    />
                </button>
                <button
                    onClick={next}
                    disabled={currentIndex >= maxIndex}
                    className={`absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-lg z-10 transition-all duration-300
                        ${currentIndex >= maxIndex 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-[#1c3b82] hover:text-white hover:scale-110'
                        } 
                        ${isMobile ? 'w-9 h-9' : 'w-12 h-12'}`}
                    aria-label="Next slide"
                >
                    <ChevronRightIcon 
                        className={`text-[#1c3b82] ${isMobile ? 'text-xl' : 'text-3xl'} transition-colors duration-300 group-hover:text-white`} 
                    />
                </button>
            </div>            {/* Индикаторы */}
            <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: isMobile ? advantages.length : maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index 
                                ? 'bg-[#1c3b82] transform scale-125' 
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdvantagesCarousel;
