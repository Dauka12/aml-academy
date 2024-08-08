import React from 'react';

import './style.scss';

function Modal({
    children
}) {
    return ( 
        <div className="modal">
            <div className="dim"></div>
            <div className="modal-body">
                {children}
            </div>
        </div>
    );
}

export default Modal;