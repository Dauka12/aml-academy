// Тестовый пример работы модального окна с несколькими курсами
// Этот файл демонстрирует, как работает логика показа модального окна

// Симуляция работы с несколькими курсами
const simulateCourseAccess = () => {
  console.log('=== Тест работы модального окна с несколькими курсами ===\n');
  
  // Очищаем localStorage для чистого теста
  localStorage.clear();
  
  // Курс 1: Финансовый мониторинг
  console.log('1. Пользователь входит на курс "Финансовый мониторинг" (ID: 1)');
  const course1Id = '1';
  const course1Key = `courseWelcomeShown_${course1Id}`;
  
  // Проверяем, показывали ли модальное окно для этого курса
  const hasShownCourse1 = localStorage.getItem(course1Key);
  console.log(`   Проверка localStorage: ${course1Key} = ${hasShownCourse1}`);
  
  if (!hasShownCourse1) {
    console.log('   → Модальное окно ПОКАЗЫВАЕТСЯ (первый вход на курс)');
    localStorage.setItem(course1Key, 'true');
    console.log(`   → Сохраняем: ${course1Key} = true`);
  } else {
    console.log('   → Модальное окно НЕ показывается (уже видел)');
  }
  
  console.log('');
  
  // Курс 2: Антиотмывание
  console.log('2. Пользователь входит на курс "Антиотмывание" (ID: 2)');
  const course2Id = '2';
  const course2Key = `courseWelcomeShown_${course2Id}`;
  
  // Проверяем, показывали ли модальное окно для этого курса
  const hasShownCourse2 = localStorage.getItem(course2Key);
  console.log(`   Проверка localStorage: ${course2Key} = ${hasShownCourse2}`);
  
  if (!hasShownCourse2) {
    console.log('   → Модальное окно ПОКАЗЫВАЕТСЯ (первый вход на курс)');
    localStorage.setItem(course2Key, 'true');
    console.log(`   → Сохраняем: ${course2Key} = true`);
  } else {
    console.log('   → Модальное окно НЕ показывается (уже видел)');
  }
  
  console.log('');
  
  // Повторный вход на курс 1
  console.log('3. Пользователь снова входит на курс "Финансовый мониторинг" (ID: 1)');
  const hasShownCourse1Again = localStorage.getItem(course1Key);
  console.log(`   Проверка localStorage: ${course1Key} = ${hasShownCourse1Again}`);
  
  if (!hasShownCourse1Again) {
    console.log('   → Модальное окно ПОКАЗЫВАЕТСЯ (первый вход на курс)');
  } else {
    console.log('   → Модальное окно НЕ показывается (уже видел)');
  }
  
  console.log('');
  
  // Повторный вход на курс 2
  console.log('4. Пользователь снова входит на курс "Антиотмывание" (ID: 2)');
  const hasShownCourse2Again = localStorage.getItem(course2Key);
  console.log(`   Проверка localStorage: ${course2Key} = ${hasShownCourse2Again}`);
  
  if (!hasShownCourse2Again) {
    console.log('   → Модальное окно ПОКАЗЫВАЕТСЯ (первый вход на курс)');
  } else {
    console.log('   → Модальное окно НЕ показывается (уже видел)');
  }
  
  console.log('');
  
  // Показываем содержимое localStorage
  console.log('5. Содержимое localStorage:');
  console.log('   courseWelcomeShown_1:', localStorage.getItem('courseWelcomeShown_1'));
  console.log('   courseWelcomeShown_2:', localStorage.getItem('courseWelcomeShown_2'));
  console.log('   courseWelcomeShown (глобальный):', localStorage.getItem('courseWelcomeShown'));
  
  console.log('\n=== Тест завершен ===');
};

// Функция для сброса состояния конкретного курса
const resetCourseModal = (courseId) => {
  const modalKey = `courseWelcomeShown_${courseId}`;
  localStorage.removeItem(modalKey);
  console.log(`Состояние модального окна для курса ${courseId} сброшено`);
};

// Функция для принудительного показа модального окна
const forceShowModal = (courseId) => {
  const modalKey = `courseWelcomeShown_${courseId}`;
  localStorage.removeItem(modalKey);
  console.log(`Модальное окно для курса ${courseId} будет показано при следующем входе`);
};

// Экспортируем функции для использования в консоли браузера
if (typeof window !== 'undefined') {
  window.simulateCourseAccess = simulateCourseAccess;
  window.resetCourseModal = resetCourseModal;
  window.forceShowModal = forceShowModal;
  
  console.log('Тестовые функции доступны:');
  console.log('- simulateCourseAccess() - запустить тест');
  console.log('- resetCourseModal(courseId) - сбросить состояние для курса');
  console.log('- forceShowModal(courseId) - принудительно показать модальное окно');
}

export { simulateCourseAccess, resetCourseModal, forceShowModal };

