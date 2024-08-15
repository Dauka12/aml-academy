import React, { useState } from 'react';
import './style.scss';

const SubmissionButton = ({ handling }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => {
        handling(); // Execute the provided handling function
        setIsDisabled(true); // Disable the button after click
    };

    return (
        <div className="actions">
            <button
                className='sub-button'
                onClick={handleClick}
                disabled={isDisabled} // Disable button after it is clicked
            >
                Подтвердить
            </button>
        </div>
    );
};

export default SubmissionButton;
