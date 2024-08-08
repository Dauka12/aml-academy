import React, { useState, useEffect } from 'react';

import './style.scss'

const SmallNotNuberedDots = ({ list }) => {
    return (
        <>
            <div className='small-not-numbered-dots'>
                {
                    list.map((item, index) => {
                        return (
                            <div key={index}>
                                <span> </span> 
                                <p>{item}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default SmallNotNuberedDots;