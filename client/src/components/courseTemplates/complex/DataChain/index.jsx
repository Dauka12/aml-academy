import React from 'react';

import './style.scss';

function DataChain({
    data_row,
    lineColor = '#3b3d42',
    blockColor = 'rgb(31, 60, 136)',
    textColor = 'black'
}) {
    if (!data_row) return null;

    return ( 
        <div className="data-chain">
            <div className="wrapper">

                {
                    data_row.map((item, index) => {

                        return (
                            <>
                                <Block 
                                    key={index}
                                    item={item} 
                                    borderColor={blockColor}
                                    textColor={textColor}
                                />
                                
                                {
                                    index !== data_row.length - 1 
                                    ? <div className="line" style={{borderColor: lineColor}}></div>
                                    : null
                                }
                            </>
                        )
                    })
                }

            </div>
        </div>
    );
}

const Block = ({item, borderColor, textColor}) => {


    return (
        <div 
            className="block"
            style={{
                borderLeftColor: borderColor,
                color: textColor
            }}
            
        >
            <div className="title">{ item.title }</div>
            <div className="desc">{ item.description }</div>
        </div>
    )
}

export default DataChain;