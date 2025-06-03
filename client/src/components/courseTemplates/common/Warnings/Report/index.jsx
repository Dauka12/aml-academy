import HtmlContent from 'dangerously-set-html-content';
import React from 'react';

import { BsFillExclamationOctagonFill } from "react-icons/bs";
import './../../../../../styles/parseTextStyles.scss';

import './style.scss';

import { processTextWithFormatting } from '../../../../../util/TextFormattingEnhancer.jsx';

function Report_Warning({ 
    children, text,
    backgroundColor='rgba(202, 222, 252, 0.22)',
    borderColor='#A7CAFF',
    version = '1'
}) {
    if (version === '2' || version === 2) {
        const textToProcess = children || text || '';
        // Обрабатываем как одинарные \n, так и двойные \\n
        const lines = textToProcess.split(/\\n|\n/);
        
        return (
            <div className="reportWarning">
                <div className="icon-wrapper">
                    <BsFillExclamationOctagonFill className='icon' size={23}/>
                </div>
                <div>
                    {lines.map((child, index) => {
                        // Используем улучшенное форматирование
                        const formattedResult = processTextWithFormatting(child);
                        
                        return (
                            <React.Fragment key={index}>
                                <p>
                                    {formattedResult}
                                </p>
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
                </div>                <div>
                    {/* Using HtmlContent to render HTML */}
                    <div><HtmlContent html={formattedText} /></div>
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
                <p>{processTextWithFormatting(children || '')}</p>
            </div>
        </div>
    );
}

export default Report_Warning;