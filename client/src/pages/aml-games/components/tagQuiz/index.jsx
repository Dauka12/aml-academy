import React, { useState } from 'react';

import './style.scss';

function TagQuiz({
    answers,
    title
}) {
    const [tagged, setTagged] = useState([]);

    return ( 
        <div className="tag-quiz">
            <h4>{title}</h4>
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
        </div>
    );
}

export default TagQuiz;