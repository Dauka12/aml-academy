import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { RiArrowDownSLine, RiArrowRightSLine, RiQuestionAnswerLine } from 'react-icons/ri';
import { TbFileText } from 'react-icons/tb';
import './sessions.scss';

export const Session = ({ course_id, session, handleSessionClick, isActive, checked, isChecked }) => {
    const [sessionChecked, setSessionChecked] = useState(false);
    
    useEffect(() => {
        // If checked or isChecked prop is provided, use it directly
        if (checked !== undefined) {
            setSessionChecked(checked);
        } else if (isChecked !== undefined) {
            setSessionChecked(isChecked);
        }
        // No need to make an API call as data is received from parent
    }, [checked, isChecked]);

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

export const TestSession = ({ course_id, session, handleSessionClick, isActive, checked, isChecked }) => {
    const [sessionChecked, setSessionChecked] = useState(false);

    useEffect(() => {
        // If checked or isChecked prop is provided, use it directly
        if (checked !== undefined) {
            setSessionChecked(checked);
        } else if (isChecked !== undefined) {
            setSessionChecked(isChecked);
        }
        // No need to make an API call as data is received from parent
    }, [checked, isChecked]);

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