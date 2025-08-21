# CourseWelcomeModal

Модальное окно приветствия для новых пользователей дистанционных курсов.

## Описание

Компонент отображает приветственное сообщение для пользователей, которые впервые входят на курс. Содержит важную информацию о:
- 90-дневном доступе к курсу
- Необходимости скачать сертификат
- Закрытии доступа по истечении срока

## Использование

### Базовое использование

```jsx
import CourseWelcomeModal from '../components/CourseWelcomeModal/CourseWelcomeModal';
import useCourseWelcomeModal from '../hooks/useCourseWelcomeModal';

const CoursePage = () => {
  const { showModal, handleCloseModal } = useCourseWelcomeModal(courseId, isFirstAccess);
  
  return (
    <div>
      {/* Контент страницы */}
      
      <CourseWelcomeModal 
        open={showModal} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};
```

### Использование хука useCourseWelcomeModal

```jsx
const {
  showModal,           // boolean - показывать ли модальное окно
  hasShownModal,       // boolean - было ли уже показано модальное окно
  handleCloseModal,    // function - закрыть модальное окно
  resetModalState,     // function - сбросить состояние (для тестирования)
  forceShowModal       // function - принудительно показать модальное окно
} = useCourseWelcomeModal(courseId, isFirstAccess);
```

## Параметры

### CourseWelcomeModal

| Параметр | Тип | Описание |
|----------|-----|----------|
| `open` | boolean | Показывать ли модальное окно |
| `onClose` | function | Функция, вызываемая при закрытии модального окна |

### useCourseWelcomeModal

| Параметр | Тип | Описание |
|----------|-----|----------|
| `courseId` | string | ID курса для отслеживания показа модального окна |
| `isFirstAccess` | boolean | Флаг первого доступа к курсу |

## Логика работы

1. **Первый вход на курс**: При первом входе на конкретный курс `isFirstAccess = true`
2. **Проверка localStorage**: Хук проверяет, было ли уже показано модальное окно для ЭТОГО курса
3. **Показ модального окна**: Если модальное окно еще не показывали для этого курса, оно отображается
4. **Сохранение состояния**: После закрытия модального окна состояние сохраняется в localStorage для конкретного курса
5. **Повторный показ**: При следующих входах на тот же курс модальное окно не показывается
6. **Новый курс**: При входе на ДРУГОЙ курс модальное окно показывается снова (если это первый вход на этот курс)

## localStorage ключи

- `courseWelcomeShown_${courseId}` - модальное окно показано для конкретного курса
- `courseFirstAccess_${courseId}` - первый доступ к курсу

**Важно:** Каждый курс имеет свой собственный счетчик показа модального окна

## Стилизация

Компонент использует Material-UI и SCSS. Основные стили:
- Адаптивный дизайн для мобильных и планшетов
- Анимации появления и hover эффекты
- Градиентный заголовок
- Иконки для информационных блоков

## Тестирование

Для тестирования можно использовать функции хука:
- `resetModalState()` - сбросить состояние для конкретного курса
- `forceShowModal()` - принудительно показать модальное окно

### Интерактивное тестирование

В браузере доступны функции для тестирования:
```javascript
// Запустить тест работы с несколькими курсами
simulateCourseAccess();

// Сбросить состояние для конкретного курса
resetCourseModal('1');

// Принудительно показать модальное окно для курса
forceShowModal('2');
```

Подробности в файле `test-example.js`

## Пример интеграции в CourseContent

```jsx
// В CourseContent.tsx
const [isFirstAccess, setIsFirstAccess] = useState(false);
const { showModal, handleCloseModal } = useCourseWelcomeModal(userCourseId, isFirstAccess);

useEffect(() => {
  // Проверяем первый доступ
  const courseAccessKey = `courseFirstAccess_${userCourseId}`;
  const hasAccessedBefore = localStorage.getItem(courseAccessKey);
  
  if (!hasAccessedBefore) {
    setIsFirstAccess(true);
    localStorage.setItem(courseAccessKey, 'true');
  }
}, [userCourseId]);

// В JSX
<CourseWelcomeModal 
  open={showModal} 
  onClose={handleCloseModal} 
/>
```

## Пример интеграции в страницу "Мои курсы"

```jsx
// В MyCoursesNew (mycourses/index.jsx)
const [isFirstAccess, setIsFirstAccess] = useState(false);
const { showModal, handleCloseModal } = useCourseWelcomeModal('mycourses', isFirstAccess);

useEffect(() => {
  // Проверяем первый доступ к странице "Мои курсы"
  const checkFirstAccess = () => {
    const accessKey = 'courseFirstAccess_mycourses';
    const hasAccessedBefore = localStorage.getItem(accessKey);
    
    if (!hasAccessedBefore) {
      setIsFirstAccess(true);
      localStorage.setItem(accessKey, 'true');
    }
  };

  // Проверяем первый доступ только после загрузки курсов
  if (courses.length > 0) {
    checkFirstAccess();
  }
}, [courses]);

// В JSX
<CourseWelcomeModal 
  open={showModal} 
  onClose={handleCloseModal} 
/>
```

### Тестирование на странице "Мои курсы"

В браузере доступны специальные функции для тестирования:
```javascript
// Сбросить состояние модального окна для страницы "Мои курсы"
resetMyCoursesModal();

// Принудительно показать модальное окно
forceShowMyCoursesModal();

// Проверить текущее состояние
checkMyCoursesModalState();

// Запустить полный тест
testMyCoursesModal();
```

Подробности в файле `mycourses/test-modal.js`

## Пример работы с несколькими курсами

```jsx
// Пользователь впервые заходит на курс "Финансовый мониторинг" (ID: 1)
// → Показывается модальное окно
// → Сохраняется: courseWelcomeShown_1 = true

// Пользователь входит на курс "Антиотмывание" (ID: 2)  
// → Показывается модальное окно (новый курс!)
// → Сохраняется: courseWelcomeShown_2 = true

// Пользователь снова входит на курс "Финансовый мониторинг" (ID: 1)
// → Модальное окно НЕ показывается (уже видел)

// Пользователь снова входит на курс "Антиотмывание" (ID: 2)
// → Модальное окно НЕ показывается (уже видел)
```

## Особенности для страницы "Мои курсы"

На странице "Мои курсы" модальное окно работает немного иначе:
- **ID страницы**: `mycourses` (вместо ID конкретного курса)
- **Первый доступ**: Отслеживается по ключу `courseFirstAccess_mycourses`
- **Показ модального окна**: Отслеживается по ключу `courseWelcomeShown_mycourses`
- **Логика**: Показывается один раз при первом посещении страницы, а не для каждого курса

Это позволяет приветствовать пользователей, которые впервые заходят на страницу управления курсами.
