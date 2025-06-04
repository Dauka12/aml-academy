import ComponentRenderer from './pages/ReadCourse/components/ComponentRenderer';

const ComponentTestUser = () => {
    // Comprehensive test data for ALL components from ComponentRenderer
    const testComponents = [
        // Basic Components
        {
            component_entry_id: 1,
            componentName: "Sizebox",
            values: {
                component_entry_values_id: 1,
                values: {
                    height: "40"
                }
            }
        },
        {
            component_entry_id: 2,
            componentName: "ImageWithText",
            values: {
                component_entry_values_id: 2,
                values: {
                    imageText: "Пример изображения с текстом",
                    img: "https://picsum.photos/800/600?random=1",
                    color: "#ffffff"
                }
            }
        },
        {
            component_entry_id: 3,
            componentName: "HeaderWithLine",
            values: {
                component_entry_values_id: 3,
                values: {
                    header: "Заголовок с линией",
                    lineColor: "#CADEFC",
                    headerColor: "#3A3939"
                }
            }
        },
        {
            component_entry_id: 4,
            componentName: "TextWithTitle",
            values: {
                component_entry_values_id: 4,
                values: {
                    title: "Заголовок текста",
                    text: "Это пример текста с заголовком. Здесь может быть любая информация."
                }
            }
        },
        {
            component_entry_id: 5,
            componentName: "NumberedDots",
            values: {
                component_entry_values_id: 5,
                values: {
                    list: "[\"Первый пункт списка\", \"Второй пункт списка\", \"Третий пункт списка\"]",
                    header: "Нумерованный список",
                    dotsColor: "#F9CB36",
                    color: "#3A3939"
                }
            }
        },
        {
            component_entry_id: 6,
            componentName: "NotNumberedDots",
            values: {
                component_entry_values_id: 6,
                values: {
                    list: "[\"Первый элемент\", \"Второй элемент\", \"Третий элемент\"]",
                    dotsColor: "black",
                    color: "#000000"
                }
            }
        },
        {
            component_entry_id: 7,
            componentName: "RandomH2",
            values: {
                component_entry_values_id: 7,
                values: {
                    children: "Заголовок H2",
                    color: "#000000"
                }
            }
        },
        {
            component_entry_id: 8,
            componentName: "RandomParapraph",
            values: {
                component_entry_values_id: 8,
                values: {
                    children: "Это обычный параграф текста. Здесь может быть длинное описание или любая другая информация.",
                    isCentered: "false"
                }
            }
        },
        {
            component_entry_id: 9,
            componentName: "TextWithBold",
            values: {
                component_entry_values_id: 9,
                values: {
                    text: "Это текст с выделенными **жирными** словами."
                }
            }
        },
        {
            component_entry_id: 10,
            componentName: "TextWithBackground",
            values: {
                component_entry_values_id: 10,
                values: {
                    header: "Важная информация",
                    text: "Это текст с цветным фоном для привлечения внимания.",
                    color: "#3A3939",
                    backgroundColor: "#CADEFC"
                }
            }
        },

        // Complex Components
        {
            component_entry_id: 11,
            componentName: "StageDropDown",
            values: {
                component_entry_values_id: 11,
                values: {
                    stages: "[{\"icon\": \"https://picsum.photos/800/600?random=1\", \"text\": \"Первый этап\", \"innerText\": \"Подробное описание первого этапа развития\"}, {\"icon\": \"https://picsum.photos/800/600?random=1\", \"text\": \"Второй этап\", \"innerText\": \"Подробное описание второго этапа развития\"}, {\"icon\": \"https://picsum.photos/800/600?random=1\", \"text\": \"Третий этап\", \"innerText\": \"Подробное описание третьего этапа развития\"}]",
                    title: "Этапы развития"
                }
            }
        },
        {
            component_entry_id: 12,
            componentName: "DropdownList",
            values: {
                component_entry_values_id: 12,
                values: {
                    list: "[{\"name\":\"Первая категория\",\"description\":\"Описание первой категории\",\"items\":[\"Элемент 1\",\"Элемент 2\",\"Элемент 3\"]},{\"name\":\"Вторая категория\",\"description\":\"Описание второй категории\",\"items\":[\"Элемент A\",\"Элемент B\",\"Элемент C\"]}]"
                }
            }
        },
        {
            component_entry_id: 13,
            componentName: "CustomCarousel",
            values: {
                component_entry_values_id: 13,
                values: {
                    data: "[{\"header\": \"Слайд 1\", \"imageText\": \"Описание первого слайда\", \"image\": \"https://picsum.photos/800/600?random=1\"}, {\"header\": \"Слайд 2\", \"imageText\": \"Описание второго слайда\", \"image\": \"https://picsum.photos/800/600?random=1\"}]",
                    autoPlay: "false",
                    showDots: "true",
                    showArrows: "true"
                }
            }
        },
        {
            component_entry_id: 14,
            componentName: "Component52",
            values: {
                component_entry_values_id: 14,
                values: {
                    title: "Схема отмывания денег",
                    img: "https://via.placeholder.com/500x300?text=Money+Laundering+Scheme",
                    version: "1"
                }
            }
        },

        // V2 Components
        {
            component_entry_id: 15,
            componentName: "FlexBoxes",
            values: {
                component_entry_values_id: 15,
                values: {
                    list: "[\"Первый блок с информацией\", \"Второй блок с данными\", \"Третий блок с описанием\"]",
                    color: "black",
                    backgroundColor: "#f0f0f0"
                }
            }
        },
        {
            component_entry_id: 16,
            componentName: "FlexRow",
            values: {
                component_entry_values_id: 16,
                values: {
                    items: "[{\"title\": \"Заголовок 1\", \"description\": \"Описание первого элемента\", \"image\": \"https://via.placeholder.com/150\"}, {\"title\": \"Заголовок 2\", \"description\": \"Описание второго элемента\", \"image\": \"https://via.placeholder.com/150\"}]",
                    gap: "20px",
                    alignment: "center"
                }
            }
        },
        {
            component_entry_id: 17,
            componentName: "Quote",
            values: {
                component_entry_values_id: 17,
                values: {
                    text: "Это пример цитаты или важного высказывания.",
                    author: "Автор цитаты",
                    backgroundColor: "#f8f9fa"
                }
            }
        },
        {
            component_entry_id: 18,
            componentName: "Image",
            values: {
                component_entry_values_id: 18,
                values: {
                    src: "https://picsum.photos/800/600?random=1",
                    alt: "Пример изображения",
                    caption: "Подпись к изображению",
                    width: "400px",
                    height: "300px"
                }
            }
        },

        // Table Components
        {
            component_entry_id: 19,
            componentName: "SimpleTable",
            values: {
                component_entry_values_id: 19,
                values: {
                    columns: "[\"Заголовок 1\", \"Заголовок 2\", \"Заголовок 3\"]",
                    data: "[[\"Ячейка 1-1\", \"Ячейка 1-2\", \"Ячейка 1-3\"], [\"Ячейка 2-1\", \"Ячейка 2-2\", \"Ячейка 2-3\"], [\"Ячейка 3-1\", \"Ячейка 3-2\", \"Ячейка 3-3\"]]"
                }
            }
        },
        {
            component_entry_id: 20,
            componentName: "ComplexTable",
            values: {
                component_entry_values_id: 20,
                values: {
                    columns: "[\"Название\", \"Описание\"]",
                    data: "[{\"Название\": \"Элемент 1\", \"Описание\": \"Описание элемента 1\"}, {\"Название\": \"Элемент 2\", \"Описание\": \"Описание элемента 2\"}]",
                    version: "1"
                }
            }
        },

        // Interactive Components
        {
            component_entry_id: 21,
            componentName: "InteractivePhases",
            values: {
                component_entry_values_id: 21,
                values: {
                    phases: "[{\"title\": \"Фаза 1\", \"name\": \"Название фазы 1\", \"shortDescription\": \"Краткое описание\", \"longDescription\": \"Подробное описание первой фазы\"}, {\"title\": \"Фаза 2\", \"name\": \"Название фазы 2\", \"shortDescription\": \"Краткое описание второй фазы\", \"longDescription\": \"Подробное описание второй фазы\"}]",
                    title: "Интерактивные фазы"
                }
            }
        },
        {
            component_entry_id: 22,
            componentName: "ImageWithPoints",
            values: {
                component_entry_values_id: 22,
                values: {
                    imageSrc: "https://picsum.photos/800/600?random=1",
                    points: "[{\"id\": 0, \"x\": 150, \"y\": 150, \"name\": \"Точка 1\"}, {\"id\": 1, \"x\": 400, \"y\": 300, \"name\": \"Точка 2\"}, {\"id\": 2, \"x\": 650, \"y\": 450, \"name\": \"Точка 3\"}]",
                    list: "[[\"Первый элемент точки 1\", \"Второй элемент точки 1\", \"Третий элемент точки 1\"], [\"Первый элемент точки 2\", \"Второй элемент точки 2\"], [\"Первый элемент точки 3\", \"Второй элемент точки 3\", \"Третий элемент точки 3\", \"Четвертый элемент точки 3\"]]",
                    title: "Интерактивное изображение с точками"
                }
            }
        },

        // Warning Components
        {
            component_entry_id: 23,
            componentName: "Report_Warning",
            values: {
                component_entry_values_id: 23,
                values: {
                    text: "Это важное предупреждение для пользователя.",
                    title: "Внимание!",
                    type: "warning"
                }
            }
        },
        {
            component_entry_id: 24,
            componentName: "Report_Information",
            values: {
                component_entry_values_id: 24,
                values: {
                    children: "Это информационное сообщение для пользователя.",
                    version: 1
                }
            }
        },

        // Media Components
        {
            component_entry_id: 25,
            componentName: "VideoLine",
            values: {
                component_entry_values_id: 25,
                values: {
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    title: "Пример видео",
                    poster: "https://via.placeholder.com/640x360?text=Video+Poster"
                }
            }
        },
        {
            component_entry_id: 26,
            componentName: "VideoWithTitleAndText",
            values: {
                component_entry_values_id: 26,
                values: {
                    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    title: "Заголовок видео",
                    text: "Описание видео контента",
                    poster: "https://via.placeholder.com/640x360?text=Video+With+Text"
                }
            }
        },

        // Utility Components
        {
            component_entry_id: 27,
            componentName: "Centered",
            values: {
                component_entry_values_id: 27,
                values: {
                    content: "Этот текст центрирован на странице"
                }
            }
        },
        {
            component_entry_id: 28,
            componentName: "TextWithLink",
            values: {
                component_entry_values_id: 28,
                values: {
                    text: "Этот текст содержит ссылку.",
                    link: "https://example.com",
                    linkText: "Перейти по ссылке"
                }
            }
        },
        {
            component_entry_id: 29,
            componentName: "JustTextWithP",
            values: {
                component_entry_values_id: 29,
                values: {
                    text: "Обычный текст в параграфе без дополнительного форматирования.",
                    color: "#000000"
                }
            }
        },

        // Missing Components from Elements_level_2.js
        {
            component_entry_id: 30,
            componentName: "Table_1",
            values: {
                component_entry_values_id: 30,
                values: {
                    header: "Двухколонная таблица",
                    rows: "[{\"first\": \"Первая колонка, строка 1\", \"second\": \"Вторая колонка, строка 1\"}, {\"first\": \"Первая колонка, строка 2\", \"second\": \"Вторая колонка, строка 2\"}, {\"first\": \"Первая колонка, строка 3\", \"second\": \"Вторая колонка, строка 3\"}]",
                    borderColor: "#CADEFC",
                    color: "#000000"
                }
            }
        },
        {
            component_entry_id: 31,
            componentName: "FancyList",
            values: {
                component_entry_values_id: 31,
                values: {
                    list: "[\"Первый элемент квадратного списка\", \"Второй элемент квадратного списка\", \"Третий элемент квадратного списка\", \"Четвертый элемент квадратного списка\"]",
                    textColor: "#334",
                    numberColor: "#666",
                    listColor: "#007bff"
                }
            }
        },
        {
            component_entry_id: 32,
            componentName: "IconDots",
            values: {
                component_entry_values_id: 32,
                values: {
                    list: "[\"Первый элемент с иконкой\", \"Второй элемент с иконкой\", \"Третий элемент с иконкой\"]",
                    icons: "[\"https://picsum.photos/600/400?random=2\", \"https://picsum.photos/600/400?random=2\", \"https://picsum.photos/600/400?random=2\"]",
                    header: "Список с иконками",
                    color: "#333",
                    height: "40px",
                    width: "40px"
                }
            }
        },
        {
            component_entry_id: 33,
            componentName: "ImageLine",
            values: {
                component_entry_values_id: 33,
                values: {
                    img: "https://picsum.photos/600/400?random=2",
                    height: 300,
                    notCrop: true,
                    alignment: "center"
                }
            }
        },
        {
            component_entry_id: 34,
            componentName: "FileDownloader",
            values: {
                component_entry_values_id: 34,
                values: {
                    fileName: "Пример документа.pdf",
                    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    description: "Скачать пример PDF файла"
                }
            }
        },
        {
            component_entry_id: 35,
            componentName: "TextAndLink",
            values: {
                component_entry_values_id: 35,
                values: {
                    text: "Полезная информация о финансовом мониторинге",
                    link: "https://example.com/financial-monitoring",
                    linkText: "Подробнее о финансовом мониторинге"
                }
            }
        },

        // Previously problematic components with proper data
        {
            component_entry_id: 133263,
            componentName: "DropdownList",
            values: {
                component_entry_values_id: 133263,
                values: {
                    list: "[{\"name\":\"Алдын алу шаралары\",\"description\":\"жұмыстың санкциялық әдістерін көздемейтін КЖ/ТҚ тәуекелдері мен қатерлерін болдырмауға бағытталған шаралар\",\"items\":[\"Нормативтік-құқықтық база (КЖ/ТҚҚ туралы заң, кіші заң актілері және т.б.)\",\"Тәуекелге бағдарланған тәсіл (ҚМС тәуекелдерін басқару жүйесі, ҚМА, құқық қорғау органдары, мемлекеттік органдар және т.б.)\",\"ҚМС ішкі бақылау қағидаларының (ІБҚ) талаптарын жүзеге асыруы (КТТ, тәуекелдерді анықтау, оқыту және біліктілікті арттыру және т.б)\",\"Мониторинг жүйесі және олар бойынша шаралар қабылдау (ШО/КОХ (күдікті операция туралы хабарлама), оның ішінде оның ішінде клиенттің операцияларынан бас тарту, тоқтату және тоқтата тұру туралы хабарламасы\",\"Қадағалаушы органдар тарапынан профилактикалық бақылау шаралары (камералдық бақылау, хабарламалар, хаттар, кездесулер және т.б)\",\"КЖ/ТҚ болдырмау мақсатында қолданылатын өзге де шаралар\"]},{\"name\":\"Жолын кесу шаралары\",\"description\":\"уәкілетті немесе құқық қорғау органдары қолданатын санкциялық шараларды қабылдауды көздейтін\",\"items\":[\"Қаржылық барлау бөлімшесінің (ҚББ) құқық қорғау органдарына/арнайы мемлекеттік органдарға материалдарды (ҚМС хабарламалары негізінде әзірленген) жіберуі\",\"Жедел-іздестіру қызметі\",\"Қылмыстық қудалау\",\"Мүлікті тәркілеу\",\"Бақылау және қадағалаудың санкциялық шаралары (айыппұлдар, лицензияны тоқтата тұру және айыру және т.б.)\",\"Қылмыскерлер КЖ/ТҚ сызбаларын (схема) жүзеге асыра алған жағдайда қолданылатын басқа шаралар\"]}]"
                }
            }
        },
        // Test for RandomGlossary with double quotes
        {
            component_entry_id: 59764,
            componentName: "RandomGlossary",
            values: {
                component_entry_values_id: 59764,
                values: {
                    backgroundColor: "\"#fafafa\"",
                    text: "\"Для того чтобы попасть на портал Агентства, необходимо перейти по следующей ссылке:\""
                }
            }
        },
        // Test for ImageLine with double quotes
        {
            component_entry_id: 59763,  
            componentName: "ImageLine",
            values: {
                component_entry_values_id: 59763,
                values: {
                    img: "\"https://picsum.photos/800/600?random=3\"",
                    alignment: "\"center\"",
                    adjustWidth: "true",
                    height: "500"
                }
            }
        },
        // Another RandomGlossary test
        {
            component_entry_id: 59762,
            componentName: "RandomGlossary", 
            values: {
                component_entry_values_id: 59762,
                values: {
                    backgroundColor: "\"#ffffff\"",
                    text: "\"Вот так выглядит главная страница портала WEB-SFM\""
                }
            }
        },

        // New components - DragAndDropZone
        {
            component_entry_id: 59763,
            componentName: "DragAndDropZone",
            values: {
                component_entry_values_id: 59763,
                values: {
                    options: "[\"Первый вариант\", \"Второй вариант\", \"Третий вариант\", \"Четвертый вариант\"]",
                    correctOptions: "[\"Первый вариант\", \"Третий вариант\"]",
                    title: "Перетащите правильные варианты в зону ответа",
                    img: "",
                    version: "1"
                }
            }
        },

        // New components - DropdownGlossaryList
        {
            component_entry_id: 59764,
            componentName: "DropdownGlossaryList",
            values: {
                component_entry_values_id: 59764,
                values: {
                    list: "[{\"title\": \"Термин 1\", \"content\": \"Определение первого термина с подробным объяснением\"}, {\"title\": \"Термин 2\", \"content\": \"Определение второго термина\"}, {\"title\": \"Термин 3\", \"content\": \"Определение третьего термина\"}]",
                    headerTextColor: "#333333",
                    activeHeaderTextColor: "#007bff",
                    textColor: "#666666",
                    tabsTextColor: "#000000",
                    tabsBackgroundColor: "#f8f9fa"
                }
            }
        },

        // New components - DragAndDropComponent
        {
            component_entry_id: 59765,
            componentName: "DragAndDropComponent",
            values: {
                component_entry_values_id: 59765,
                values: {
                    answerOptions: "[{\"id\": 1, \"text\": \"если сумма операции равна или превышает сумму, установленную Законом о ПОД/ФТ;\"}, {\"id\": 2, \"text\": \"подлежат финансовому мониторингу независимо от формы их осуществления и суммы, на которую они совершены либо могли быть совершены.\"}]",
                    fieldOptions: "[{\"text\": \"- пороговые операции\", \"correctId\": 1}, {\"text\": \"- подозрительные операции\", \"correctId\": 2}]"
                }
            }
        },

    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
                Все компоненты из ComponentRenderer
            </h1>
            
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="text-lg font-semibold mb-2 text-green-800">
                    Демонстрация всех доступных компонентов:
                </h2>
                <p className="text-sm text-green-700">
                    На этой странице представлены все {testComponents.length} компонентов, 
                    доступных в ComponentRenderer с примерами данных. Включены все компоненты из Elements_level_2.js.
                </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
                {testComponents.map((component, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-blue-800 mb-1">
                                {component.componentName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                ID: {component.component_entry_id} | Компонент #{index + 1}
                            </p>
                        </div>
                        
                        <div className="p-6">
                            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                                <ComponentRenderer componentEntries={[component]} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-800 mb-3">
                    Статистика компонентов
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-blue-600">{testComponents.length}</div>
                        <div className="text-sm text-gray-600">Всего компонентов</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-green-600">
                            {testComponents.filter(c => c.componentName.includes('Text')).length}
                        </div>
                        <div className="text-sm text-gray-600">Текстовые</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-purple-600">
                            {testComponents.filter(c => c.componentName.includes('Table')).length}
                        </div>
                        <div className="text-sm text-gray-600">Таблицы</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-orange-600">
                            {testComponents.filter(c => 
                                c.componentName.includes('Interactive') || 
                                c.componentName.includes('Dropdown') ||
                                c.componentName.includes('Drag')
                            ).length}
                        </div>
                        <div className="text-sm text-gray-600">Интерактивные</div>
                    </div>
                </div>
                
                <div className="mt-4 text-sm text-blue-700">
                    <p>
                        <strong>Примечание:</strong> Все компоненты загружены с тестовыми данными. 
                        Проверьте консоль браузера для отладочной информации. Некоторые компоненты 
                        могут требовать дополнительных ресурсов (изображения, видео) для полного отображения.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComponentTestUser;
