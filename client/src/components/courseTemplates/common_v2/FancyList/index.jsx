import React, { useState, useEffect } from 'react';

import './style.scss';
import parseText from '../../../../util/ParseTextFromFormatTextarea';

function FancyList({
    list,
    textColor='black',
    numberColor='#151515a8',
    listColor='burlywood'
}) {
    if (!list) return null;

    const getZeroPrefixNum = (num) => {
        if (num > 9) return `${num}`;

        return `0${num}`;
    }

    return ( 
        <div className="fancy-list">
            {
                list.map((item, index) => {

                    return (
                        <div className="item" key={index}>
                            <div className="num"
                                style={{
                                    backgroundColor: listColor,
                                    color: numberColor
                                }}

                            >{getZeroPrefixNum(index+1)}</div>

                            <div className="text"
                                style={{
                                    color: textColor,
                                }}

                            >{
                                item.split('\\n').map((child, index) => {
                                    return (
                                        <p>{parseText(child)}</p>
                                    );
                                })
                            }</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default FancyList;