import React, { useState } from 'react';

import folderImg from './../../assets/folder-image.png';
import userIcon from './../../assets/user-img.png';
import './style.scss';

function FolderQuiz({ 
    desc,
    list,
    title,
    maxItems,
    handleSubmit
}) {
    const [userAnswers, setUserAnswers] = useState([]);

    const calculateScore = () => {
        const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
        const score = correctAnswers / maxItems;
        console.log('Выбранные ответы:', userAnswers);
        console.log('Результат:', score);
        return score;
    };
    
    const getPercentage = () => {
        return (100 / maxItems) * userAnswers.length;
    }

    const handleConfirm = () => {
        calculateScore();
        handleSubmit(userAnswers.map(item => item.id), calculateScore());  // Отправляем данные через HOC
    };

    return ( 
        <div className="folder-quiz">
            {
                typeof desc === 'string' ? <p>{desc}</p> : desc
            }
            { title ? <div className="quiz-title">{title}</div> : null }
            <div className="row">
                <div className="folder">
                    <div>
                        <img src={folderImg} alt="" />
                        <div className="icon">
                            <img src={userIcon} alt="" />
                        </div>
                        <div className="folder-title">{title}</div>
                    </div>
                    <div className="progress">
                        <div className="inner">
                            <div className="fill" style={{width: `${getPercentage()}%`}}></div>
                        </div>
                    </div>
                </div>
                <div className="list">
                    {
                        list.map((item, index) => {
                            const includes = userAnswers.includes(item);

                            return <div 
                                className={`item ${includes ? 'active': ''}`}
                                key={index}
                                onClick={(e) => {
                                    setUserAnswers(prev => {
                                        if (prev.includes(item)) {
                                            
                                            return userAnswers.filter(a => a !== item);

                                        };

                                        if (userAnswers.length < maxItems) {
                                            return [...prev, item];
                                        } else {
                                            return prev;
                                        }
                                    })
                                }}
                            >
                                {item.text}
                            </div>
                        })
                    }
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

export default FolderQuiz;