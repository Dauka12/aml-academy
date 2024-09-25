import AsianMan from "../../assets/asian-man.png";
import {default as AsianWomen, default as clientImg} from '../../assets/asian-woman.png';
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
    {
        title: 'Транскрипт 1',
        content: 'Переходит сдавать уведомление: Егов – войти – электронное лицензирование – Финансы – Уведомительный порядок (Уведомление о начале или прекращении деятельности лица, являющегося субъектом финансового мониторинга в соответствии с Законом Республики Казахстан «О противодействии легализации (отмыванию) доходов, полученных преступным путем, и финансированию терроризма») – заполняет форму – подписывает – скачивает уведомление'
    },
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
                {"label": "Фамилия", "type": "text"},
                {"label": "Имя", "type": "text"},
                {"label": "Отчество", "type": "text"}
            ]
        },
        {
            "title": "Период осуществления деятельности",
            "fields": [
                {"label": "Дата начала осуществления деятельности", "type": "date"}
            ]
        },
        {
            "title": "Адрес объектов",
            "fields": [
                {"label": "Почтовый индекс", "type": "text"},
                {"label": "Место положение", "type": "text"},
                {"label": "Название улицы", "type": "text"},
                {"label": "Номер дома", "type": "text"},
                {"label": "Номер квартиры/дома", "type": "text"}
            ]
        },
        {
            "title": "Вид субъекта финансового мониторинга",
            "quizComponent": true
        }
    ]
};


export const cardData = [
    {name: 'Айжан', date: '01.02.1998', id: '**KAZAKHSTAN001**', characterImg: AsianWomen, correctAnswer: false},
    {name: 'Дамир', date: '01.02.1999', id: '**KAZAKHSTAN002**', characterImg: AsianMan, correctAnswer: true},
    {name: 'Дархан', date: '01.02.2000', id: '**KAZAKHSTAN003**', characterImg: WhiteMan, correctAnswer: false}
];

export const quizCardsData = [
    {
        id: 1,
        text: 'разработку и согласование, внесение изменений и (или) дополнений в ПВК, а также мониторинг реализации и соблюдения ПВК;',
        correctAnswer: true
    },
    {
        id: 2,
        text: 'организацию и контроль по представлению сведений и информации об операциях, подлежащих финансовому мониторингу в уполномоченный орган в соответствии с Законом о ПОД/ФТ;',
        correctAnswer: true
    },
    {
        id: 3,
        text: 'принятие решений о признании операций клиентов равными либо превышающими пороговое значение;',
        correctAnswer: false
    },
    {
        id: 4,
        text: 'принятие решений об отнесении операций клиентов к сложным, необычно крупным, к операциям, имеющим характеристики, соответствующие типологиям, схемам и способам легализации ОД/ФТ/ФРОМУ;',
        correctAnswer: true
    },
    {id: 5, text: 'принятие решений об отказе от проведения операций клиентов;', correctAnswer: false},
    {
        id: 6,
        text: 'принятие решений об установлении, продолжении либо прекращении деловых отношений с клиентами;',
        correctAnswer: true
    },
    {
        id: 7,
        text: 'документальное фиксирование решений, принятых в отношении операций клиента (его представителя) и бенефициарного собственника;',
        correctAnswer: true
    },
    {
        id: 8,
        text: 'формирование досье клиента на основании данных, полученных от правоохранительных и специальных государственных органов;',
        correctAnswer: false
    },
    {
        id: 9,
        text: 'информирование государственного органа-регулятора о выявленных нарушениях ПВК;',
        correctAnswer: false
    },
    {
        id: 10,
        text: 'обеспечение доступа к сведениям, полученным при осуществлении своих функций;',
        correctAnswer: false
    },
];

export const tag_quiz_data = [
    {id: 1, text: 'Национальная оценка рисков', isCorrect: true},
    {id: 2, text: 'Обучение', isCorrect: true},
    {id: 3, text: 'Реестр рисковых лиц и финансовых пирамид', isCorrect: false},
    {
        id: 4,
        text: 'Перечень государств (территорий), которые не выполняют и (или) недостаточно выполняют рекомендации ФАТФ',
        isCorrect: false
    },
    {id: 5, text: 'Перечень организаций и лиц, связанных с финансированием терроризма и экстремизма', isCorrect: true},
    {id: 6, text: 'ПДЛ', isCorrect: true},
    {id: 7, text: 'Пройти опрос/тестирование', isCorrect: true},
    {id: 8, text: 'Обратная связь', isCorrect: true},
    {id: 9, text: 'FAQ', isCorrect: false},
    {id: 10, text: 'Реестр уведомлений СФМ в сфере ПОД/ФТ', isCorrect: false},
]
export const folder_list_1 = [
    {id: 1, text: 'ФИО', isCorrect: true},
    {id: 2, text: 'ИИН', isCorrect: true},
    {id: 3, text: 'Резидентство', isCorrect: false},
    {id: 4, text: 'Бенефициарный собственник', isCorrect: true},
    {id: 5, text: 'Адрес проживания', isCorrect: true},
    {id: 6, text: 'Справка с ЕНПФ', isCorrect: false},
    {id: 7, text: 'Социальный статус', isCorrect: false},  // Assuming isCorrect is false
    {id: 8, text: 'Справка об отсутствии судимости', isCorrect: false},  // Assuming isCorrect is false
    {id: 9, text: 'Документ, удостоверяющий личность', isCorrect: true},  // Assuming isCorrect is false
    {id: 10, text: 'Адрес (юридический/фактический)', isCorrect: false},  // Assuming isCorrect is false
    {id: 11, text: 'Цель и характер деловых отношений', isCorrect: true},  // Assuming isCorrect is false
    {id: 12, text: 'Справка с места работы', isCorrect: false}  // Assuming isCorrect is false
];

export const folder_list_2 = [
    {id: 1, text: 'Вид участника (покупатель/продавец/иное)', isCorrect: true},  // Assuming isCorrect is false
    {id: 2, text: 'Сумма операции', isCorrect: true},  // Assuming isCorrect is false
    {id: 3, text: 'Физическое присутствие участника (покупатель/продавец/иное)', isCorrect: false},  // Assuming isCorrect is false
    {id: 4, text: 'Регистрационные данные СФМ (наименование, ИИН/БИН/ИП)', isCorrect: false},  // Assuming isCorrect is false
    {id: 5, text: 'Вид операции (покупка/продажа ювелирных изделий/иное)', isCorrect: true},  // Assuming isCorrect is false
    {id: 6, text: 'Регион реализации продукта/ювелирного изделия', isCorrect: false}  // Assuming isCorrect is false
];
export const transcripts1 = [
    {
        title: 'Транскрипт 1',
        content: <>
            <ul>
                <li>Портал имеет открытую и закрытую часть. Открытая часть портала доступна всем пользователям, в том
                    числе и неавторизованным/незарегистрированным.
                </li>
                <li>В открытой части портала пользователям доступны следующие разделы:
                    <ul>
                        <li>Обучение</li>
                        <li>Национальная оценка рисков</li>
                        <li>Перечень государств (территорий), которые не выполняют и (или) недостаточно выполняют
                            рекомендации ФАТФ
                        </li>
                        <li>Списки (Перечень организаций и лиц, связанных с финансированием терроризма и экстремизма).</li>
                    </ul>
                </li>
                <li>Незарегистрированным пользователям необходимо пройти регистрацию чтобы получить доступ к закрытой части портала.</li>
            </ul>
        </>
    },
    {
        title: 'Транскрипт 2',
        content: <>
            <ul>
                <li>
                    При этом откроется всплывающее окно, где нужно выбрать вид пользователя. Субъектам финансового мониторинга нужно выбрать исходя из следующих видов:
                    <ul>
                        <li>физическое лицо</li>
                        <li>ИП</li>
                        <li>юридическое лицо</li>
                    </ul>
                </li>
                <li>Далее, нужно выбрать подходящий вам код вида субъекта из выпадающего списка.</li>
                <li>После этого нужно добавить сертификат ЭЦП (для физических лиц – личный, для юридических лиц – корпоративный ЭЦП GOST, RSA). При этом удостоверьтесь, что на вашем устройстве есть программа NCA Layer. Кроме того, необходимо принять условия пользовательского соглашения (нажать галочку).</li>
                <li>После регистрации пользователь предупреждается об ответственности за внесенные им в систему данные. Пользователь должен подтвердить, что он берет на себя ответственность и стать ответственным лицом регистрируемой организации, или добавить другое ответственное лицо в систему.</li>
            </ul>
        </>
    },
    {
        title: 'Транскрипт 3',
        content: <>
            <ul>
                <li>
                    Если вы указываете другого человека в качестве ответственного лица, то нужно добавить следующую информацию о нем:
                    <ul>
                        <li>ФИО</li>
                        <li>ИИН</li>
                        <li>Телефон</li>
                        <li>Электронная почта</li>
                    </ul>
                </li>
                <li>
                    ВНИМАНИЕ! После того как выбрали ответственное лицо, выйдет уведомление об успешной регистрации. Однако, для завершения процесса регистрации на портале нужно будет пройти авторизацию и заполнить данные в Личном кабинете. Без этого ваша регистрация не будет полной и запрос на регистрацию не направится в уполномоченный орган.3. Для этого заново выбираем ключ ЭЦП и осуществляем вход, далее перед вами откроется профиль где необходимо заполнить три блока информации:
                    <ul>
                        <li>Документы (удостоверение личности)</li>
                        <li>Место осуществления деятельности (адрес)</li>
                        <li>Личные данные: электронная почта, высшее образование, телефон и информация о наличии/отсутствии судимости.</li>
                    </ul>
                </li>
                <li>Для начала заполнения данных, необходимо нажать значок карандаша (✏️) . Затем заполнить необходимую информацию. Для сохранения введенных данных необходимо на некоторых полях нажать на зеленую галочку справа от поля (✔️).</li>
                <li>После заполнения данных, необходимо сохранить изменения и нажать кнопку «Подписать». Если кнопка «Подписать» отсутствует — подписание данных не требуется. После успешного подписания, запрос на регистрацию будет направлен на рассмотрение уполномоченного органа. Через некоторое время необходимо произвести авторизацию.</li>
                <li>Внимание! При регистрации необходимо обязательно заполнить все поля в соответствии с вышеуказанными инструкциями, так как при неправильном или неполном заполнении информации запрос на регистрацию может быть отклонен уполномоченным органом.</li>
            </ul>
        </>
    },
];

export const testData = [
    {id: 1, text: 'Публичное должностное лицо', correctAnswer: false},
    {id: 2, text: 'Бен. собственник клиента ПДЛ', correctAnswer: false},
    {id: 3, text: 'Клиент без гражданства РК', correctAnswer: false},
    {id: 4, text: 'Клиент, не имеющий адреса регистрации в РК', correctAnswer: false},
    {id: 5, text: 'Клиент включенный в список ФТ', correctAnswer: false},
    {id: 6, text: 'Клиент включенный в перечень ФРОМУ', correctAnswer: false},
    {id: 7, text: 'Некоммерческая организация', correctAnswer: false},
    {id: 8, text: 'Сомнительные документы представленные клиентом', correctAnswer: false},
    {id: 9, text: 'Сомнительные схемы расчетов предлагаемые клиентом', correctAnswer: false},
    {id: 10, text: 'Клиент в отношении которого ранее был определен высокий риск', correctAnswer: false},
    {id: 11, text: 'Клиент уклоняется от процедуры НПК', correctAnswer: false},
    {id: 12, text: 'Государственный орган', correctAnswer: false},
    {id: 13, text: 'Международная организация', correctAnswer: false},
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
    {name: "Смирнов Алексей Владимирович", id: "920123212313", shouldBeSwitched: true},
    {name: "Омаров Талгат Саматович", id: "990110202209", shouldBeSwitched: true},
    {name: "Жумабаева Алия Сериковна", id: "750202567890", shouldBeSwitched: true},
    {name: "Тулеубаев Данияр Арсенович", id: "880312234567", shouldBeSwitched: true},
    {name: "Баймухамбетова Мадина Ануаровна", id: "900401901234", shouldBeSwitched: false},
    {name: "Каиров Ерлан Болатович", id: "791223012345", shouldBeSwitched: false},
    {name: "Утешева Гульнара Ермековна", id: "930910123456", shouldBeSwitched: false},
    {name: "Арман Есжанович Мусин", id: "941114234567", shouldBeSwitched: false},
    {name: "Алтынбекова Сауле Нуртаевна", id: "780912345678", shouldBeSwitched: false},
    {name: "Нургалиев Айбек Темирбекович", id: "890123456789", shouldBeSwitched: false},
    {name: "Смагулова Жанна Еркиновна", id: "901204567890", shouldBeSwitched: false},
    {name: "Турсунов Руслан Еркебуланович", id: "010423678901", shouldBeSwitched: false}
];

export const peopleData1 = [
    {name: "Смирнов Алексей Владимирович", id: "920123212313", shouldBeSwitched: true},
    {name: "Омаров Талгат Саматович", id: "990110202209", shouldBeSwitched: true},
    {name: "Жумабаева Алия Сериковна", id: "750202567890", shouldBeSwitched: true},
    {name: "Тулеубаев Данияр Арсенович", id: "880312234567", shouldBeSwitched: true},
    {name: "Баймухамбетова Мадина Ануаровна", id: "900401901234", shouldBeSwitched: false},
    {name: "Каиров Ерлан Болатович", id: "791223012345", shouldBeSwitched: false},
    {name: "Утешева Гульнара Ермековна", id: "930910123456", shouldBeSwitched: false},
    {name: "Арман Есжанович Мусин", id: "941114234567", shouldBeSwitched: false},
    {name: "Алтынбекова Сауле Нуртаевна", id: "780912345678", shouldBeSwitched: false},
    {name: "Нургалиев Айбек Темирбекович", id: "890123456789", shouldBeSwitched: false},
    {name: "Смагулова Жанна Еркиновна", id: "901204567890", shouldBeSwitched: false},
    {name: "Турсунов Руслан Еркебуланович", id: "010423678901", shouldBeSwitched: false}
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
    {id: 1, name: 'ФИО', initialZoneId: 0, correctZone: 1},
    {id: 2, name: 'Документ удостоверяющий личность', initialZoneId: 0, correctZone: 1},
    {id: 3, name: 'ИИН', initialZoneId: 0, correctZone: 1},
    {id: 4, name: 'Номер и серия документа', initialZoneId: 0, correctZone: 1},
    {id: 5, name: 'Электронная почта', initialZoneId: 0, correctZone: 2},
    {id: 6, name: 'Адрес места регистрации', initialZoneId: 0, correctZone: 3},
    {id: 7, name: 'Номер контактного телефона', initialZoneId: 0, correctZone: 2},
    {id: 8, name: 'Дата заполнения анкеты', initialZoneId: 0, correctZone: 3},
    {id: 9, name: 'Кем выдан документ', initialZoneId: 0, correctZone: 3},
    {id: 10, name: 'Когда выдан документ', initialZoneId: 0, correctZone: 3},
    {id: 11, name: 'Дата рождения', initialZoneId: 0, correctZone: 1},
    {id: 12, name: 'Происхождение денежных средств', initialZoneId: 0, correctZone: 3},
];
export const testData1 = [
    {id: 1, text: 'Страны из «Черного списка ФАТФ»', correctAnswer: false},
    {id: 2, text: 'Страны из «Серого списка ФАТФ»', correctAnswer: true},
    {id: 3, text: 'Санкционные страны', correctAnswer: false},
    {id: 4, text: 'Офшорные зоны', correctAnswer: false},
    {id: 5, text: 'Страны с высоким уровнем коррупции', correctAnswer: false},
    {id: 6, text: 'Страны с высоким уровнем оборота наркотиков', correctAnswer: false},
    {id: 7, text: 'Страны с высоким уровнем терроризма', correctAnswer: false},
    {id: 8, text: 'Страны выполняющие рекомендации ФАТФ', correctAnswer: false},
    {id: 9, text: 'Страны имеющие эффективную системы ПОД/ФТ', correctAnswer: false},
];

export const clients1 = [
    {
        description: 'Джон Смит приехал в ювелирный магазин для покупки золотого кольца. Джон проживает в штате Вайоминг, США. Это его первый визит в магазин, и он собирается оплатить покупку наличными.',
        img: clientImg,
        fullName: 'Джон Смит',
        shouldBeSwitched: false
    },
    {
        description: 'Описание третьего клиента...',
        img: clientImg,
        fullName: 'ФИО третьего клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание четвертого клиента...',
        img: clientImg,
        fullName: 'ФИО четвертого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание пятого клиента...',
        img: clientImg,
        fullName: 'ФИО пятого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание шестого клиента...',
        img: clientImg,
        fullName: 'ФИО шестого клиента',
        shouldBeSwitched: false
    },
];

export const testData2 = [
    {
        id: 1,
        text: "Операции, превышающие пороговое значение",
        correctAnswer: false,
    },
    {
        id: 2,
        text: "Систематическое приобретение однотипных изделий",
        correctAnswer: true,
    },
    {id: 3, text: "Перечисление денег на третьих лиц", correctAnswer: false},
    {id: 4, text: "Необычные обстоятельства", correctAnswer: false},
    {id: 5, text: "Использование вымышленных имен", correctAnswer: false},
    {
        id: 6,
        text: "Операция, не имеющая экономического смысла",
        correctAnswer: false,
    },
    {id: 7, text: "Необычно крупная сумма операции", correctAnswer: false},
];

export const clients2 = [
    {
        description: 'Алибек Сеитов пришел в ювелирный магазин, чтобы купить золотое кольцо. Он часто посещает магазин, но его покупки обычно небольшие и разнообразные. Сегодня он приобрел кольцо на 500 000 тенге.',
        img: clientImg,
        fullName: 'Алибек Сеитов',
        shouldBeSwitched: false
    },
    {
        description: 'Описание третьего клиента...',
        img: clientImg,
        fullName: 'ФИО третьего клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание четвертого клиента...',
        img: clientImg,
        fullName: 'ФИО четвертого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание пятого клиента...',
        img: clientImg,
        fullName: 'ФИО пятого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание шестого клиента...',
        img: clientImg,
        fullName: 'ФИО шестого клиента',
        shouldBeSwitched: false
    },
];
export const clients3 = [
    {
        description: 'Анна заказала ювелирное украшение через онлайн-магазин. Процедура надлежащей проверки клиента (НПК) была проведена через третьих лиц.',
        img: clientImg,
        fullName: 'Анна Иванова',
        shouldBeSwitched: false
    },
    {
        description: 'Описание третьего клиента...',
        img: clientImg,
        fullName: 'ФИО третьего клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание четвертого клиента...',
        img: clientImg,
        fullName: 'ФИО четвертого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание пятого клиента...',
        img: clientImg,
        fullName: 'ФИО пятого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание шестого клиента...',
        img: clientImg,
        fullName: 'ФИО шестого клиента',
        shouldBeSwitched: false
    },
];
export const testData3 = [
    {id: 1, text: 'Онлайн', correctAnswer: false},
    {id: 2, text: 'НПК проводится через третьих лиц', correctAnswer: true},
    {id: 3, text: 'Оффлайн', correctAnswer: false},
];

export const clients4 = [
    {
        description: <p className='client-review-description'>
            <p className="haha"><span className="bold">Описание проводимой операции:</span> Покупка кольца с бриллиантом
                стоимостью 5 000 000 тенге. </p>
            <p className="haha"><span className="bold">Тип клиента:</span> Публичное должностное лицо Географический
                фактор: Гражданин Казахстана </p>
            <p className="haha"><span className="bold">Описание услуги или продукта:</span> Стандартная сумма операции
            </p>
            <p className="haha"><span className="bold">По способу представления услуг или продуктов:</span> Оффлайн</p>
            <p className="haha"><span className="bold">Дополнительная информация:</span> Алексей является заместителем
                министра и регулярно делает крупные покупки.</p>
        </p>,
        img: clientImg,
        fullName: 'Алексей Иванов',
        shouldBeSwitched: false
    },
    {
        description: 'Описание третьего клиента...',
        img: clientImg,
        fullName: 'ФИО третьего клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание четвертого клиента...',
        img: clientImg,
        fullName: 'ФИО четвертого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание пятого клиента...',
        img: clientImg,
        fullName: 'ФИО пятого клиента',
        shouldBeSwitched: false
    },
    {
        description: 'Описание шестого клиента...',
        img: clientImg,
        fullName: 'ФИО шестого клиента',
        shouldBeSwitched: false
    },
];
export const clients5 = [
    {
        description: <p className='client-review-description'>
            <p className="haha"><span className="bold">Клиент:</span> Александр Иванов</p>
            <p className="haha"><span className="bold">Операция:</span> Покупка ювелирного изделия на сумму 6 000 000
                тенге.</p>
            <p className="haha"><span className="bold">Тип клиента:</span> Представляет некоммерческую организацию.</p>
            <p className="haha"><span className="bold">Географический фактор:</span> Из страны с высоким уровнем
                коррупции.</p>
            <p className="haha"><span className="bold">Услуга/продукт:</span> Покупка 2 однотипных ювелирных изделий в
                течение месяца.</p>
            <p className="haha"><span className="bold">Способ предоставления услуги:</span> Оффлайн.</p>
            <p className="haha"><span className="bold">Дополнительная информация:</span> Отсутствует.</p>
        </p>,
        img: clientImg,
        fullName: 'Александр Иванов',
        correctRisk: "Риск отсутствует"
    },
    {
        description: 'Описание третьего клиента...',
        img: clientImg,
        fullName: 'ФИО третьего клиента',
        correctRisk: "Риск высокий"
    },
    {
        description: 'Описание четвертого клиента...',
        img: clientImg,
        fullName: 'ФИО четвертого клиента',
        correctRisk: "Риск отсутствует"
    },
    {
        description: 'Описание пятого клиента...',
        img: clientImg,
        fullName: 'ФИО пятого клиента',
        correctRisk: "Риск средний"
    },
    {
        description: 'Описание шестого клиента...',
        img: clientImg,
        fullName: 'ФИО шестого клиента',
        correctRisk: "Риск низкий"
    },
];

export function scrollToTopAnimated() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    const courseContent = document.querySelector('.aml-game-right');
    if (courseContent) {
        courseContent.scrollTo({top: 0, behavior: 'smooth'});
    }
}