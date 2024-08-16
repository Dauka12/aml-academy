import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './style.css';

const LevelSummary = ({ percentage, score, description, recommendations, level }) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let start = 0;
        const end = percentage === 0 ? percentage = 1 : percentage;
        const duration = 1000; // duration of the animation in ms
        const stepTime = Math.abs(Math.floor(duration / end));
        
        const timer = setInterval(() => {
            start += 1;
            setCurrentPercentage(start);
            if (start === end) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [percentage]);
    const handling = () => {
        navigate(`/courses/aml-games/game/read/1/${Number(level)}/1`)
    }

    const isHighScore = currentPercentage > 70;
    const circleColor = isHighScore ? '#1F3C88' : '#ff4d4d';

    return (
        <div className="level-summary-container">
            <div className="header" style={{ backgroundColor: 'rgba(31, 60, 136, 0.7)' }}>
                Итог уровня
            </div>
            <div className="circle-container">
                <div className="circle">
                    <div className="circle-inner">
                        <div className="circle-percentage" style={{ color: circleColor }}>
                            {currentPercentage}%
                        </div>
                    </div>
                </div>
                <svg className="progress-ring" width="180" height="180">
                    <circle
                        className="progress-ring__circle"
                        stroke="#E4E4E4"
                        strokeWidth="30"
                        fill="transparent"
                        r="75"
                        cx="90"
                        cy="90"
                    />
                    <circle
                        className="progress-ring__circle"
                        stroke={circleColor}
                        strokeWidth="30"
                        fill="transparent"
                        r="75"
                        cx="90"
                        cy="90"
                        style={{ strokeDasharray: '471', strokeDashoffset: 471 - (471 * currentPercentage) / 100 }}
                    />
                </svg>
            </div>
            <div className="score" style={{ color: circleColor }}>Баллы: {score}</div>
            <div className="description">{description}</div>
            <div className="recommendations-title">Рекомендации:</div>
            <div className="recommendations">{recommendations}</div>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent:"center"
            }}>
                <button className="reset-button" onClick={() => {
                    handling()
            }}>
                <span className="icon">⟳</span>
                Начать сначала
            </button>
            </div>
        </div>
    );
};

export default LevelSummary;
