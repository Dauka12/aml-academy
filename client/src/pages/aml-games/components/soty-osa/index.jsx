import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import { sendAnswerToBackend } from '../../utils/api';
import SubmissionButton from '../sub-button';
import './style.css';

const words = [
    '1. Законопослушность',
    '2. Регламентирующие документы',
    '3. Льготность',
    '4. Пенсионка',
    '5. Общие данные',
    '6. Квалификация',
    '7. Операции фин.мониторинга',
    '8. Мед. справка'
];

const Hex = () => {
    // Initialize state with an array of 9 elements (for hexagons)
    const [selectedHexagons, setSelectedHexagons] = useState(Array(9).fill(null));
    const [availableItems, setAvailableItems] = useState([...words]);
    const [scoreCount, setScoreCount] = useState(0)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const handleSubmit = (answers, isCorrect) => {
        sendAnswerToBackend(1, 3, 3, answers, isCorrect);
    };
    const handleConfirm = () => {
        handleSubmit(scoreCount,1);  // Send the score to the backend
        handleNextTask()
    };

    // Correct answers, indicating the correct word index (zero-based)
    const correctAnswers = [null, 0, 4, 5, null, 7, null, 6, 3]; 

    const handleDrop = (index, wordIndex) => {
        // Prevent dropping if the hexagon is already occupied
        if (selectedHexagons[index] !== null) {
            return;
        }

        const word = words[wordIndex];

        // Ensure the word is still available
        if (!availableItems.includes(word)) {
            return;
        }

        // Update the selected hexagon with the word index
        const newSelectedHexagons = [...selectedHexagons];
        newSelectedHexagons[index] = wordIndex;
        setSelectedHexagons(newSelectedHexagons);

        // Remove the word from the available items
        setAvailableItems(availableItems.filter(item => item !== word));

        // Calculate score after dropping
        calculateScore(newSelectedHexagons);
    };

    const handleReturnItem = (index) => {
        const wordIndex = selectedHexagons[index];
        if (wordIndex !== null) {
            const word = words[wordIndex];
            setAvailableItems([...availableItems, word]);

            const newSelectedHexagons = [...selectedHexagons];
            newSelectedHexagons[index] = null;
            setSelectedHexagons(newSelectedHexagons);

            // Calculate score after returning item
            calculateScore(newSelectedHexagons);
        }
    };

    const handleDragStart = (e, wordIndex) => {
        e.dataTransfer.setData('text/plain', wordIndex);
    };

    const calculateScore = (droppedHexagons) => {
        let correctCount = 0;

        // Count correct answers by comparing the user's selections with the correct answers
        droppedHexagons.forEach((wordIndex, hexIndex) => {
            if (correctAnswers[hexIndex] === wordIndex) {
                correctCount++;
            }
        });

        // Total number of hexagons that should be filled (non-null correct answers)
        const totalToBeFilled = correctAnswers.filter(answer => answer !== null)?.length;

        // Score is the ratio of correct placements to the total that should be filled
        const score = correctCount / totalToBeFilled;

        // Log the score (which will be between 0 and 1)
        console.log('Correct Answers:', correctCount, 'Total:', totalToBeFilled, 'Score:', score.toFixed(1));
        setScoreCount(score)
    };

    return (
        <div>
            <div className="main1">
                <div className="container1">
                    {/* Render 9 hexagons */}
                    {[...Array(9)].map((_, index) => {
                        const isCenterHex = index === 4;
                        return (
                            <div
                                key={index}
                                style={{
                                    background: isCenterHex
                                        ? '#FFFFFF'
                                        : selectedHexagons[index] !== null
                                            ? '#80D473'
                                            : '#D9D9D9',
                                    position: 'relative',
                                    visibility: index === 0 || index === 6 ? 'hidden' : 'visible',
                                    boxShadow: isCenterHex ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',  // Add shadow for center
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const wordIndexStr = e.dataTransfer.getData('text/plain');
                                    const wordIndex = parseInt(wordIndexStr, 10);
                                    if (!isNaN(wordIndex)) {
                                        handleDrop(index, wordIndex);
                                    }
                                }}
                                onDragOver={(e) => e.preventDefault()}
                                onClick={selectedHexagons[index] !== null ? () => handleReturnItem(index) : null}
                            >
                                {/* Display 'Рейтинг' for center or word index +1 */}
                                {(isCenterHex || selectedHexagons[index] !== null) && (
                                    <p style={{
                                        position: 'absolute',
                                        color: '#1F3C88',
                                        fontWeight: 'bold',
                                        zIndex: '1000',
                                        top: '45%',
                                        left: '10%',
                                        right: '10%',
                                        textAlign: 'center',
                                        wordWrap: 'break-word',
                                    }}>
                                        {isCenterHex ? 'Рейтинг' : (selectedHexagons[index] !== null ? (selectedHexagons[index] + 1) : (index + 1))}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
 
            <div className="word-container">
                {/* Render available draggable words */}
                {availableItems.map((word, idx) => {
                    const wordIndex = words.indexOf(word);
                    return (
                        <div
                            key={wordIndex}
                            className="word draggable-word"
                            draggable
                            onDragStart={(e) => handleDragStart(e, wordIndex)}
                        >
                            {word}
                        </div>
                    );
                })}
            </div>
            <div style={{display:'flex', justifyContent:'right'}}>
                <SubmissionButton handling={handleConfirm}/>
            </div>
        </div>
    );
};

export default Hex;
