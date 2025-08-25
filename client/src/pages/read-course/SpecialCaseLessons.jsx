import { motion } from 'framer-motion';
import React from 'react';
import axios from 'axios';
import Centered from '../../components/courseTemplates/common/Centered';
import HeaderWithLine from '../../components/courseTemplates/common/HeaderWithLine';
import ImageLine from '../../components/courseTemplates/common/ImageLine';
import NumberedDots from '../../components/courseTemplates/common/NumberedDots';
import RandomH2 from '../../components/courseTemplates/common/RandomH2';
import Sizebox from '../../components/courseTemplates/common/Sizebox';
import TextWithTitle from '../../components/courseTemplates/common/TextWithTitle';
import ReportInformation from '../../components/courseTemplates/common/Warnings/Report_Information';
import Reveal from '../../components/Reveal';
import ImageWithText from './../../components/courseTemplates/common/ImageWithText';
import RandomParapraph from './../../components/courseTemplates/common/RandomParagraph';
import NextLesson from './../../components/courseTemplates/complex/NextLesson';
import base_url from '../../settings/base_url';

// Assets
import { FaStar } from 'react-icons/fa6';
import courseaftor from '../../assets/images/avtory.png';
import theendbaza from './../../assets/images/theend.jpg';

export function LessonPage({ name, children }) {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.3
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div 
            className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-x-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Section */}
            <motion.div 
                className="w-full border-b-2 border-[#1F3C88] bg-white shadow-sm overflow-x-hidden"
                variants={headerVariants}
            >
                <div className="flex flex-col mt-20 md:mt-24 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
                    <motion.h1 
                        className="text-[#3A3939] font-ubuntu text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight mb-6 md:mb-8 transition-colors duration-300 hover:text-[#1F3C88] break-words"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {name}
                    </motion.h1>
                    
                    {/* Decorative line with animation */}
                    <motion.div 
                        className="flex flex-row items-center gap-2 pb-5 mb-12 md:mb-16 border-b-4 border-[#1F3C88] w-max"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p className="text-[#3A3939] font-ubuntu text-sm md:text-base font-normal leading-relaxed opacity-80">
                            {/* Lector information if needed */}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Content Section */}
            <motion.div 
                className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 overflow-x-hidden"
                variants={contentVariants}
            >
                <div className="max-w-4xl mx-auto w-full">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}

export function AboutCourseLesson({ CheckCurrentChapter, isKazakh }) {
    return (
        <LessonPage name={isKazakh ? "Курс туралы" : "О курсе"}>
            <div className="flex justify-center">
                {!isKazakh && <img
                    src={'https://gurk.kz/uploads/images/b2/d9/b5/b20d97b5ba0a593e567752302b279da7.jpg'}
                    alt="Course logo"
                    style={{
                        height: '100px'
                    }}
                />}
            </div>
            <div className="mt-10">
                <ImageLine img={courseaftor}></ImageLine>
            </div>
            <div className="mt-10">
                <Centered>
                    <RandomH2>
                        {isKazakh ? 'Курстың мазмұны' : 'Содержание курса'}
                    </RandomH2>
                </Centered>
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Негізгі түсініктер мен қысқартулар',
                        'КЖ/ТҚҚ жүйесі',
                        'Кірісті жылыстатудың алғашқы «сызбаларының» пайда болу тарихы',
                        'Қазақстан Республикасындағы «кірістерді заңдастыру» түсінігінің құқықтық негізі',
                        'Кірістерді жылыстатудың негізгі сатылары (кезеңдері)',
                        'Кірістерді жылыстату схемалары ',
                        'Терроризмді қаржыландыру'
                    ] : [
                        'Основные понятия и сокращения',
                        'Система ПОД/ФТ',
                        'История возникновения первых «схем» отмывания денег',
                        'Правовой фундамент понятия «легализации денег» в Республике Казахстан',
                        'Основные стадии отмывания денег',
                        'Схемы отмывания денег',
                        'Финансирование терроризма'
                    ]}
                    header={isKazakh ? 'КЖ/ТҚҚ ұлттық жүйесінің жалпы сипаттамасы:' : 'Общая характеристика национальной системы ПОД/ФТ:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Кірістерді жылыстатуға қарсы қаржылық шараларды әзірлеу тобы (ФАТФ)',
                        'ФАТФ типі бойынша аймақтық топтар',
                        'ФАТФ ұсынымдары',
                        '«Алдын алу шараларының» 4 тікелей нәтижесі',
                        'Өзара бағалау туралы есеп',
                        'Тәуекелдерді ұлттық бағалау ',
                        'ФАТФ тізімі',
                        'ЕАТ'
                    ] : [
                        'Группа разработки финансовых мер борьбы с отмыванием денег (ФАТФ)',
                        'Региональные группы по типу ФАТФ',
                        'Рекомендации ФАТФ',
                        'Непосредственный результат 4 «Превентивные меры»',
                        'Отчет о Взаимной оценке',
                        'Национальная оценка рисков',
                        'Списки ФАТФ',
                        'ЕАГ'
                    ]}
                    header={isKazakh ? 'КЖ/ТҚҚ халықаралық жүйесі:' : 'Международная система ПОД/ФТ:'}
                />
            </div>

            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Заңнама',
                        'Қаржы мониторингі субъектілері ',
                        'Қаржы мониторингі субъектілерінің клиенттерін тиісінше тексеруі',
                        'Қаржы мониторингіне жататын, ақшамен және (немесе) өзге мүлікпен жасалатын операциялар',
                        'Қаржы мониторингіне жататын операциялар туралы мәліметтер мен ақпарат жинау',
                        'Терроризмнің және терроризмді қаржыландырудың алдын алуға және оны болғызбауға қатысты нысаналы қаржылық санкциялар',
                        'Операцияларды жүргізуден бас тарту және оларды тоқтата тұру ',
                    ] : [
                        'Законодательство',
                        'Субъекты финансового мониторинга',
                        'Надлежащая проверка субъектами финансового мониторинга клиентов',
                        'Операции с деньгами и (или) иным имуществом, подлежащие финансовому мониторингу',
                        'Сбор сведений и информации об операциях, подлежащих финансовому мониторингу',
                        'Целевые финансовые санкции, относящиеся к предупреждению и предотвращению терроризма и финансирования терроризма',
                        'Отказ от проведения и приостановление',
                    ]}
                    header={isKazakh ? 'КЖ/ТҚҚ туралы заңнама:' : 'Законодательство о ПОД/ФТ:'}
                />
            </div>

            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={[
                        isKazakh ? 'Мемлекеттік бақылау' : 'Государственный контроль',
                    ]}
                    header={isKazakh ? 'Қазақстан Республикасының КЖ/ТҚҚ туралы заңнамасының сақталуын мемлекеттік бақылау:' : 'Государственный контроль за соблюдением законодательства Республики Казахстан о ПОД/ФТ:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={isKazakh ? [
                        'Қазақстан Республикасының Қаржылық мониторинг агенттігі',
                        'Ведомствоаралық органдар мен жұмыс топтары',
                    ] : [
                        'Агентство Республики Казахстан по финансовому мониторингу',
                        'Межведомственные органы и рабочие группы',
                    ]}
                    header={isKazakh ? 'Қаржылық барлау бөлімшесі:' : 'Подразделение финансовой разведки:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={[
                        isKazakh ? 'Ішкі бақылау қағидалары' : 'Правила внутреннего контроля',
                    ]}
                    header={isKazakh ? 'Ішкі нормативтік құжаттарға қойылатын талаптар:' : 'Требования к внутренним нормативным документам:'}
                />
            </div>
            <div className="mt-10">
                <NumberedDots
                    dotsColor={'white'}
                    list={[
                        isKazakh ? 'Қаржы мониторинг субъектілеріне КЖ/ТҚҚ саласындағы даяралу және оқыту бойынша қойылатын талаптар' : 'Требования к СФМ по подготовке и обучению в сфере ПОД/ФТ',
                    ]}
                    header={isKazakh ? 'Даярлау және оқыту:' : 'Подготовка и обучение:'}
                />
            </div>
            <div className="mt-10 flex justify-end">
                <button 
                    className="bg-[#1F3C88] text-white py-3 px-10 rounded-lg hover:bg-[#162a5f] transition-colors"
                    onClick={() => CheckCurrentChapter(0, isKazakh ? -4 : -114)}
                >
                    {isKazakh ? "Жалғастыру" : "Продолжить"}
                </button>
            </div>
        </LessonPage>
    );
}

export function ConclusionLesson({ isKazakh }) {
    return (
        <LessonPage name={isKazakh ? 'Қорытынды бөлім' : 'Заключительная часть'}>
            <Reveal>
                <HeaderWithLine
                    header={isKazakh ? 'Құттықтаймыз, Сіз қашықтан оқу форматында Базалық курсты аяқтадыңыз.' : 'Поздравляем, Вы завершили дистанционное обучение по Базовому курсу!'}
                />
            </Reveal>
            <Sizebox height={20} />
            <Reveal>
                <ImageLine
                    img={theendbaza}
                    color={'#FFFFFF'}
                />
                <Sizebox height={40} />
            </Reveal>
            <Sizebox height={50} />
            <Reveal>
                <TextWithTitle
                    title={isKazakh ? "Осы курстың қорытындысы бойынша, яғни КЖ/ТҚҚ бойынша базалық курстан Сізге мыналар белгілі болды:" : "По итогам данного курса – Базового курса по ПОД/ФТ вам известно:"}
                />
                <Sizebox height={20} />
                <NumberedDots
                    dotsColor={'#CADEFC'}
                    list={isKazakh ? [
                        'Қазақстан Республикасындағы КЖ/ТҚҚ жүйесі, оның ішінде осы саладағы предикаттық қылмыстар;',
                        'қаржы мониторингі субъектілер;',
                        'кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл саласын реттейтін қандай халықаралық стандарттар (ФАТФ) бар;',
                        'қаржы мониторингі жөніндегі уәкілетті органның функциялары мен міндеттері;',
                        'қаржы мониторингі субъектісі үшін КЖ/ТҚҚ саласындағы ішкі нормативтік құжаттарға қойылатын негізгі талаптар.',
                    ] : [
                        'системе ПОД/ФТ в Республике Казахстан, в том числе и предикатные преступления в этой области;',
                        'субъектах финансового мониторинга;',
                        'какие существуют международные стандарты (ФАТФ), регулирующие сферу противодействия отмывания доходов и финансирования терроризма;',
                        'функции и задачи уполномоченного органа по финансовому мониторингу;',
                        'основные требования к внутренним нормативным документам в сфере ПОД/ФТ для субъекта финансового мониторинга;',
                    ]}
                />
                <Sizebox height={40} />
            </Reveal>

            <Reveal>
                <Sizebox height={60}></Sizebox>
                <TextWithTitle
                    title={isKazakh ? 'Жоғарыда аталған тақырыптар мен басқа да материалдар кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл жөніндегі мемлекеттік жүйенің негізгі ұғымдарын, талаптары мен жұмысын түсінуге қол жеткізу мақсатында базалық курс құрылымына салынып, толық қамтылды.' : 'Вышеуказанные направления и другие материалы были заложены и структурированы в базовом курсе с целью достижения представления понимания основных понятий, требований и работы государственной системы по противодействию отмывания доходов и финансирования терроризма.'}
                >
                </TextWithTitle> 
                <Sizebox height={20}></Sizebox>
                <TextWithTitle
                    title={isKazakh ? 'Сонымен қатар, Академия кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл тақырыбын тереңірек зерделеу үшін басқа курстар әзірлегенін хабарлаймыз, олар туралы толығырақ мына телефон арқылы білуге болады: 8 708 716 8416.' : 'Вместе с тем, сообщаем, что Академией также разработаны и другие курсы для более углубленного изучения темы противодействия отмывания доходов и финансирования терроризма о которых подробнее Вы можете узнать по телефону:  8 708 716 8416.'}
                >
                </TextWithTitle>
                <Sizebox height={60}></Sizebox>
            </Reveal>
            <Reveal>
                <ReportInformation>
                    <>
                        <p className='italic'>
                            {isKazakh ? 'Назарларыңызға үлкен рақмет!!!' : 'Благодарим за внимание!'}
                        </p>
                    </>
                </ReportInformation>
                <Sizebox height={60}></Sizebox>
            </Reveal>
        </LessonPage>
    );
}

export function FeedbackLesson({ navigate, stars, setStars, isKazakh, courseId }) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmitFeedback = async () => {
        if (stars === 0) {
            alert(isKazakh ? 'Курсты бағалаңыз' : 'Оцените курс');
            return;
        }

        if (!courseId) {
            navigate('/profile/sertificates');
            return;
        }

        setIsSubmitting(true);
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            
            if (jwtToken) {
                const data = {
                    text: '', // Пустой текст для совместимости
                    rating: stars,
                    courseId: courseId.toString()
                };

                await axios.post(
                    `${base_url}/api/aml/course/createCourseComments/${courseId}`,
                    data,
                    { 
                        headers: { 
                            Authorization: `Bearer ${jwtToken}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
            navigate('/profile/sertificates');
        }
    };
    return (
        <LessonPage name={isKazakh ? 'Қорытынды' : 'Обратная связь'}>
            <Sizebox height={40} />
            <Reveal>
                <ImageWithText
                    color={'white'}
                    imageText={isKazakh ? 'Сізге одан әрі кәсіби табыс пен өркендеу тілейміз!' : 'Желаем Вам профессиональных успехов и процветания!'}
                    img={'https://corporate.waterlogic.com/fileadmin/_processed_/f/4/csm_banner-hands-shaking-3_c621f2a33f.jpg'}
                />
            </Reveal>
            <Sizebox height={100} />

            <Reveal>
                <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                    {isKazakh ? 'Сертификатты жеке кабинеттен таба аласыз' : 'Сертификат Вы можете найти в личном кабинете'}
                </HeaderWithLine>
            </Reveal>
            <Sizebox height={100} />

            <div className="stars" style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
            }}>
                {
                    [0, 0, 0, 0, 0].map((star, index) => {
                        const active = '#1F3C88';
                        const nonActive = '#dddddd';
                        const _color = stars >= index + 1 ? active : nonActive;

                        const handleClick = () => {
                            setStars(index + 1);
                        }

                        return <FaStar key={index} size={50} style={{ color: _color, cursor: 'pointer' }} onClick={handleClick} />
                    })
                }
            </div>
            <Centered>
                <RandomParapraph>
                    {isKazakh ? 'Курсты бағалаңыз' : 'Оцените курс'}
                </RandomParapraph>
            </Centered>
            <Sizebox height={100} />

            <Reveal>
                <NextLesson
                    nextLessonName={isKazakh ? 'Жеке кабинет' : 'Личный кабинет'}
                    handleOnClick={isSubmitting ? () => {} : handleSubmitFeedback}
                />
                {isSubmitting && (
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <span style={{ color: '#666' }}>
                            {isKazakh ? 'Жіберілуде...' : 'Отправляется...'}
                        </span>
                    </div>
                )}
            </Reveal>
        </LessonPage>
    );
}

export function ConclusionCourseLesson({ navigate, stars, setStars, isKazakh, courseId }) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isDownloadingCertificate, setIsDownloadingCertificate] = React.useState(false);

    const handleSubmitFeedback = async () => {
        if (stars === 0) {
            alert(isKazakh ? 'Курсты бағалаңыз' : 'Оцените курс');
            return;
        }

        if (!courseId) {
            navigate('/profile/sertificates');
            return;
        }

        setIsSubmitting(true);
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            
            if (jwtToken) {
                const data = {
                    text: '', // Пустой текст для совместимости
                    rating: stars,
                    courseId: courseId.toString()
                };

                await axios.post(
                    `${base_url}/api/aml/course/createCourseComments/${courseId}`,
                    data,
                    { 
                        headers: { 
                            Authorization: `Bearer ${jwtToken}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
            navigate('/profile/sertificates');
        }
    };

    const handleDownloadCertificate = async () => {
        if (!courseId) {
            console.error('Course ID is required');
            return;
        }

        // Check if course should not issue certificates
        if (courseId === '86' || courseId === '118' || courseId === 86 || courseId === 118) {
            alert('Для данного курса сертификат не выдается');
            return;
        }

        setIsDownloadingCertificate(true);
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            
            if (!jwtToken) {
                alert(isKazakh ? 'Авторизация қажет' : 'Требуется авторизация');
                return;
            }

            const response = await axios.get(
                `${base_url}/api/aml/course/getCertificateByCourseId/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    responseType: 'blob',
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Сертификат.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Error downloading certificate:', error);
            alert(isKazakh ? 'Сертификат жүктеуде қате пайда болды' : 'Ошибка при скачивании сертификата');
        } finally {
            setIsDownloadingCertificate(false);
        }
    };
    return (
        <LessonPage name={isKazakh ? 'Қорытынды' : 'Заключение'}>
            <Sizebox height={40} />
            <Reveal>
                <ImageWithText
                    color={'white'}
                    imageText={isKazakh 
                        ? 'Сізге одан әрі кәсіби табыс пен өркендеу тілейміз!' 
                        : (courseId !== '86' && courseId !== '118' 
                            ? 'Поздравляем, Вы завершили дистанционное обучение по данному\u00A0курсу! Желаем Вам удачи при сдаче тестирования!' 
                            : 'Дальнейших Вам профессиональных успехов и процветания!'
                        )
                    }
                    img={'https://corporate.waterlogic.com/fileadmin/_processed_/f/4/csm_banner-hands-shaking-3_c621f2a33f.jpg'}
                />
            </Reveal>

            <Sizebox height={100} />
            <Reveal>
                <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                    {isKazakh ? 'Оқу модульдің соңы' : (courseId !== '86' && courseId !== '118' ? 'Завершение учебного курса.' : 'Завершение учебного урока')}
                    {courseId !== '86' && courseId !== '118' && (
                        <>
                            <br />
                            <br />
                            <b onClick={() => { navigate('/profile') }} 
                                style={{ color: 'blue', cursor: 'pointer' }}>
                                {isKazakh ? 'Сертификатты жеке кабинеттен таба аласыз' : 'Сертификат вы можете найти в личном кабинете'}
                            </b>
                        </>
                    )}
                </HeaderWithLine>
            </Reveal>

            <Sizebox height={100} />

            <div className="stars" style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
            }}>
                {
                    [0, 0, 0, 0, 0].map((star, index) => {
                        const active = '#1F3C88';
                        const nonActive = '#dddddd';
                        const _color = stars >= index + 1 ? active : nonActive;

                        const handleClick = () => {
                            setStars(index + 1);
                        }

                        return <FaStar key={index} size={50} style={{ color: _color, cursor: 'pointer' }} onClick={handleClick} />
                    })
                }
            </div>
            <Centered>
                <RandomParapraph>
                    {isKazakh
                        ? (courseId !== '86' && courseId !== '118' ? 'Модульді бағалаңыз' : 'Сабақты бағалаңыз')
                        : (courseId !== '86' && courseId !== '118' ? 'Оцените курс' : 'Оцените урок')
                    }
                </RandomParapraph>
            </Centered>
            <Sizebox height={100} />

            <Reveal>
                <NextLesson
                    nextLessonName={isSubmitting ? (isKazakh ? 'Жіберілуде...' : 'Отправляется...') : (isKazakh ? 'Жеке кабинет' : 'Личный кабинет')}
                    handleOnClick={isSubmitting ? () => {} : handleSubmitFeedback}
                />
                
                {/* Кнопка скачивания сертификата */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={handleDownloadCertificate}
                        disabled={isDownloadingCertificate}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            cursor: isDownloadingCertificate ? 'not-allowed' : 'pointer',
                            opacity: isDownloadingCertificate ? 0.6 : 1,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {isDownloadingCertificate 
                            ? (isKazakh ? 'Жүктелуде...' : 'Скачивается...') 
                            : (isKazakh ? 'Сертификат жүктеу' : 'Скачать сертификат')
                        }
                    </button>
                </div>
            </Reveal>
        </LessonPage>
    );
}
