import React, { useState, useEffect } from 'react';

import './Lectors.scss'

function Lectors({ lectors }) {
    return ( 
        <div className="lectors-block">
            {lectors.map(lector => (
                <div className="lector-card">
                    <img src={lector.img} alt={lector.name} />
                    <div>
                        <div className="lector-name">{lector.name}</div>
                        <div className="lector-name">{lector.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Lectors;