import React, { useEffect, useState } from 'react';
import QuestionComponent from '../question-component';
import './style.css';

const QuestionMap = ({ testData, typeOfQuestion, handleSubmit }) => {
    const [questions, setQuestions] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        setQuestions(testData); 
    }, [testData]);

    useEffect(() => {
        // Подсчет правильных ответов
        const correctAnswers = questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
        setCorrectCount(correctAnswers);

        // Вывод процента правильных ответов
        if (questions.length > 0) {
            const percentage = correctAnswers / questions.length;
            console.log(percentage); // Выводим процент правильных ответов (от 0 до 1)
        }
    }, [questions]);

    const handleAnswer = (id, answer) => {
        // Обновляем выбранный ответ для вопроса
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.id === id ? { ...q, selectedAnswer: answer } : q
            )
        );
    };
    const correctAnswers = questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    const percentage = correctAnswers / questions.length;
    const handleConfirm = () => {
        handleSubmit(percentage, percentage );  // Отправляем данные через HOC
    };

    return (
        <>
            <div className='centering-questions'>
                <div className="main-container-questions">
                    <p className='type-of-questions'>{typeOfQuestion}</p>
                    {questions.map(question => (
                        <QuestionComponent
                            key={question.id}
                            question={question}
                            handleAnswer={handleAnswer} // Передаем функцию для обработки ответа
                        />
                    ))}
                </div>
            </div>
            <div className="actions" style={{ textAlign: 'right', marginRight: '50px', marginTop: '30px' }}>
                <button
                    className='blue'
                    onClick={() => {
                        handleConfirm()
                         // Выводим процент правильных ответов (от 0 до 1)
                    }}
                >
                    Подтвердить
                </button>
            </div>
        </>
    );
};

export default QuestionMap;
