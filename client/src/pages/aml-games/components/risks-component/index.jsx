import React, { useState } from 'react';
import './style.css';

const RisksComponent = () => {
    const [selectedRisk, setSelectedRisk] = useState(null);

    const handleClick = (risk) => {
        setSelectedRisk(risk);
    };

    return (
        <div className='risks-component'>
            <div 
                className={`type-risk ${selectedRisk === 'Риск отсутствует' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск отсутствует')}
            >
                Риск отсутствует
            </div>
            <div 
                className={`type-risk ${selectedRisk === 'Риск низкий' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск низкий')}
            >
                Риск низкий
            </div>
            <div 
                className={`type-risk ${selectedRisk === 'Риск средний' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск средний')}
            >
                Риск средний
            </div>
            <div 
                className={`type-risk ${selectedRisk === 'Риск высокий' ? 'selected' : ''}`} 
                onClick={() => handleClick('Риск высокий')}
            >
                Риск высокий
            </div> 
        </div>
    );
}

export default RisksComponent;
