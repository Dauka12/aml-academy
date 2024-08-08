import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../auth/AuthContext";
import { useStyle } from "../../../VisualModal/StyleContext";

export const NavigationBar = (props) => {
    const { isLoggedIn } = useAuth();
    const { styles } = useStyle();
    const { t } = useTranslation();
    useEffect(() => {

    }, [])

    const getLetterSpacing = (interval) => {
        switch (interval) {
            case "medium":
                return "2px";
            case "large":
                return "4px";
            default:
                return "1px";
        }
    };

    const getFontSize = (size) => {
        switch (size) {
            case "small":
                return "15px";
            case "standard":
                return "20px";
            case "large":
                return "24px";
            default:
                return "20px";
        }
    }
    const [isHovered, setIsHovered] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutId); // Очистить предыдущий таймаут, если он существует
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => {
            setIsHovered(false);
        }, 600); // 3000 миллисекунд (3 секунды)
        setTimeoutId(id); // Сохранить идентификатор таймаута для последующей отмены
    };
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId); // Очистить таймаут при размонтировании компонента
        };
    }, [timeoutId]);





    return (
        <div className={`navbarBoxes text-content`}
        >
            <div className={`menuBox text-content`}>
                <a className={`menu ${props.dark ? 'dark' : ''} text-content`}>{t('about us')}</a>
                <ul className={'dropdownSub text-content'}>
                    <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/about" className={'subPages text-content'}>{t('about the academy')} </Link>
                    </li>
                    <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/management" className={'subPages text-content'}>{t('board of directors')}</Link>
                    </li>
                    <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/structure" className={'subPages text-content'}>{t('structure')}</Link>
                    </li>
                    <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/charter" className={'subPages text-content'}>{t('corporate governance')}</Link>
                    </li>
                    <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/contacts" className={'subPages text-content'}>{t('contacts')}</Link>
                    </li>
                </ul>
            </div>
            <div className={'menuBox'}>
                <a className={`menu ${props.dark ? 'dark' : ''} text-content`}>{t('training')}</a>
                <ul className={'dropdownSub text-content'}>

                    <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/courses" className={'subPages text-content'}>{t('course catalog')}</Link>
                    </li>
                    {isLoggedIn ? <li style={{ letterSpacing: getLetterSpacing(styles.letterInterval), fontSize: getFontSize(styles.fontSize) }}>
                        <Link to="/courses/myCourses" className={'subPages text-content'}>{t('my courses')}</Link>
                    </li> : null}
                    <li>
                        <Link to="/vebinars" className={'subPages text-content'}>{t('webinars')}</Link>
                    </li>
                    <li>
                        <Link to="/vebinars/calendar" className={'subPages text-content'}>{t('announcements')}</Link>
                    </li>
                    <li>
                        <Link to="/vebinars/surveys" className={'subPages text-content'}>{t('surveys')}</Link>
                    </li>
                    <li>
                        <Link to="/vebinars/dictionary" className={'subPages text-content'}>AML словарь</Link>
                    </li>
                </ul>
            </div>

            <div className={'menuBox'}>
                <a className={`menu ${props.dark ? 'dark' : ''} text-content`} href='/news-page'>{t('news')}</a>
            </div>
            <div className={'menuBox'}>
                <a className={`menu ${props.dark ? 'dark' : ''} text-content`} >{t('ric')}</a>
                <ul className={'dropdownSub'}>
                    <li>
                        <Link to="/main-tasks-and-activities" className={'subPages text-content'}>{t('Main tasks and activities')}</Link>
                    </li>
                    <li>
                        <Link to="/academic-council" className={'subPages text-content'}>{t('Academic Council')}</Link>
                    </li>
                    <li>
                        <Link to="/plans-and-reports" className={'subPages text-content'}>{t('Plans and reports')}</Link>
                    </li>
                </ul>
            </div>
            <div className={'menuBox'}>
                <a className={`menu ${props.dark ? 'dark' : ''} text-content`}>{t('aml/ft')}</a>
                <ul className={'dropdownSub'}>
                    <li>
                        <Link to="/anti-laundering" className={'subPages text-content'}>{t('anti-washing system of the RK')}</Link>
                    </li>
                    <li>
                        <Link to="/fatf" className={'subPages text-content'}>{t('fatf')}</Link>
                    </li>
                    <li>
                        <Link to="/eag" className={'subPages text-content'}>{t('eag')}</Link>
                    </li>
                    <li>
                        <Link to="/mutual-evaluation" className={'subPages text-content'}>{t('mutual assessment')}</Link>
                    </li>
                </ul>
            </div>
            <div className={'menuBox'}>
                <a className={`menu ${props.dark ? 'dark' : ''} text-content`}>{t('sfm')}</a>
                <ul className={'dropdownSub'}>
                    <li>
                        <Link to="/subjects" className={'subPages text-content'}>{t('types of subjects of financial monitoring')}</Link>
                    </li>
                    <li>
                        <Link to="/rules" className={'subPages text-content'}>{t('internal control rules')}</Link>
                    </li>
                    <li>
                        <Link to="/operations" className={'subPages text-content'}>{t('transactions subject to financial monitoring')}</Link>
                    </li>
                    <li>
                        <Link to="/ready-made-solutions" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={'subPages text-content'}>{t('ready-made solutions catalog')}</Link>
                        <ul
                            style={{ display: isHovered ? 'block' : 'none' }}
                            className='subsub' >
                            <li className='li1' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                <Link to="/preparation-and-support" className={'subPages1 text-content'}>{t('Preparation and support')}</Link>
                            </li>
                            <br />
                            <li className='li1' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                                <Link to="/development-of-icps" className={'subPages1 text-content'}>{t('Development of ICPs')}</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

    )
}