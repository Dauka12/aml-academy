import React, { useState, useEffect } from 'react';

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import './style.scss'

function DropdownGlossaryList({
    list,
    headerTextColor,
    activeHeaderTextColor,
    textColor,
    tabsTextColor,
    tabsBackgroundColor,
}) {
    return ( 
        <div className="dropdown-glossary-list-wrapper">
            <div className="dropdown-list">
                {
                    list
                    ? list.map((tab, index) => {

                        return <DropDownData 
                            key={index}
                            header={tab.title}
                            data={tab.description}
                            headerColor={headerTextColor}
                            headerActiveColor={activeHeaderTextColor}
                            dataColor={textColor}
                        />

                    }) : null
                }
            </div>
        </div>
    );
}

const  DropDownData = ({ header, data, children, headerColor, headerActiveColor, dataColor }) => {
    const defaultHeaderColor = '#170F49';
    const defaultHeaderActiveColor = '#1F3C88';
    const defaultDataColor = '#6F6C90';

    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className="dropDownData">
            <div className="header">
                <p
                    style={{
                        color: 
                            isOpen 
                                ? (headerActiveColor ? headerActiveColor : defaultHeaderActiveColor)
                                : (headerColor ? headerColor : defaultHeaderColor)
                    }}
                >{header}</p>
                {!isOpen 
                    ? <AiOutlinePlus 
                        size={20} 
                        className='icon' 
                        onClick={handleOpen}
                        style={{
                            color: 
                                isOpen 
                                    ? (headerActiveColor ? headerActiveColor : defaultHeaderActiveColor)
                                    : (headerColor ? headerColor : defaultHeaderColor)
                        }}
                        />
                    : <AiOutlineMinus 
                        size={20} 
                        className='icon' 
                        onClick={handleOpen}
                        style={{
                            color: 
                                isOpen 
                                    ? (headerActiveColor ? headerActiveColor : defaultHeaderActiveColor)
                                    : (headerColor ? headerColor : defaultHeaderColor)
                        }}
                        />
                }
            </div>
            <div className={`data ${!isOpen ? 'hide' : ''}`}>
                <p
                    style={{
                        color: dataColor ? dataColor : defaultDataColor
                    }}
                >{data}</p>
            </div>
        </div>
    )
}

export default DropdownGlossaryList;