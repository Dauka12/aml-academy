import React, { useState, useEffect } from 'react';
import ImageWithText from '../../../common/ImageWithText';
import TextWithTitle from '../../../common/TextWithTitle';

function ImageHeaderAndText({
    image,
    imageText,
    title,
    text,
    textColor,
    imageTextColor
}) {
    return ( 
        <>
            <ImageWithText img={image} imageText={imageText} color={imageTextColor} />
            <TextWithTitle title={title} text={text} color={textColor} />
        </>
    );
}

export default ImageHeaderAndText;