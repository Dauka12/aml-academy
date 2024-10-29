import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import advantage1 from './assets/svg/advantage1.svg';
import advantage2 from './assets/svg/advantage2.svg';
import advantage3 from './assets/svg/advantage3.svg';
import advantage4 from './assets/svg/advantage4.svg';
import nextButton from './assets/svg/next-button.svg';
import prevButton from './assets/svg/prev-button.svg';
import './style.css';

const NextArrow = ({ onClick }) => {
    return (
        <div className="nav-button next-button" onClick={onClick}>
            <img style={{width:"25px"}} src={nextButton} alt="next-button" />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="nav-button prev-button" onClick={onClick}>
            <img style={{width:"25px"}} src={prevButton} alt="prev-button" />
        </div>
    );
};

const AdvantagesCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const { t } = useTranslation();
    
    const advantages = [
        { icon: advantage1, text: t("Квалифицированные эксперты с многолетним опытом работы в сфере ПОД/ФТ") },
        { icon: advantage2, text: t('Тесное взаимодействие с уполномоченным органом при разработке программ обучения')},
        { icon: advantage3, text: t('Удобный формат обучения (онлайн, оффлайн, дистанционный)') },
        { icon: advantage4, text: t('Большой выбор обучающих программ для каждого вида субъектов финансового мониторинга') },
        { icon: AppRegistrationIcon, text: t('Программы разработанные в соответствии с требованиями законодательства о ПОД/ФТ')},
    ];

    return (
        <div className="advantages-container">
            <p className='advantage-title'>{ t('advantages') }</p>
            <p className='aml-academy'>AML ACADEMY</p>

            <Slider {...settings}>
                {advantages.map((item, index) => (
                    <div>
                        <div key={index} className="advantage-item">
                            <div className="icon-circle">
                                {index === 4 ? <AppRegistrationIcon style={{color:'white', fontSize:'60px'}} /> : <img src={item.icon} alt="icon" className="icon" />}
                                
                            </div>
                            <p className='text'>{item.text}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default AdvantagesCarousel;
