import AsianMan from "../../assets/asian-man.png";
import AsianWomen from "../../assets/asian-woman.png";
import WhiteMan from "../../assets/white-man.png";
import carousel_11 from './../../../../assets/images/Carousel_11.png';
import carousel_110 from './../../../../assets/images/Carousel_110.png';
import carousel_111 from './../../../../assets/images/Carousel_111.png';
import carousel_12 from './../../../../assets/images/Carousel_12.png';
import carousel_13 from './../../../../assets/images/Carousel_13.png';
import carousel_14 from './../../../../assets/images/Carousel_14.png';
import carousel_15 from './../../../../assets/images/Carousel_15.png';
import carousel_16 from './../../../../assets/images/Carousel_16.png';
import carousel_17 from './../../../../assets/images/Carousel_17.png';
import carousel_18 from './../../../../assets/images/Carousel_18.png';
import carousel_19 from './../../../../assets/images/Carousel_19.png';

export const images = [
    {
        header: '',
        src: carousel_11,
    },
    {
        header: '',
        src: carousel_12,
    },
    {
        header: 'Для завершения процедуры необходимо: 1. Выбрать категорию «Финансы»;',

        src: carousel_13,
    },
    {
        header: '2. Кликнуть на подкатегорию «Уведомительный порядок»;',
        src: carousel_14,
    },
    {
        header: '4. Заказать услугу онлайн;',
        src: carousel_15,
    },
    {
        header: '5. Во всплывающем окне выбрать Агентство Республики Казахстан по финансовому мониторингу;',
        src: carousel_16,
    },
    {
        header: '6. Далее отображаются личные сведения Субъекта;',
        src: carousel_17,
    },
    {
        header: '8. Также можно проверить информацию о поданном уведомлении и при необходимости скачать талон о принятии уведомления. Для этого на главной странице сайта elicense.kz  необходимо выбрать «Поиск РД»;',
        src: carousel_18,
    },
    {
        header: '9. Указать БИН/ИИН организации;',
        src: carousel_19,
    },
    {
        header: '11. Скачать документ «Талон о принятии уведомления».',
        src: carousel_110,
    },
    {
        header: 'Уведомление заверяется электронной цифровой подписью субъекта.',
        src: carousel_111,
    },
]

export const transcripts = [
    { title: 'Транскрипт 1', content: 'Переходит сдавать уведомление: Егов – войти – электронное лицензирование – Финансы – Уведомительный порядок (Уведомление о начале или прекращении деятельности лица, являющегося субъектом финансового мониторинга в соответствии с Законом Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма») – заполняет форму – подписывает – скачивает уведомление' },
];

export const questions = [
    {
        question: 'Выбрать из списка',
        answers: [
            'независимые специалисты по юридическим вопросам',
            'индивидуальные предприниматели и юридические лица, осуществляющие лизинговую деятельность в качестве лизингодателя без лицензии',
            'индивидуальные предприниматели и юридические лица, осуществляющие операции с драгоценными металлами и драгоценными камнями, ювелирными изделиями из них',
            'индивидуальные предприниматели и юридические лица, оказывающие посреднические услуги при осуществлении сделок купли-продажи недвижимого имуществ'
        ]
    },
]

export const formData = {
    "sections": [
        {
            "title": "Данные СФМ",
            "fields": [
                { "label": "Фамилия", "type": "text" },
                { "label": "Имя", "type": "text" },
                { "label": "Отчество", "type": "text" }
            ]
        },
        {
            "title": "Период осуществления деятельности",
            "fields": [
                { "label": "Дата начала осуществления деятельности", "type": "date" }
            ]
        },
        {
            "title": "Адрес объектов",
            "fields": [
                { "label": "Почтовый индекс", "type": "text" },
                { "label": "Место положение", "type": "text" },
                { "label": "Название улицы", "type": "text" },
                { "label": "Номер дома", "type": "text" },
                { "label": "Номер квартиры/дома", "type": "text" }
            ]
        },
        {
            "title": "Вид субъекта финансового мониторинга",
            "quizComponent": true
        }
    ]
};

export const cardData = [
    { name: 'Айжан', date: '01.02.1998', id: '**KAZAKHSTAN001**', characterImg: AsianWomen },
    { name: 'Дамир', date: '01.02.1999', id: '**KAZAKHSTAN002**', characterImg: AsianMan },
    { name: 'Дархан', date: '01.02.2000', id: '**KAZAKHSTAN003**', characterImg: WhiteMan }
];

export const quizCardsData = [
    { id: 1, text: '1Разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК' },
    { id: 2, text: '2Разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК' },
    { id: 3, text: '3Разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК' },
    { id: 4, text: '4Разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК' },
];