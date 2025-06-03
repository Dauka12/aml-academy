import ComponentRenderer from './pages/ReadCourse/components/ComponentRenderer';

// Test data for the problematic components
const testComponents = [
    {
        component_entry_id: 1,
        componentName: "RandomParapraph",
        values: {
            values: {
                fontSize: "20",
                children: "\"Енді Сіз алдын-алу және жолын кесу шараларының |b|не екенін білетін|b| болсаңыз, |b|ҚМА|b| қолданатын алдын-алу шараларының |b|практикалық мысалдарын|b| қарастырайық. Ол ұлттық жылыстату жүйесіне қатысушылармен |b|өзара әрекеттесу|b| шеңберінде |b|тиімді|b| қолданылады.\"",
                isCentered: "false",
                color: "#000000"
            }
        }
    },
    {
        component_entry_id: 2,
        componentName: "DropdownList_r5",
        values: {
            values: {
                headers: "[{\"name\":\"Агенттік\",\"icon\":null},{\"name\":\"Мемлекеттік органдар\",\"icon\":null},{\"name\":\"Жеке сектор\",\"icon\":null}]",
                items: "[{\"title\":\"Кураторлық\",\"text\":\"Кураторлық – ҚМС әрбір түрі үшін жедел өзара іс-қимыл жасайтын және үйлестіруді жүзеге асыратын куратор (ҚР ҚМА қызметкері) бекітілген\"},{\"title\":\"Call-орталық\",\"text\":\"Call-орталық – ҚМС арналған өтініштер мен консультацияларды өңдеу орталығы (ҚР ҚМА колл-орталығы «14-58»)\"},{\"title\":\"Комплаенс-кеңесі\",\"text\":\"Комплаенс-кеңесі – ұлттық жылыстату қатысушылар арасында ақпарат алмасу сапасының мәселелерін талқылауға арналған пікірталас алаңы\"},{\"title\":\"Бағалау\",\"text\":\"Бағалау – ұлттық жылыстату жүйесіне қатысушылар (ҚМС, екінші деңгейлі банк (ЕДБ), МО) арасында тәуекел деңгейін анықтаудың тәуекелге бағдарланған тәсілі жүйесін білдіреді\"},{\"title\":\"Бірыңғай портал\",\"text\":\"Бірыңғай портал – ақпарат алмасу бойынша бөлінген байланыс арнасы (Тізілімдер, тізімдер, ҚМ-1, кері байланыс, бағалау және т.б.)\"}]",
                title: "Test Dropdown Title"
            }
        }
    },
    {
        component_entry_id: 3,
        componentName: "DragAndDropTwoSide",
        values: {
            values: {
                leftAnswer: "\"Схемада белгілер анықталған\"",
                questions: "[{\"answer\":\"Клиенттің шотына ірі ақша сомасының түсуі және алынған қаражатты кейіннен қолма-қол ақшаға айналдыру, бұл ретте алушының операциялар бойынша аздаған айналымдары болған\",\"side\":\"Схемада белгілер анықталған\"},{\"answer\":\"Клиенттің өтімді емес бағалы қағаздармен ірі сомаға жүйелі операциялар жасауы\",\"side\":\"Схемада белгілер анықталмаған \"},{\"answer\":\"Мәміле нысанасының шарттық және нарықтық құнының нақты сәйкес келмеуі\",\"side\":\"Схемада белгілер анықталмаған \"},{\"answer\":\"Клиенттің шотына аудару және шоттан шамамен бірдей ақша көлемінде есептен шығару\",\"side\":\"Схемада белгілер анықталған\"}]",
                rightAnswer: "\"Схемада белгілер анықталмаған \""
            }
        }
    },
    {
        component_entry_id: 4,
        componentName: "ShortBiography",
        values: {
            values: {
                name: "\"Аль Капоне\"",
                img: "\"https://amlacademy.kz/aml/9baf9deb-3a57-43c3-b8de-85948dd329e6\"",
                biography: "\"Аль Капоне АҚШ-тағы «құрғақ заң» және «ұлы депрессия» кезеңдерде ұйымдасқан қылмыстың негізін қалаушы, сондай-ақ кірістерді жылыстату жүйесінің, яғни «рэкет» түсінігінің авторы болып табылады.\"",
                birthdate: "\"17.01.1899 ж.\"",
                deathdate: "\"25.01.1947 ж.\""
            }
        }
    },
    {
        component_entry_id: 5,
        componentName: "ComplexTable",
        values: {
            values: {
                data_row: "[{\"15 елге\":\"Италия (2004 жылғы қазаннан бастап, ЕАТ құрылтай конференциясының шешімі);\",\"24 халықаралық ұйымдарға\":\"Азия Даму Банкі (АДБ) (2008 жылғы желтоқсаннан бастап, ЕАТ 9-пленарлық отырысының шешімі);\"},{\"15 елге\":\"АҚШ (2004 жылғы қазаннан бастап, ЕАТ құрылтай конференциясының шешімі);\",\"24 халықаралық ұйымдарға\":\"Кірістерді жылыстатуға қарсы күрес жөніндегі Азия-Тынық мұхиты тобы (АТГ) (2009 жылғы желтоқсаннан бастап, ЕАТ 11-ші жалпы отырысының шешімі);\"}]",
                version: "3",
                columns: "[\"15 елге\",\"24 халықаралық ұйымдарға\"]"
            }
        }
    },
    {
        component_entry_id: 6,
        componentName: "TabsGlossary",
        values: {
            values: {
                tabs: "[\"Қаржы секторы\",\"Қаржылық емес сектор\",\"АХҚО алаңында қызметті жүзеге асыратын субъектілер\"]",
                color: "\"#000000\"",
                tabsBackgroundColor: "\"#d6ebff\"",
                version: "2",
                tabsGlossary: "{\"Қаржы секторы\":\"|•|банкаралық ақша аудару жүйесінің операторын немесе операциялық орталығын, сондай-ақ айрықша қызметі банкноттарды, монеталар мен құндылықтарды инкассациялау болып табылатын заңды тұлғаларды қоспағанда, Қазақстан Республикасының резидент емес банктерінің банктері, филиалдары, банк операцияларының жекелеген түрлерін жүзеге асыратын ұйымдар;\",\"Қаржылық емес сектор\":\"биржалар (тауарлық);|•|ақшамен және (немесе) өзге мүлікпен нотариаттық әрекеттерді жүзеге асыратын нотариустар;\",\"АХҚО алаңында қызметті жүзеге асыратын субъектілер\":\"«Астана» халықаралық қаржы орталығының (бұдан әрі – АХҚО) аумағында ФАТФ-қа сәйкес уәкілетті органмен келісім бойынша АХҚО қаржы қызметтерін реттеу комитеті айқындайтын жекелеген қызмет түрлерін жүзеге асыратын «Астана» халықаралық қаржы орталығының қатысушылары.\"}"
            }
        }
    },
    {
        component_entry_id: 7,
        componentName: "CustomCarousel",
        values: {
            values: {
                data: "[{\"header\":\"Slide 1\",\"imageText\":\"Description for slide 1\",\"image\":\"https://via.placeholder.com/800x400\"},{\"header\":\"Slide 2\",\"imageText\":\"Description for slide 2\",\"image\":\"https://via.placeholder.com/800x400\"}]",
                autoPlay: "true",
                showDots: "true",
                showArrows: "true"
            }
        }
    },
    {
        component_entry_id: 8,
        componentName: "HeaderWithLine",
        values: {
            values: {
                header: "\"Test Header with Line\"",
                lineColor: "#CADEFC",
                headerColor: "#3A3939"
            }
        }
    },
    {
        component_entry_id: 9,
        componentName: "Sizebox",
        values: {
            values: {
                height: "50"
            }
        }
    }
];

function ComponentTest() {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '30px', color: '#333' }}>Component Fix Testing</h1>
            
            <div style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h2 style={{ color: '#2563eb', marginBottom: '15px' }}>Issues Fixed:</h2>
                <ul style={{ lineHeight: '1.6' }}>
                    <li><strong>RandomParagraph:</strong> Was showing [object Object] instead of formatted text</li>
                    <li><strong>DropdownList_r5:</strong> Was not rendering at all</li>
                    <li><strong>HeaderWithLine:</strong> Was showing [object Object] instead of header text</li>
                    <li><strong>Sizebox:</strong> Should render as invisible spacer</li>
                </ul>
            </div>

            <div style={{ border: '2px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
                <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Component Rendering Test:</h2>
                <ComponentRenderer componentEntries={testComponents} />
            </div>
            
            <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                <p><strong>Note:</strong> Check the browser console for debug logs, especially for DropdownList_r5 component data processing.</p>
            </div>
        </div>
    );
}

export default ComponentTest;
