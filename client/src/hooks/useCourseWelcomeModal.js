import { useState, useEffect } from 'react';

/**
 * Хук для управления модальным окном приветствия новых пользователей курсов
 * 
 * ВАЖНО: Каждый курс имеет свой собственный счетчик показа модального окна.
 * Модальное окно показывается один раз для каждого нового курса.
 * 
 * @param {string} courseId - ID курса
 * @param {boolean} isFirstAccess - Флаг первого доступа к курсу
 * @returns {Object} - Состояние и функции управления модальным окном
 */
const useCourseWelcomeModal = (courseId, isFirstAccess = false) => {
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    // Проверяем, показывали ли мы уже модальное окно для этого КОНКРЕТНОГО курса
    // Каждый курс имеет свой собственный счетчик показа
    const checkModalShown = () => {
      if (!courseId) return;
      
      const modalShownKey = `courseWelcomeShown_${courseId}`;
      const courseModalShown = localStorage.getItem(modalShownKey);
      
      // Если модальное окно уже показывали для ЭТОГО курса, не показываем
      // Но для других курсов модальное окно будет показано снова
      if (courseModalShown === 'true') {
        setHasShownModal(true);
        return;
      }
      
      // Если это первый доступ к курсу, показываем модальное окно
      if (isFirstAccess) {
        setShowModal(true);
      }
    };

    checkModalShown();
  }, [courseId, isFirstAccess]);

  const handleCloseModal = () => {
    setShowModal(false);
    
    // Сохраняем в localStorage, что модальное окно показано ТОЛЬКО для этого курса
    if (courseId) {
      const modalShownKey = `courseWelcomeShown_${courseId}`;
      localStorage.setItem(modalShownKey, 'true');
    }
    
    // НЕ сохраняем глобальный флаг - каждый курс должен показывать модальное окно
    setHasShownModal(true);
  };

  const resetModalState = () => {
    // Сбрасываем состояние модального окна для КОНКРЕТНОГО курса (для тестирования или админки)
    if (courseId) {
      const modalShownKey = `courseWelcomeShown_${courseId}`;
      localStorage.removeItem(modalShownKey);
    }
    setHasShownModal(false);
    setShowModal(false);
  };

  const forceShowModal = () => {
    // Принудительно показываем модальное окно (для тестирования или админки)
    setShowModal(true);
  };

  return {
    showModal,
    hasShownModal,
    handleCloseModal,
    resetModalState,
    forceShowModal
  };
};

export default useCourseWelcomeModal;
