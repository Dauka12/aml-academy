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

    return ( 
        <div className="tag-quiz">
            <h4>{title}</h4>
            <div className='options-wrapper'>
                <div className="options">
                    {
                        answers.map((answer, index) => {
                            const includes = tagged.includes(answer);

                            return <div 
                                className={`option ${includes ? 'tagged' : ''}`}
                                onClick={(e) => {
                                    if (includes) {
                                        setTagged(prev => {
                                            return prev.filter(_answer => _answer !== answer);
                                        })
                                    } else {
                                        setTagged(prev => [...prev, answer]);
                                    }
                                }}
                            >
                                {answer}
                            </div>
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