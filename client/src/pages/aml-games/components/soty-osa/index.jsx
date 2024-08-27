import React, { useState } from 'react';
import './style.css';

const words = [
    'Законопослушность',
    'Регламентирующие документы',
    'Льготность',
    'Пенсионка',
    'Общие данные',
    'Квалификация',
    'Операции фин.мониторинга',
    'Мед. справка'
];

const Hex = () => {
    const [selectedHexagons, setSelectedHexagons] = useState(Array(9).fill(null));

    const handleDrop = (index, word) => {
        const newSelectedHexagons = [...selectedHexagons];
        newSelectedHexagons[index] = word;
        setSelectedHexagons(newSelectedHexagons);
    };

    const handleDragStart = (e, word) => {
        e.dataTransfer.setData('text/plain', word);
    };

    return (
        <div>
            <div className="main1">
                <div className="container1">
                    {[...Array(9)].map((_, index) => {
                        const isCenterHex = index === 4;
                        return (
                            <div
                                key={index}
                                style={{
                                    background: isCenterHex
                                        ? '#FFFFFF'
                                        : selectedHexagons[index]
                                            ? '#80D473'
                                            : '#D9D9D9',
                                    position: 'relative',
                                    visibility: index === 0 || index === 6 ? 'hidden' : 'visible',
                                    boxShadow: isCenterHex ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',  // добавляем тень для центрального элемента
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const word = e.dataTransfer.getData('text');
                                    if (word) handleDrop(index, word);
                                }}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                {(isCenterHex || selectedHexagons[index]) && (
                                    <p style={{
                                        position: 'absolute',
                                        color: '#1F3C88',
                                        fontWeight:'bold',
                                        zIndex: '1000',
                                        top: '45%',
                                        left: '10%',
                                        right: '10%',
                                        textAlign: 'center',
                                        wordWrap: 'break-word',
                                    }}>
                                        {isCenterHex ? 'Рейтинг' : selectedHexagons[index]}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="word-container">
                {words.map((word, idx) => (
                    <div
                        key={idx}
                        className="word draggable-word"
                        draggable
                        onDragStart={(e) => handleDragStart(e, word)}
                    >
                        {word}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hex;
