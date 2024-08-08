import React, { useState, useEffect } from 'react';
import './style.scss'
import TextWithTitle from './../../../common/TextWithTitle';

function ContentHeaderWithImage({ image, title, imageText, ...props }) {
    return ( 
        <>
            <div className="contentHeaderWithImage">
                <div className="line"></div>

                <h3>{title}</h3>

                <img src={image} alt={imageText} />
                <div className="image-text">
                    <div>
                        <div></div>    
                    </div> 
                    <p>
                        {imageText}
                    </p>
                </div>
            </div>
            <TextWithTitle title={props.headerTextTitle} text={props.headerText}/>
        </>
    );
}

export default ContentHeaderWithImage;