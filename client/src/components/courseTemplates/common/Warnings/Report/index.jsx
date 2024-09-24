import HtmlContent from 'dangerously-set-html-content';
import React from 'react';

import { BsFillExclamationOctagonFill } from "react-icons/bs";
import './../../../../../styles/parseTextStyles.scss';

import './style.scss';

import parseText from '../../../../../util/ParseTextFromFormatTextarea';

function Report_Warning({ 
    children, text,
    backgroundColor='rgba(202, 222, 252, 0.22)',
    borderColor='#A7CAFF',
    version = '1'
}) {
    if (version === 2) {
        return (
            <div className="reportWarning">
                <div className="icon-wrapper">
                    <BsFillExclamationOctagonFill className='icon' size={23}/>
                </div>
                <div>
                    {children.split('\\n').map((child, index) => {
                        // const last = index === children.split('\\n').length - 1;

                        return (
                            <React.Fragment key={index}>
                                <p>
                                    {parseText(child)}
                                </p>
                                {/* {!last && <Sizebox height={20} />} */}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        )
    }

    if (text) {
        // Replace newline characters with HTML line breaks
        const formattedText = text?.replace(/\n/g, '<br />');

        return (
            <div className="reportWarning">
                <div className="icon-wrapper">
                    <BsFillExclamationOctagonFill className='icon' size={23}/>
                </div>
                <div>
                    {/* Using HtmlContent to render HTML */}
                    <p><HtmlContent html={formattedText} /></p>
                </div>
            </div>
        );
    }

    return ( 
        <div className="reportWarning"
            style={{
                borderColor: borderColor,
                backgroundColor: backgroundColor
            }}
        >
            <div className="icon-wrapper">
                <BsFillExclamationOctagonFill className='icon' size={23} style={{color: borderColor}}/>
            </div>
            <div>
                <p>{children}</p>
            </div>
        </div>
    );
}

export default Report_Warning;