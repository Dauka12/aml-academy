import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/AuthContext";
import { useStyle } from "../../../VisualModal/StyleContext";

export const NavigationBar = ({ dark }) => {
    const { isLoggedIn } = useAuth();
    const { styles } = useStyle();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleHover = (hovered) => {
        clearTimeout(timeoutId);
        if (hovered) setIsHovered(true);
        else setTimeoutId(setTimeout(() => setIsHovered(false), 600));
    };

    const styleWithSpacingAndSize = { letterSpacing: styles.letterInterval, fontSize: styles.fontSize };

    const menuItems = [
        { label: t("about us"), links: [
            { to: "/about", label: t("about the academy") },
            { to: "/management", label: t("board of directors") },
            { to: "/structure", label: t("structure") },
            { to: "/charter", label: t("corporate governance") },
            { to: "/contacts", label: t("contacts") }
        ]},
        { label: t("training"), links: [
            { to: "/courses", label: t("course catalog") },
            isLoggedIn && { to: "/courses/myCourses", label: t("my courses") },
            { to: "/vebinars", label: t("webinars") },
            { to: "/events", label: t("Мероприятия") },
            { to: "/vebinars/surveys", label: t("surveys") },
            { to: "/vebinars/dictionary", label: t("AML словарь") }
        ].filter(Boolean) },
        { label: t("news"), to: "/all-news" }, // Updated to remove `href`
        { label: t("ric"), links: [
            { to: "/main-tasks-and-activities", label: t("Main tasks and activities") },
            { to: "/academic-council", label: t("Academic Council") },
            { to: "/plans-and-reports", label: t("plans and reports") }
        ]},
        { label: t("aml/ft"), links: [
            { to: "/anti-laundering", label: t("anti-washing system of the RK") },
            { to: "/fatf", label: t("fatf") },
            { to: "/eag", label: t("eag") },
            { to: "/mutual-evaluation", label: t("mutual assessment") }
        ]},
        { label: t("sfm"), links: [
            { to: "/subjects", label: t("types of subjects of financial monitoring") },
            { to: "/rules", label: t("internal control rules") },
            { to: "/operations", label: t("transactions subject to financial monitoring") },
            {
                to: "/ready-made-solutions", label: t("ready-made solutions catalog"),
                subLinks: [
                    { to: "/preparation-and-support", label: t("Preparation and support") },
                    { to: "/development-of-icps", label: t("Development of ICPs") }
                ]
            }
        ]},
        { label: t("compliance"), links: [
            { to: "/subjects", label: t("types of subjects of financial monitoring") },
            { to: "/rules", label: t("internal control rules") },
            { to: "/operations", label: t("transactions subject to financial monitoring") },
            {
                to: "/ready-made-solutions", label: t("ready-made solutions catalog"),
                subLinks: [
                    { to: "/preparation-and-support", label: t("Preparation and support") },
                    { to: "/development-of-icps", label: t("Development of ICPs") }
                ]
            }
        ]}
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="navbarBoxes text-content">
            {menuItems.map((item, i) => (
                <div key={i} className="menuBox text-content">
                    {item.to ? (
                        <span onClick={() => handleNavigation(item.to)} className={`menu ${dark ? 'dark' : ''}`}>
                            {item.label}
                        </span>
                    ) : (
                        <span className={`menu ${dark ? 'dark' : ''}`}>{item.label}</span>
                    )}
                    {item.links && (
                        <ul className="dropdownSub text-content">
                            {item.links.map((link, j) => (
                                <li key={j} style={styleWithSpacingAndSize} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                                    <Link to={link.to} className="subPages text-content">{link.label}</Link>
                                    {link.subLinks && isHovered && (
                                        <ul className="subsub">
                                            {link.subLinks.map((subLink, k) => (
                                                <li key={k} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                                                    <Link to={subLink.to} className="subPages1 text-content">{subLink.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};
