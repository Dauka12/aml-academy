import React, { useState } from 'react';

import './Collapsable.scss';

import arrowDownIcon from './../../../assets/images/Arrow-bottom.png';
import arrowUpIcon from './../../../assets/images/Arrow-top.png';

function Collapsable({title, children}) {
    const [ isOpen, setOpen ] = useState(false);

    return ( 
        <div className="collapsable-block">
            <div onClick={() => {
                setOpen(prev => !prev)
            }}>
                <div className="title">{title}</div>
                <img  src={isOpen ? arrowUpIcon : arrowDownIcon}/>
            </div>
            <div className={`collapsed-content ${isOpen ? 'open' : 'close'}`}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Collapsable;