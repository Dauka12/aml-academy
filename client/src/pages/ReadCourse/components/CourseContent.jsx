import { motion } from 'framer-motion';
import TestPage from '../../../components/courseTemplates/complex/Test';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useCourseStore from '../../../stores/courseStore';
import LessonPage from './LessonPage';

// Special case lessons
import {
    AboutCourseLesson,
    ConclusionCourseLesson,
    ConclusionLesson,
    FeedbackLesson
} from '../SpecialCaseLessonsModern';

const CourseContent = ({
  courseId,
  courseModules,
  activeSessionId,
  activeModuleId,
  isModuleQuiz,
  onProgressToNext,
  isKazakh
}) => {
  const { isLoading, getActiveModule, getActiveLesson } = useCourseStore();

  // Debug logging
  console.log('📋 CourseContent props:', {
    courseId,
    courseModulesCount: courseModules?.length,
    activeSessionId,
    activeModuleId,
    isModuleQuiz,
    isLoading
  });

  if (isLoading) {
    console.log('⏳ CourseContent showing loading spinner');
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <LoadingSpinner 
          size="large" 
          message={isKazakh ? 'Курс жүктелуде...' : 'Загрузка курса...'} 
        />
      </div>
    );
  }

  const activeModule = getActiveModule();
  const activeLesson = getActiveLesson();
  
  console.log('🎯 Active content:', {
    activeModule: activeModule?.name,
    activeModuleId: activeModule?.module_id,
    activeLesson: activeLesson?.topic,
    activeLessonId: activeLesson?.lesson_id,
    isModuleQuiz,
    fullModule: activeModule,
    fullLesson: activeLesson
  });

  // Handle quiz display
  if (isModuleQuiz && activeModule?.quiz) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto bg-white"
      >
        <TestPage
          name={activeModule.quiz.quiz_title}
          finished={activeModule.quiz.quiz_max_points === 100}
          quizId={activeModule.quiz.quiz_id}
          questions={activeModule.quiz.quizList}
          handleQuizFail={(isFatal) => {
            // Handle quiz failure
            console.log('Quiz failed:', isFatal);
          }}
          handleQuizSuccesful={() => {
            // Handle quiz success
            console.log('Quiz successful');
          }}
        />
      </motion.div>
    );
  }

  // Handle special case lessons
  const renderSpecialLesson = () => {
    switch (activeSessionId) {
      case -114:
      case -4:
        return (
          <AboutCourseLesson
            CheckCurrentChapter={onProgressToNext}
            isKazakh={isKazakh}
          />
        );
      case -115:
      case -3:
        return <ConclusionLesson isKazakh={isKazakh} />;
      case -116:
        return (
          <FeedbackLesson
            navigate={() => {}} // Handle navigation
            stars={0}
            setStars={() => {}}
            isKazakh={isKazakh}
          />
        );
      case -2:
        return (
          <ConclusionCourseLesson
            navigate={() => {}} // Handle navigation
            stars={0}
            setStars={() => {}}
            isKazakh={isKazakh}
            id={courseId}
          />
        );
      default:
        return null;
    }
  };

  const specialLesson = renderSpecialLesson();
  if (specialLesson) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto bg-white"
      >
        {specialLesson}
      </motion.div>
    );
  }

  // Handle regular lesson
  if (!activeLesson) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-500">
          <h3 className="text-lg font-medium mb-2">
            {isKazakh ? 'Сабақ табылмады' : 'Урок не найден'}
          </h3>
          <p>
            {isKazakh ? 'Басқа сабақты таңдаңыз' : 'Выберите другой урок из навигации'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto bg-white"
    >
      <LessonPage
        lesson={activeLesson}
        module={activeModule}
        onProgressToNext={onProgressToNext}
        isKazakh={isKazakh}
      />
    </motion.div>
  );
};

export default CourseContent;
