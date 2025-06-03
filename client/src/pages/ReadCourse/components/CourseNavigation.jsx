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
  
  // Initialize first module as open
  useEffect(() => {
    if (courseModules?.length > 0 && currentModule === -1) {
      setCurrentModule(courseModules[0].module_id);
    }
  }, [courseModules, currentModule, setCurrentModule]);

  const handleModuleToggle = (moduleId) => {
    if (currentModule === moduleId) {
      setCurrentModule(-1);
    } else {
      setCurrentModule(moduleId);
    }
  };

  const handleSessionClick = (lessonId) => {
    const moduleId = currentModule;
    onSessionClick(moduleId, lessonId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleQuizClick = (quizId) => {
    const moduleId = currentModule;
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
            onClick={() => handleSessionClick(-4)}
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
            onClick={() => handleSessionClick(-114)}
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
            onClick={() => handleSessionClick(-2)}
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
            onClick={() => handleSessionClick(-3)}
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
              onClick={() => handleSessionClick(-115)}
            />
            <SessionItem
              session={{
                id: -116,
                name: 'Обратная связь'
              }}
              isActive={activeSessionId === -116}
              isCompleted={false}
              onClick={() => handleSessionClick(-116)}
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
                  isActive={activeSessionId === lesson.lesson_id}
                  isCompleted={sessionStatuses[lesson.lesson_id]}
                  onClick={() => onSessionClick(lesson.lesson_id)}
                />
              ))}

              {/* Quiz */}
              {module.quiz && (
                <motion.div
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  onClick={() => onQuizClick(module.quiz.quiz_id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isModuleQuiz && activeSessionId === module.quiz.quiz_id
                      ? 'bg-blue-700 border-l-4 border-yellow-400'
                      : ''
                  }`}
                >
                  <RiQuestionAnswerLine className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">{module.quiz.quiz_title}</span>
                  {module.quiz.quiz_max_points === 100 && (
                    <IoCheckmarkCircle className="w-5 h-5 text-green-400 ml-auto" />
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
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 mx-2 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-blue-700 border-l-4 border-white' : ''
      }`}
    >
      <TbFileText className="w-5 h-5 text-blue-200" />
      <span className="text-sm font-medium flex-1 line-clamp-2">{session.name}</span>
      {isCompleted && (
        <IoCheckmarkCircle className="w-5 h-5 text-green-400" />
      )}
    </motion.div>
  );
};

export default CourseNavigation;
