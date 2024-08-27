import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Sizebox from '../../../../components/courseTemplates/common/Sizebox'
import { nextTask } from '../../game-2/store/slices/taskSlice'
import screeningSystem from '../../game-2/TaskMocks/level_2_5/image.png'
import { sendAnswerToBackend } from '../../utils/api'
import SubmissionButton from '../sub-button'
const Task2_5 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const handleSubmit = (answers, isCorrect) => {
        sendAnswerToBackend(2, 5, 2, answers, isCorrect);
    };
    const handleConfirm = () => {
        handleSubmit(1,1);  // Send the score to the backend
        handleNextTask()
    };

    return (
        <>
            <h2>Задача 2</h2>
            <p>Задание: Вам представлен шаблон скоринговой системы для оценки рисков клиентов. Ваша задача — внимательно изучить данный шаблон, так как в следующих уровнях игры вам предстоит применять эти знания на практике.
                Помните, что данный шаблон не является окончательным и может быть изменен или дополнен в зависимости от деятельности субъекта и множества других факторов.</p>
            <Sizebox height={40} />
            <img src={screeningSystem} alt="screeningSystem" />
            <Sizebox />
            <div style={{ textAlign: 'right', marginRight: '30px' }}>
                <SubmissionButton handling={handleConfirm} />
            </div>
        </>
    )
}

export default Task2_5
