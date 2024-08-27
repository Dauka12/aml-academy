import React, { useState } from 'react';
import './style.scss';

const SubmissionButton = ({ handling, disabled = false, setDisabled }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => {
        handling(); // Execute the provided handling function
        setIsDisabled(true); // Disable the button after click
        setTimeout(() => {
            setIsDisabled(false);
        }, 2000)
    };
    const handleDisabled = () => {
        setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, 1000)
    }

    return (
        <div className="actions" style={{ position: 'relative' }}>
            <button
                className={`sub-button ${disabled ? 'disabled' : ''}`}
                onClick={disabled ? () => { handleDisabled() } : handleClick}
                disabled={isDisabled}
            >
                Подтвердить
                {isDisabled && (
                    <div className="modal-popup">
                        Ваш ответ был отправлен!
                    </div>
                )}
            </button>
        </div>
    );
};

export default SubmissionButton;
