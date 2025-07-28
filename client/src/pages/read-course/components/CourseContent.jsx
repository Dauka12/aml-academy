import { motion } from 'framer-motion';
import TestPage from '../../../components/courseTemplates/complex/Test';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
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
  onProgressToNextModule,
  isKazakh
}) => {
  const { isLoading, getActiveModule, getActiveLesson } = useCourseStore();

  if (isLoading) {
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

  // Handle quiz display
  if (isModuleQuiz && activeModule?.quiz) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col min-h-0 bg-white overflow-y-auto"
      >
        <TestPage
          name={activeModule.quiz.quiz_title}
          finished={activeModule.quiz.quiz_max_points === 100}
          quizId={activeModule.quiz.quiz_id}
          questions={activeModule.quiz.quizList}
          handleQuizFail={(isFatal) => {
            console.log('Quiz failed:', isFatal);
          }}
          handleQuizSuccesful={() => {
            console.log('✅ Quiz successful - test completed');
            // Quiz completion is now handled by the NextModule button in TestPage
            if (onProgressToNextModule) {
              console.log('🔄 Auto-progressing to next module after quiz success');
              // Optional: Auto-progress or let user choose via button
              // onProgressToNextModule();
            }
          }}
          onProgressToNextModule={onProgressToNextModule}
          isKazakh={isKazakh}
        />
      </motion.div>
    );
  }

  // Handle special case lessons
  const renderSpecialLesson = () => {
    switch (activeSessionId) {
      case 114:
      case -114:
        return (
          <AboutCourseLesson
            CheckCurrentChapter={onProgressToNext}
            isKazakh={false} // Всегда на русском для курса 114
          />
        );
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
            navigate={() => {}}
            stars={0}
            setStars={() => {}}
            isKazakh={isKazakh}
          />
        );
      case -2:
        return (
          <ConclusionCourseLesson
            navigate={() => {}}
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
        className="flex-1 flex flex-col min-h-0 bg-white overflow-y-auto"
      >
        {specialLesson}
      </motion.div>
    );
  }
  // Handle regular lesson
  if (!activeLesson) {
    // If there's no lesson but the module has a quiz, show the quiz directly
    if (activeModule?.quiz) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col min-h-0 bg-white overflow-y-auto"
        >
          <TestPage
            name={activeModule.quiz.quiz_title}
            finished={activeModule.quiz.quiz_max_points === 100}
            quizId={activeModule.quiz.quiz_id}
            questions={activeModule.quiz.quizList}
            handleQuizFail={(isFatal) => {
              console.log('Quiz failed:', isFatal);
            }}
            handleQuizSuccesful={() => {
              console.log('✅ Quiz successful - test completed');
              if (onProgressToNextModule) {
                console.log('🔄 Auto-progressing to next module after quiz success');
              }
            }}
            onProgressToNextModule={onProgressToNextModule}
            isKazakh={isKazakh}
          />
        </motion.div>
      );
    }
    
    // If no lesson and no quiz, show the "not found" message
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
      className="flex-1 flex flex-col min-h-0 bg-white"
    >
      <LessonPage
        lesson={activeLesson}
        module={activeModule}
        onProgressToNext={onProgressToNext}
        onProgressToNextModule={onProgressToNextModule}
        isKazakh={isKazakh}
      />
    </motion.div>
  );
};

export default CourseContent;