import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useCourseLogic, useLanguageDetection, useResponsiveNavigation } from '../../hooks/useCourseLogic';
import useCourseStore from '../../stores/courseStore';

// Components
import axios from 'axios';
import ErrorBoundary from '../../components/UI/ErrorBoundary';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import base_url from '../../settings/base_url';
import CourseContent from './components/CourseContent';
import CourseHeader from './components/CourseHeader';
import CourseNavigation from './components/CourseNavigation';
import DebugPanel from './components/DebugPanel';
import QuizModal from './components/QuizModal';

const ReadCourse = () => {
    const { id: courseId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { isKazakh } = useLanguageDetection();

    const {
        course,
        isLoading,
        error,
        openQuizModal
    } = useCourseStore();

    const {
        courseModules,
        courseProgress,
        sessionStatuses,
        activeSessionId,
        activeModuleId,
        isModuleQuiz,
        handleSessionClick,
        handleQuizClick,
        progressToNext,
        progressToNextModule
    } = useCourseLogic(courseId);

    const { isNavOpen, toggleNavigation } = useResponsiveNavigation();
    const { id } = useParams();
    // Auth check
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);
    const jwtToken = localStorage.getItem('jwtToken');

    // Special enrollment for course 118
    useEffect(() => {

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

    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        {isKazakh ? 'Қате пайда болды' : 'Произошла ошибка'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {isKazakh ? 'Курсты жүктеу мүмкін болмады' : 'Не удалось загрузить курс'}
                    </p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isKazakh ? 'Курстарға оралу' : 'Вернуться к курсам'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="h-screen flex flex-col bg-gray-50">
                {/* Quiz Modal */}
                <AnimatePresence>
                    {openQuizModal && (
                        <QuizModal isKazakh={isKazakh} />
                    )}
                </AnimatePresence>

                {/* Course Header */}
                <CourseHeader
                    courseName={course?.course_name}
                    onToggleNav={toggleNavigation}
                    isNavOpen={isNavOpen}
                />

                {/* Main Content */}
                <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* Navigation Sidebar */}
                    <AnimatePresence>
                        {isNavOpen && (
                            <motion.div
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="hidden lg:block"
                            >
                                <CourseNavigation
                                    courseId={courseId}
                                    courseName={course?.course_name}
                                    courseProgress={courseProgress}
                                    courseModules={courseModules}
                                    sessionStatuses={sessionStatuses}
                                    activeSessionId={activeSessionId}
                                    activeModuleId={activeModuleId}
                                    isModuleQuiz={isModuleQuiz}
                                    onSessionClick={handleSessionClick}
                                    onQuizClick={handleQuizClick}
                                    isKazakh={isKazakh}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Navigation Overlay */}
                    <AnimatePresence>
                        {isNavOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
                                onClick={toggleNavigation}
                            >
                                <motion.div
                                    initial={{ x: -300 }}
                                    animate={{ x: 0 }}
                                    exit={{ x: -300 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-80 h-full bg-white shadow-xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <CourseNavigation
                                        courseId={courseId}
                                        courseName={course?.course_name}
                                        courseProgress={courseProgress}
                                        courseModules={courseModules}
                                        sessionStatuses={sessionStatuses}
                                        activeSessionId={activeSessionId}
                                        activeModuleId={activeModuleId}
                                        isModuleQuiz={isModuleQuiz}
                                        onSessionClick={handleSessionClick}
                                        onQuizClick={handleQuizClick}
                                        isKazakh={isKazakh}
                                        isMobile={true}
                                        onClose={toggleNavigation}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Course Content */}
                    <motion.div
                        className="flex-1 flex flex-col min-h-0"
                        layout
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <CourseContent
                            courseId={courseId}
                            courseModules={courseModules}
                            activeSessionId={activeSessionId}
                            activeModuleId={activeModuleId}
                            isModuleQuiz={isModuleQuiz}
                            onProgressToNext={progressToNext}
                            onProgressToNextModule={progressToNextModule}
                            isKazakh={isKazakh}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Debug Panel (only shows when ?debug=true in URL) */}
            <DebugPanel />
        </ErrorBoundary>
    );
};

export default ReadCourse;
