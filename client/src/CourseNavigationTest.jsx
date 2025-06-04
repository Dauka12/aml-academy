// Тестовый компонент для проверки логики CourseNavigation
import { useState } from 'react';

const CourseNavigationTest = () => {
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [isModuleQuiz, setIsModuleQuiz] = useState(false);
  const [logs, setLogs] = useState([]);

  // Тестовые данные
  const mockCourseModules = [
    {
      module_id: 1,
      name: 'Модуль 1: Введение',
      lessons: [
        { lesson_id: 1, topic: 'Урок 1: Основы' },
        { lesson_id: 2, topic: 'Урок 2: Принципы' },
        { lesson_id: 3, topic: 'Урок 3: Практика' }
      ],
      quiz: { quiz_id: 101, quiz_title: 'Тест по модулю 1' }
    },
    {
      module_id: 2,
      name: 'Модуль 2: Продвинутый уровень',
      lessons: [
        { lesson_id: 4, topic: 'Урок 4: Сложные задачи' },
        { lesson_id: 5, topic: 'Урок 5: Кейсы' }
      ],
      quiz: { quiz_id: 102, quiz_title: 'Тест по модулю 2' }
    }
  ];

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleSessionClick = (moduleId, lessonId) => {
    addLog(`🎯 Session clicked: moduleId=${moduleId}, lessonId=${lessonId}`);
    setActiveModuleId(moduleId);
    setActiveSessionId(lessonId);
    setIsModuleQuiz(false);
  };

  const handleQuizClick = (moduleId, quizId) => {
    addLog(`🧪 Quiz clicked: moduleId=${moduleId}, quizId=${quizId}`);
    setActiveModuleId(moduleId);
    setActiveSessionId(quizId);
    setIsModuleQuiz(true);
  };

  const clearLogs = () => setLogs([]);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      <h1>🧪 CourseNavigation Logic Test</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Навигация */}
        <div style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px' 
        }}>
          <h3>📚 Course Navigation</h3>
          {mockCourseModules.map(module => (
            <div key={module.module_id} style={{ marginBottom: '15px' }}>
              <h4 style={{ 
                background: '#ddd', 
                padding: '8px', 
                margin: '0 0 8px 0',
                borderRadius: '4px'
              }}>
                {module.name}
              </h4>
              
              {/* Уроки */}
              {module.lessons.map(lesson => (
                <div
                  key={lesson.lesson_id}
                  onClick={() => handleSessionClick(module.module_id, lesson.lesson_id)}
                  style={{
                    padding: '8px 12px',
                    margin: '2px 0',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    background: activeSessionId === lesson.lesson_id && !isModuleQuiz 
                      ? '#4CAF50' : '#fff',
                    color: activeSessionId === lesson.lesson_id && !isModuleQuiz 
                      ? 'white' : 'black',
                    border: '1px solid #ddd'
                  }}
                >
                  {lesson.topic}
                  {activeSessionId === lesson.lesson_id && !isModuleQuiz && ' ✓'}
                </div>
              ))}
              
              {/* Квиз */}
              {module.quiz && (
                <div
                  onClick={() => handleQuizClick(module.module_id, module.quiz.quiz_id)}
                  style={{
                    padding: '8px 12px',
                    margin: '2px 0',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    background: activeSessionId === module.quiz.quiz_id && isModuleQuiz 
                      ? '#FF9800' : '#fff3e0',
                    color: activeSessionId === module.quiz.quiz_id && isModuleQuiz 
                      ? 'white' : '#e65100',
                    border: '1px solid #ffcc02'
                  }}
                >
                  🧪 {module.quiz.quiz_title}
                  {activeSessionId === module.quiz.quiz_id && isModuleQuiz && ' ✓'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Информация о состоянии */}
        <div style={{ 
          background: '#f0f8ff', 
          padding: '15px', 
          borderRadius: '8px' 
        }}>
          <h3>📊 Current State</h3>
          <div style={{ 
            background: 'white', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '10px'
          }}>
            <strong>Active Session ID:</strong> {activeSessionId}<br/>
            <strong>Active Module ID:</strong> {activeModuleId}<br/>
            <strong>Is Module Quiz:</strong> {isModuleQuiz ? 'Yes' : 'No'}
          </div>
          
          <h4>🔍 Active Item Details</h4>
          <div style={{ 
            background: 'white', 
            padding: '10px', 
            borderRadius: '4px' 
          }}>
            {!isModuleQuiz ? (
              // Активный урок
              mockCourseModules
                .flatMap(m => m.lessons.map(l => ({...l, module_name: m.name})))
                .filter(lesson => lesson.lesson_id === activeSessionId)
                .map(lesson => (
                  <div key={lesson.lesson_id}>
                    <strong>Type:</strong> Lesson<br/>
                    <strong>Module:</strong> {lesson.module_name}<br/>
                    <strong>Topic:</strong> {lesson.topic}
                  </div>
                ))
            ) : (
              // Активный квиз
              mockCourseModules
                .filter(m => m.quiz && m.quiz.quiz_id === activeSessionId)
                .map(module => (
                  <div key={module.module_id}>
                    <strong>Type:</strong> Quiz<br/>
                    <strong>Module:</strong> {module.name}<br/>
                    <strong>Quiz:</strong> {module.quiz.quiz_title}
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Логи */}
      <div style={{ 
        background: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <h3>📋 Activity Log</h3>
          <button 
            onClick={clearLogs}
            style={{
              padding: '5px 10px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Logs
          </button>
        </div>
        
        <div style={{ 
          background: 'white', 
          padding: '10px', 
          borderRadius: '4px',
          maxHeight: '200px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#999' }}>Нет активности. Кликните по урокам или тестам.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ margin: '2px 0' }}>{log}</div>
            ))
          )}
        </div>
      </div>

      {/* Инструкции */}
      <div style={{ 
        background: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>📝 Instructions</h3>
        <ul>
          <li>Кликайте по урокам и тестам в навигации</li>
          <li>Наблюдайте за изменением активного состояния</li>
          <li>Проверяйте правильность передачи moduleId и lessonId</li>
          <li>Активный элемент должен подсвечиваться зеленым (урок) или оранжевым (тест)</li>
          <li>Логи показывают все действия пользователя</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseNavigationTest;
