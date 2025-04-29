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
    dark
}, ref) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { i18n, t } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    
    useEffect(() => {
        if (location.pathname.includes("/courses/81")) {
            changeLanguage('kz');
        }
    }, [location.pathname]);

    const isHomePage = location.pathname === '/';

    return (
        <div className="relative">
            <div 
                className="flex flex-col justify-between w-8 h-5 cursor-pointer" 
                onClick={() => {
                    setOpenNavbar(prev => {
                        if (prev === true) {
                            setActiveNavItem('');
                            return false;
                        }
                        return true;
                    });
                }}
            >
                <div className={`h-0.5 w-full rounded ${isHomePage ? 'bg-white hover:bg-gray-300' : 'bg-black hover:bg-gray-600'} transition-colors duration-300`}></div>
                <div className={`h-0.5 w-full rounded ${isHomePage ? 'bg-white hover:bg-gray-300' : 'bg-black hover:bg-gray-600'} transition-colors duration-300`}></div>
                <div className={`h-0.5 w-full rounded ${isHomePage ? 'bg-white hover:bg-gray-300' : 'bg-black hover:bg-gray-600'} transition-colors duration-300`}></div>
            </div>
            
            {openNavbar && (
                <div 
                    ref={ref} 
                    className={`absolute right-0 mt-4 flex flex-col ${dark ? 'bg-white/85 text-black border-gray-300/60' : 'bg-gray-600/85 text-white border-gray-400/60'} backdrop-blur-md border rounded shadow-lg z-30 animate-slideIn`}
                >
                    {navbar_items.map((item, index) => (
                        <div className="relative" key={index}>
                            <div
                                className="flex items-center gap-1.5 p-3.5 cursor-pointer hover:bg-black/10 transition-colors duration-200"
                                onClick={() => {
                                    setActiveNavItem(item.name);
                                    if (item.route) navigate(item.route);
                                }}
                            >
                                {item.subItems?.length > 0 ? (
                                    <FaCaretLeft size={20} className="text-current" />
                                ) : (
                                    <FaCaretLeft size={20} className="opacity-0" />
                                )}
                                <span className="text-current">{t(item.name)}</span>
                            </div>
                            
                            {activeNavItem === item.name && (
                                <div className={`absolute top-0 right-full transform -translate-x-2.5 flex flex-col ${dark ? 'bg-white/90 text-black border-gray-300/60' : 'bg-gray-700/90 text-white border-gray-400/60'} backdrop-blur-md border rounded shadow-lg z-30 animate-slideIn`}>
                                    {item.subItems.map((subItem, index) => (
                                        <div
                                            key={index}
                                            className="p-3.5 cursor-pointer hover:bg-black/10 transition-colors duration-200"
                                            onClick={() => {
                                                if (subItem.route) navigate(subItem.route);
                                            }}
                                        >
                                            {t(subItem.name)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <div className="flex items-center justify-between gap-2.5 p-3.5">
                        <button 
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-800 hover:bg-yellow-400 transition-all duration-300 group"
                            onClick={openVisualModal}
                        >
                            <img src={language} alt="language" className="w-4 h-4 group-hover:filter group-hover:brightness-0 transition-all duration-300" />
                        </button>
                        <a 
                            href='https://www.instagram.com/aml_academy/' 
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-800 hover:bg-yellow-400 transition-all duration-300 group"
                        >
                            <img src={igIcon} alt="instagram" className="w-4 h-4 group-hover:filter group-hover:brightness-0 transition-all duration-300" />
                        </a>
                        <a 
                            href='https://t.me/aml_academy_23' 
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-800 hover:bg-yellow-400 transition-all duration-300 group"
                        >
                            <img src={tgIcon} alt="telegram" className="w-4 h-4 group-hover:filter group-hover:brightness-0 transition-all duration-300" />
                        </a>
                        <a 
                            href='https://wa.me/77087168416' 
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-800 hover:bg-yellow-400 transition-all duration-300 group"
                        >
                            <img src={waIcon} alt="telegram" className="w-5 h-5 group-hover:filter group-hover:brightness-0 transition-all duration-300" />
                        </a>
                    </div>
                    
                    <div className="flex justify-between p-3.5 pt-1">
                        <button 
                            className={`${dark ? 'text-black hover:text-gray-600' : 'text-white hover:text-yellow-400'} transition-colors duration-300`}
                            onClick={() => changeLanguage('kz')}
                        >
                            ҚАЗ
                        </button>
                        <button 
                            className={`${dark ? 'text-black hover:text-gray-600' : 'text-white hover:text-yellow-400'} transition-colors duration-300`}
                            onClick={() => changeLanguage('ru')}
                        >
                            РУС
                        </button>
                        <button 
                            className={`${dark ? 'text-black hover:text-gray-600' : 'text-white hover:text-yellow-400'} transition-colors duration-300`}
                            onClick={() => changeLanguage('eng')}
                        >
                            ENG
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});
