import React, { useEffect, useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';

import { useLocation } from 'react-router';
import './style.scss';

function NextLesson({ nextLessonName, handleOnClick}) {
    const location = useLocation();
    const [isKazakh, setKazakh] = useState(false);

    useEffect(() => {
        console.log(location);
        if (
            (location.search.indexOf('81') !== -1 || location.pathname.indexOf('81') !== -1)
        ) {
            setKazakh(true);
        }
    }, [])

    return ( 
        <div className="next-lesson-btn">
            <div className="next-lesson-btn-inner" onClick={handleOnClick}>
                <div className="next-lesson-btn-text">
                    {
                        nextLessonName ? 
                            nextLessonName : 
                            isKazakh 
                                ? 'Келесі сабақ' 
                                : 'Следующая лекция'
                    }
                </div>
                <GrLinkNext className="next-lesson-btn-icon"/>
            </div>
        </div>
    );
}

export default NextLesson;