import React, { useState, useEffect } from 'react';

import './style.scss';

function PyramidList({
    list=[
        '1. Публичный отчет НОР ОД/ФТ/ФРОМУ',
        '2. Закрытый отчет НОР ОД/ФТ/ФРОМУ',
        '3. Секторальная оценка рисков НКО',
        '4. Отчет уязвимости ЮЛ',
        '5. Методические рекомендации по ПДЛ/БС/НКО',
    ]
}) {
    return ( 
        <div className="pyramid-list-wrapper">
            <ul className="pyramid-list">
                {list.map((item, index) => (
                    <li key={index} className={`pyramid-item pyramid-item-${index + 1}`}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PyramidList;