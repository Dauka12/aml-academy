import { useTranslation } from 'react-i18next';
import LearningFormatCard from '../learning-format-card';
import SectionTitles from '../section-titles';

const LearningFormat = () => {
    const { t } = useTranslation();

    const learningFormats = [
        {
            header: t('remote'),
            text: t('Форма передачи и получения знаний на расстоянии. Учащиеся и преподаватель могут находиться где угодно и взаимодействовать через смартфон или ПК. Такой формат используют в корпоративном, школьном и высшем образовании.'),
            type_name: 'Дистанционный'
        },
        {
            header: t('online'),
            text: t('Получение знаний и навыков при помощи компьютера или другого гаджета, подключенного к интернету в режиме "здесь и сейчас". Этот формат обучения еще называют e-learning или "электронное обучение". И оно считается логическим продолжением дистанционного.'),
            type_name: 'Онлайн'
        },
        {
            header: t('offline'),
            text: t('Традиционное образование, которое позволяет ученикам лично общаться с преподавателями и своими одногруппниками. Хотя онлайн-преподавание и обучение считаются будущим образования, они не могут заменить офлайн-образование во всех аспектах.'),
            type_name: 'Оффлайн'
        }
    ];    return (
        <div className="w-full mt-20 pt-12 pb-20">
            <SectionTitles title={t('learning format')} />
            <div className="w-full flex justify-center items-center py-20">
                <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row gap-10 justify-center items-center">
                    {learningFormats.map((format, index) => (
                        <LearningFormatCard
                            key={index}
                            header={format.header}
                            text={format.text}
                            type_name={format.type_name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LearningFormat;
