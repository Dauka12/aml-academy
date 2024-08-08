import React, { useState, useEffect } from 'react';

import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from "react-icons/ai";

import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import './style.scss';

function CourseHeader({
    handleNavOpen,
    courseName,
}) {
    const navigate = useNavigate();

    return ( 
        <div 
        className="course-head">
            <div>
                <div className="show-nav-btn" onClick={() => handleNavOpen()}>
                    <RxHamburgerMenu className="show-nav-btn-icon" size={21}/>
                </div>
                <div className="course-subtitle">{courseName}</div>
            </div>
            <div className='close-icon' onClick={() => {
                navigate('/courses/myCourses')
            }}>
                <AiOutlineClose />
            </div>
        </div>
    );
}

export default CourseHeader;