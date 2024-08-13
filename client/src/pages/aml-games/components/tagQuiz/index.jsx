import React, { useState } from 'react';
import './style.scss';

function TagQuiz({
    answers,
    title,
    img,
    maxItems = 5
}) {
    const [tagged, setTagged] = useState([]);

    const getPercentage = () => {
        return (100 / maxItems) * tagged.length;
    }

    const handleTagClick = (answer) => {
        const isTagged = tagged.includes(answer);

        // Если элемент уже выбран, удаляем его
        if (isTagged) {
            setTagged(prev => prev.filter(item => item !== answer));
        } 
        // Если элемент не выбран и количество выбранных меньше maxItems, добавляем его
        else if (tagged.length < maxItems) {
            setTagged(prev => [...prev, answer]);
        }
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
                                    {answer}
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
        </div>
    );
}

export default TagQuiz;
