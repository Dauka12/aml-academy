import React, { useState } from 'react';
import './style.scss';

function TagQuiz({
    answers,
    title,
    img,
    maxItems = 5,
    handleSubmit
}) {
    const [tagged, setTagged] = useState([]);

    const getPercentage = () => {
        return (100 / maxItems) * tagged.length;
    };

    // Функция для подсчета количества правильных ответов
    const calculateScore = () => {
        const correctAnswers = tagged.filter(answer => answer.isCorrect).length;
        const score = correctAnswers / maxItems;
        console.log('Выбранные ответы:', tagged);
        console.log('Результат:', score);
        return score;
    };

    const handleTagClick = (answer) => {
        const isTagged = tagged.includes(answer);

        if (isTagged) {
            setTagged(prev => {
                const updatedTags = prev.filter(item => item !== answer);
                return updatedTags;
            });
        } else if (tagged.length < maxItems) {
            setTagged(prev => {
                const updatedTags = [...prev, answer];
                return updatedTags;
            });
        }
    };

    // Используем useEffect, чтобы вычислить и вывести результат после каждого изменения tagged
    const handleConfirm = () => {
        calculateScore();
        handleSubmit(tagged.map(item => item.id), calculateScore());  // Отправляем данные через HOC
    };

    return ( 
        <div className="tag-quiz">
            <h4>{title}</h4> 
            <div className='options-wrapper'>
                <div className="options">
                    {
                        answers.map((answer, index) => {
                            const includes = tagged.includes(answer);

                            return (
                                <div 
                                    key={index}
                                    className={`option ${includes ? 'tagged' : ''}`}
                                    onClick={() => handleTagClick(answer)}
                                >
                                    {answer.text}
                                </div>
                            );
                        })
                    }
                </div>
                <div className='static-tag'>
                    <img src={img} alt="Personal Computer" />
                    <div className="progress">
                        <div className="inner">
                            <div className="fill" style={{width: `${getPercentage()}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button 
                    className='blue'
                    onClick={handleConfirm}  // Вызываем handleConfirm на кнопку
                >
                    Подтвердить
                </button>
            </div>
        </div>
    );
}

export default TagQuiz;
