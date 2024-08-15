import { Switch } from '@mui/material';
import React from 'react';
import './style.css';

const NameList = ({ peopleData, switchState, onSwitchChange, clientReview = false }) => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const label1 = { inputProps: { 'aria-label': 'Switch demo' } };

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
                                    {...label1}
                                />
                                Риск имеется
                            </div>
                    }
                </div>
            ))}
        </div>
    );
}

export default NameList;
