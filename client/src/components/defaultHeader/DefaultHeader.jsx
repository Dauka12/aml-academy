import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import igIcon from '../../assets/icons/ig.svg';
import language from '../../assets/icons/lang.svg';
import searchIcon from '../../assets/icons/search.svg';
import tgIcon from '../../assets/icons/tg.svg';
import logo from '../../assets/images/logo.svg';
import Button from '../UI/button/Button';
import DefaultNavigation from '../defaultNavigation/DefaultNavigation';
import cl from './DefaultHeader.module.css';

import { useAuth } from '../../auth/AuthContext';

import { FaUser } from "react-icons/fa";

function DefaultHeader() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('email')) || ''

  const jwtToken = localStorage.getItem('jwtToken');
  const userEmail = localStorage.getItem('email');
  
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth()

  const handleLogin = () => {
    console.log("works")
    navigate('/login');

  };

  const handleLogout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('jwtToken')

    setUsername('')
    setIsLoggedIn(false);

    console.log("works")

    navigate('/login')
  }; 
  
    return (
      <div className={cl.headerWrapper}>
        <div className={cl.container}>
          <div className={cl.header}>
            <div className={cl.header__logo}>
              
              <Link to="/" className={cl.header__logo}>
                <img src={logo} alt="logo" style={{ borderRadius: '50%', width: "140px" }} />
              </Link>
            </div>
            <div className={cl.menu}>
              <div className={cl.menu__utils}>
                <div className={cl.socials}>
                  <a href='#' className={cl.rounde}>
                    <img src={language} alt="language" className={cl.icon} />
                  </a>
                  <a href='https://www.instagram.com/aml_academy/' className={cl.rounde}>
                    <img src={igIcon} alt="instagram" className={cl.icon} />
                  </a>
                  <a href='https://t.me/s/afm_rk?before=1811' className={cl.rounde}>
                    <img src={tgIcon} alt="telegram" className={cl.icon} />
                  </a>
                </div>
                <div className={cl.search}>
                  <img src={searchIcon} alt="search" className={cl.search__icon} />
                  <input type='search' className={cl.search__input} />
                </div>
  
                {username != '' ? (
                  <>
                    <Link to={'/profile'} style={{color: 'inherit', textDecoration: 'inherit'}}>
                      <div className={cl.personalAccount} style={{display: 'flex', alignItems: 'center', gap: '7px', marginRight: '15px'}}>
                        {/* <img src={personalAccount} alt="personal Account" /> */}
                        <FaUser size={20} style={{color: 'black'}}/>
                        <p style={{fontSize: '1.1rem', fontWeight: '300', color: 'black'}}>{userEmail}</p>
                      </div>
                    </Link>
                    <div className={cl.languages}>
                      <a href='#' className={cl.lang}>қаз</a>
                      <a href='#' className={cl.lang}>РУС</a>
                      <a href='#' className={cl.lang}>ENG</a>
                    </div>
                    <Link className={cl.personalAccountLink} to={'/logout'}>
                      <Button className={cl.personalAccountBtn} onClick={handleLogout}>Выйти</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/login">
                    <Button onClick={handleLogin}>Войти</Button>
                  </Link>
                )}
  
              </div>
              <div className={cl.menu__navigation}>
                <DefaultNavigation />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default DefaultHeader;