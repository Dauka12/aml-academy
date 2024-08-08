import React from 'react';

import './ModalWindow.scss'

function ModalWindow({ setShowModal, title, children }) {
    return ( 
        <div className="modal-wrapper" onClick={(e) => {
            if (e.target.classList.contains('modal-wrapper')) setShowModal(false)
        }}>
            <div className="modal-window">
                <div className="modal-title">{title}</div>
                <div className="modal-body">{children}</div>

                <div className='modal-close' onClick={() => {
                    setShowModal(false)
                }}>&#x2715;</div>
            </div>
        </div>
    );
}

export default ModalWindow;