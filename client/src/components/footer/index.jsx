import React, { useState } from 'react';
import cl from './index.module.css';
import './index.scss';
import { Link } from 'react-router-dom';
import fbIcon from '../../assets/icons/fb.svg';
import igIcon from '../../assets/icons/ig.svg';
import tgIcon from '../../assets/icons/tg.svg';
import waIcon from '../../assets/icons/waIcon.svg';
import { useTranslation } from 'react-i18next';
import { useStyle } from '../VisualModal/StyleContext';

function Footer({ email, phoneNumber }) {

    const { t } = useTranslation();
    const { styles } = useStyle();
    const [emailInput, setEmailInput] = useState('');

    const handleSubscribe = () => {
        if (emailInput) {
            // Здесь можно добавить логику подписки
            console.log('Подписка на email:', emailInput);
            setEmailInput('');
        }
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${email}`;
    };

    const handlePhoneClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div 
            className={`${cl.footerWrapper}`}
            style={{
                background: styles.colorMode == 'dark' ? '#000' : 'linear-gradient(135deg, #1F3C88 0%, #163063 100%)'
            }}
        >
            <div className={cl.container}>
                {/* Newsletter Section */}
                <div className={cl.newsletterSection}>
                    <div className={cl.newsletterContent}>
                        <h2 className={cl.newsletterTitle}>{t("footer.subscribe")}</h2>
                        <p className={cl.newsletterSubtitle}>
                            {t("footer.description")}
                        </p>
                        <div className={cl.subscribeForm}>
                            <input 
                                type="email" 
                                placeholder="example@gmail.com"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className={cl.emailInput}
                            />
                            <button onClick={handleSubscribe} className={cl.subscribeBtn}>
                                {t("footer.following")}
                            </button>
                        </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className={cl.socialSection}>
                        <h3 className={cl.socialTitle}>{t("footer.follow")}</h3>
                        <div className={cl.socialIcons}>
                            <a href='https://www.instagram.com/aml_academy/' className={cl.socialIcon}>
                                <img src={igIcon} alt="Instagram" />
                                <span>Instagram</span>
                            </a>
                            <a href='https://wa.me/77087168416' target="_blank" rel="noopener noreferrer" className={cl.socialIcon}>
                                <img src={waIcon} alt="WhatsApp" />
                                <span>WhatsApp</span>
                            </a>
                            <a href='https://www.facebook.com/' className={cl.socialIcon}>
                                <img src={fbIcon} alt="Facebook" />
                                <span>Facebook</span>
                            </a>
                            <a href='https://t.me/aml_academy_23' className={cl.socialIcon}>
                                <img src={tgIcon} alt="Telegram" />
                                <span>Telegram</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className={cl.linksSection}>
                    <div className={cl.linkColumn}>
                        <h4 className={cl.columnTitle}>{t('training')}</h4>
                        <ul className={cl.linkList}>
                            <li><Link to="/courses">{t('types of courses')}</Link></li>
                            <li><Link to="/courses/my-courses">{t('my courses')}</Link></li>
                            <li><Link to="/vebinars/dictionary">{t("dictionary")}</Link></li>
                        </ul>
                    </div>
                    
                    <div className={cl.linkColumn}>
                        <h4 className={cl.columnTitle}>{t('aml/ft')}</h4>
                        <ul className={cl.linkList}>
                            <li><Link to="/anti-laundering">{t('anti-washing system of the RK')}</Link></li>
                            <li><Link to="/fatf">{t('fatf')}</Link></li>
                            <li><Link to="/eag">{t('eag')}</Link></li>
                            <li><Link to="/mutual-evaluation">{t('mutual assessment')}</Link></li>
                        </ul>
                    </div>
                    
                    <div className={cl.linkColumn}>
                        <h4 className={cl.columnTitle}>{t('sfm')}</h4>
                        <ul className={cl.linkList}>
                            <li><Link to="/subjects">{t('types of subjects of financial monitoring')}</Link></li>
                            <li><Link to="/rules">{t('internal control rules')}</Link></li>
                            <li><Link to="/operations">{t('transactions subject to financial monitoring')}</Link></li>
                        </ul>
                    </div>
                    
                    <div className={cl.linkColumn}>
                        <h4 className={cl.columnTitle}>{t('about us')}</h4>
                        <ul className={cl.linkList}>
                            <li><Link to="/about">{t('about the academy')}</Link></li>
                            <li><Link to="/management">{t('board of directors')}</Link></li>
                            <li><Link to="/structure">{t('structure')}</Link></li>
                            <li><Link to="/charter">{t('corporate governance')}</Link></li>
                        </ul>
                    </div>
                    
                    <div className={cl.linkColumn}>
                        <h4 className={cl.columnTitle}>{t('contacts')}</h4>
                        <ul className={cl.linkList}>
                            <li><a href={`tel:${phoneNumber}`}>+7 708 716 8416</a></li>
                            <li><a href="https://2gis.kz/astana/firm/70000001083568354" target="_blank" rel="noopener noreferrer">{t('city')}</a></li>
                            <li><a href="https://go.2gis.com/yJPlH" target="_blank" rel="noopener noreferrer">{t('address')}</a></li>
                            <li><a href={`mailto:${email}`}>aml.academy2023@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className={cl.copyright}>
                    <p>{t('footer.copyright')}</p>
                    <div className={cl.legalLinks}>
                        <Link to="/privacy-policy">Политика конфиденциальности</Link>
                        <span>/</span>
                        <Link to="/">Пользовательское соглашение</Link>
                        <span>/</span>
                        <Link to="/">Использование файлов cookie</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;