import React, { useState, useEffect } from 'react';
import TextWithTitle from '../../../common/TextWithTitle';
import NumberedDots from '../../../common/NumberedDots';

import './style.scss';
import image1 from './../../../../../assets/images/Image_23.png';

function ImageTextAndNumberedDots({ img, title, text, list }) {
    return ( 
        <div className="imageTextAndNumberedDots">
            <div className="image">
                <img src={img !== null && img !== undefined ? img : image1} alt="image" />
            </div>
            <TextWithTitle title={title} text={text} />
            {
                list!== null && list!== undefined 
                    ? <NumberedDots color={'#D2EA9B'} list={list}/>
                    : null
            }
        </div>
    );
}

export default ImageTextAndNumberedDots;