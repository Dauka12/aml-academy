import React, { useState, useEffect } from 'react';

import { BsFillPlayCircleFill } from "react-icons/bs";
import './style.scss';

function VideoWithTitleAndText({
    url,
    title,
    text,
}) {
    useEffect(() => {
        // console.log(url);
    }, [])

    return ( 
        <div className="videoWithTitleAndText">
            <div className="videoWithTitleAndText-body">
                <div className="videoWithTitleAndText-text">
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                {
                    url === '' || url === undefined || url === null ? (
                        <div className="videoWithTitleAndText-video">
                            {/* <iframe src={url} title={title} /> */}
                            <div className="play-icon">
                                <BsFillPlayCircleFill size={'50px'}/>
                            </div>
                        </div>
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
            </div>
        </div>
    );
}

export default VideoWithTitleAndText;