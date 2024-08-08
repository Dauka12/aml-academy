import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useCategoryFormat } from '../../../Context/Context'
import './style.css'


const LearningFormatCard = ({ header, text, type_name }) => {
    const navigate = useNavigate()
    const { handleChangeCategoryFormat } = useCategoryFormat();
    const { t } = useTranslation();
    function handleNavigate() {
        if (type_name === 'Онлайн') {
            handleChangeCategoryFormat('Онлайн');
        } else {
            handleChangeCategoryFormat('Дистанционно');
        }
        navigate('/courses#top')
    }

    return (
        <div className='learning-format-card'>
            <div className='header-wrapper'>
                <div className='header'>
                    {header}
                </div>
            </div>
            <div className='learning-format-main-body'>
                <div className='text'>
                    {text}
                </div>
                <div className='button-div'>
                    <button alt={type_name} onClick={handleNavigate}>
                        {t('go to catalog')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LearningFormatCard
