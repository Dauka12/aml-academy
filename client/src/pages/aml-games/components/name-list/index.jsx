import { Switch } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { nextTask } from '../../game-2/store/slices/taskSlice';
import SubmissionButton from '../sub-button';
import './style.css';

const NameList = ({ peopleData, switchState, onSwitchChange, clientReview = false, handleSubmit }) => {
    const [switchStates, setSwitchStates] = useState(Array(peopleData.length).fill(false));

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNextTask = () => {
        dispatch(nextTask(navigate)); // Dispatch action to go to the next task
    };

    const handleSwitchChange = (index, value) => {
        const newSwitchStates = [...switchStates];
        newSwitchStates[index] = value;
        setSwitchStates(newSwitchStates);

        if (clientReview) {
            onSwitchChange(index, value); // Передаем данные в родительский компонент, если нужно
        }
    };

    const calculateResult = () => {
        let correctCount = 0;
        switchStates.forEach((state, index) => {
            if (state === peopleData[index].shouldBeSwitched) {
                correctCount++;
            }
        });
        const result = correctCount / peopleData?.length;
        
        handleSubmit("tagged answers", result);
        handleNextTask()
        
        console.log(result); // Вывод результата в консоль
    };

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <div className='name-list-wrapper'>
            {peopleData.map((person, index) => (
                <div className='person-item' key={index}>
                    <div className='person-item-information'>
                        {person.name}: {person.id}
                    </div>
                    {
                        clientReview ?
                            <div className='person-item-empty'>
                                Риск отсутствует
                                <Switch
                                    {...label}
                                    checked={switchState}
                                    onChange={(event) => onSwitchChange(event.target.checked)}
                                />
                                Риск имеется
                            </div> :
                            <div className='person-item-empty'>
                                Риск отсутствует
                                <Switch
                                    {...label}
                                    checked={switchStates[index]}
                                    onChange={(event) => handleSwitchChange(index, event.target.checked)}
                                />
                                Риск имеется
                            </div>
                    }
                </div>
            ))}
            {
                !clientReview && (
                    <div style={{ textAlign: 'right', marginRight: '50px', marginTop: '30px', width:"100%" }}>
                        <SubmissionButton  handling={calculateResult}/>
                    </div>
                )
            }
        </div>
    );
}

export default NameList;
