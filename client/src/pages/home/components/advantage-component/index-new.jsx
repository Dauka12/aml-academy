import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import LaptopIcon from '@mui/icons-material/Laptop';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdvantageCard = ({ icon: Icon, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#1c3b82] rounded-full w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] flex items-center justify-center mb-4 shadow-md transition-transform hover:scale-105">
        {typeof Icon === 'function' ? (
          <Icon className="text-white text-5xl" />
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
  const { t } = useTranslation();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const advantages = [
    { 
      icon: PersonIcon, 
      text: t("Квалифицированные эксперты с многолетним опытом работы в сфере ПОД/ФТ") 
    },
    { 
      icon: MenuBookIcon, 
      text: t('Тесное взаимодействие с уполномоченным органом при разработке программ обучения') 
    },
    { 
      icon: GroupsIcon, 
      text: t('Удобный формат обучения (онлайн, оффлайн, дистанционный)') 
    },
    { 
      icon: LaptopIcon, 
      text: t('Большой выбор обучающих программ для каждого вида субъектов финансового мониторинга') 
    },
    { 
      icon: AppRegistrationIcon, 
      text: t('Программы разработанные в соответствии с требованиями законодательства о ПОД/ФТ') 
    },
  ];

  const totalSlides = advantages.length;
  const slidesToShow = isMobile ? 1 : window.innerWidth < 1024 ? 3 : 4;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const next = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (carouselRef.current) {
      const translateX = currentIndex * -100;
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Автопрокрутка на мобильных устройствах
  useEffect(() => {
    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          return next > maxIndex ? 0 : next;
        });
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile, maxIndex]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 relative">
      <h2 className="text-center text-3xl md:text-4xl text-[#3A3939] font-normal mb-2">
        {t('advantages')}
      </h2>
      <h1 className="text-center text-3xl md:text-4xl text-[#3A3939] font-semibold mb-10">
        AML ACADEMY
      </h1>

      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef} 
          className="flex transition-transform duration-300 ease-in-out" 
          style={{ 
            width: `${totalSlides * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / totalSlides}%)` 
          }}
        >
          {advantages.map((item, index) => (
            <div 
              key={index} 
              className="px-2 md:px-4" 
              style={{ width: `${100 / totalSlides}%` }}
            >
              <AdvantageCard icon={item.icon} text={item.text} />
            </div>
          ))}
        </div>

        {/* Навигационные кнопки */}
        {!isMobile && (
          <>
            <button 
              onClick={prev} 
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="text-[#1c3b82] text-3xl" />
            </button>
            <button 
              onClick={next} 
              disabled={currentIndex >= maxIndex}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10 ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="text-[#1c3b82] text-3xl" />
            </button>
          </>
        )}
      </div>

      {/* Индикаторы */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: isMobile ? totalSlides : maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-[#1c3b82]' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvantagesCarousel;
