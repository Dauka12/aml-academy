import React, { useEffect, useState } from 'react';
import './style.css';

const LevelProgress = ({ level, title, subLevels }) => {
    const [animatedProgress, setAnimatedProgress] = useState(subLevels.map(() => 0));

    useEffect(() => {
        subLevels.forEach((subLevel, index) => {
            let start = 0;
            const end = subLevel.progress === 0 ? 1 : subLevel.progress;
            const duration = 1000;
            const stepTime = Math.abs(Math.floor(duration / end));
            
            const timer = setInterval(() => {
                start += 1;
                setAnimatedProgress(prev => {
                    const newProgress = [...prev];
                    newProgress[index] = start;
                    return newProgress;
                });
                if (start === end) clearInterval(timer);
            }, stepTime);
        });
    }, [subLevels]);

    return (
        <div className="level-progress-container">
            <div className="level-header" style={{ backgroundColor: 'rgba(31, 60, 136, 0.7)' }}>
                <span className="level-title">{`Уровень ${level} : ${title}`}</span>
            </div>
            {subLevels.map((subLevel, index) => (
                <div key={index} className="sublevel-container">
                    <div className="sublevel-title">{subLevel.title}</div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${animatedProgress[index]}%`,
                                backgroundColor: animatedProgress[index] > 30 ? '#0046FF' : '#FF0000'
                            }}
                        ></div>
                        <div
                            className="remaining-bar"
                            style={{
                                width: `${100 - animatedProgress[index]}%`,
                                backgroundColor: '#D9D9D9'
                            }}
                        ></div>
                    </div>
                    <div className="status">{animatedProgress[index] > 30 ? 'Выполнено' : 'Не выполнено'}</div>
                </div>
            ))}
        </div>
    );
};

export default LevelProgress;
