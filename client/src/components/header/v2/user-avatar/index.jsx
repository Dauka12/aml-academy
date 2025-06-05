import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../auth/AuthContext";
import '../style.scss';

export default function UserAvatar(){
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const { t } = useTranslation()
    const userToggleRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const role = localStorage.getItem('role')
    const {
        setIsLoggedIn
    } = useAuth()

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');    
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        console.log("works")
        setIsLoggedIn(false)
        navigate('/login')
    };
    return (
        <>
            <div className='user-actions' onClick={() => toggleMenu()} >
                <div className='user-icon toggle-user-button'>
                    <p className='toggle-user-button'>
                        <span>{[...localStorage.getItem('firstname')][0]}</span>
                        <span>{[...localStorage.getItem('lastname')][0]}</span>
                    </p>
                </div>
                <div className='user-toggle'
                    style={{
                        display: isMenuOpen ? 'flex' : 'none'
                    }}
                    ref={userToggleRef}
                >
                    <div onClick={() => navigate('/profile')} className='person-menu-item menu-item underline-item'>
                        <div className='user-icon'>
                            <p>
                                <span>{[...localStorage.getItem('firstname')][0]}</span>
                                <span>{[...localStorage.getItem('lastname')][0]}</span>
                            </p>
                        </div>
                        <div>
                        </div>
                        <p className='user-toggle-links'>{localStorage.getItem('firstname')} {localStorage.getItem('lastname')}</p>
                    </div>
                    {role === 'ROLE_ADMIN' ?
                        <div onClick={() => navigate('/manager')} className='person-menu-item menu-item underline-item'>
                            <p className='user-toggle-links'>{t('Админ панель')}</p>
                        </div> : null
                    }
                    <div onClick={() => handleLogout()} className='menu-item'>
                        <p className='user-toggle-links'>{t('Выйти')}</p>
                    </div>
                </div>
            </div>
        </>
    )
}