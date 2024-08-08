import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";
import './style.scss';

export default function LangBtn () {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const _Ref = useRef(null);

    const getLanguageLabel = (language) => {
        switch (language) {
            case 'kz':
                return 'ҚАЗ';
            case 'ru':
                return 'РУС';
            case 'eng':
                return 'ENG';
            default:
                return 'РУС';
        }
    };

    const [currentLanguage, setCurrentLanguage] = useState(getLanguageLabel(i18n.language));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (_Ref.current && !_Ref.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const changeLanguage = (language, label) => {
        setOpen(false);
        setCurrentLanguage(label);
        i18n.changeLanguage(language);
    };

    useEffect(() => {
        setCurrentLanguage(getLanguageLabel(i18n.language));
    }, [i18n.language]);

    return (
        <div className="lang" ref={_Ref}>
            <div className="lang-toggle" onClick={() => setOpen(prev => !prev)}>
                <span>{currentLanguage}</span>
                <FaChevronDown />
            </div>
            {
                open && (
                    <div className="lang-options">
                        <div onClick={() => changeLanguage('kz', 'ҚАЗ')}>ҚАЗ</div>
                        <div onClick={() => changeLanguage('ru', 'РУС')}>РУС</div>
                        <div onClick={() => changeLanguage('eng', 'ENG')}>ENG</div>
                    </div>
                )
            }
        </div>
    );
};