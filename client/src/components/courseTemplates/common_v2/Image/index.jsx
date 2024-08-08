import React, { useState, useEffect } from 'react';

import './style.scss';

function Image({
    src,
    alt='',
    style={},
    padding,
    display='block'
}) {
    if (padding) {
        return ( 
            <div className="just-image"
                style={{
                    padding: padding,
                    display: display
                }}
            >
                <img src={src} alt={alt} style={style}/>
            </div>
        );
    }

    return ( 
        <div className="just-image"
            style={{
                display: display
            }}
            >
            <img src={src} alt={alt} style={style}/>
        </div>
    );
}

export default Image;