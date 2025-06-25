import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import igIcon from '../../assets/icons/ig.svg';
import language from '../../assets/icons/lang.svg';
import tgIcon from '../../assets/icons/tg.svg';
import waIcon from '../../assets/icons/waIcon.svg';
import logo from '../../assets/images/logo.svg';
import { useAuth } from '../../auth/AuthContext';
import { NavigationBar } from './components/navigation-bar';
import LangBtn from './v2/lang-btn';

function Header(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('');

  const jwtToken = localStorage.getItem('jwtToken');
  const name = localStorage.getItem('firstname') + " " + localStorage.getItem('lastname');
  const pfp = name.split(' ')[0][0] + (name.split(' ')[1]?.[0] || '');

  const [username, setUsername] = useState(localStorage.getItem('email'));
  const { setIsLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const userToggleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  useEffect(() => {
    // Управление скроллом body при открытии/закрытии мобильного меню
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userToggleRef.current &&
        !userToggleRef.current.contains(event.target) &&
        !event.target.closest('.user-profile-btn')
      ) {
        setIsMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) && 
        !event.target.closest('.mobile-menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const profilePageLink = () => {
    navigate('/profile');
  };

  const openVisualModal = () => {
    props.handleOpenVisualModal();
  };

  return (
    <div className="font-sans">
      <div className="py-5 max-w-7xl mx-auto w-4/5 flex justify-between items-start text-white">
        <Link to="/" className="flex-none">
          <img
            src={logo}
            alt="logo"
            className="w-32 select-none rounded-full"
          />
        </Link>
        
        <div className="flex-grow flex flex-col gap-2.5">
          {/* Top Bar with Language and Social Icons */}
          <div className="flex justify-end items-center">
            <div className="hidden md:flex justify-between items-center w-32 mr-7">
              <button onClick={openVisualModal} className="flex items-center justify-center w-7 h-7 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
                <img src={language} alt="language" className="w-4 h-4 group-hover:filter group-hover:brightness-0 transition-all" />
              </button>
              
              <a href="https://www.instagram.com/aml_academy/" className="flex items-center justify-center w-7 h-7 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
                <img src={igIcon} alt="instagram" className="w-4 h-4 group-hover:filter group-hover:brightness-0 transition-all" />
              </a>
              
              <a href="https://t.me/aml_academy_23" className="flex items-center justify-center w-7 h-7 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
                <img src={tgIcon} alt="telegram" className="w-4 h-4 group-hover:filter group-hover:brightness-0 transition-all" />
              </a>
              
              <a href="https://wa.me/77087168416" className="flex items-center justify-center w-7 h-7 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
                <img src={waIcon} alt="whatsapp" className="w-5 h-5 group-hover:filter group-hover:brightness-0 transition-all" />
              </a>
            </div>
            
            <div className="hidden md:block">
              <LangBtn />
            </div>
          </div>
          
          {/* Bottom Bar with Navigation and User Controls */}
          <div className="flex justify-end items-center gap-5">
            {/* Desktop Navigation */}
            <div className={`hidden md:block relative ${isMenuOpen ? 'pointer-events-none' : ''}`}>
              <NavigationBar />
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden flex flex-col justify-between w-8 h-6 mobile-menu-toggle"
              onClick={toggleMobileMenu}
            >
              <div className="h-0.5 w-full bg-white rounded transition-all duration-300"></div>
              <div className="h-0.5 w-full bg-white rounded transition-all duration-300"></div>
              <div className="h-0.5 w-full bg-white rounded transition-all duration-300"></div>
            </button>
            
            {/* User Profile Button */}
            {jwtToken ? (
              <div className="relative">
                <button 
                  onClick={toggleMenu} 
                  className="w-9 h-9 bg-blue-300 border-4 border-blue-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 user-profile-btn"
                >
                  <span className="text-xs font-medium text-white">{pfp.toUpperCase()}</span>
                </button>
                
                {isMenuOpen && (
                  <div 
                    ref={userToggleRef}
                    className="absolute right-0 mt-1.5 min-w-[180px] flex flex-col bg-gray-600/90 backdrop-blur-md border border-gray-400/60 rounded shadow-lg z-40 animate-fadeIn"
                  >
                    <div 
                      onClick={profilePageLink} 
                      className="flex items-center p-4 border-b border-gray-300/30 cursor-pointer hover:bg-black/10 transition-all duration-200"
                    >
                      <div className="w-9 h-9 bg-blue-300 border-4 border-blue-800 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-medium text-white">{pfp.toUpperCase()}</span>
                      </div>
                      <span className="text-white">{name}</span>
                    </div>
                    
                    {role === 'ROLE_ADMIN' && (
                      <div 
                        onClick={() => navigate('/manager')} 
                        className="py-3 px-4 cursor-pointer hover:bg-black/10 transition-all duration-200 text-white"
                      >
                        {t('Админ панель')}
                      </div>
                    )}
                    
                    <div 
                      onClick={() => handleLogout()} 
                      className="py-3 px-4 cursor-pointer hover:bg-black/10 transition-all duration-200 text-white"
                    >
                      {t('Выйти')}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/registration" 
                  className="py-2 px-2 text-white hover:text-yellow-400 transition-all duration-300"
                >
                  {t('regestration')}
                </Link>
                
                <Link 
                  to="/login" 
                  className="py-2 px-5 bg-blue-800 rounded text-white hover:bg-blue-700 transition-all duration-300"
                >
                  {t('signin')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef} 
          className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800/95 backdrop-blur-md z-50 animate-fadeIn overflow-y-auto"
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-600">
            <Link to="/" className="flex-none" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={logo} alt="logo" className="w-16 select-none rounded-full" />
            </Link>
            
            <button 
              className="text-white p-2" 
              onClick={toggleMobileMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-5">
            <MobileNavigation setIsMobileMenuOpen={setIsMobileMenuOpen} />
          </div>
          
          <div className="p-5 border-t border-gray-600 flex justify-between">
            <button className="text-white hover:text-yellow-400 transition-colors duration-300" onClick={() => {
              window.i18n.changeLanguage('kz');
              setIsMobileMenuOpen(false);
            }}>ҚАЗ</button>
            <button className="text-white hover:text-yellow-400 transition-colors duration-300" onClick={() => {
              window.i18n.changeLanguage('ru');
              setIsMobileMenuOpen(false);
            }}>РУС</button>
            <button className="text-white hover:text-yellow-400 transition-colors duration-300" onClick={() => {
              window.i18n.changeLanguage('eng');
              setIsMobileMenuOpen(false);
            }}>ENG</button>
          </div>
          
          <div className="p-5 border-t border-gray-600 flex justify-center space-x-5">
            <a href="https://www.instagram.com/aml_academy/" className="flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
              <img src={igIcon} alt="instagram" className="w-5 h-5 group-hover:filter group-hover:brightness-0 transition-all" />
            </a>
            <a href="https://t.me/aml_academy_23" className="flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
              <img src={tgIcon} alt="telegram" className="w-5 h-5 group-hover:filter group-hover:brightness-0 transition-all" />
            </a>
            <a href="https://wa.me/77087168416" className="flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full hover:bg-yellow-400 transition-all duration-300 group">
              <img src={waIcon} alt="whatsapp" className="w-6 h-6 group-hover:filter group-hover:brightness-0 transition-all" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Navigation Component
function MobileNavigation({ setIsMobileMenuOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  
  const navbar_items = [
    {
      name: 'about us',
      subItems: [
        { name: 'about the academy', route: '/about' },
        { name: 'board of directors', route: '/management' },
        { name: 'structure', route: '/structure' },
        { name: 'corporate governance', route: '/charter' },
        { name: 'contacts', route: '/contacts' }
      ]
    },
    {
      name: 'training',
      subItems: [
        { name: 'course catalog', route: '/courses' },
        isLoggedIn ? { name: 'my courses', route: '/courses/myCourses' } : null,
        { name: 'webinars', route: '/vebinars' },
        { name: 'Мероприятия', route: '/events' },
        { name: 'surveys', route: '/vebinars/surveys' },
        { name: 'AML словарь', route: '/vebinars/dictionary' }
      ].filter(Boolean)
    },
    {
      name: 'news',
      subItems: [
        { name: 'Последние новости', route: '/news-page/99' },
        { name: 'Архив новостей', route: '/all-news' }
      ]
    },
    // ...other menu items
  ];
  
  const toggleExpanded = (name) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  const handleNavigation = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };
  
  return (
    <div className="text-white space-y-6">
      {navbar_items.map((item, index) => (
        <div key={index} className="border-b border-gray-600 pb-4">
          <div 
            className="flex justify-between items-center cursor-pointer py-2"
            onClick={() => toggleExpanded(item.name)}
          >
            <span className="text-lg font-medium">{t(item.name)}</span>
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${expandedItems[item.name] ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {expandedItems[item.name] && item.subItems && (
            <div className="pl-4 space-y-3 mt-3">
              {item.subItems.map((subItem, subIndex) => (
                <div 
                  key={subIndex} 
                  className="cursor-pointer hover:text-yellow-300 py-2 transition-colors duration-200"
                  onClick={() => handleNavigation(subItem.route)}
                >
                  {t(subItem.name)}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Header;