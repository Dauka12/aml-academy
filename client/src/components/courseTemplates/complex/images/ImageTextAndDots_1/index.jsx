import React from 'react';
import TextWithTitle from '../../../common/TextWithTitle';

import './style.scss';

import image from './../../../../../assets/images/Image_22.png';

function ImageTextAndDots_1({ img, title, text, listTitle, list }) {
    return ( 
        <div className="imageTextAndDots_1">
            <div className="image">
                <img src={img !== null && img !== undefined ? img : image} alt={title} />
            </div>
            <TextWithTitle title={title} text={text} />
            
            {list !== null && list !== undefined && list?.length > 0
                ? 
                (
                <div className="list">
                    <h3>{listTitle}</h3>
                    <ul>
                        {list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                ) : null}
        </div>
    );
}

export default ImageTextAndDots_1;