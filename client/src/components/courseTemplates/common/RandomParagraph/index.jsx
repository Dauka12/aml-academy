import React from 'react';
import Sizebox from '../Sizebox';
import './../../../../styles/parseTextStyles.scss';
import './style.scss';

import parseText from '../../../../util/ParseTextFromFormatTextarea';
import Centered from '../Centered';

function RandomParapraph({ children, color, fontSize, isCentered }) {
    const defaultColor = '#3A3939';
    const defaultFontSize = '18px';

    if (isCentered) {
        if (typeof children !== 'object' && children.indexOf('\\n') !== -1) {
            return (
                <Centered>
                    <div className="randomParagraph">
                        {children.split('\\n').map((child, index) => {
                            const last = index === children.split('\\n')?.length - 1;
        
                            return (
                                <React.Fragment key={index}>
                                    <p
                                        style={{
                                            color: color || defaultColor,
                                            fontSize: fontSize || defaultFontSize,
                                        }}
                                    >
                                        {parseText(child)}
                                    </p>
                                    {!last && <Sizebox height={20} />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </Centered>
            );
        }
    
        if (typeof children === 'string') {
            return (
                <Centered>
                    <div className="randomParagraph">
                        {children.split('\\n').map((child, index) => {
                            const last = index === children.split('\\n')?.length - 1;
        
                            return (
                                <React.Fragment key={index}>
                                    <p
                                        style={{
                                            color: color || defaultColor,
                                            fontSize: fontSize || defaultFontSize,
                                        }}
                                    >
                                        {parseText(child)}
                                    </p>
                                    {!last && <Sizebox height={20} />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </Centered>
            );
        }
    
        return (
            <Centered>
                <div className="randomParagraph">
                    <p
                        style={{
                            color: color || defaultColor,
                            fontSize: fontSize || defaultFontSize,
                        }}
                    >
                        {children}
                    </p>
                </div>
            </Centered>
        );
    } else {
        if (typeof children !== 'object' && children.indexOf('\\n') !== -1) {
            return (
                <div className="randomParagraph">
                    {children.split('\\n').map((child, index) => {
                        const last = index === children.split('\\n')?.length - 1;
    
                        return (
                            <React.Fragment key={index}>
                                <p
                                    style={{
                                        color: color || defaultColor,
                                        fontSize: fontSize || defaultFontSize,
                                    }}
                                >
                                    {parseText(child)}
                                </p>
                                {!last && <Sizebox height={20} />}
                            </React.Fragment>
                        );
                    })}
                </div>
            );
        }
    
        if (typeof children === 'string') {
            return (
                <div className="randomParagraph">
                    {children.split('\\n').map((child, index) => {
                        const last = index === children.split('\\n')?.length - 1;
    
                        return (
                            <React.Fragment key={index}>
                                <p
                                    style={{
                                        color: color || defaultColor,
                                        fontSize: fontSize || defaultFontSize,
                                    }}
                                >
                                    {parseText(child)}
                                </p>
                                {!last && <Sizebox height={20} />}
                            </React.Fragment>
                        );
                    })}
                </div>
            );
        }
    
        return (
            <div className="randomParagraph">
                <p
                    style={{
                        color: color || defaultColor,
                        fontSize: fontSize || defaultFontSize,
                    }}
                >
                    {children}
                </p>
            </div>
        );
    }

    
}

export default RandomParapraph;