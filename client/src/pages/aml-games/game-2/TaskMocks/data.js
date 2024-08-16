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
    { name: 'Айжан', date: '01.02.1998', id: '**KAZAKHSTAN001**', characterImg: AsianWomen, correctAnswer: true },
    { name: 'Дамир', date: '01.02.1999', id: '**KAZAKHSTAN002**', characterImg: AsianMan, correctAnswer: false },
    { name: 'Дархан', date: '01.02.2000', id: '**KAZAKHSTAN003**', characterImg: WhiteMan, correctAnswer: false }
];

export const quizCardsData = [
    { id: 1, text: 'разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК;', correctAnswer: true },
    { id: 2, text: 'организацию и контроль по представлению сведений и информации об операциях, подлежащих финансовому мониторингу в уполномоченный орган в соответствии с Законом о ПОД/ФТ;', correctAnswer: true },
    { id: 3, text: 'принятие решений о признании операций клиентов подозрительными;', correctAnswer: false },
    { id: 4, text: 'принятие решений об отнесении операций клиентов к сложным, необычно крупным, к операциям, имеющим характеристики, соответствующие типологиям, схемам и способам легализации ОД/ФТ/ФРОМУ;', correctAnswer: true },
    { id: 1, text: 'принятие решений о приостановлении либо об отказе от проведения операций клиентов и необходимости направления информации об операциях в уполномоченный орган;', correctAnswer: true },
    { id: 2, text: 'принятие решений об установлении, продолжении либо прекращении деловых отношений с клиентами;', correctAnswer: true },
    { id: 3, text: 'направление запросов руководителю Субъекта для принятия решений об установлении, продолжении либо прекращении деловых отношений с клиентами;', correctAnswer: false },
    { id: 4, text: 'документальное фиксирование решений, принятых в отношении операций клиента (его представителя) и бенефициарного собственника;', correctAnswer: true },
    { id: 1, text: 'формирование досье клиента на основании данных, полученных в результате реализации ПВК;', correctAnswer: true },
    { id: 2, text: 'информирование руководителя Субъекта о выявленных нарушениях ПВК;', correctAnswer: true },
    { id: 3, text: 'принятие мер по улучшению системы управления рисками и внутреннего контроля;', correctAnswer: false },
    { id: 4, text: 'обеспечение мер по хранению всех документов и сведений;', correctAnswer: true },
    { id: 1, text: 'обеспечение конфиденциальности сведений, полученных при осуществлении своих функций;', correctAnswer: true },
    { id: 2, text: 'представление информации в уполномоченный орган для осуществления контроля за исполнением законодательства о ПОД/ФТ;', correctAnswer: true },
    { id: 3, text: 'предоставление по запросу уполномоченного органа информации, сведений и документов.', correctAnswer: false },
    { id: 4, text: 'разработка и согласование с руководителем Субъекта ПВК, внесение изменений и (или) дополнений к ним, а также мониторинг их реализации и соблюдения;', correctAnswer: true },
    { id: 1, text: 'направление запросов руководителю Субъекта для принятия решений об установлении, продолжении либо прекращении деловых отношений с клиентами;', correctAnswer: true },
    { id: 2, text: 'информирование руководителя Субъекта о выявленных нарушениях ПВК;', correctAnswer: true },
    { id: 3, text: 'подготовка информации о результатах реализации ПВК и рекомендуемых мерах по улучшению системы управления рисками легализации ОД/ФТ/ФРОМУ и внутреннего контроля ПОД/ФТ/ФРОМУ для формирования отчетов руководителю.', correctAnswer: false },
];
export const tag_quiz_data = [
    { id: 1, text: 'Национальная оценка рисков', isCorrect: true },
    { id: 2, text: 'Обучение', isCorrect: true },
    { id: 3, text: 'Реестр рисковых лиц и финансовых пирамид', isCorrect: false },
    { id: 4, text: 'Перечень государств (территорий), которые не выполняют и (или) недостаточно выполняют рекомендации ФАТФ', isCorrect: false },
    { id: 5, text: 'Перечень организаций и лиц, связанных с финансированием терроризма и экстремизма', isCorrect: true },
    { id: 6, text: 'ПДЛ', isCorrect: true },
    { id: 7, text: 'Пройти опрос/тестирование', isCorrect: true },
    { id: 8, text: 'Обратная связь', isCorrect: true },
    { id: 9, text: 'FAQ', isCorrect: false },
    { id: 10, text: 'Реестр уведомлений СФМ в сфере ПОД/ФТ', isCorrect: false },
]
export const folder_list_1 = [
    { id: 1, text: 'ФИО', isCorrect: true },
    { id: 2, text: 'ИИН', isCorrect: true },
    { id: 3, text: 'Резидентство', isCorrect: true },
    { id: 4, text: 'Бенефициарный собственник', isCorrect: true },
    { id: 5, text: 'Адрес проживания', isCorrect: true },
    { id: 6, text: 'Справка с ЕНПФ', isCorrect: true },
    { id: 7, text: 'Социальный статус', isCorrect: false },  // Assuming isCorrect is false
    { id: 8, text: 'Справка об отсутствии судимости', isCorrect: false },  // Assuming isCorrect is false
    { id: 9, text: 'Документ, удостоверяющий личность', isCorrect: false },  // Assuming isCorrect is false
    { id: 10, text: 'Адрес (юридический/фактический)', isCorrect: false },  // Assuming isCorrect is false
    { id: 11, text: 'Цель и характер деловых отношений', isCorrect: false },  // Assuming isCorrect is false
    { id: 12, text: 'Справка с места работы', isCorrect: false }  // Assuming isCorrect is false
];

export const folder_list_2 = [
    { id: 1, text: 'Вид участника (покупатель/продавец/иное)', isCorrect: true },  // Assuming isCorrect is false
    { id: 2, text: 'Сумма операции', isCorrect: true },  // Assuming isCorrect is false
    { id: 3, text: 'Физическое присутствие участника (покупатель/продавец/иное)', isCorrect: true },  // Assuming isCorrect is false
    { id: 4, text: 'Регистрационные данные СФМ (наименование, ИИН/БИН/ИП)', isCorrect: false },  // Assuming isCorrect is false
    { id: 5, text: 'Вид операции (покупка/продажа ювелирных изделий/иное)', isCorrect: false },  // Assuming isCorrect is false
    { id: 6, text: 'Регион реализации продукта/ювелирного изделия', isCorrect: false }  // Assuming isCorrect is false
];
