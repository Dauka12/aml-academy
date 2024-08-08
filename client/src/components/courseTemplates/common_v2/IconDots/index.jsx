import React, { useState, useEffect } from 'react';

import './style.scss'
import Sizebox from '../../common/Sizebox';

const IconDots = ({ list, color, header, gap=20, icons, height='40px', width='40px', fontSize='16px' }) => {
    const defaultColor = '#3A3939';
    const defaultIcon = 'https://static.thenounproject.com/png/4084271-200.png';

    return (
        <>  
            {
                header ? 
                <>
                    <h3 
                        className='icon-dots-header'
                        style={{
                            fontWeight: 600,
                            color: color ? color : defaultColor,
                        }}
                    >{header}</h3> 
                    <Sizebox height={30} />
                </>
                : null
            }
            <div className='icon-dots' style={{ gap: `${gap}px` }}>
                {
                    list !== undefined ? list.map((item, index) => {
                        return (
                            <div key={index} >
                                <span 
                                    style={{
                                        color: color ? color : defaultColor,
                                        height: height,
                                        width: width,
                                    }}
                                >
                                    <img src={icons ? icons[index] ? icons[index] : defaultIcon : defaultIcon} />
                                </span>
                                <div style={{ fontSize: fontSize }}>
                                    {item}
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
        </>
    );
}

export default IconDots;