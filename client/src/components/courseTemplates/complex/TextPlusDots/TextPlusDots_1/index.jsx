import React, { useState, useEffect } from 'react';

import TextWithTitle from '../../../common/TextWithTitle'
import NumberedDots from '../../../common/NumberedDots'

const TextPlusDots_1 = ({ headerTextTitle, headerText, list }) => {
    return (
        <>
            <TextWithTitle 
                title={headerTextTitle} 
                text={headerText}
            />
            <NumberedDots 
                list={list}
            />
        </>
    );
}

export default TextPlusDots_1;