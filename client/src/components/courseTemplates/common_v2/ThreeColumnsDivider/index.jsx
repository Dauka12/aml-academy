import React, { useState, useEffect } from 'react';

import './style.scss';

function ThreeColumnsDivider({
    left,
    middle,
    right,
    gap=10
}) {
    return ( 
        <div className="three-columns-divider">
            <div 
                className="wrapper"
                style={{
                    columnGap: `${gap}px`,
                    rowGap: `${gap}px`,
                }}
            >

                <div className="left">{ left }</div>
                <div className="middle">{ middle }</div>
                <div className="right">{ right }</div>

            </div>
        </div>
    );
}

export default ThreeColumnsDivider;