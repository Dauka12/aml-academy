import React, { useState, useEffect } from 'react';

import './style.scss';
import parseText from '../../../../util/ParseTextFromFormatTextarea';

function FlexBoxes({
    list,
    color='black',
    backgroundColor='#ccc'
}) {
    return ( 
        <div className="flex-boxes">
            {
                list.map((item, index) => (

                    <div 
                        className="box"
                        key={index}
                        style={{
                            color: color,
                            backgroundColor: backgroundColor 
                        }}
                    >
                        {
                            item.split('\\n').map((child, index) => {
                                return (
                                    <p
                                        key={index}
                                        style={{
                                            fontWeight: 200
                                        }}
                                    
                                    > {parseText(child)}</p>
                                );
                            })
                        }
                    </div>

                ))
            }
        </div>
    );
}

export default FlexBoxes;