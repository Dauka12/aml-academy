import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import '../style.scss';

export default function NavItem({ name, mainRoute, subItems }) {
    const [open, setOpen] = useState(false);
    const navItemRef = useRef(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navItemRef.current && !navItemRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="nav-item" ref={navItemRef}>
            <div onClick={() => {
                setOpen(!open)
                if (mainRoute) {
                    navigate(mainRoute);
                }
            }}>
                {t(name)}
            </div>
            {
                open && subItems.length > 0 && (
                    <div className="sub-items">
                        {
                            subItems.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        navigate(item.route)
                                    }}
                                >
                                    {t(item.name)}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}