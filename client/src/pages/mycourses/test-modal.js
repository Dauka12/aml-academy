// Тестовые функции для модального окна на странице "Мои курсы"
// Этот файл можно использовать для тестирования в консоли браузера

// Функция для сброса состояния модального окна для страницы "Мои курсы"
const resetMyCoursesModal = () => {
    localStorage.removeItem('courseWelcomeShown_mycourses');
    localStorage.removeItem('courseFirstAccess_mycourses');
    console.log('Состояние модального окна для страницы "Мои курсы" сброшено');
    console.log('При следующем обновлении страницы модальное окно должно появиться');
};

// Функция для принудительного показа модального окна
const forceShowMyCoursesModal = () => {
    localStorage.removeItem('courseWelcomeShown_mycourses');
    console.log('Модальное окно для страницы "Мои курсы" будет показано при следующем обновлении');
};

// Функция для просмотра текущего состояния localStorage
const checkMyCoursesModalState = () => {
    const accessKey = 'courseFirstAccess_mycourses';
    const modalKey = 'courseWelcomeShown_mycourses';
    
    console.log('=== Состояние модального окна "Мои курсы" ===');
    console.log(`${accessKey}:`, localStorage.getItem(accessKey));
    console.log(`${modalKey}:`, localStorage.getItem(modalKey));
    
    if (localStorage.getItem(accessKey) === 'true') {
        console.log('✅ Пользователь уже заходил на страницу "Мои курсы"');
    } else {
        console.log('❌ Пользователь еще не заходил на страницу "Мои курсы"');
    }
    
    if (localStorage.getItem(modalKey) === 'true') {
        console.log('✅ Модальное окно уже показывалось');
    } else {
        console.log('❌ Модальное окно еще не показывалось');
    }
};

// Функция для полного тестирования
const testMyCoursesModal = () => {
    console.log('=== Тест модального окна "Мои курсы" ===\n');
    
    // Очищаем localStorage для чистого теста
    localStorage.clear();
    console.log('1. localStorage очищен');
    
    // Проверяем состояние
    checkMyCoursesModalState();
    
    // Симулируем первый вход
    localStorage.setItem('courseFirstAccess_mycourses', 'true');
    console.log('\n2. Симулирован первый вход на страницу');
    
    // Проверяем состояние снова
    checkMyCoursesModalState();
    
    // Симулируем показ модального окна
    localStorage.setItem('courseWelcomeShown_mycourses', 'true');
    console.log('\n3. Симулирован показ модального окна');
    
    // Финальная проверка
    checkMyCoursesModalState();
    
    console.log('\n=== Тест завершен ===');
};

// Экспортируем функции для использования в консоли браузера
if (typeof window !== 'undefined') {
    window.resetMyCoursesModal = resetMyCoursesModal;
    window.forceShowMyCoursesModal = forceShowMyCoursesModal;
    window.checkMyCoursesModalState = checkMyCoursesModalState;
    window.testMyCoursesModal = testMyCoursesModal;
    
    console.log('Тестовые функции для страницы "Мои курсы" доступны:');
    console.log('- resetMyCoursesModal() - сбросить состояние модального окна');
    console.log('- forceShowMyCoursesModal() - принудительно показать модальное окно');
    console.log('- checkMyCoursesModalState() - проверить текущее состояние');
    console.log('- testMyCoursesModal() - запустить полный тест');
}

export { resetMyCoursesModal, forceShowMyCoursesModal, checkMyCoursesModalState, testMyCoursesModal };
