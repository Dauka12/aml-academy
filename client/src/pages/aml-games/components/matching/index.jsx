import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import { sendAnswerToBackend } from '../../utils/api';
import SubmissionButton from '../sub-button';
import './style.css'; // Не забудьте добавить стили

const items = [
    { id: 1, text: 'Сведения о субъекте финансового мониторинга, направившем форму ФМ-1' },
    { id: 2, text: 'Форма ФМ-1' },
    { id: 3, text: 'Участники' },
    { id: 4, text: 'Сведения об операции' },
];

const DragAndDropComponent = () => {
    const [droppedItems, setDroppedItems] = useState(Array(items?.length).fill(null));
    const [availableItems, setAvailableItems] = useState(items);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const handleSubmit = (answers, isCorrect) => {
        sendAnswerToBackend(1, 3, 4, answers, isCorrect);
    };
    const handleConfirm = () => {
        handleSubmit(calculateScore(),1);  // Send the score to the backend
        handleNextTask()
    };







    const handleDrop = (index, item) => {
        // Check if the drop zone is already occupied
        if (droppedItems[index]) {
            return; // Prevent dropping if the zone is already occupied
        }

        const newDroppedItems = [...droppedItems];
        newDroppedItems[index] = availableItems.find((i) => i.id === item.id);
        setDroppedItems(newDroppedItems);
        setAvailableItems(availableItems?.filter((i) => i.id !== item.id));
        calculateScore(newDroppedItems);
    };

    const handleReturnItem = (index) => {
        const newAvailableItems = [...availableItems, droppedItems[index]];
        setAvailableItems(newAvailableItems);
        const newDroppedItems = [...droppedItems];
        newDroppedItems[index] = null;
        setDroppedItems(newDroppedItems);
        calculateScore(newDroppedItems);
    };

    const calculateScore = (droppedItems) => {
        const correctItems = droppedItems?.filter((item, index) => item && item.id === index + 1);
        const score = correctItems?.length / items?.length;
        console.log(score);
    };

    return (
        <>
            <h2>Определение порядка формы ФМ-1</h2>
            <DndProvider backend={HTML5Backend}>
            <div className="container4">
                <div className="task-wrapper">
                    <div className="numbers">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="number">{num}</div>
                        ))}
                    </div>
                    <div className="dropzones">
                        {droppedItems.map((item, index) => (
                            <DropZone
                                key={index}
                                index={index}
                                item={item}
                                onDrop={(item) => handleDrop(index, item)}
                                onReturnItem={() => handleReturnItem(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="items-wrapper">
                    {availableItems.map((item) => (
                        <DragItem key={item.id} id={item.id} text={item.text} />
                    ))}
                </div> 
            </div>
            </DndProvider>
            <div style={{display:'flex', justifyContent:'right'}}>
                <SubmissionButton handling={handleConfirm}/>
            </div>
        </>
    );
};

const DragItem = ({ id, text }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className={`drag-item ${isDragging ? 'dragging' : ''}`}>
            {text}
        </div>
    );
};

const DropZone = ({ index, item, onDrop, onReturnItem }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        canDrop: () => !item, // Prevent drop if the drop zone is already occupied
    });

    return (
        <div
            ref={drop}
            className={`drop-zone ${isOver ? 'over' : ''}`}
            onClick={item ? onReturnItem : null}
            style={{ backgroundColor: item ? '#B3C9EA' : 'white', borderLeft: '1px dashed #1F3C88', borderRadius: '0 5px 5px 0' }}
        >
            {item ? item.text : ''}
        </div>
    );
};

export default DragAndDropComponent;
