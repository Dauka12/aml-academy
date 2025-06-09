import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useCategoryFormat } from '../../../Context/Context'

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

    return (        <div className="relative flex flex-col items-center transition-all duration-500 hover:scale-105 hover:shadow-xl">
            {/* Заголовок */}
            <div className="absolute -top-5 z-10 flex justify-center">
                <div className="bg-[#1c3b82] text-white px-8 py-2 rounded-lg text-lg font-medium shadow-md">
                    {type_name}
                </div>
            </div>{/* Основная карточка */}
            <div className="bg-white rounded-2xl shadow-md w-full max-w-[350px] h-[350px] flex flex-col pt-10 px-6">
                {/* Текст */}
                <div className="text-[#3A3939] text-base leading-relaxed mb-6 flex-grow overflow-hidden">
                    {text}
                </div>
                
                {/* Кнопка */}
                <div className="flex justify-end pb-6">
                    <button 
                        onClick={handleNavigate}
                        className="border border-[#1c3b82] text-[#1c3b82] px-5 py-2 rounded-lg hover:bg-[#1c3b82] hover:text-white transition-colors duration-300"
                    >
                        {t('go to catalog')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LearningFormatCard
