import AsianMan from "../../assets/asian-man.png";
import { default as AsianWomen, default as clientImg } from '../../assets/asian-woman.png';
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
export const transcripts1 = [
    {
        title: 'Транскрипт 1',
        content: <>
            <ul>
                <li>СФМ используют Портал Электронного правительства <a href="https://egov.kz/">https://egov.kz/</a>, перед подачей Уведомления необходимо авторизоваться на сайте.</li>
                <li>После этого необходимо найти вкладку в левой стороне на нижней части страницы (электронное лицензирование), далее будет осуществлен переход на сайт лицензирования Республики Казахстан <a href="https://elicense.kz/">https://elicense.kz/</a></li>
                <li>Для завершения процедуры необходимо выбрать категорию «Финансы» и кликнуть подкатегорию «Уведомительный порядок», после выбрать «Уведомление о начале или прекращении деятельности лиц, являющегося субъектом финансового мониторинга в соответствии с Законом Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма».</li>
                <li>Заказ услуги онлайн, во всплывающем окне выбрать «Агентство Республики Казахстан по финансовому мониторингу».</li>
            </ul>
        </>
    },
    {
        title: 'Транскрипт 2',
        content: <>
            <ul>
                <li>После отображения личных сведений СФМ необходимо указать адрес осуществления деятельности и выбрать соответствующий вид Субъекта финансового мониторинга, подписать ЭЦП СФМ и отправить.</li>
                <li>Выбрать «Поиск РД», указать БИН/ИИН организации, перейти кнопку «Действительный».  </li>
            </ul>
        </>
    },
    { title: 'Транскрипт 3', content: <><ul><li>Скачать документ «Талон о принятии уведомления»</li></ul></> },
];

export const testData = [
    { id: 1, text: 'Публичное должностное лицо', correctAnswer: false },
    { id: 2, text: 'Бен. собственник клиента ПДЛ', correctAnswer: true },
    { id: 3, text: 'Клиент без гражданства РК', correctAnswer: false },
    { id: 4, text: 'Клиент, не имеющий адреса регистрации в РК', correctAnswer: false },
    { id: 5, text: 'Клиент включенный в список ФТ', correctAnswer: false },
    { id: 6, text: 'Клиент включенный в перечень ФРОМУ', correctAnswer: false },
    { id: 7, text: 'Некоммерческая организация', correctAnswer: false },
    { id: 8, text: 'Сомнительные документы представленные клиентом', correctAnswer: false },
    { id: 9, text: 'Сомнительные схемы расчетов предлагаемые клиентом', correctAnswer: false },
    { id: 10, text: 'Клиент в отношении которого ранее был определен высокий риск', correctAnswer: false },
    { id: 11, text: 'Клиент уклоняется от процедуры НПК', correctAnswer: false },
    { id: 12, text: 'Государственный орган', correctAnswer: false },
    { id: 13, text: 'Международная организация', correctAnswer: false },
];

export const clients = [
    {
        description: 'Иманова Асель Сергеевна планирует приобрести ювелирное колье в вашем магазине. \n\nАсель является частным лицом, гражданкой Республики Казахстан. В ходе надлежащей проверки клиента было установлено, что у неё имеется адрес регистрации в РК, и она предоставила полный пакет документов, которые не вызывают сомнений. Схема расчетов прямая, без использования сложных схем.',
        img: clientImg,
        fullName: 'Асель Сергеевна',
        shouldBeSwitched: true
    },
    {
        description: 'Описание второго клиента...',
        img: clientImg,
        fullName: 'ФИО второго клиента',
        shouldBeSwitched: false
    },
];

export const peopleData = [
    { name: "Смирнов Алексей Владимирович", id: "920123212313", shouldBeSwitched: true },
    { name: "Омаров Талгат Саматович", id: "990110202209", shouldBeSwitched: true },
    { name: "Жумабаева Алия Сериковна", id: "750202567890", shouldBeSwitched: true },
    { name: "Тулеубаев Данияр Арсенович", id: "880312234567", shouldBeSwitched: true },
    { name: "Баймухамбетова Мадина Ануаровна", id: "900401901234", shouldBeSwitched: false },
    { name: "Каиров Ерлан Болатович", id: "791223012345", shouldBeSwitched: false },
    { name: "Утешева Гульнара Ермековна", id: "930910123456", shouldBeSwitched: false },
    { name: "Арман Есжанович Мусин", id: "941114234567", shouldBeSwitched: false },
    { name: "Алтынбекова Сауле Нуртаевна", id: "780912345678", shouldBeSwitched: false },
    { name: "Нургалиев Айбек Темирбекович", id: "890123456789", shouldBeSwitched: false },
    { name: "Смагулова Жанна Еркиновна", id: "901204567890", shouldBeSwitched: false },
    { name: "Турсунов Руслан Еркебуланович", id: "010423678901", shouldBeSwitched: false }
];

export const peopleData1 = [
    { name: "Смирнов Алексей Владимирович", id: "920123212313", shouldBeSwitched: true },
    { name: "Омаров Талгат Саматович", id: "990110202209", shouldBeSwitched: true },
    { name: "Жумабаева Алия Сериковна", id: "750202567890", shouldBeSwitched: true },
    { name: "Тулеубаев Данияр Арсенович", id: "880312234567",shouldBeSwitched: true },
    { name: "Баймухамбетова Мадина Ануаровна", id: "900401901234",shouldBeSwitched: false },
    { name: "Каиров Ерлан Болатович", id: "791223012345", shouldBeSwitched: false },
    { name: "Утешева Гульнара Ермековна", id: "930910123456", shouldBeSwitched: false },
    { name: "Арман Есжанович Мусин", id: "941114234567", shouldBeSwitched: false },
    { name: "Алтынбекова Сауле Нуртаевна", id: "780912345678", shouldBeSwitched: false },
    { name: "Нургалиев Айбек Темирбекович", id: "890123456789", shouldBeSwitched: false },
    { name: "Смагулова Жанна Еркиновна", id: "901204567890", shouldBeSwitched: false },
    { name: "Турсунов Руслан Еркебуланович", id: "010423678901", shouldBeSwitched: false }
];

export const task = {
    name: 'Задание: Одним из повышающих факторов является критерий «публичные должностные лица, их супруги и близкие родственники».',
    description: 'Проверьте следующих лиц, на предмет отнесения их к ПДЛ:'
}
export const task1 = {
    name: 'Задание: Одним из повышающих факторов является критерий «организации и лица, включенные в список лиц, причастных к ФТ/ФРОМУ».',
    description: 'Проверьте следующих лиц, на предмет причастности их к ФТ/ФРОМУ:'
}
export const type1 = 'Публичные должностные лица, их супруги и близкие родственники'
export const initialItems = [
    { id: 1, name: 'ФИО', initialZoneId: 0, correctZone: 1 },
    { id: 2, name: 'Документ удостоверяющий личность', initialZoneId: 0, correctZone: 1 },
    { id: 3, name: 'ИИН', initialZoneId: 0, correctZone: 2 },
    { id: 4, name: 'Номер и серия документа', initialZoneId: 0, correctZone: 2 },
    { id: 5, name: 'Электронная почта', initialZoneId: 0, correctZone: 2 },
    { id: 6, name: 'Адрес места регистрации', initialZoneId: 0, correctZone: 3 },
    { id: 7, name: 'Номер контактного телефона', initialZoneId: 0, correctZone: 1 },
    { id: 8, name: 'Дата заполнения анкеты', initialZoneId: 0, correctZone: 2 },
    { id: 9, name: 'Кем выдан документ', initialZoneId: 0, correctZone: 3 },
    { id: 10, name: 'Когда выдан документ', initialZoneId: 0, correctZone: 3 },
    { id: 11, name: 'Дата рождения', initialZoneId: 0, correctZone: 1 },
    { id: 12, name: 'Происхождение денежных средств', initialZoneId: 0, correctZone: 1 },
  ];
