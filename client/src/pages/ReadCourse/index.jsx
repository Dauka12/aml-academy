import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import ContentLoader from "react-content-loader"

import './style.scss';

import axios from 'axios';
import { FaStar } from "react-icons/fa";
import base_url from './../../settings/base_url';

import Reveal from './../../components/Reveal';
import HeaderWithLine from './../../components/courseTemplates/common/HeaderWithLine';
import Sizebox from './../../components/courseTemplates/common/Sizebox';
import NextLesson from './../../components/courseTemplates/complex/NextLesson';
import CourseHeader from './../../components/courseTemplates/course-header';
import { Module, Session, TestSession } from './../../components/sessions/Sessions';

import theendbaza from './../../assets/images/theend.jpg';

import ModalWindow from '../../components/ModalWindow/ModalWindow';
import TestPage from '../../components/courseTemplates/complex/Test';
import Centered from './../../components/courseTemplates/common/Centered';
import ImageWithText from './../../components/courseTemplates/common/ImageWithText';
import RandomParapraph from './../../components/courseTemplates/common/RandomParagraph';
import lectorImage from './lectorImage.png';
// import componentMap from '../adminCourse/tabConstructor/ComponentMap';
import courseaftor from '../../assets/images/avtory.png';
import { useAuth } from '../../auth/AuthContext';
import ImageLine from '../../components/courseTemplates/common/ImageLine';
import NumberedDots from '../../components/courseTemplates/common/NumberedDots';
import RandomH2 from '../../components/courseTemplates/common/RandomH2';
import TextWithTitle from '../../components/courseTemplates/common/TextWithTitle';
import Report_Information from '../../components/courseTemplates/common/Warnings/Report_Information';
import FancyList from '../../components/courseTemplates/common_v2/FancyList';
import componentMap from '../AdminPage_v2/constructor/ComponentMap';


function ReadCourse() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const jwtToken = localStorage.getItem('jwtToken');
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        if (id == 118) {

        }
    }, [isLoggedIn])

    const [courseName, setCourseName] = useState('');
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [activeSessionId, setActiveSessionId] = useState(1);
    const [activeModuleId, setActiveModuleId] = useState(1);
    const [activeQuizId, setActiveQuizId] = useState(1);
    const [isModuleQuiz, setIsModuleQuiz] = useState(false);
    const [isLoadInfo, setIsLoadInfo] = useState(false);

    const [openQuizModal, setOpenQuizModal] = useState(false);
    const [quizStatus, setQuizStatus] = useState('');

    const [a, setA] = useState(0);

    const [courseProgress, setCourseProgress] = useState(0);

    const [courseModules, setCourseModules] = useState([]);

    const [stars, setStars] = useState(0);

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        console.log(location);
        if (
            (location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)
        ) {
            setKazakh(true);
        }
    }, [])

    useEffect(() => {
        handleWindowResolution();
        window.addEventListener('resize', handleWindowResolution);

        if (id == 118) {
            axios.put(`${base_url}/api/aml/course/saveUser/${localStorage.getItem("user_id")}/course/${118}`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
                .then(response => {
                    console.log("User added to course successfully:", response);
                })
                .catch(error => {
                    console.error("Error in adding user to course:", error);
                });
        }

        fetchData();
        setLoading(false);
    }, []);
    const fetchData = async () => {

        try {
            const res = await axios.get(
                `${base_url}/api/aml/course/getCourseById/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )


            if (res.data.course.modules?.length > 0) {
                setActiveModuleId(res.data.course.modules[0].module_id)
            }
            if (res.data.course.modules?.length > 0 && res.data.course.modules[0].lessons?.length > 0) {
                if ((location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)) {
                    setActiveSessionId(-4)
                } else {
                    setActiveSessionId(res.data.course.modules[0].lessons[0].lesson_id)
                    setA(res.data.course.modules[0].lessons[0].lesson_id)
                    console.log(a);
                }
            }

            setCourseName(res.data.course.course_name);
            setCourseModules(res.data.course.modules);
            setCourseProgress(res.data.progress_percentage)
            console.log(res);
            setIsLoadInfo(true)

        } catch (e) {
            setError(e);
            console.log(e);
        }
    }


    const handleNavOpen = () => {
        setIsNavOpen(prev => !prev);
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    function scrollToTopAnimated() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const courseContent = document.querySelector('.course-content');
        const courseContentScroll = courseContent.scrollTop;

        if (courseContentScroll > 0) {
            //   window.requestAnimationFrame(scrollToTopAnimated);
            courseContent.scrollTo(0, 0);
        }
    }

    const handleWindowResolution = () => {
        const { width, height } = getWindowDimensions();
        if (width <= 1300) {
            setIsNavOpen(false);
        }
    }

    const handleSessionClick = (module_id, lesson_id) => {
        scrollToTopAnimated();
        setActiveSessionId(lesson_id);
        setActiveModuleId(module_id);
        setActiveQuizId(-1);
        setIsModuleQuiz(false);
    }

    const handleTestSessionClick = (module_id, quiz_id) => {
        console.log('Test is clicked');

        setActiveQuizId(quiz_id);
        setActiveModuleId(module_id);
        setActiveSessionId(-1);
        setIsModuleQuiz(true);
    }

    const handleQuizFail = (isFatal) => {
        if (isFatal) setQuizStatus('fatal');
        else setQuizStatus('fail');

        setOpenQuizModal(true);
    }

    const handleQuizSuccesful = () => {
        setQuizStatus('successful');


        setOpenQuizModal(true);
    }

    const CheckCurrentChapter = async (module_id, lesson_id) => {
        let has_quiz = false;
        let next_module = null;
        let _module = null;

        try {
            console.log('lesson_id: ', lesson_id);
            const res = await axios.post(
                `${base_url}/api/aml/chapter/checked/${lesson_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            console.log(res);
        } catch (e) {
            setError(e);
            console.log(e);
        }

        console.log('module_id: ', module_id, 'lesson_id: ', lesson_id);


        // Find the current module and its index
        const currentModuleIndex = courseModules.findIndex(module => module.module_id === module_id);

        // If found, set current module and check for quiz
        if (currentModuleIndex !== -1) {
            _module = courseModules[currentModuleIndex];
            has_quiz = !!_module.quiz;

            // If there's a next module, set it
            if (currentModuleIndex + 1 < courseModules.length) {
                next_module = courseModules[currentModuleIndex + 1];
            }
        }

        // Find current and next lessons
        let _lesson = null;
        let next_lesson = null;

        if (_module !== null) {
            const currentLessonIndex = _module.lessons.findIndex(lesson => lesson.lesson_id === lesson_id);

            if (currentLessonIndex !== -1) {
                _lesson = _module.lessons[currentLessonIndex];

                // If there's a next lesson in the same module
                if (currentLessonIndex + 1 < _module.lessons.length) {
                    next_lesson = _module.lessons[currentLessonIndex + 1];
                }
            }
        }

        let _module_id = null;
        let _lesson_id = null;

        // If we're at the end of a module with quiz
        if (has_quiz && next_lesson === null) {
            setIsModuleQuiz(true);
            setActiveQuizId(_module.quiz.quiz_id);
            return; // Exit early as we're showing quiz
        }

        // If we're at the end of a module without quiz, and there is a next module
        if (next_lesson === null && next_module !== null) {
            _lesson_id = next_module.lessons[0].lesson_id;
            _module_id = next_module.module_id;
        }

        // If there's a next lesson in current module
        if (next_lesson !== null) {
            _lesson_id = next_lesson.lesson_id;
            _module_id = _module.module_id; // Stay in same module
        }

        // Mark current lesson as completed via API
        const _fetch_data = async () => {
            try {
                console.log(_lesson.lesson_id);
                const res = await axios.post(
                    `${base_url}/api/aml/chapter/checked/${_lesson.lesson_id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                console.log(res);
            } catch (e) {
                setError(e);
                console.log(e);
            }
        };

        if (_lesson) _fetch_data();

        setLoading(true);

        // Update states for next lesson
        if (_module_id !== null && _lesson_id !== null) {
            setActiveModuleId(_module_id);
            setActiveSessionId(_lesson_id);
        }

        setTimeout(() => {
            setLoading(false);
        }, 100);

        scrollToTopAnimated();

        // Special case handling
        if (module_id === 69 && lesson_id === 167) {
            setActiveSessionId(lesson_id);
            setActiveModuleId(module_id);
        }
    };


    const getLesson = (isModuleQuiz) => {

        const activeModule = courseModules.find(module => module.module_id === activeModuleId)

        const activeLesson = activeModule
            ? activeModule.lessons.find(lesson => lesson.lesson_id === activeSessionId)
            : null;

        if (isModuleQuiz && activeModule && activeModule.quiz) {
            return (<TestPage
                name={activeModule.quiz.quiz_title}
                finished={activeModule.quiz.quiz_max_points === 100}
                quizId={activeModule.quiz.quiz_id}
                questions={activeModule.quiz.quizList}
                handleQuizFail={handleQuizFail}
                handleQuizSuccesful={handleQuizSuccesful}
            />)
        }

        if (activeSessionId === -114) {
            return (
                <LessonPage name={'О курсе'}>
                    <Sizebox height={30} />

                    <Reveal>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0px 210px',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        >

                        </div>
                        <Sizebox height={50} />
                        <ImageLine img={courseaftor}></ImageLine>
                    </Reveal>
                    <Sizebox height={70} />
                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Содержание курса
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={30} />
                    <NumberedDots
                        dotsColor={'white'}
                        list={[
                            'Основные понятия и сокращения',
                            'Система ПОД/ФТ',
                            'История возникновения первых «схем» отмывания денег',
                            'Правовой фундамент понятия «легализации денег» в Республике Казахстан',
                            'Основные стадии отмывания денег',
                            'Схемы отмывания денег',
                            'Финансирование терроризма'
                        ]}
                        header={'Общая характеристика национальной системы ПОД/ФТ:'}
                    />
                    <Sizebox height={50} />
                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Группа разработки финансовых мер борьбы с отмыванием денег (ФАТФ)',
                                'Региональные группы по типу ФАТФ',
                                'Рекомендации ФАТФ',
                                'Непосредственный результат 4 «Превентивные меры»',
                                'Отчет о Взаимной оценке',
                                'Национальная оценка рисков',
                                'Списки ФАТФ',
                                'ЕАГ'
                            ]}
                            header={'Международная система ПОД/ФТ:'}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Законодательство',
                                'Субъекты финансового мониторинга',
                                'Надлежащая проверка субъектами финансового мониторинга клиентов',
                                'Операции с деньгами и (или) иным имуществом, подлежащие финансовому мониторингу',
                                'Сбор сведений и информации об операциях, подлежащих финансовому мониторингу',
                                'Целевые финансовые санкции, относящиеся к предупреждению и предотвращению терроризма и финансирования терроризма',
                                'Отказ от проведения и приостановление',
                            ]}
                            header={'Законодательство о ПОД/ФТ:'}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Государственный контроль',
                            ]}
                            header={'Государственный контроль за соблюдением законодательства Республики Казахстан о ПОД/ФТ:'}
                        />
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Агентство Республики Казахстан по финансовому мониторингу',
                                'Межведомственные органы и рабочие группы',
                            ]}
                            header={'Подразделение финансовой разведки:'}
                        />
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Правила внутреннего контроля',
                            ]}
                            header={'Требования к внутренним нормативным документам:'}
                        />
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Требования к СФМ по подготовке и обучению в сфере ПОД/ФТ',
                            ]}
                            header={'Подготовка и обучение:'}
                        />
                    </Reveal>
                    <Sizebox height={100} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                НА ЭТОМ КУРСЕ ВЫ УЗНАЕТЕ
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <FancyList
                            listColor='#ccc'
                            list={[
                                'Что такое отмывание доходов?',
                                'Кто такие субъекты финансового мониторинга',
                                'Что из себя представляет система противодействия отмывания доходов и финансирования терроризма?',
                                'Кто такой уполномоченный орган по финансовому мониторингу и какова его цель?',
                                'Какие финансовые операции и сделки подлежат финансовому мониторингу?'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />

                    <Reveal>
                        <NextLesson handleOnClick={() => {
                            CheckCurrentChapter(310, 311);
                        }} />
                    </Reveal>

                </LessonPage>
            )
        }
        if (activeSessionId === -115) {
            return (
                <LessonPage name={'Заключительная часть'} lecturer={'AML Academy'}>
                    <Reveal>
                        <HeaderWithLine
                            header={'Поздравляем, Вы завершили дистанционное обучение по Базовому курсу!'}
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
                            title={"По итогам данного курса – Базового курса по ПОД/ФТ вам известно:"}
                        />
                        <Sizebox height={20} />
                        <NumberedDots
                            dotsColor={'#CADEFC'}
                            list={[
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
                            title={'Вышеуказанные направления и другие материалы были заложены и структурированы в базовом курсе с целью достижения представления понимания основных понятий, требований и работы государственной системы по противодействию отмывания доходов и финансирования терроризма.'}
                        >
                        </TextWithTitle> <Sizebox height={20}></Sizebox>
                        <TextWithTitle
                            title={'Вместе с тем, сообщаем, что Академией также разработаны и другие курсы для более углубленного изучения темы противодействия отмывания доходов и финансирования терроризма о которых подробнее Вы можете узнать по телефону:  8 708 716 8416.'}

                        >

                        </TextWithTitle>
                        <Sizebox height={60}></Sizebox>
                    </Reveal>
                    <Reveal>
                        <Report_Information>
                            <>
                                <p className='italic'>
                                    Благодарим за внимание!                            </p>
                            </>
                        </Report_Information>
                        <Sizebox height={60}></Sizebox>


                    </Reveal>



                </LessonPage>
            )
        }
        if (activeSessionId === -116) {
            return (
                <LessonPage name={'Обратная связь'}>

                    <Sizebox height={40} />
                    <Reveal>
                        <ImageWithText
                            color={'white'}
                            imageText={'Желаем Вам профессиональных успехов и процветания!'}
                            img={'https://corporate.waterlogic.com/fileadmin/_processed_/f/4/csm_banner-hands-shaking-3_c621f2a33f.jpg'}
                        />
                    </Reveal>
                    <Sizebox height={100} />

                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            Сертификат Вы можете найти в личном кабинете
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

                                return <FaStar size={50} style={{ color: _color, cursor: 'pointer' }} onClick={handleClick} />
                            })
                        }
                    </div>
                    <Centered>
                        <RandomParapraph>
                            Оцените курс
                        </RandomParapraph>
                    </Centered>
                    <Sizebox height={100} />

                    <Reveal>
                        <NextLesson
                            nextLessonName={'Личный кабинет'}
                            handleOnClick={() => {
                                if (stars === 0) {
                                    alert('Оцените курс');
                                    return;
                                }
                                navigate('/profile/sertificates')
                            }}
                        />
                    </Reveal>
                </LessonPage>
            )
        }
        if (activeSessionId === -4) {
            return (
                <LessonPage name={'Курс туралы'}>
                    <Sizebox height={30} />

                    <Reveal>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0px 210px',
                                width: '100%',
                                boxSizing: 'border-box',
                            }}
                        >
                            <img
                                src={'https://gurk.kz/uploads/images/b2/d9/b5/b20d97b5ba0a593e567752302b279da7.jpg'}
                                style={{
                                    height: '100px'
                                }}
                            />

                        </div>
                        <Sizebox height={50} />
                        <ImageLine img={courseaftor}></ImageLine>
                    </Reveal>
                    <Sizebox height={70} />
                    <Reveal>
                        <Centered>
                            <RandomH2>
                                Курстың мазмұны
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={30} />
                    <NumberedDots
                        dotsColor={'white'}
                        list={[
                            'Негізгі түсініктер мен қысқартулар',
                            'КЖ/ТҚҚ жүйесі',
                            'Кірісті жылыстатудың алғашқы «сызбаларының» пайда болу тарихы',
                            'Қазақстан Республикасындағы «кірістерді заңдастыру» түсінігінің құқықтық негізі',
                            'Кірістерді жылыстатудың негізгі сатылары (кезеңдері)',
                            'Кірістерді жылыстату схемалары ',
                            'Терроризмді қаржыландыру'
                        ]}
                        header={'КЖ/ТҚҚ ұлттық жүйесінің жалпы сипаттамасы:'}
                    />
                    <Sizebox height={50} />
                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Кірістерді жылыстатуға қарсы қаржылық шараларды әзірлеу тобы (ФАТФ)',
                                'ФАТФ типі бойынша аймақтық топтар',
                                'ФАТФ ұсынымдары',
                                '«Алдын алу шараларының» 4 тікелей нәтижесі',
                                'Өзара бағалау туралы есеп',
                                'Тәуекелдерді ұлттық бағалау ',
                                'ФАТФ тізімі',
                                'ЕАТ'
                            ]}
                            header={'КЖ/ТҚҚ халықаралық жүйесі:'}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Заңнама',
                                'Қаржы мониторингі субъектілері ',
                                'Қаржы мониторингі субъектілерінің клиенттерін тиісінше тексеруі',
                                'Қаржы мониторингіне жататын, ақшамен және (немесе) өзге мүлікпен жасалатын операциялар',
                                'Қаржы мониторингіне жататын операциялар туралы мәліметтер мен ақпарат жинау',
                                'Терроризмнің және терроризмді қаржыландырудың алдын алуға және оны болғызбауға қатысты нысаналы қаржылық санкциялар',
                                'Операцияларды жүргізуден бас тарту және оларды тоқтата тұру ',
                            ]}
                            header={'КЖ/ТҚҚ туралы заңнама:'}
                        />
                    </Reveal>

                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Мемлекеттік бақылау',
                            ]}
                            header={'Қазақстан Республикасының КЖ/ТҚҚ туралы заңнамасының сақталуын мемлекеттік бақылау:'}
                        />
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Қазақстан Республикасының Қаржылық мониторинг агенттігі',
                                'Ведомствоаралық органдар мен жұмыс топтары',
                            ]}
                            header={'Қаржылық барлау бөлімшесі:'}
                        />
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Ішкі бақылау қағидалары',
                            ]}
                            header={'Ішкі нормативтік құжаттарға қойылатын талаптар:'}
                        />
                    </Reveal>
                    <Sizebox height={50} />

                    <Reveal>
                        <NumberedDots
                            dotsColor={'white'}
                            list={[
                                'Қаржы мониторинг субъектілеріне КЖ/ТҚҚ саласындағы даяралу және оқыту бойынша қойылатын талаптар',
                            ]}
                            header={'Даярлау және оқыту:'}
                        />
                    </Reveal>
                    <Sizebox height={100} />

                    <Reveal>
                        <Centered>
                            <RandomH2>
                                БҰЛ КУРСТА СІЗ МЫНАЛАРДЫ БІЛЕСІЗ
                            </RandomH2>
                        </Centered>
                    </Reveal>
                    <Sizebox height={30} />
                    <Reveal>
                        <FancyList
                            listColor='#ccc'
                            list={[
                                'Кірістерді жылыстату дегеніміз не?',
                                'Қаржы мониторингі субъектілері кімдер?',
                                'Кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл жүйесі дегеніміз не?',
                                'Қаржы мониторингі жөніндегі уәкілетті орган кім және оның мақсаты қандай?',
                                'Қандай қаржылық операциялар мен мәмілелер қаржылық бақылауға жатады?'
                            ]}
                        />
                    </Reveal>

                    <Sizebox height={100} />

                    <Reveal>
                        <NextLesson nextLessonName='Негізгі түсініктер мен қысқартулар' handleOnClick={() => {
                            CheckCurrentChapter(69, 167);
                        }} />
                    </Reveal>

                </LessonPage>
            )
        }
        if (activeSessionId === -3) {
            return (
                <LessonPage name={'Қорытынды бөлім'}>
                    <Reveal>
                        <HeaderWithLine
                            header={'Құттықтаймыз, Сіз қашықтан оқу форматында Базалық курсты аяқтадыңыз.'}
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
                            title={"Осы курстың қорытындысы бойынша, яғни КЖ/ТҚҚ бойынша базалық курстан Сізге мыналар белгілі болды:"}
                        />
                        <Sizebox height={20} />
                        <NumberedDots
                            dotsColor={'#CADEFC'}
                            list={[
                                'Қазақстан Республикасындағы КЖ/ТҚҚ жүйесі, оның ішінде осы саладағы предикаттық қылмыстар;',
                                'қаржы мониторингі субъектілер;',
                                'кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл саласын реттейтін қандай халықаралық стандарттар (ФАТФ) бар;',
                                'қаржы мониторингі жөніндегі уәкілетті органның функциялары мен міндеттері;',
                                'қаржы мониторингі субъектісі үшін КЖ/ТҚҚ саласындағы ішкі нормативтік құжаттарға қойылатын негізгі талаптар.',

                            ]}
                        />
                        <Sizebox height={40} />
                    </Reveal>

                    <Reveal>
                        <Sizebox height={60}></Sizebox>
                        <TextWithTitle
                            title={'Жоғарыда аталған тақырыптар мен басқа да материалдар кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл жөніндегі мемлекеттік жүйенің негізгі ұғымдарын, талаптары мен жұмысын түсінуге қол жеткізу мақсатында базалық курс құрылымына салынып, толық қамтылды.'}
                        >
                        </TextWithTitle> <Sizebox height={20}></Sizebox>
                        <TextWithTitle
                            title={'Сонымен қатар, Академия кірістерді жылыстатуға және терроризмді қаржыландыруға қарсы іс-қимыл тақырыбын тереңірек зерделеу үшін басқа курстар әзірлегенін хабарлаймыз, олар туралы толығырақ мына телефон арқылы білуге болады: 8 708 716 8416.'}

                        >

                        </TextWithTitle>
                        <Sizebox height={60}></Sizebox>
                    </Reveal>
                    <Reveal>
                        <Report_Information>
                            <>
                                <p className='italic'>
                                    Назарларыңызға үлкен рақмет!!!
                                </p>
                            </>
                        </Report_Information>
                        <Sizebox height={60}></Sizebox>


                    </Reveal>



                </LessonPage>
            )
        }

        if (activeSessionId === -2) {
            if (id !== '86' && id !== '118') {
                return (<LessonPage name={isKazakh ? 'Қорытынды' : 'Заключительная часть'}>

                    <Sizebox height={40} />
                    <Reveal>
                        <ImageWithText
                            color={'white'}
                            imageText={isKazakh ? 'Сізге одан әрі кәсіби табыс пен өркендеу тілейміз!' : 'Поздравляем, Вы завершили дистанционное обучение по данному\u00A0курсу! Желаем Вам удачи при сдаче тестирования!'}
                            img={'https://corporate.waterlogic.com/fileadmin/_processed_/f/4/csm_banner-hands-shaking-3_c621f2a33f.jpg'}
                        />
                    </Reveal>

                    <Sizebox height={100} />
                    <Reveal>
                        <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                            {
                                isKazakh ? 'Оқу модульдің соңы' : 'Завершение учебного курса.'
                            }
                            <br />
                            <br />
                            <b onClick={() => { navigate('/profile') }} style={{ color: 'blue', cursor: 'pointer' }}>{isKazakh ? 'Сертификатты жеке кабинеттен таба аласыз' : 'Сертификат вы можете найти в личном кабинете'}</b>
                        </HeaderWithLine>
                    </Reveal>

                    {/* <Sizebox height={100} /> */}
                    {/* 
                <Reveal>
                    <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                        Сертификат можете найти в личном кабинете
                    </HeaderWithLine>
                </Reveal> */}
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

                                return <FaStar size={50} style={{ color: _color, cursor: 'pointer' }} onClick={handleClick} />
                            })
                        }
                    </div>
                    <Centered>
                        <RandomParapraph>
                            {
                                isKazakh ? 'Модульді бағалаңыз' : 'Оцените курс'
                            }
                        </RandomParapraph>
                    </Centered>
                    <Sizebox height={100} />

                    <Reveal>
                        <NextLesson
                            nextLessonName={isKazakh ? 'Жеке кабинет' : 'Личный кабинет'}
                            handleOnClick={() => {
                                if (stars === 0) {
                                    alert(isKazakh ? 'Модульді бағалаңыз' : 'Оцените курс');
                                    return;
                                }
                                navigate('/profile/sertificates')
                            }}
                        />
                    </Reveal>
                </LessonPage>)
            }
            else {
                return (
                    <LessonPage name={isKazakh ? 'Қорытынды' : 'Заключение'}>

                        <Sizebox height={40} />
                        <Reveal>
                            <ImageWithText
                                color={'white'}
                                imageText={isKazakh ? 'Сізге одан әрі кәсіби табыс пен өркендеу тілейміз!' : 'Дальнейших Вам профессиональных успехов и процветания!'}
                                img={'https://corporate.waterlogic.com/fileadmin/_processed_/f/4/csm_banner-hands-shaking-3_c621f2a33f.jpg'}
                            />
                        </Reveal>

                        <Sizebox height={100} />
                        <Reveal>
                            <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                                {
                                    isKazakh ? 'Оқу сабақтың соңы' : 'Завершение учебного урока'
                                }
                            </HeaderWithLine>
                        </Reveal>

                        {/* <Sizebox height={100} /> */}
                        {/*
                <Reveal>
                    <HeaderWithLine headerColor={'#3A3939'} lineColor={'#CADEFC'}>
                        Сертификат можете найти в личном кабинете
                    </HeaderWithLine>
                </Reveal> */}
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

                                    return <FaStar size={50} style={{ color: _color, cursor: 'pointer' }} onClick={handleClick} />
                                })
                            }
                        </div>
                        <Centered>
                            <RandomParapraph>
                                {
                                    isKazakh ? 'Сабақты бағалаңыз' : 'Оцените урок'
                                }
                            </RandomParapraph>
                        </Centered>
                        <Sizebox height={100} />

                        <Reveal>
                            <NextLesson
                                nextLessonName={isKazakh ? 'Жеке кабинет' : 'Личный кабинет'}
                                handleOnClick={() => {
                                    if (stars === 0) {
                                        alert(isKazakh ? 'Модульді бағалаңыз' : 'Оцените курс');
                                        return;
                                    }
                                    navigate('/profile/sertificates')
                                }}
                            />
                        </Reveal>
                    </LessonPage>)
            }
        }


        if (!activeLesson) {
            return null;
        }

        return (<LessonPage name={
            activeModule ?
                activeLesson
                    ? activeLesson.topic
                    : 'null lesson'
                : 'null module'}>


            {activeLesson.componentEntries.map((component, index) => {
                const Component = componentMap[component.componentName];

                console.log(component.componentName);
                console.log(Component);

                if (!Component) {
                    return <div key={index}>Component not found: {component.componentName}</div>;
                }

                // Parse the JSON strings inside the values object to JavaScript objects
                const props = {};
                Object.keys(component.values.values).forEach(key => {
                    try {
                        props[key] = JSON.parse(component.values.values[key]);
                    } catch (e) {
                        console.error(`Error parsing value for key "${key}":`, component.values.values[key]);
                    }
                });

                return (
                    <Reveal key={component.component_entry_id}>
                        <Component {...props} />
                    </Reveal>
                );
            })}

            <Sizebox height={100} />

            <Reveal>
                <NextLesson handleOnClick={() => {
                    CheckCurrentChapter(activeModule.module_id, activeLesson.lesson_id);
                }} />
            </Reveal>

        </LessonPage>)
    }


    return (
        <div className="read-course">
            <div className="course-wrapper">
                {
                    openQuizModal ? (
                        <ModalWindow
                            title={'Результат теста'}
                            setShowModal={(val) => setOpenQuizModal(false)}
                        >
                            {
                                quizStatus === 'fatal' ? (
                                    <div className='modal-fatal'>
                                        <p>
                                            {
                                                isKazakh
                                                    ? 'Тестті үш рет сәтсіз аяқтадыңыз. Модульді қайта өтуге ұсынамыз.'
                                                    : 'Вы провалили тест трижды. Рекомендуем перепройти модуль.'
                                            }
                                        </p>
                                    </div>
                                ) : null
                            }

                            {
                                quizStatus === 'fail' ? (
                                    <div className='modal-fail'>
                                        <p>
                                            {
                                                isKazakh
                                                    ? 'Тестті сәтсіз аяқтадыңыз. Қайта өтіңіз.'
                                                    : 'Вы провалили тест. Пройдите заново.'
                                            }
                                        </p>
                                    </div>
                                ) : null
                            }

                            {
                                quizStatus === 'successful' ? (
                                    <div className='modal-successful'>
                                        <p>
                                            {
                                                isKazakh
                                                    ? 'Тестті сәтті аяқтадыңыз.'
                                                    : 'Вы успешно прошли тест.'
                                            }
                                        </p>
                                    </div>
                                ) : null
                            }
                        </ModalWindow>
                    ) : null
                }
                <CourseHeader
                    handleNavOpen={handleNavOpen}
                    courseName={courseName}
                />
                <div className="course-body">

                    <CourseNavigation
                        course_id={id}
                        isNavOpen={isNavOpen}
                        activeSessionId={activeSessionId}
                        isQuiz={isModuleQuiz}
                        activeQuizId={activeQuizId}
                        handleSessionClick={handleSessionClick}
                        courseProgress={courseProgress}
                        courseName={courseName}
                        courseModules={courseModules}
                        handleTestSessionClick={handleTestSessionClick}
                        isLoadInfo={isLoadInfo}
                    />

                    <div className={isNavOpen ? "course-content open" : "course-content"}>
                        <div className="content">
                            {isLoadInfo === false && (<div className="loading-icon">

                                <FaSpinner className="spinner" /> Загрузка ...
                            </div>)}
                            {
                                getLesson(isModuleQuiz)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CourseNavigation = ({
    course_id,
    isNavOpen,
    activeSessionId,
    isQuiz,
    activeQuizId,
    handleSessionClick,
    courseProgress,
    courseName,
    courseModules,
    handleTestSessionClick,
    isLoadInfo
}) => {

    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);
    const [sessionStatuses, setSessionStatuses] = useState({});
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        console.log(location);
        if ((location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)) {
            setKazakh(true);
        }
    }, [])

    // Fetch all session statuses once
    useEffect(() => {
        if (course_id) {
            fetchSessionStatuses();
        }
    }, [course_id]);

    const fetchSessionStatuses = async () => {
        try {
            const response = await axios.get(
                `${base_url}/api/aml/chapter/getChecked/${course_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            if (response.status === 200) {
                // Convert array to object for easier lookup
                const statusMap = {};
                response.data.forEach(session => {
                    statusMap[session.id] = session.checked;
                });
                setSessionStatuses(statusMap);
            }
        } catch (error) {
            console.error("Error fetching session statuses:", error);
        }
    };

    const [currentModule, setCurrentModule] = useState(
        courseModules?.length > 0 ? courseModules[0].module_id : -1
    );

    const handleModuleOpen = (id) => {
        if (currentModule === id) {
            setCurrentModule(-1);
            return;
        }
        setCurrentModule(id);
    }

    const _handleSessionClick = (lesson_id) => {
        handleSessionClick(currentModule, lesson_id);
    }

    const _handleTestSessionClick = (quiz_id) => {
        handleTestSessionClick(currentModule, quiz_id);
    }


    return (
        <div className={isNavOpen ? "course-nav" : "course-nav hide"}>
            <div className="nav-head">
                <div>
                    <h2>{courseName}</h2>
                    <div className='progress-bar'>
                        <div>Прогресс {parseFloat(courseProgress)?.toFixed(1)}%</div>
                        <progress id="courseProgress" max="100" value={`${parseFloat(courseProgress)?.toFixed(2)}`}>{parseFloat(courseProgress)?.toFixed(2)}</progress>
                    </div>
                </div>
            </div>
            <div className="nav-body">
                {
                    isLoadInfo && course_id === '81' && (
                        <Session
                            checked={true}
                            course_id={course_id}
                            session={{
                                id: -4,
                                name: isKazakh ? 'Курс туралы' : 'О курсе',
                            }}
                            handleSessionClick={_handleSessionClick}
                            isActive={-4 === activeSessionId}
                            isChecked={sessionStatuses[-4] || false}
                        />
                    )
                }
                {
                    isLoadInfo && course_id === '114' && (
                        <Session
                            checked={true}
                            course_id={course_id}
                            session={{
                                id: -114,
                                name: 'О курсе',
                            }}
                            handleSessionClick={_handleSessionClick}
                            isActive={-114 === activeSessionId}
                            isChecked={sessionStatuses[-114] || false}
                        />
                    )
                }
                {
                    courseModules.map((courseModule, index) => {
                        const module_id = courseModule.module_id;
                        const course_name = courseModule.name;
                        const lessons = courseModule.lessons;
                        const module_quiz = courseModule.quiz;

                        return <Module
                            key={index}
                            moduleId={module_id}
                            name={course_name}
                            handleModuleOpen={handleModuleOpen}
                            isOpen={currentModule == module_id}
                        >

                            {
                                lessons.map((lesson, index) => {
                                    const lesson_id = lesson.lesson_id;
                                    const lesson_name = lesson.topic;

                                    return <Session
                                        key={index}
                                        course_id={course_id}
                                        session={{
                                            id: lesson_id,
                                            name: lesson_name,
                                        }}
                                        handleSessionClick={_handleSessionClick}
                                        isActive={lesson_id === activeSessionId}
                                        isChecked={sessionStatuses[lesson_id] || false}
                                    />
                                })
                            }

                            {
                                module_quiz
                                    ? (
                                        <TestSession
                                            checked={module_quiz.quiz_max_points === 100 || sessionStatuses[module_quiz.quiz_id]}
                                            course_id={course_id}
                                            session={{
                                                id: module_quiz.quiz_id,
                                                name: module_quiz.quiz_title,
                                            }}
                                            handleSessionClick={() => _handleTestSessionClick(module_quiz.quiz_id)}
                                            isActive={isQuiz && activeQuizId === module_quiz.quiz_id}
                                        />
                                    )
                                    : null
                            }

                        </Module>
                    })
                }
                {
                    courseProgress > 99.9
                        ? (
                            <Session
                                checked={true}
                                course_id={course_id}
                                session={{
                                    id: -2,
                                    name: isKazakh ? 'Қорытынды' : 'Заключение',
                                }}
                                handleSessionClick={_handleSessionClick}
                                isActive={-2 === activeSessionId}
                            />
                        ) : null
                }
                {
                    isLoadInfo && course_id === '81' && (
                        <Session
                            checked={true}
                            course_id={course_id}
                            session={{
                                id: -3,
                                name: isKazakh ? 'Қорытынды' : 'Заключение',
                            }}
                            handleSessionClick={_handleSessionClick}
                            isActive={-3 === activeSessionId}
                        />
                    )
                }
                {
                    isLoadInfo && course_id === '114' && (
                        <Session
                            checked={false}
                            course_id={course_id}
                            session={{
                                id: -115,
                                name: 'Заключительная часть',
                            }}
                            handleSessionClick={_handleSessionClick}
                            isActive={-115 === activeSessionId}
                        />
                    )
                }
                {
                    isLoadInfo && course_id === '114' && (
                        <Session
                            checked={false}
                            course_id={course_id}
                            session={{
                                id: -116,
                                name: 'Обратная связь',
                            }}
                            handleSessionClick={_handleSessionClick}
                            isActive={-116 === activeSessionId}
                        />
                    )
                }
            </div>

        </div>
    )
}

const LessonPage = ({ children, name, lecturer }) => {

    return (
        <>
            <div className="content-header">
                <h1>{name}</h1>
                {
                    lecturer ?
                        (
                            <div className='lector'>
                                <img src={lectorImage} alt="lector-name" />
                                <p>{lecturer}</p>
                            </div>
                        ) : null
                }
            </div>
            {children}
        </>
    );
}

export default ReadCourse;