import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { ImRadioUnchecked } from "react-icons/im";
import { RiSurveyLine } from "react-icons/ri";
import { VscListSelection } from "react-icons/vsc";

import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import './sessions.scss';

export const Session = ({course_id, session, handleSessionClick, isActive, checked, isChecked }) => {
    // Use the isChecked prop passed from parent instead of making API call
    const sessionChecked = checked || isChecked || false;

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