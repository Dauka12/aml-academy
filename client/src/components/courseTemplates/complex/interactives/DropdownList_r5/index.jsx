import { useState } from 'react';
import './style.scss';

import icon1 from './icon-1.svg';
import icon2 from './icon-2.svg';
import icon3 from './icon-3.svg';

import chat from './chat.svg';
import description from './description.svg';
import devices from './devices.svg';
import settings from './settings.svg';
import social from './social.svg';

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Sizebox from '../../../common/Sizebox';

function DropdownList_r5({
    title = 'Dropdown List',
    color = '#1F3C88',
    strokeColor = '#CADEFC',
    items = [],
    headers = []
}) {
    const row2Style = {
        borderRightColor: strokeColor
    }

    const [currentOpen, setCurrentOpen] = useState(0);
    const handleOpen = (id) => {
        // console.log(id)

        setCurrentOpen(id);
    }

    return ( 
        <div className="dropdown-list-r5">
            <div className="title"
                style={{color: color}}
            >{title}</div>
            <Sizebox height={63} />
            <div className="dropdown-list-wrapper-r5">
                <div className="dropdown-list-r5">                    <div className="row-1">
                        <div>
                            <div>
                                <div className="name">{headers && headers[0] ? headers[0].name : 'Header 1'}</div>
                                <img src={(headers && headers[0] && headers[0].icon) || icon1} alt={(headers && headers[0] && headers[0].name) || 'Header 1'} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="name">{headers && headers[1] ? headers[1].name : 'Header 2'}</div>
                                <img src={(headers && headers[1] && headers[1].icon) || icon2} alt={(headers && headers[1] && headers[1].name) || 'Header 2'} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="name">{headers && headers[2] ? headers[2].name : 'Header 3'}</div>
                                <img src={(headers && headers[2] && headers[2].icon) || icon3} alt={(headers && headers[2] && headers[2].name) || 'Header 3'} />
                            </div>
                        </div>
                    </div>
                    <div className="row-2" style={{borderTopColor: strokeColor}}>
                        <div style={row2Style}>
                            <Open_close 
                                id={0}
                                handleOpen={handleOpen}
                                open={currentOpen === 0}
                                color={strokeColor}
                            />                        <div onClick={() => handleOpen(0)}>
                                <img src={social} alt="social" />
                                <div className="text">{items && items[0] ? items[0].title : 'Item 1'}</div>
                            </div>
                        </div>
                        <div style={row2Style}>
                            <Open_close 
                                id={1}
                                handleOpen={handleOpen}
                                open={currentOpen === 1}
                                color={strokeColor}
                            />                            <div onClick={() => handleOpen(1)}>
                                <img src={chat} alt="social" />
                                <div className="text">{items && items[1] ? items[1].title : 'Item 2'}</div>
                            </div>
                        </div>
                        <div style={row2Style}>
                            <Open_close 
                                id={2}
                                handleOpen={handleOpen}
                                open={currentOpen === 2}
                                color={strokeColor}
                            />                            <div onClick={() => handleOpen(2)}>
                                <img src={settings} alt="settings" />
                                <div className="text">{items && items[2] ? items[2].title : 'Item 3'}</div>
                            </div>
                        </div>
                        <div style={row2Style}>
                            <Open_close 
                                id={3}
                                handleOpen={handleOpen}
                                open={currentOpen === 3}
                                color={strokeColor}
                            />                            <div onClick={() => handleOpen(3)}>
                                <img src={description} alt="description" />
                                <div className="text">{items && items[3] ? items[3].title : 'Item 4'}</div>
                            </div>
                        </div>
                        <div style={row2Style}>
                            <Open_close 
                                id={4}
                                handleOpen={handleOpen}
                                open={currentOpen === 4}
                                color={strokeColor}
                            />                            <div onClick={() => handleOpen(4)}>
                                <img src={devices} alt="devices" />
                                <div className="text">{items && items[4] ? items[4].title : 'Item 5'}</div>
                            </div>
                        </div>
                        <div style={row2Style}></div>
                    </div>
                </div>
            </div>            <Sizebox height={32} />
            <div className="info-wrapper">
                <div className="info">
                    <div className="text">
                        {items && items[currentOpen] && items[currentOpen].text ? 
                            items[currentOpen].text : 
                            'No information available for this item.'
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function Open_close({
    id,
    handleOpen,
    open,
    color
}) {
    return ( 
        <div onClick={() => {
            handleOpen(id);
        }}>
            {
                open 
                    ? <AiOutlineMinus style={{color: color}} size={25} /> 
                    : <AiOutlinePlus style={{color: color}} size={25}/>
            }
        </div>
    );
}

export default DropdownList_r5;