import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdEye } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Hamburger } from '../components/hamburger';
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
    const [ activeNavItem, setActiveNavItem] = useState('');
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
                                <div className="signIn">
                                    <Link to={'/login'}>{t('signin')}</Link>
                                </div>
                            )
                    }
                </div>
                <Hamburger
                    ref={hamburgerRef}
                    setOpenNavbar={setOpenNavbar}
                    setActiveNavItem={setActiveNavItem}
                    activeNavItem={activeNavItem}
                    openNavbar={openNavbar}
                />
            </div>
        </div>
    );
}



export default Header;
