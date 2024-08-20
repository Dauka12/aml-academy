import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import './style.css';

const StartLearning = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    function handleNavigate() {
        if (i18n.language === 'kz') {
            navigate('/courses/104/read')
        } else {
            navigate('/courses/86/read')
        }
    }
    const { t } = useTranslation()
    return (
        <div className='start-learning'>
            <div className='start-learning-wrapper'>
                <div className='text'>
                    {t("start learning")}
                </div>
                <div className='button'>
                    <button onClick={handleNavigate}>
                        {t("get your first lesson")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StartLearning
