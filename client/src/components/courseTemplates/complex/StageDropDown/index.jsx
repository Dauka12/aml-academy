import React, { useState, useEffect } from 'react';

import './style.scss';
import stage_1 from './static/stage_1.svg'
import stage_2 from './static/stage_2.svg'
import stage_3 from './static/stage_3.svg'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoClose } from "react-icons/io5";

import { motion } from "framer-motion"

function StageDropDown({
    version=1,
    stages=[
        {icon: stage_1, text: 'Ст. 165 УК КазССР', innerText: 'Использование денежных средств и иного имущества, приобретенных или добытых преступным путем, для занятия предпринимательской деятельностью или иной не запрещенной законом деятельностью'},
        {icon: stage_2, text: 'Ст. 193 УК РК', innerText: 'Легализация денежных средств или иного имущества, проиобретенного незаконным путем'},
        {icon: stage_3, text: 'Ст. 218 УК РК', innerText: 'Легализация (отмывание) денег и (или) иного имущества, полученных преступным путем'},
    ],
}) {

    return ( 
        <div className="stage-dropdown">
            <div className="wrapper">

                <div className="body">
                    {
                        stages && stages.map((item, index) => (
                            <Item 
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                innerText={item.innerText}
                                version={version}
                            />
                        ))
                    }

                </div>

            </div>
        </div>
    );
}


const Item = ({ icon, text, innerText, version }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="icon">
                <img src={
                    version === 1 
                        ? icon
                        : `${icon}`
                } alt="stage 1" />
            </div>
            <div className="line"></div>
            <div className="open-icon">
            {
                open 
                    ? <AiOutlineMinus size={25} />
                    : <AiOutlinePlus size={25} onClick={() => setOpen(true)}/>
            }
            </div>
            <div className="text">
                { text }
            </div>

            <motion.div 
                className="inner"
                initial={'close'}
                variants={{
                    open: {left: '0px'},
                    close: {left: '-100vw'}
                }}
                animate={open ? 'open' : 'close'}
                transition={{
                    
                }}
            >
                <div className="close" onClick={() => setOpen(false)}>
                    <IoClose size={23} />
                </div>
                <div className='inner-header'>{ text }</div>
                <div className='inner-text'>
                    { innerText }
                </div>
            </motion.div>
        </div>
    )
}

export default StageDropDown;