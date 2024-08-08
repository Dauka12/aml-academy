import React, { useEffect, useRef, useState } from 'react';
// import cl from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import igIcon from '../../assets/icons/ig.svg';
import language from '../../assets/icons/lang.svg';
import tgIcon from '../../assets/icons/tg.svg';
import waIcon from '../../assets/icons/waIcon.svg';
import logo from '../../assets/images/logo.svg';
import { useAuth } from '../../auth/AuthContext';
import './Header.scss';
import './Navigation.scss';

import { useTranslation } from 'react-i18next';

import { useStyle } from '../VisualModal/StyleContext';
import { Hamburger } from './components/hamburger';
import { NavigationBar } from './components/navigation-bar';
import LangBtn from './v2/lang-btn';

function Header(props) {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const letterInterval="standard";
  const role = localStorage.getItem('role')

  const [ openNavbar, setOpenNavbar] = useState(false);
  const [ activeNavItem, setActiveNavItem] = useState('');


  const jwtToken = localStorage.getItem('jwtToken');
  const name = localStorage.getItem('firstname') + " " + localStorage.getItem('lastname')
  const pfp = name.split(' ')[0][0] + name.split(' ')[1][0]

  const [username, setUsername] = useState(localStorage.getItem('email'))

  const {
    setIsLoggedIn
  } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userToggleRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {

    handleWindowResolution();
    window.addEventListener('resize', handleWindowResolution);


    // console.log(username)
    const handleClickOutside = (event) => {
      // Check if the clicked element is a descendant of the .user-icon button
      if (
        userToggleRef.current &&
        !userToggleRef.current.contains(event.target) &&
        event.target.className !== 'toggle-user-button' &&
        event.target.className !== 'user-icon'
      ) {
        // Clicked outside of user-toggle (excluding user-icon button), close it
        setIsMenuOpen(false);
      }

      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) &&
        event.target.className !== 'hamburger-navigation' &&
        event.target.className !== 'bar'
      ) {
        setActiveNavItem('');
        setOpenNavbar(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleWindowResolution = () => {
    const { width } = getWindowDimensions();
    if (width > 1200) {
      setOpenNavbar(false);
    }
  }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
      console.log("works")

    setIsLoggedIn(false)
    setUsername('')

    navigate('/login')
  };

  const profilePageLink = () => {
    navigate('/profile')
  }

  const openVisualModal = () => {
    props.handleOpenVisualModal();
  }

  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const darkModeStyles = {
    filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%)', 
  };
  
  const lightModeStyles = {
    filter: 'invert(0%)', 
    
  };
  
  const blueModeStyles = {
    filter: 'invert(0%)',

  };
  const { styles } = useStyle();

  const getLetterSpacing = (interval) => {
    interval = styles.letterInterval;

    switch (interval) {
      case "medium":
        return "2px";
      case "large":
        return "4px"; 
      default:
        return "1px";
    }
  };


  return (
    <div className="interval" style={{ letterSpacing: getLetterSpacing(letterInterval) }}>
    <div className={`navbar ${props.dark? 'dark' : ''} text-content`}>
      <Link to="/" className='logo'>
    <img
      src={logo}
      alt="logo"
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        borderRadius: '50%',
        ...(styles.colorMode === 'dark' ? darkModeStyles : (styles.colorMode === 'light' ? lightModeStyles : blueModeStyles)),
      }}
    />
  </Link>
      <div className='tool-navigation-container'>
        <div className='language-container'>
            <div className='social-icons'>
                <a href='/' className='soc-icon blue-button' onClick={openVisualModal}>
                  <img src={language} alt="language" className='icon' />
                </a>
                <a href='https://www.instagram.com/aml_academy/' className='soc-icon blue-button'>
                  <img src={igIcon} alt="instagram" className='icon' />
                </a>
                <a href='https://t.me/aml_academy_23' className='soc-icon blue-button'>
                  <img src={tgIcon} alt="telegram" className='icon' />
                </a>
                <a href='https://wa.me/77087168416' className='soc-icon blue-button'>
                  <img src={waIcon} style={{width: '20px'}} alt="telegram" className='icon' />
                </a>
            </div>

            <LangBtn />
          </div>
          
        <div className='tool-container'>
            <div className={`navigation-container ${isMenuOpen ? 'menu-open' : ''}`}>
                <NavigationBar dark={props.dark}/>
            </div>
          {jwtToken ? 
            <div className='user-actions' onClick={() => toggleMenu()} >
              <div className='user-icon toggle-user-button'>
                <p className='toggle-user-button'>{pfp.toUpperCase()}</p>
              </div>
              <div className='user-toggle'
                style={{
                  display: isMenuOpen ? 'flex' : 'none'
                }}
                ref={userToggleRef}
              >
                <div onClick={profilePageLink} className='person-menu-item menu-item underline-item'>
                  <div className='user-icon'>
                    <p>{pfp.toUpperCase()}</p>
                  </div>
                  <div>
                  </div>
                  <p className='user-toggle-links'>{name}</p>
                </div>
                {role === 'ROLE_ADMIN' ? 
                <div onClick={() => navigate('/manager')} className='person-menu-item menu-item underline-item'>
                  <p className='user-toggle-links'>Админ панель</p>
                </div> : null
                }
                <div onClick={handleLogout} className='menu-item'>
                  <p className='user-toggle-links'>Выйти</p>
                </div>
              </div>
            </div>
            :
            <div className='user-actions'>
              <a href='/registration' className='text-button text-content'>{t('regestration')}</a>
              <a href='/login' className={`contained-button blue-button ${props.dark? 'dark' : ''}`}>{t('signin')}</a>
            </div>
          }
          <Hamburger 
            ref={hamburgerRef}
            setOpenNavbar={setOpenNavbar}
            setActiveNavItem={setActiveNavItem}
            activeNavItem={activeNavItem}
            openVisualModal={openVisualModal}
            openNavbar={openNavbar}
          />
        </div>
      </div>
    </div>
    </div>
  )

}
export default Header;