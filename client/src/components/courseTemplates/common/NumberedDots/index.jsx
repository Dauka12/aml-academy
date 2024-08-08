import React, { useState, useEffect } from 'react';

import './style.scss'
import Sizebox from '../Sizebox';
import parseText from '../../../../util/ParseTextFromFormatTextarea';

const NumberedDots = ({ list, dotsColor, color, header, gap=20 }) => {
    const defaultDotsColor = '#F9CB36';
    const defaultColor = '#3A3939';

    return (
        <>  
            {
                header ? 
                <>
                    <h3 
                        className='numbered-dots-header'
                        style={{
                            fontWeight: 600,
                            color: color ? color : defaultColor,
                        }}
                    >{header}</h3> 
                    <Sizebox height={30} />
                </>
                : null
            }
            <div className='numbered-dots' style={{ gap: `${gap}px` }}>
                {
                    list !== undefined ? list.map((item, index) => {
                        let i = index + 1;

                        return (
                            <div key={index} >
                                <span 
                                    style={{
                                        backgroundColor: 
                                        dotsColor !== null && dotsColor !== undefined 
                                                ? dotsColor
                                                : defaultDotsColor,
                                        color: color ? color : defaultColor,
                                    }}
                                >{i}</span>
                                <div>
                                    {
                                        typeof item === 'string' ?
                                        item.split('\\n').map((child, index) => {
                                            return (
                                                <p
                                                    style={{
                                                        color: color ? color : defaultColor,
                                                        fontWeight: 200
                                                    }}
                                                
                                                > {parseText(child)}</p>
                                            );
                                        })
                                        : (
                                            <p
                                                style={{
                                                    color: color ? color : defaultColor,
                                                    fontWeight: 200
                                                }}
                                                
                                            > {item}</p>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
        </>
    );
}

export default NumberedDots;