import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/AuthContext";

export const NavigationBar = () => {
    const { isLoggedIn } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Track hover state for each menu item
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const timeoutRef = useRef(null);

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleMenuEnter = (index) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(index);
    };

    const handleMenuLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
            setActiveSubMenu(null);
        }, 300); // Shorter delay before menu disappears
    };

    const handleSubMenuEnter = (index) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveSubMenu(index);
    };

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
            isLoggedIn && { to: "/courses/my-courses", label: t("my courses") },
            { to: "/vebinars", label: t("webinars") },
            { to: "/events", label: t("Мероприятия") },
            { to: "/vebinars/surveys", label: t("surveys") },
            { to: "/vebinars/dictionary", label: t("AML словарь") }
        ].filter(Boolean) },
        { label: t("news"), to: "/all-news" },
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
        <div className="absolute right-0 flex justify-between w-[700px] lg:w-[800px] xl:w-[900px] text-content">
            {menuItems.map((item, i) => (
                <div 
                    key={i} 
                    className={`relative border ${activeMenu === i ? 'border-black bg-gray-100' : 'border-black/50'} rounded px-3 py-2.5 group transition-all duration-300 text-content hover:shadow-md`}
                    onMouseEnter={() => handleMenuEnter(i)}
                    onMouseLeave={handleMenuLeave}
                >
                    {item.to ? (
                        <button 
                            onClick={() => handleNavigation(item.to)} 
                            className="w-full text-left cursor-pointer text-black group-hover:text-yellow-400 transition-colors duration-300">
                            {item.label}
                        </button>
                    ) : (
                        <div className="w-full cursor-pointer text-black group-hover:text-yellow-400 transition-colors duration-300">
                            {item.label}
                        </div>
                    )}
                    
                    {item.links && activeMenu === i && (
                        <ul className="flex flex-col absolute top-full right-0 mt-1.5 bg-gray-600/90 backdrop-blur-md p-5 rounded border border-gray-400/60 shadow-lg min-w-max z-50 gap-4 animate-fadeIn">
                            {item.links.map((link, j) => (
                                <li 
                                    key={j}
                                    className={`relative text-black hover:text-gray-200 transition-colors duration-200 rounded px-3 py-1.5 ${activeSubMenu === j ? 'bg-gray-500/60' : ''} hover:bg-gray-500/40`}
                                    onMouseEnter={() => handleSubMenuEnter(j)}
                                >
                                    <Link to={link.to} className="block w-full text-content hover:underline transition-all duration-200">
                                        {link.label}
                                    </Link>
                                    
                                    {link.subLinks && activeSubMenu === j && (
                                        <ul className="absolute right-full top-0 bg-gray-700/90 backdrop-blur-md p-5 rounded border border-gray-400/60 w-[90%] flex flex-col gap-4 leading-8 animate-fadeIn">
                                            {link.subLinks.map((subLink, k) => (
                                                <li 
                                                    key={k} 
                                                    className="text-black hover:text-yellow-200 transition-colors duration-200 rounded px-3 py-1.5 hover:bg-gray-600/40"
                                                >
                                                    <Link to={subLink.to} className="block w-full text-content hover:underline">
                                                        {subLink.label}
                                                    </Link>
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
