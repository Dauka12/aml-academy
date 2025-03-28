import React from 'react';

import { IoInformationCircle } from "react-icons/io5";

import parseText from '../../../../../util/ParseTextFromFormatTextarea.jsx';
import './../../../../../styles/parseTextStyles.scss';
import './style.scss';

function Report_Information({ children, version=1 }) {

    if (version === 2) {
        return (
            <div className="reportInformation">
                <div className="icon-wrapper">
                    <IoInformationCircle className='icon' size={23}/>
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

    return ( 
        <div className="reportInformation">
            <div className="icon-wrapper">
                <IoInformationCircle className='icon' size={23}/>
            </div>
            <div>
                <p>{children}</p>
            </div>
        </div>
    );
}

export default Report_Information;