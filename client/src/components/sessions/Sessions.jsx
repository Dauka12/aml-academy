import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { RiArrowDownSLine, RiArrowRightSLine, RiQuestionAnswerLine } from 'react-icons/ri';
import { TbFileText } from 'react-icons/tb';
import base_url from '../../settings/base_url';
import './sessions.scss';

export const Session = ({ course_id, session, handleSessionClick, isActive, checked }) => {
    const [sessionChecked, setSessionChecked] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchSessionStatus = async () => {
            if (checked !== undefined) {
                setSessionChecked(checked);
                return;
            }
            
            try {
                // Use the getChecked endpoint instead of isChecked
                const response = await axios.get(
                    `${base_url}/api/aml/chapter/getChecked/${course_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                
                if (response.status === 200) {
                    // Filter the results to find the current session
                    const sessionData = response.data.filter(_session => _session.id === session.id);
                    if (sessionData?.length !== 0) {
                        setSessionChecked(sessionData[0].checked);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch session status:", error);
            }
        };

        fetchSessionStatus();
    }, [checked, course_id, jwtToken, session.id]);

    return (
        <motion.div 
            className={`session ${isActive ? 'active' : ''}`}
            onClick={() => handleSessionClick(session.id)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
        >
            <div className="session-icon">
                <TbFileText />
            </div>
            <div className="session-name">
                {session.name}
            </div>
            {sessionChecked && (
                <div className="session-check">
                    <HiCheck />
                </div>
            )}
        </motion.div>
    );
};

export const TestSession = ({ course_id, session, handleSessionClick, isActive, checked }) => {
    const [sessionChecked, setSessionChecked] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchSessionStatus = async () => {
            if (checked !== undefined) {
                setSessionChecked(checked);
                return;
            }
            
            try {
                // Use the getChecked endpoint for test sessions too
                const response = await axios.get(
                    `${base_url}/api/aml/chapter/getChecked/${course_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    }
                );
                
                if (response.status === 200) {
                    const sessionData = response.data.filter(_session => _session.id === session.id);
                    if (sessionData?.length !== 0) {
                        setSessionChecked(sessionData[0].checked);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch test session status:", error);
            }
        };

        fetchSessionStatus();
    }, [checked, course_id, jwtToken, session.id]);

    return (
        <motion.div 
            className={`session test-session ${isActive ? 'active' : ''}`}
            onClick={() => handleSessionClick(session.id)}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
        >
            <div className="session-icon test-icon">
                <RiQuestionAnswerLine />
            </div>
            <div className="session-name">
                {session.name}
            </div>
            {sessionChecked && (
                <div className="session-check">
                    <HiCheck />
                </div>
            )}
        </motion.div>
    );
};

export const Module = ({ children, name, isOpen, moduleId, handleModuleOpen }) => {
    // Use proper control state for animation
    const [animationState, setAnimationState] = useState(isOpen ? "open" : "close");
    
    // Keep animation state in sync with isOpen prop
    useEffect(() => {
        setAnimationState(isOpen ? "open" : "close");
    }, [isOpen]);

    return (
        <div className={`module-container ${isOpen ? 'expanded' : ''}`}>
            <motion.div
                className={`module-header ${isOpen ? 'open' : ''}`}
                onClick={() => handleModuleOpen(moduleId)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.07)' }}
            >
                <div className="module-toggle">
                    {isOpen ? (
                        <RiArrowDownSLine
                            className="toggle-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleModuleOpen(moduleId);
                            }}
                        />
                    ) : (
                        <RiArrowRightSLine
                            className="toggle-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleModuleOpen(moduleId);
                            }}
                        />
                    )}
                </div>
                <h5 className="module-title">{name}</h5>
            </motion.div>

            <AnimatePresence>
                <motion.div
                    className="module-content"
                    variants={{
                        close: { height: 0, opacity: 0, overflow: 'hidden' },
                        open: { height: 'auto', opacity: 1, overflow: 'visible' }
                    }}
                    initial="close"
                    animate={animationState}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className="module-lessons">
                        {children}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};