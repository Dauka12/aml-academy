import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useCourseStore from '../../../stores/courseStore';

const QuizModal = ({ isKazakh }) => {
  const { 
    openQuizModal, 
    quizData, 
    closeQuizModal,
    isLoading 
  } = useCourseStore();

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeQuizModal();
      }
    };

    if (openQuizModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [openQuizModal, closeQuizModal]);

  if (!openQuizModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isKazakh ? 'Тест' : 'Тест'}
          </h2>
          <button
            onClick={closeQuizModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <span className="ml-3 text-gray-600">
                {isKazakh ? 'Тест жүктелуде...' : 'Загрузка теста...'}
              </span>
            </div>
          ) : quizData ? (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {quizData.quiz_title || (isKazakh ? 'Тестілеу' : 'Тестирование')}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <p className="text-blue-800">
                    {isKazakh 
                      ? `Сұрақтар саны: ${quizData.questions?.length || 0}`
                      : `Количество вопросов: ${quizData.questions?.length || 0}`
                    }
                  </p>
                  {quizData.time_limit && (
                    <p className="text-blue-800 mt-1">
                      {isKazakh 
                        ? `Уақыт шектеуі: ${quizData.time_limit} минут`
                        : `Ограничение по времени: ${quizData.time_limit} минут`
                      }
                    </p>
                  )}
                </div>

                {quizData.description && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600">{quizData.description}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {isKazakh ? 'Тест деректері жоқ' : 'Данные теста отсутствуют'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={closeQuizModal}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {isKazakh ? 'Жабу' : 'Закрыть'}
          </button>
          {quizData && (
            <button
              onClick={() => {
                // Handle quiz start
                console.log('Starting quiz:', quizData);
                closeQuizModal();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isKazakh ? 'Тестты бастау' : 'Начать тест'}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizModal;
