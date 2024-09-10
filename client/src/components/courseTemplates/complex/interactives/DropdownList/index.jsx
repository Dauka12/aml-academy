import React, { useEffect, useState } from 'react';

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import { motion, useAnimation } from 'framer-motion';

import './style.scss';

function DropdownList({
    list
}) {
    return ( 
        <div className="dropdown-list">
            <div className="wrapper">
                <div className="body">
                    {
                        list !== null && list !== undefined 
                        ? list.map((item, index) => {

                            return <_Item 
                                // key={index}
                                name={item.name}
                                hint={item.description}
                                items={item.items}
                            />
                        }) : null
                    }
                </div>
            </div>
        </div>
    );
}

const _Item = ({name, hint, items}) => {
    const [open, setOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const mainControls = useAnimation();

    useEffect(() => {
        if (open) {
            mainControls.start('visible');
        } else {
            mainControls.start('hidden');
        }
    }, [open])

    return (
        <div className="dropdown-item">
            <div className="head">
                <div className="text">{name}</div>
                <div className="show-hint" onClick={() => {
                    setShowHint(prev => !prev)
                }}>
                    {
                        showHint 
                            ? <AiOutlineMinus 
                                size={23}
                                
                                />
                            : <AiOutlinePlus 
                                size={23}
                            />
                    }
                </div>
                <div 
                    className="hint"
                    style={{display: !showHint ? 'none' : 'block'}}
                >{hint}</div>
            </div>
            <div className="open" onClick={() => {
                setOpen(prev => !prev)
            }}>
                {
                    open 
                        ? <BsArrowUp 
                            size={23}
                            
                            />
                        : <BsArrowDown 
                            size={23}
                        />
                }
            </div>
            <motion.div className="body"
                variants={{
                    hidden: {
                        height: '0px',
                        padding: 0
                    },
                    visible: {
                        height: 'max-content',
                        overflow: 'hidden',
                        padding: '30px'
                    }
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                initial={'hidden'}
                animate={mainControls}
            >
                {
                    items.map((item, index) => {

                        return <p>{index+1}. {item}{index === items?.length-1 ? '.' : ';'}</p>
                    })
                }
            </motion.div>
        </div> 
    )
}

export default DropdownList;