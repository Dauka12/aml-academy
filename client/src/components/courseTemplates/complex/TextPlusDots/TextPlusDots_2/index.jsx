import React, { useState, useEffect } from 'react';

import TextWithTitle from '../../../common/TextWithTitle'
import NotNumberedDots from '../../../common/NotNumberedDots'

const TextPlusDots_2 = (props) => {
    return (
        <>
            <TextWithTitle 
                title={props.headerTextTitle} 
                text={props.headerText}
            />
            <NotNumberedDots 
                list={props.list}
            />
        </>
    );
}

export default TextPlusDots_2;