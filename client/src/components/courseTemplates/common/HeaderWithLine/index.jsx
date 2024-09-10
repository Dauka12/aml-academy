import React from 'react';

import Sizebox from '../Sizebox';
import './../../../../styles/parseTextStyles.scss';
import './style.scss';

import parseText from '../../../../util/ParseTextFromFormatTextarea';

function HeaderWithLine({ children, header, headerColor, lineColor, version=1 }) {
    const defaulHeaderColor = '#3A3939';
    const defaulLineColor = '#CADEFC';

    const _headerColor = headerColor || defaulHeaderColor;
    const _lineColor = lineColor || defaulLineColor;

    if (version === 2) {
        if (typeof header !== 'object' && header.indexOf('\\n') !== -1) {
            return (
                <div className="title-with-line">
                    <div className="line"
                        style={{
                            borderTop: `2px solid ${_lineColor}`,
                        }}
                    ></div>
                    <div>
                        {header.split('\\n').map((child, index) => {
                            const last = index === header.split('\\n')?.length - 1;
        
                            return (
                                <React.Fragment key={index}>
                                    <h1 className='header-text'
                                        style={{ color: _headerColor }}
                                    >
                                        {parseText(child)}
                                    </h1>
                                    {!last && <Sizebox height={20} />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (typeof header === 'string') {
            return (
                <div className="title-with-line">
                    <div className="line"
                        style={{
                            borderTop: `2px solid ${_lineColor}`,
                        }}
                    ></div>
                    <div>
                        {header.split('\\n').map((child, index) => {
                            const last = index === header.split('\\n')?.length - 1;
        
                            return (
                                <React.Fragment key={index}>
                                    <h1 className='header-text'
                                        style={{ color: _headerColor }}
                                    >
                                        {parseText(child)}
                                    </h1>
                                    {!last && <Sizebox height={20} />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
    
    if (children !== undefined && children !== null) {
        return (
            <div className="title-with-line">
                <div className="line"
                    style={{
                        borderTop: `2px solid ${_lineColor}`,
                    }}
                ></div>
                <div>
                    <h1 className='header-text'
                        style={{ color: _headerColor }}
                    >{children}</h1>
                </div>
            </div>
        )
    }

    return ( 
        <div className="title-with-line">
            <div className="line"
                style={{
                    borderTop: `2px solid ${_lineColor}`,
                }}
            ></div>
            <div>
                <h1 className='header-text'
                    style={{ color: _headerColor }}
                >{header}</h1>
            </div>
        </div>
    );
}



export default HeaderWithLine;