import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useCourseStore from '../stores/courseStore';

export const useCourseLogic = (courseId) => {
  const {
    course,
    courseModules,
    courseProgress,
    sessionStatuses,
    isLoading,
    error,
    activeSessionId,
    activeModuleId,
    isModuleQuiz,
    fetchCourse,
    fetchSessionStatuses,
    markLessonCompleted,
    setActiveSession,
    setActiveQuiz,
    getActiveModule,
    getActiveLesson
  } = useCourseStore();

  // Initialize course data
  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
      fetchSessionStatuses(courseId);
    }
  }, [courseId, fetchCourse, fetchSessionStatuses]);

  // Handle session navigation
  const handleSessionClick = useCallback((moduleId, lessonId) => {
    setActiveSession(moduleId, lessonId);
    
    // Mark lesson as viewed when it's opened (not when progressing)
    if (lessonId > 0) { // Only for regular lessons, not special sessions
      markLessonCompleted(lessonId);
    }
    
    // Scroll to top
    const courseContent = document.querySelector('.course-content');
    if (courseContent) {
      courseContent.scrollTo(0, 0);
    }

  }, [setActiveSession, markLessonCompleted]);

  // Handle quiz navigation
  const handleQuizClick = useCallback((moduleId, quizId) => {
    
    setActiveQuiz(moduleId, quizId);
  }, [setActiveQuiz]);

  // Progress to next module function
  const progressToNextModule = useCallback(() => {
    
    const activeModule = getActiveModule();
    if (!activeModule) {
      return;
    }

    const currentModuleIndex = courseModules.findIndex(
      module => module.module_id === activeModule.module_id
    );

    if (currentModuleIndex + 1 < courseModules.length) {
      const nextModule = courseModules[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        setActiveSession(nextModule.module_id, nextModule.lessons[0].lesson_id);
      } else {
        console.log('❌ Next module has no lessons');
      }
    } else {
      console.log('✅ Already at last module');
    }
  }, [getActiveModule, courseModules, setActiveSession]);

  // Progress to next lesson/module
  const progressToNext = useCallback(async () => {
    const activeModule = getActiveModule();
    const activeLesson = getActiveLesson();
    
    if (!activeModule || !activeLesson) return;

    // Find next lesson or module (removed markLessonCompleted from here)
    const currentLessonIndex = activeModule.lessons.findIndex(
      lesson => lesson.lesson_id === activeLesson.lesson_id
    );
    
    // Check if there's a next lesson in the same module
    if (currentLessonIndex + 1 < activeModule.lessons.length) {
      const nextLesson = activeModule.lessons[currentLessonIndex + 1];
      setActiveSession(activeModule.module_id, nextLesson.lesson_id);
      return;
    }

    // Check if module has a quiz
    if (activeModule.quiz) {
      setActiveQuiz(activeModule.module_id, activeModule.quiz.quiz_id);
      return;
    }

    // Move to next module if current module is completed
    progressToNextModule();
  }, [
    getActiveModule,
    getActiveLesson,
    setActiveSession,
    setActiveQuiz,
    progressToNextModule
  ]);

  return {
    course,
    courseModules,
    courseProgress,
    sessionStatuses,
    isLoading,
    error,
    activeSessionId,
    activeModuleId,
    isModuleQuiz,
    handleSessionClick,
    handleQuizClick,
    progressToNext,
    progressToNextModule,
    getActiveModule,
    getActiveLesson
  };
};

export const useResponsiveNavigation = () => {
  const { isNavOpen, setIsNavOpen } = useCourseStore();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsNavOpen(false);
      } else {
        setIsNavOpen(true);
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsNavOpen]);

  const toggleNavigation = useCallback(() => {
    setIsNavOpen(!isNavOpen);
  }, [isNavOpen, setIsNavOpen]);

  return {
    isNavOpen,
    toggleNavigation
  };
};

export const useLanguageDetection = () => {
  const location = useLocation();
  
  const isKazakh = location.search.includes('81') || location.pathname.includes('81');
  
  return { isKazakh };
};
