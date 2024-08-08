import React, { useState, useEffect } from 'react';

import './style.scss';
import img from './../../../../assets/images/Lesson_2_img_1.png';

import { BsPlayFill } from 'react-icons/bs';

function VideoLine({
    poster=img,
    url
}) {
    return ( 
        <div className="video-line">
            {
                url === null || url === undefined || url === '' ? (
                    <>
                    <img src={poster} alt="" />
                    <BsPlayFill className='icon' size={120}/>
                    </>
                ) : (
                    <iframe 
                        class='sproutvideo-player' 
                        src={url} 
                        width='100%' 
                        frameborder='0' 
                        allowfullscreen='true' 
                        referrerpolicy='no-referrer-when-downgrade' 
                        title='Video Player'>
                    </iframe>
                )
            }
            
            {/* <div className="dim"></div> */}
        </div>
    );
}

export default VideoLine;