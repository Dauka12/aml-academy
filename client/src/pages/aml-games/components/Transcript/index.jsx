    import React, { useState } from 'react';
import './style.css';

    const TranscriptSwitcher = ({ transcripts }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTranscriptClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="transcript-container">
        <div className="transcript-tabs">
            {transcripts.map((transcript, index) => (
            <div
                key={index}
                className={`transcript-tab ${
                index === activeIndex ? 'active' : ''
                }`}
                onClick={() => handleTranscriptClick(index)}
            >
                {transcript.title}
            </div>
            ))}
            <div
            className="transcript-indicator"
            style={{
                width: `${100 / transcripts.length/3.2}%`,
                transform: `translateX(${(100 / transcripts.length*2.9) * activeIndex}%)`,
            }}
            ></div>
        </div>
        <div className='transcript-content-container'>
            <div className="transcript-content">
                {transcripts[activeIndex].content}
            </div>
        </div>
        </div>
    );
    };

    export default TranscriptSwitcher;
