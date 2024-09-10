import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { ImRadioUnchecked } from "react-icons/im";
import { RiSurveyLine } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";

import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import base_url from '../../settings/base_url';
import './sessions.scss';

export const Session = ({course_id, session, handleSessionClick, isActive, checked }) => {
    const [sessionChecked, setSessionChecked] = useState(false);

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${base_url}/api/aml/chapter/getChecked/${course_id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    const _temp = response.data.filter(_session => _session.id === session.id);
                    if (_temp?.length !== 0) {
                        setSessionChecked(_temp[0].checked)
                    }
                    
                } else {
                    // Handle other status codes if needed
                }
            } catch (error) {
                console.error(error);
            }
        };
        
        if (!checked) fetchData();
        if (checked) setSessionChecked(checked);
    }, [])

    return (
        <div 
            className={`session ${isActive ? 'active' : ''}`} 
            key={session.name}
            onClick={() => handleSessionClick(session.id)}
        >

            <VscListSelection style={{color: 'white', fontSize: '28px'}} />
            <h6>{session.name}</h6>
            <div className="sessionProgress">
                {
                    sessionChecked 
                        ? <AiFillCheckCircle />
                        : <ImRadioUnchecked />
                }
            </div>
        </div>
    )
}

export const TestSession = ({session, handleSessionClick, isActive, checked}) => {
    return (
        <div 
            className={`session ${isActive ? 'active' : ''}`} 
            key={session.name}
            onClick={() => handleSessionClick(session.id)}
        >

            {/* <img src={AiFillFile} style={{color: 'white', background: 'white'}} alt="icon" /> */}
            <RiSurveyLine style={{color: 'white', fontSize: '28px'}} />
            <h6>{session.name}</h6>
            <div className="sessionProgress">
                {
                    checked 
                        ? <AiFillCheckCircle />
                        : <ImRadioUnchecked />
                }
            </div>
        </div>
    )
}

export const Module = ({children, name, isOpen, moduleId, handleModuleOpen}) => {
    // const [isOpen, setOpen] = useState(false);

    const handleOpen = (event) => {
        // if (!event.target.classList.contains("group-sessions")) return;
        // setOpen(prev => !prev)
        handleModuleOpen(moduleId)
    }

    const mainControls = useAnimation();

    useEffect(() => handleAnimation(), [isOpen])

    const handleAnimation = () => {
        if (isOpen) {
            mainControls.start('open')
        } else {
            mainControls.start('close')
        }
    }

    return (
        <div className="session-group" >
            <div 
                className="group-sessions" 
                onClick={handleOpen}
                style={{
                    boxShadow: isOpen ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                }}
            >
                <div className="icon">
                    {isOpen ? (
                        <RiArrowDownSLine size={30} onClick={(e) => {
                            e.stopPropagation()
                            handleOpen(e)
                        }} />
                    ) : (
                        <RiArrowRightSLine size={30} onClick={(e) => {
                            e.stopPropagation()
                            handleOpen(e)
                        }} />
                    )}
                </div>
                <h5 className="group-sessions">{name}</h5>
            </div>
            <motion.div 
                className={`${isOpen ? 'open' : 'close'}`}
                variants={{
                    close: { height: 0 },
                    open: { height: 'max-content' }
                }}
                transition={{ duration: 1, ease: 'linear' }}
                initial='close'
                animate={mainControls}
            >
                {children}
            </motion.div>
        </div>
    )
}