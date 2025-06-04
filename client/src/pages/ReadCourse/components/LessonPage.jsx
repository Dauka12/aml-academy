import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useCourseStore from '../../../stores/courseStore';
import ComponentRenderer from './ComponentRenderer';

const LessonPage = ({ lesson, module, onProgressToNext, onProgressToNextModule, isKazakh }) => {
  const { markLessonAsViewed, getSessionStatus } = useCourseStore();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const containerRef = useRef(null);

  const sessionStatus = getSessionStatus(lesson?.lesson_id);
  const isCompleted = sessionStatus?.finished || lesson?.completed || false;

  // Auto-scroll to top when lesson changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lesson?.lesson_id]);
  useEffect(() => {
    console.log('📚 LessonPage props:', {
      lessonId: lesson?.lesson_id,
      topic: lesson?.topic,
      moduleId: module?.module_id,
      moduleName: module?.name,
      componentEntries: lesson?.componentEntries?.length || 0,
      isKazakh,
      onProgressToNext: typeof onProgressToNext,
      onProgressToNextModule: typeof onProgressToNextModule
    });
  }, [lesson, module, isKazakh, onProgressToNext, onProgressToNextModule]);

  // Mark lesson as viewed when component mounts
  useEffect(() => {
    if (lesson?.lesson_id && !isCompleted) {
      markLessonAsViewed(lesson.lesson_id);
    }
  }, [lesson?.lesson_id, markLessonAsViewed, isCompleted]);

  // Handle video progress tracking
  const handleVideoProgress = (currentTime, duration) => {
    const progress = (currentTime / duration) * 100;
    setVideoProgress(progress);
    
    // Mark as started if user has watched at least 5%
    if (progress >= 5 && !hasStartedVideo) {
      setHasStartedVideo(true);
    }
  };

  // Handle next lesson navigation
  const handleNext = () => {
    if (onProgressToNext) {
      onProgressToNext();
    }
  };

  // Handle previous lesson navigation
  const handlePrevious = () => {
    // This would be implemented in the parent component
    console.log('Navigate to previous lesson');
  };

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <h3 className="text-lg font-medium mb-2">
            {isKazakh ? 'Сабақ жүктелуде...' : 'Загрузка урока...'}
          </h3>
        </div>
      </div>
    );
  }  return (
    <div 
      ref={containerRef} 
      className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 mobile-scroll-container" 
      style={{ 
        WebkitOverflowScrolling: 'touch',
        height: '100%',
        maxHeight: '100vh',
        overscrollBehavior: 'contain',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      }}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 min-h-full">
        {/* Lesson Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}          className="mb-4 sm:mb-6"
        >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">            {isCompleted && (
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 min-w-0 break-words hyphens-auto">
              {lesson.topic}
            </h1>
          </div>
          
        </div>        {/* Progress indicator */}
        {hasStartedVideo && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3 sm:mb-4 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        )}
      </motion.div>

      {/* Video Section */}
      {lesson.video_link && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}          className="mb-6 sm:mb-8"
        >
          <div className="relative bg-black rounded-lg overflow-hidden shadow-lg w-full" style={{ aspectRatio: '16/9' }}>
            <video
              controls
              className="w-full h-full object-contain"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onTimeUpdate={(e) => {
                const video = e.target;
                handleVideoProgress(video.currentTime, video.duration);
              }}
              poster={lesson.video_poster || undefined}
            >
              <source src={lesson.video_link} type="video/mp4" />
              {isKazakh 
                ? 'Сіздің браузеріңіз видеоны қолдамайды.'
                : 'Ваш браузер не поддерживает видео.'
              }
            </video>
            
            {/* Video overlay for play state */}
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <PlayIcon className="w-16 h-16 text-white opacity-80" />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Lesson Content - Component Entries */}
      {lesson.componentEntries && lesson.componentEntries.length > 0 && (        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 w-full"
        >
          <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <ComponentRenderer componentEntries={lesson.componentEntries} />
          </div>
        </motion.div>
      )}

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}        className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-200"
      >
        <button
          onClick={handlePrevious}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base order-1 sm:order-none"
        >
          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="whitespace-nowrap">{isKazakh ? 'Алдыңғы' : 'Предыдущий'}</span>
        </button>

        <div className="text-xs sm:text-sm text-gray-500 order-3 sm:order-none">
          {isCompleted && (
            <span className="text-green-600 font-medium whitespace-nowrap">
              {isKazakh ? '✓ Аяқталған' : '✓ Завершено'}
            </span>
          )}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base order-2 sm:order-none"
        >
          <span className="whitespace-nowrap">{isKazakh ? 'Келесі' : 'Следующий'}</span>
          <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 flex-shrink-0" />
        </button>
      </motion.div>
      </div>
    </div>
  );
};

export default LessonPage;
