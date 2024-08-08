import React, { useState, useEffect } from 'react';

import './style.scss';
import Image from '../Image';
import Sizebox from '../../common/Sizebox';
import Centered from '../../common/Centered';

function Quote({
    text,
    author,
    img
}) {
    return ( 
        <div className="quote">
            {
                img ? (
                    <div className='img'>
                        <Centered>
                            <Image src={img} style={{
                                maxHeight: '300px',
                                width: 'auto'
                            }}/>
                        </Centered>
                        <Sizebox height={20} />
                    </div>
                ) : null
            }
            <div className="wrapper">
                <quote>
                    <span className="text">"{ text }"</span>. <span className="author">{ author }</span>
                </quote>
            </div>
        </div>
    );
}

export default Quote;

