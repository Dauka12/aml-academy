import React, { useState, useEffect } from 'react';
import TextWithTitle from '../../../common/TextWithTitle';

import './style.scss';
import image from './../../../../../assets/images/Image_32.png';

function ImageAndText_Colored({ backgroundColor, img, title, text, color }) {
    const defaultBackgroundColor = '#ffffff';
    const _backgroundColor = backgroundColor? backgroundColor : defaultBackgroundColor;
    
    const _image = img? img : image;

    return ( 
        <div className="imageAndText_Colored" style={{
            backgroundColor: _backgroundColor,
        }}>
            <TextWithTitle title={title} text={text} color={color} />
            <div className="image">
                <img src={_image} alt="image" />
            </div>
        </div>
    );
}

export default ImageAndText_Colored;