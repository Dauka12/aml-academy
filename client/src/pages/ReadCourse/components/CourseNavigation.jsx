import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import { RiArrowRightSLine, RiQuestionAnswerLine } from 'react-icons/ri';
import { TbFileText } from 'react-icons/tb';
import useCourseStore from '../../../stores/courseStore';

const CourseNavigation = ({
    courseId,
    courseName,
    courseProgress,
    courseModules,
    sessionStatuses,
    activeSessionId,
    activeModuleId,
    isModuleQuiz,
    onSessionClick,
    onQuizClick,
    isKazakh,
    isMobile = false,
    onClose
}) => {
    const { currentModule, setCurrentModule } = useCourseStore();

    // Debug logging
    console.log('🎯 CourseNavigation props:', {
        activeSessionId,
        activeModuleId,
        isModuleQuiz,
        currentModule,
        courseModulesCount: courseModules?.length
    });

    // Initialize first module as open and auto-open module with active lesson
    useEffect(() => {
        console.log('🔄 useEffect triggered for module detection:', {
            courseModulesLength: courseModules?.length,
            activeSessionId,
            isModuleQuiz
        });
        
        if (courseModules?.length > 0) {
            // Find module that contains active lesson or quiz
            const moduleWithActiveLesson = courseModules.find(module => {
                // Check if module contains the active lesson
                const hasActiveLesson = module.lessons.some(lesson => lesson.lesson_id === activeSessionId);
                
                // Check if module contains the active quiz with type safety
                const hasActiveQuiz = module.quiz && isModuleQuiz && 
                    (module.quiz.quiz_id === activeSessionId || 
                     Number(module.quiz.quiz_id) === Number(activeSessionId));
                
                console.log('🔍 Checking module:', module.module_id, {
                    hasActiveLesson,
                    hasActiveQuiz,
                    activeSessionId,
                    activeSessionIdType: typeof activeSessionId,
                    isModuleQuiz,
                    moduleQuizId: module.quiz?.quiz_id,
                    moduleQuizIdType: typeof module.quiz?.quiz_id,
                    strictComparison: module.quiz?.quiz_id === activeSessionId,
                    numericComparison: Number(module.quiz?.quiz_id) === Number(activeSessionId)
                });
                
                return hasActiveLesson || hasActiveQuiz;
            });

            if (moduleWithActiveLesson) {
                console.log('🎯 Found module with active content:', moduleWithActiveLesson.module_id, moduleWithActiveLesson.name);
                console.log('🎯 Setting current module to:', moduleWithActiveLesson.module_id);
                setCurrentModule(moduleWithActiveLesson.module_id);
            } else if (activeSessionId < 0) {
                // For special sessions (negative IDs like заключение), don't auto-open any module
                console.log('🎯 Special session detected, keeping current module state');
            } else if (courseModules.length > 0) {
                // Fallback to first module if no active lesson found
                console.log('🎯 Setting current module to first module:', courseModules[0].module_id);
                setCurrentModule(courseModules[0].module_id);
            }
        }
    }, [courseModules, activeSessionId, isModuleQuiz, setCurrentModule]);

    const handleModuleToggle = (moduleId) => {
        console.log('🔄 handleModuleToggle called:', {
            moduleId,
            currentModule,
            activeSessionId,
            isModuleQuiz
        });

        // Always allow toggle regardless of active session
        if (currentModule === moduleId) {
            // Close the current module
            console.log('📥 Closing module:', moduleId);
            setCurrentModule(-1);
        } else {
            // Open the selected module
            console.log('📤 Opening module:', moduleId);
            setCurrentModule(moduleId);
        }
        
        console.log('✅ Module toggle completed for:', moduleId);
    };

    const handleSessionClick = (moduleId, lessonId) => {
        console.log('🎯 CourseNavigation handleSessionClick:', { moduleId, lessonId });

        // Ensure the module containing the lesson is open
        if (moduleId && moduleId !== currentModule) {
            console.log('📤 Opening module for lesson:', moduleId);
            setCurrentModule(moduleId);
        }

        // For special sessions (negative IDs), don't use moduleId
        if (lessonId < 0) {
            onSessionClick(null, lessonId);
        } else {
            // For regular lessons, use the passed moduleId or fallback to currentModule
            const targetModuleId = moduleId !== undefined ? moduleId : currentModule;
            onSessionClick(targetModuleId, lessonId);
        }
        if (isMobile && onClose) {
            onClose();
        }
    };

    const handleQuizClick = (quizId) => {
        // Find the module that contains this quiz
        const moduleWithQuiz = courseModules.find(module =>
            module.quiz && module.quiz.quiz_id === quizId
        );

        const moduleId = moduleWithQuiz ? moduleWithQuiz.module_id : currentModule;
        console.log('🧪 CourseNavigation handleQuizClick:', { moduleId, quizId, moduleWithQuiz: moduleWithQuiz?.name });

        // Ensure the module containing the quiz is open
        if (moduleId && moduleId !== currentModule) {
            console.log('📤 Opening module for quiz:', moduleId);
            setCurrentModule(moduleId);
        }

        onQuizClick(moduleId, quizId);
        if (isMobile && onClose) {
            onClose();
        }
    };

    const getProgressColor = (progress) => {
        if (progress < 30) return 'bg-red-500';
        if (progress < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className={`${isMobile ? 'w-full' : 'w-80'} h-full bg-blue-900 text-white flex flex-col`}>
            {/* Mobile Close Button */}
            {isMobile && (
                <div className="flex justify-between items-center p-4 border-b border-blue-800">
                    <h3 className="text-lg font-semibold">Навигация</h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        <IoClose className="w-6 h-6" />
                    </button>
                </div>
            )}

            {/* Course Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-800 p-6"
            >
                <h2 className="text-xl font-bold mb-4 line-clamp-2">{courseName}</h2>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Прогресс {courseProgress?.toFixed(1)}%</span>
                        <span>{courseProgress >= 100 ? 'Завершено' : 'В процессе'}</span>
                    </div>
                    <div className="w-full bg-blue-700 rounded-full h-2.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${courseProgress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-2.5 rounded-full ${getProgressColor(courseProgress)} relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto py-4">
                {/* Special Sessions */}
                {courseId === '81' && (
                    <SessionItem
                        session={{
                            id: -4,
                            name: isKazakh ? 'Курс туралы' : 'О курсе'
                        }}
                        isActive={activeSessionId === -4}
                        isCompleted={sessionStatuses[-4]}
                        onClick={() => handleSessionClick(null, -4)}
                    />
                )}

                {courseId === '114' && (
                    <SessionItem
                        session={{
                            id: -114,
                            name: 'О курсе'
                        }}
                        isActive={activeSessionId === -114}
                        isCompleted={sessionStatuses[-114]}
                        onClick={() => handleSessionClick(null, -114)}
                    />
                )}

                {/* Course Modules */}
                <div className="space-y-2">
                    {courseModules.map((module, index) => (
                        <ModuleItem
                            key={module.module_id}
                            module={module}
                            isOpen={currentModule === module.module_id}
                            onToggle={() => handleModuleToggle(module.module_id)}
                            activeSessionId={activeSessionId}
                            isModuleQuiz={isModuleQuiz}
                            sessionStatuses={sessionStatuses}
                            onSessionClick={handleSessionClick}
                            onQuizClick={handleQuizClick}
                        />
                    ))}
                </div>

                {/* Final Sessions */}
                {courseProgress > 99.9 && (
                    <SessionItem
                        session={{
                            id: -2,
                            name: isKazakh ? 'Қорытынды' : 'Заключение'
                        }}
                        isActive={activeSessionId === -2}
                        isCompleted={true}
                        onClick={() => handleSessionClick(null, -2)}
                    />
                )}

                {courseId === '81' && (
                    <SessionItem
                        session={{
                            id: -3,
                            name: isKazakh ? 'Қорытынды' : 'Заключение'
                        }}
                        isActive={activeSessionId === -3}
                        isCompleted={true}
                        onClick={() => handleSessionClick(null, -3)}
                    />
                )}

                {courseId === '114' && (
                    <>
                        <SessionItem
                            session={{
                                id: -115,
                                name: 'Заключительная часть'
                            }}
                            isActive={activeSessionId === -115}
                            isCompleted={false}
                            onClick={() => handleSessionClick(null, -115)}
                        />
                        <SessionItem
                            session={{
                                id: -116,
                                name: 'Обратная связь'
                            }}
                            isActive={activeSessionId === -116}
                            isCompleted={false}
                            onClick={() => handleSessionClick(null, -116)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

const ModuleItem = ({
    module,
    isOpen,
    onToggle,
    activeSessionId,
    isModuleQuiz,
    sessionStatuses,
    onSessionClick,
    onQuizClick
}) => {
    console.log('🎯 ModuleItem render:', {
        moduleId: module.module_id,
        moduleName: module.name,
        isOpen,
        lessonsCount: module.lessons?.length,
        hasQuiz: !!module.quiz,
        shouldShowContent: isOpen ? 'YES' : 'NO'
    });

    // Helper function to check if quiz is active with type safety
    const isQuizActive = (quizId) => {
        return isModuleQuiz && (activeSessionId === quizId || Number(activeSessionId) === Number(quizId));
    };

    return (
        <div className="mx-2">
            {/* Module Header */}
            <motion.div
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                onClick={onToggle}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
            >
                <div className="flex items-center space-x-3">
                    <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <RiArrowRightSLine className="w-5 h-5" />
                    </motion.div>
                    <h3 className="font-medium text-sm line-clamp-2">{module.name}</h3>
                </div>
            </motion.div>

            {/* Module Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="ml-6 space-y-1">
                            {/* Lessons */}
                            {module.lessons.map((lesson) => (
                                <SessionItem
                                    key={lesson.lesson_id}
                                    session={{
                                        id: lesson.lesson_id,
                                        name: lesson.topic
                                    }}
                                    isActive={activeSessionId === lesson.lesson_id && !isModuleQuiz}
                                    isCompleted={sessionStatuses[lesson.lesson_id]?.finished || sessionStatuses[lesson.lesson_id]?.completed}
                                    onClick={() => onSessionClick(module.module_id, lesson.lesson_id)}
                                />
                            ))}

                            {/* Quiz */}
                            {module.quiz && (
                                <motion.div
                                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                    onClick={() => onQuizClick(module.quiz.quiz_id)}
                                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                        isQuizActive(module.quiz.quiz_id)
                                            ? 'bg-blue-700 border-l-4 border-yellow-400 text-white shadow-lg'
                                            : 'hover:bg-blue-800 text-blue-100'
                                        }`}
                                >
                                    <RiQuestionAnswerLine className={`w-5 h-5 transition-colors ${
                                        isQuizActive(module.quiz.quiz_id) ? 'text-yellow-400' : 'text-yellow-300'
                                        }`} />
                                    <span className={`text-sm font-medium transition-colors ${
                                        isQuizActive(module.quiz.quiz_id) ? 'text-white font-semibold' : 'text-blue-100'
                                        }`}>
                                        {module.quiz.quiz_title}
                                    </span>
                                    {module.quiz.quiz_max_points === 100 && (
                                        <IoCheckmarkCircle className="w-5 h-5 text-green-400 ml-auto" />
                                    )}
                                    {isQuizActive(module.quiz.quiz_id) && (
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SessionItem = ({ session, isActive, isCompleted, onClick }) => {
    // Debug logging for active state
    console.log('🎯 SessionItem:', {
        sessionId: session.id,
        sessionName: session.name,
        isActive,
        isCompleted,
        hasActiveClass: isActive ? 'YES' : 'NO'
    });

    // Принудительно очищаем стили и применяем правильные
    const baseClasses = "flex items-center space-x-3 p-3 mx-2 rounded-lg cursor-pointer transition-all duration-200";
    const activeClasses = isActive
        ? "!bg-blue-700 !border-l-4 !border-white !shadow-lg !text-white"
        : "!bg-transparent hover:!bg-blue-800 !text-blue-100";

    return (
        <motion.div
            whileHover={{ backgroundColor: isActive ? undefined : 'rgba(255, 255, 255, 0.1)' }}
            onClick={onClick}
            className={`${baseClasses} ${activeClasses}`}
            style={{
                // Принудительно применяем стили через style для отладки
                backgroundColor: isActive ? '#1d4ed8' : 'transparent',
                borderLeft: isActive ? '4px solid white' : 'none',
                boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
                color: isActive ? 'white' : '#dbeafe'
            }}
        >
            <TbFileText
                className="w-5 h-5 transition-colors session-icon"
                style={{ color: isActive ? 'white' : '#93c5fd' }}
            />
            <span
                className="text-sm font-medium flex-1 line-clamp-2 transition-colors session-text"
                style={{
                    color: isActive ? 'white' : '#dbeafe',
                    fontWeight: isActive ? '600' : '500'
                }}
            >
                {session.name}
            </span>
            {isCompleted && (
                <IoCheckmarkCircle className="w-5 h-5 text-green-400" />
            )}
            {isActive && (
                <div
                    className="active-dot"
                    style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                />
            )}
        </motion.div>
    );
};

export default CourseNavigation;
