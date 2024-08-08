import React, { useState, useEffect } from 'react';

import './style.scss'

function RandomGlossary({ title, text, color, backgroundColor }) {
    const defaultColor = '#3A3939'
    const defaultBackgroundColor = '#CADEFC'

    return ( 
        <div className="randomGlossary"
            style={{
                backgroundColor: backgroundColor ? backgroundColor : defaultBackgroundColor,
            }}
        >
            <div className="title"
                style={{
                    color: color? color : defaultColor,
                }}
            >{title}</div>
            <div className="text"
                style={{
                    color: color? color : defaultColor,
                }}
            >{text}</div>
        </div>
    );
}

export default RandomGlossary;