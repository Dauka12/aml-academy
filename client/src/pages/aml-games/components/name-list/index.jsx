import { Switch } from '@mui/material';
import React, { useState } from 'react';
import './style.css';

const NameList = ({ peopleData, switchState, onSwitchChange, clientReview = false, handleSubmit, handleSubmitTask }) => {
    const [switchStates, setSwitchStates] = useState(peopleData.map(() => false));

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
        const result = correctCount / peopleData.length;
        handleSubmit("tagged answers", result);
        handleSubmitTask('type', result)
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
                        <button className='blue' onClick={calculateResult}>
                            Подтвердить
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default NameList;
