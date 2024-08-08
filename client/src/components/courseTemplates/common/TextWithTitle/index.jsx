import React, { useState, useEffect } from 'react';
import './style.scss'


function TextWithTitle({ title, text, color,fontWeight }) {
    const defaultColor = '#000000';
    const _color = color ? color : defaultColor;
    const defaultFontWeight = '500';
    const _fontWeight = fontWeight ? fontWeight : defaultFontWeight;
 


    return ( 
        <div className="text-with-title">
            {title ? (<h4 style={{
                            color: _color,
                            fontWeight: _fontWeight,
            }}>{ title }</h4>) : null}
            {
                Array.isArray(text) 
                    ? (
                        <div>
                            {
                                text.map(i => (
                                    <p
                                        style={{
                                            color: _color,
                                        }}
                                        key={i}
                                       
                                    >{i}</p>
                                ))
                            }
                        </div>
                    )
                    : <p>{text}</p>
            }
        </div>
    );
}

export default TextWithTitle;