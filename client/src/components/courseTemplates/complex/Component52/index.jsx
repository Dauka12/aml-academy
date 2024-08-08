import React, { useState, useEffect } from 'react';

import icon from './static/stage.svg'
import line from './static/line.png'
import './style.scss'

function Component52({
    title,
    img,
    version=1,
    isKazakh=false
}) {

    if (version === 2) {
        return (
            <div className="component52 v2">
                <div className="text">
                    {
                        title
                    }
                </div>

                <div className="scheme v2">
                    <img src={img} alt={title} />
                </div>
            </div>
        )
    }

    return ( 
        <div className="component52">
            <div className="text">
                {
                    !isKazakh 
                        ? '“Запутывание следов - направлено на маскировку проверяемого следа происхождения “грязных” денег в преддверии возможного расследования”'
                        : '“Іздерді шатастыру – ықтимал тергеу қарсаңында «лас» ақшаның пайда болуының тексерілетін ізін жасыруға бағытталған”'
                }
            </div>

            <div className="scheme">
                <div className="row1">
                    <div>{!isKazakh ? 'Оборот' : 'Айналым'}</div>
                </div>
                <div className="row2">
                    <div>
                        <div>
                            <div>{!isKazakh ? 'Законные' : 'Заңды'}</div>
                            <img src={line} alt="line" />
                        </div>
                    </div>
                    <div>
                        <img src={icon} alt="paper" />
                    </div>
                    <div>
                        <div>
                            <img src={line} alt="line" />
                            <div>{!isKazakh ? 'Незаконные' : 'Заңсыз'}</div>
                        </div>
                    </div>
                </div>
                <div className="row3">
                    <div>{!isKazakh ? 'Смешивается' : 'Араласады'}</div>
                </div>
            </div>
        </div>
    );
}

export default Component52;