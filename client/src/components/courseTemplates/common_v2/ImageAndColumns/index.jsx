import React from 'react';

import parseText from '../../../../util/ParseTextFromFormatTextarea.jsx';
import './style.scss';

function ImageAndColumns({
    image,
    list,
    header,
    headerColor='black',
    listColor,
}) {
    return ( 
        <div className="image-and-columns">
            <div className="wrapper">
                <div className="image">
                    { header ? <div className="header" style={{ color: headerColor }}>{header}</div> : null}
                    <img src={image} alt={image} />
                </div>
                <div className="columns">
                        {
                            list.map((item, index) => {

                               return (
                                <div className="column" key={index} style={{ color: listColor }}>
                                    {
                                        item.split('\\n').map((child, index) => {
                                            return (
                                                <p
                                                    key={index}
                                                    style={{
                                                        fontWeight: 200
                                                    }}
                                                
                                                > {parseText(child)}</p>
                                            );
                                        })
                                    }
                                </div>
                               )

                            })      
                        }
                    </div>
            </div>
        </div>
    );
}

export default ImageAndColumns;