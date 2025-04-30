import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// Import MUI components
import { Box, LinearProgress, Typography } from '@mui/material';

import './style.scss';

import axios from 'axios';
import base_url from './../../settings/base_url';

import Reveal from './../../components/Reveal';
import NextLesson from './../../components/courseTemplates/complex/NextLesson';
import CourseHeader from './../../components/courseTemplates/course-header';
import { Module, Session, TestSession } from './../../components/sessions/Sessions';

import { useAuth } from '../../auth/AuthContext';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import TestPage from '../../components/courseTemplates/complex/Test';
import componentMap from '../AdminPage_v2/constructor/ComponentMap';

// Import special case components
import Sizebox from '../../components/courseTemplates/common/Sizebox';
import {
    AboutCourseLesson,
    ConclusionCourseLesson,
    ConclusionLesson,
    FeedbackLesson,
    LessonPage
} from './SpecialCaseLessons';

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

        // Special case handling based on session IDs
        switch (activeSessionId) {
            case -114:
            case -4:
                return <AboutCourseLesson
                    CheckCurrentChapter={CheckCurrentChapter}
                    isKazakh={isKazakh}
                />;
            case -115:
            case -3:
                return <ConclusionLesson
                    isKazakh={isKazakh}
                />;
            case -116:
                return <FeedbackLesson
                    navigate={navigate}
                    stars={stars}
                    setStars={setStars}
                    isKazakh={isKazakh}
                />;
            case -2:
                return <ConclusionCourseLesson
                    navigate={navigate}
                    stars={stars}
                    setStars={setStars}
                    isKazakh={isKazakh}
                    id={id}
                />;
            default:
                break;
        }

        if (!activeLesson) {
            return null;
        }

        // Return regular lesson
        return (
            <LessonPage name={activeModule ? (activeLesson ? activeLesson.topic : 'null lesson') : 'null module'}>
                {activeLesson.componentEntries.map((component, index) => {
                    const Component = componentMap[component.componentName];

                    if (!Component) {
                        return <div key={index}>Component not found: {component.componentName}</div>;
                    }

                    // Parse the JSON strings inside the values object to JavaScript objects
                    const props = {};
                    Object.keys(component.values.values).forEach(key => {
                        const value = component.values.values[key];
                        try {
                            if (key === "img") {
                                // Clean image URL of extra quotes
                                let cleanImgUrl = value;

                                // Remove HTML-escaped quotes
                                if (typeof cleanImgUrl === 'string') {
                                    cleanImgUrl = cleanImgUrl.replace(/&quot;/g, '');

                                    // Remove regular quotes if they surround the URL
                                    if ((cleanImgUrl.startsWith('"') && cleanImgUrl.endsWith('"')) ||
                                        (cleanImgUrl.startsWith("'") && cleanImgUrl.endsWith("'"))) {
                                        cleanImgUrl = cleanImgUrl.substring(1, cleanImgUrl.length - 1);
                                    }
                                }

                                props[key] = cleanImgUrl;
                            } else {
                                props[key] = JSON.parse(value);
                            }
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
            </LessonPage>
        );
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

    // Function to determine progress bar color based on completion percentage
    const getProgressColor = (progress) => {
        if (progress < 30) return '#FF5252'; // Brighter red for dark background
        if (progress < 70) return '#FFC107'; // Yellow for mid progress
        return '#69F0AE'; // Bright green for high completion
    };

    return (
        <div className={isNavOpen ? "course-nav" : "course-nav hide"}>
            <div className="nav-head">
                <div>
                    <h2>{courseName}</h2>
                    <div className='progress-bar'>
                        <Box sx={{ width: '100%', mb: 1.5, mt: 1 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                mb: 1,
                                color: 'rgba(255, 255, 255, 0.9)' // Brighter text for better readability
                            }}>
                                <Typography 
                                    variant="body2" 
                                    sx={{ fontSize: '0.85rem', fontWeight: 600 }}
                                >
                                    Прогресс {parseFloat(courseProgress)?.toFixed(1)}%
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{ fontSize: '0.85rem', fontWeight: 500 }}
                                >
                                    {parseFloat(courseProgress) >= 100 ? 'Завершено' : 'В процессе'}
                                </Typography>
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={parseFloat(courseProgress) || 0}
                                sx={{
                                    height: 8, // Increased height
                                    borderRadius: 4,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly brighter background
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: getProgressColor(parseFloat(courseProgress)),
                                        borderRadius: 4,
                                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)', // Enhanced glow effect
                                        transition: 'transform 0.4s ease, background-color 0.4s ease'
                                    }
                                }} 
                            />
                        </Box>
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
    );
};

export default ReadCourse;