import React, { useState, useEffect } from 'react';
import './style.scss'
import TextWithTitle from '../TextWithTitle';

function ContentHeaderWithVideo({ video, title, ...props }) {
    return ( 
        <>
            <div className="contentHeaderWithVideo">
                <div className="line"></div>

                <h3>{title}</h3>

                <img src={video} alt={title} />
            </div>
            <TextWithTitle title={props.headerTextTitle} text={props.headerText}/>
        </>

    );
}

export default ContentHeaderWithVideo;