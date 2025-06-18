
import { useEffect, useState } from 'react';
import './style.scss';

function PyramidList({
    list
}) {
    const [parsedList, setParsedList] = useState([]);

    // Парсим список, если он приходит как строка JSON
    useEffect(() => {
        console.log('Received list:', list, 'Type:', typeof list);
        
        if (typeof list === 'string') {
            try {
                const parsed = JSON.parse(list);
                console.log('Parsed list:', parsed);
                setParsedList(Array.isArray(parsed) ? parsed : []);
            } catch (error) {
                console.error('Ошибка парсинга списка пирамиды:', error);
                setParsedList([]);
            }
        } else if (Array.isArray(list)) {
            console.log('List is already an array:', list);
            setParsedList(list);
        } else {
            console.log('List is neither string nor array, setting empty array');
            setParsedList([]);
        }
    }, [list]);return ( 
        <div className="pyramid-list-wrapper">
            <ul className="pyramid-list">
                {parsedList && parsedList.length > 0 ? parsedList.map((item, index) => (
                    <li key={index} className={`pyramid-item pyramid-item-${index + 1}`}>
                        {item}
                    </li>
                )) : (
                    <li className="pyramid-item pyramid-item-1">
                        Нет данных для отображения
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PyramidList;