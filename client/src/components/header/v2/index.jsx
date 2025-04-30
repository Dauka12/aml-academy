import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdEye } from "react-icons/io";
import { useNavigate } from 'react-router';
import navbar_items from '../navbar_items';
import LangBtn from './lang-btn';
import logo from './logo.svg';
import NavItem from './nav-item';
import './style.scss';
import UserAvatar from './user-avatar';

function Header({
    handleOpenVisualModal
}) {
    const { t } = useTranslation()
    const hamburgerRef = useRef(null);
    const [openNavbar, setOpenNavbar] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('');
    const navigate = useNavigate();
    return (
        <div className="header-v2">
            <div className="row">
                <div className="logo">
                    <img src={logo} alt="" />
                    <span>{t("academy of financial monitoring")}</span>
                </div>
                <div className="navigation">
                    {navbar_items.map((item, index) => {
                        return (
                            <NavItem
                                name={item.name}
                                mainRoute={item.route}
                                subItems={item.subItems}
                                key={index}
                            />
                        );
                    })}
                </div>
                <div className="actions">
                    <div className="eye" onClick={(e) => handleOpenVisualModal()}>
                        <IoMdEye />
                    </div>
                    <div className='header_langbtn'>
                        <LangBtn />
                    </div>
                    {
                        localStorage.getItem('firstname')
                            ? (
                                <UserAvatar />
                            )
                            : (
                                <div className="signIn" onClick={()=> navigate('/login')}>
                                    {t('signin')}
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}



export default Header;
