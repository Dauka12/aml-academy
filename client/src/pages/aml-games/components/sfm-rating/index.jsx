import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Sizebox from '../../../../components/courseTemplates/common/Sizebox';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import { sendAnswerToBackend } from '../../utils/api';
import SubmissionButton from '../sub-button';
import './style.css';

const HexagonComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const handleSubmit = (answers, isCorrect) => {
        sendAnswerToBackend(1, 3, 3, answers, isCorrect);
    };
    const handleConfirm = () => {
        handleSubmit(1,1);  // Send the score to the backend
        handleNextTask()
    };

    return (
        <div>
            <h2>Задача 3</h2>
            <p>Указать свой текущий рейтинг на сайте WebSfm</p>
            <Sizebox/>
            <div className="hexagon-container">
                <div className="hexagon">
                    <span><input className='input-rating' /></span>
                </div>
                <div className="text-bubble">
                    Ваш рейтинг будет увеличиваться в процессе игры при выполнении заданий и прохождения уровней.
                </div>
            </div>
            <Sizebox/>
            <div style={{
                display: 'flex',
                justifyContent:'right'
            }}>
                <SubmissionButton handling={handleConfirm}/>
            </div> 
        </div>
    );
};

export default HexagonComponent;
