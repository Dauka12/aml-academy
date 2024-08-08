import { forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCaretLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import igIcon from '../../../../assets/icons/ig.svg';
import language from '../../../../assets/icons/lang.svg';
import tgIcon from '../../../../assets/icons/tg.svg';
import waIcon from '../../../../assets/icons/waIcon.svg';
import navbar_items from "../../navbar_items";

export const Hamburger = forwardRef(({
    openNavbar,
    setOpenNavbar,
    setActiveNavItem,
    activeNavItem,
    openVisualModal,
}, ref) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { i18n, t } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    useEffect(() => {
        // Проверяем, содержит ли текущий маршрут "/courses/79"
        if (location.pathname.includes("/courses/81")) {
            // Если да, то устанавливаем язык по умолчанию на казахский
            changeLanguage('kz');
        }
    }, [location.pathname]);

    useEffect(() => {
        console.log(location)
    }, [])

    const isHomePage = location.pathname === '/';
    const barStyle = {
        backgroundColor: isHomePage ? 'white' : 'black'
    }

    return (
        <div className="hamburger-navigation-wrapper">
            <div className='hamburger-navigation' onClick={() => {
                setOpenNavbar(prev => {
                    if (prev === true) {
                        setActiveNavItem('');
                        return false;
                    }

                    return true;
                });
            }}>
                <div className='bar' style={barStyle}></div>
                <div className='bar' style={barStyle}></div>
                <div className='bar' style={barStyle}></div>
            </div>
            {
                openNavbar
                    ? (
                        <div className='hamburger-navigation-body' ref={ref}>
                            {
                                navbar_items.map((item, index) => {

                                    return <div className="navigation-item-wrapper" key={index}>
                                        <div
                                            className="navigation-item"
                                            onClick={() => {
                                                setActiveNavItem(item.name)
                                                if (item.route)
                                                    navigate(item.route)
                                            }}
                                        >
                                            {
                                                item.subItems.length > 0
                                                    ? <FaCaretLeft size={20} />
                                                    : <FaCaretLeft size={20} style={{ opacity: '0' }} />
                                            }
                                            <span>{t(item.name)}</span>
                                        </div>
                                        {
                                            activeNavItem === item.name
                                                ? (
                                                    <div className="navigation-sub-items">
                                                        {
                                                            item.subItems.map((subItem, index) => {
                                                                return <div
                                                                    className="navigation-sub-item"
                                                                    key={index}
                                                                    onClick={() => {
                                                                        if (subItem.route)
                                                                            navigate(subItem.route)
                                                                    }}
                                                                >
                                                                    {
                                                                        t(subItem.name)
                                                                    }
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                ) : null
                                        }
                                    </div>
                                })
                            }
                            <div className="navigation-socials">
                                <p href='#' className='soc-icon blue-button' onClick={openVisualModal}>
                                    <img src={language} alt="language" className='icon' />
                                </p>
                                <a href='https://www.instagram.com/aml_academy/' className='soc-icon blue-button'>
                                    <img src={igIcon} alt="instagram" className='icon' />
                                </a>
                                <a href='https://t.me/s/afm_rk?before=1811' className='soc-icon blue-button'>
                                    <img src={tgIcon} alt="telegram" className='icon' />
                                </a>
                                <a href='https://wa.me/77087168416' className='soc-icon blue-button'>
                                    <img src={waIcon} style={{ width: '20px' }} alt="telegram" className='icon' />
                                </a>
                            </div>
                            <div className="navigation-lang">
                                <p className='language' onClick={() => changeLanguage('kz')}>ҚАЗ</p>
                                <p className='language' onClick={() => changeLanguage('ru')}>РУС</p>
                                <p className='language' onClick={() => changeLanguage('eng')}>ENG</p>
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )
})
