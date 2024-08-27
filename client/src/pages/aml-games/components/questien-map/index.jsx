import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import QuestionComponent from '../question-component';
import SubmissionButton from '../sub-button';
import './style.css';

const QuestionMap = ({ testData, typeOfQuestion, handleSubmit }) => {
    const [questions, setQuestions] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

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
        handleNextTask()
        handleSubmit(percentage, percentage);  // Отправляем данные через HOC
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
            <div style={{ textAlign: 'right', marginRight: '50px', marginTop: '30px' }}>
                <SubmissionButton handling={handleConfirm} />
            </div>
        </>
    );
};

export default QuestionMap;
