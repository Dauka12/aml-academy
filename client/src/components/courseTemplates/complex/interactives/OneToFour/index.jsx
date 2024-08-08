import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { motion, useAnimation } from 'framer-motion';

import './style.scss'
import Sizebox from '../../../common/Sizebox';

import componentMap_level_2 from './../../../../../pages/AdminPage_v2/constructor/ComponentMap_level_2'

function OneToFour({
    header,
    list,
    version=1
}) {
    const [open, setOpen] = useState(false)
    const mainControls = useAnimation();


    useEffect(() => {

        if (open) {
            mainControls.start('visible')
        } else {
            mainControls.start('hidden')
        }

    }, [open])

    if (version === 2) {
        return (
            <div className="one-to-four v2">
                <div className="wrapper v2">
                    <div className="oneToFour v2">
                        <div className="header-wrapper v2">
                            <div className="header v2">
                                <div className="text v2">{
                                                        
                                    componentMap_level_2[header.componentName] && (
                                        React.createElement(componentMap_level_2[header.componentName], header.values)
                                    ) 
                                        
                                }</div>
                                <div className="open" onClick={() => setOpen(prev => !prev)}>
                                    {   
                                        open 
                                            ? <AiOutlineMinus 
                                                size={23}
                                                
                                                />
                                            : <AiOutlinePlus 
                                                size={23}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                        <Sizebox height={51} />
                        <motion.div className="body-wrapper"
                            variants={{
                                hidden: {
                                    height: 0,
                                    paddingTop: 0,
                                    paddingBottom: 0
                                },
                                visible: {
                                    height: 'max-content',
                                    paddingBottom: '10px'
                                }
                            }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            initial='hidden'
                            animate={mainControls}
                        >
                            <div className="body v2">
                                {console.log(list)}
                                {
                                    list ? list.map((item, index) => {
                                        return (
                                            <div className={'v2'} key={index}>
                                            {
                                                componentMap_level_2[item.componentName] && (
                                                    React.createElement(componentMap_level_2[item.componentName], item.values)
                                                )    
                                            }
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </motion.div>
                    </div>
                </div>
                
            </div>
        );
    }

    return ( 
        <div className="one-to-four">
            <div className="wrapper">
                <div className="oneToFour">
                    <div className="header-wrapper">
                        <div className="header">
                            <div className="text">{
                                                    
                                header
                                    
                            }</div>
                            <div className="open" onClick={() => setOpen(prev => !prev)}>
                                {   
                                    open 
                                        ? <AiOutlineMinus 
                                            size={23}
                                            
                                            />
                                        : <AiOutlinePlus 
                                            size={23}
                                        />
                                }
                            </div>
                        </div>
                    </div>
                    <Sizebox height={51} />
                    <motion.div className="body-wrapper"
                        variants={{
                            hidden: {
                                height: 0,
                                paddingTop: 0,
                                paddingBottom: 0
                            },
                            visible: {
                                height: 'max-content',
                                paddingBottom: '10px'
                            }
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        initial='hidden'
                        animate={mainControls}
                    >
                        <div className="body">
                            {
                                list ? list.map((item, index) => {
                                    console.log(index)
                                    return (
                                        <div key={index}>{item}</div>
                                    )
                                }) : null
                            }
                        </div>
                    </motion.div>
                </div>
            </div>
            
        </div>
    );
}

export default OneToFour;