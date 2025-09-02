
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
                        (() => {
                            const minWidth = 40; // %
                            const maxWidth = 80; // %
                            const count = parsedList.length;
                            // Если один элемент — ширина максимальная
                            if (count === 1) {
                                return (
                                    <li key={index} className="pyramid-item" style={{ width: `${maxWidth}%`, zIndex: count - index }}>
                                        {item}
                                    </li>
                                );
                            }
                            // Шаг ширины
                            const step = (maxWidth - minWidth) / (count - 1);
                            const width = minWidth + step * index;
                            return (
                                <li key={index} className="pyramid-item" style={{ width: `${width}%`, zIndex: count - index }}>
                                    {item}
                                </li>
                            );
                        })()
                )) : (
                        <li className="pyramid-item" style={{ width: '40%' }}>
                            Нет данных для отображения
                        </li>
                )}
            </ul>
        </div>
    );
}

export default PyramidList;