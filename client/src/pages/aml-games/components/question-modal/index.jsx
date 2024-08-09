import React, { useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import './style.scss';

const QuestionModal = ({ text }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
        <>
            <div onClick={() => setOpenModal(true)}><FaQuestion /></div>

            {openModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content animate-modal" onClick={(e) => e.stopPropagation()}>
                        <p>{text}</p>
                        <div className="modal-close" onClick={handleCloseModal}>
                            &times;
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default QuestionModal;
