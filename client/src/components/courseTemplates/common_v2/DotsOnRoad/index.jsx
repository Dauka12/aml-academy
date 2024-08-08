import React, { useState, useEffect } from 'react';

import './style.scss';

function DotsOnRoad({
    data = [
        { title: 'Seed-фраза из 12-24  слов английского языка', description: 'abort bird cat fly estimate came eight city map study agency space' },
        { title: 'Приватный ключ', description: '5JPeWYZx922hXi49Lg2RIPWLIqcmDGS9YegMNgANvx8cJa6kNK8' },
        { title: 'Публичный ключ', description: '03D7A51212E4EEFE40C72B201E74AA3557DEFD940ACESC3E107687577CD45FF962' },
        { title: 'Адрес кошелька', description: '1DcEeFRGc4mfRLXWiVZySpmmXk7SsVLfNO' },
    ]
}) {

    return ( 
        <div className="dots-on-road">
            <div className="line">
                <div>{'>'}</div>
            </div>
            <div className="dots">
                {
                    data.map(({ title, description }, index) => {

                        return <div className="item" key={index}>
                            <div className="dot"></div>
                            <div className="title">{ title }</div>
                            <div className="desc">{ description }</div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default DotsOnRoad;